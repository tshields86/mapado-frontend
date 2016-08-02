import React from 'react';
import _ from 'lodash';
import ajaxHelpers from '../utils/ajaxHelpers';
import {Link} from 'react-router';
import ListTask from '../components/ListTask';
import TaskForm from '../components/TaskForm';
import { parse, stringify } from 'query-string';
import kk from '../components/keys';

const ListTaskContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      tasks: [],
      editing: false,
      selectedTask: {}
    }
  },

  componentDidUpdate: function() {

  },

  componentWillMount: function() {
    ajaxHelpers.getTasks()
    .then(function(response){
      this.setState({
        tasks: response.data.tasks
      });
    }.bind(this));

  },

  handleOnDelete(task){
    ajaxHelpers.deleteTask(task._id)
    .then(function(response){
    })
    .then(() => {
      this.context.router.push({pathname: '/deleteTask'})
    })
  },

  handleOnEdit(task){
    console.log("just passed the entire task", task._id);
      ajaxHelpers.getTask(task._id)
      .then((response)=>{
        this.setState({
          selectedTask: response.data,
          editing: true
        });
      })
  },

  handleOnChange: function(propertyName){
    return function (e){
      console.log("C: Typing in the form, e.target.value:", e.target.value);
      var thisTask = this.state.selectedTask;
      thisTask[propertyName] = e.target.value;
      this.setState({
        selectedTask: thisTask
      })
      console.log("D: this.state.selectedTask: ", this.state.selectedTask);
    }.bind(this)
  },

  handleOnSubmitTask: function(e){
    e.preventDefault();
    const thisTask = this.state.selectedTask;

    let taskToUpdate = {
        identifier: {
          taskMongoid: thisTask._id
        },
        objToChange: {
          taskName: thisTask.taskName,
          date: thisTask.date,
          time: thisTask.time,
          location: thisTask.location,
          category: thisTask.category,
          detail: thisTask.detail
        }
    };
    console.log("about to update with this object", taskToUpdate);

    ajaxHelpers.updateTask(taskToUpdate)
    .then(function(response){
      console.log("response for updating task: ", response);
      this.setState({ editing: false });
    }.bind(this))
  },


  pointOnMap:function(longitude, latitude, color, taskName, desc, taskIndex){
    L.mapbox.featureLayer({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          latitude,
          longitude
        ]
      },
      properties: {
        title: taskName,
        description:  desc,
        'marker-size': 'large',
        'marker-color': color,
        'marker-symbol': taskIndex
      }
    }).addTo(Window.map)
  },

  // we had an array and we pushed the JSX into it and dropped it in the render-return

  render: function() {

    let tasksList = this.state.tasks.map( (task) => {
      return(
        <ListTask
          key={task._id}
          task={task}
          handleOnDelete={this.handleOnDelete}
          handleOnEdit={this.handleOnEdit}
        />
      )
    });

    if( this.state.editing ){

      console.log("this.state.selectedTask", this.state.selectedTask);

      return (
      <div>
        <h2>Edit Task</h2>
        <TaskForm
          changeFxn={this.handleOnChange}
          onSubmitTask={this.handleOnSubmitTask}
          thisTask={this.state.selectedTask}
          />
      </div>
      );
    }

    if ( !this.state.editing ) {
      return (
        <div>
          <h2>All Tasks</h2>
          <Link to='/'>
              <button type="button" id='home' className="btn btn-primary">&#x25B2;</button>
          </Link>
          <Link to='addTask'>
              <button type='button' className='btn btn-primary' >&#x2b;</button>
          </Link>
          <div>
            {tasksList}
          </div>

        </div>
        )
    }
  }
});

export default ListTaskContainer;
