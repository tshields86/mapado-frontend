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
      tasks: null,
      editing: false,
      selectedTask: {}
    }

  },


  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.tasks !== this.state.tasks;
  },

  componentDidMount: function() {
    this.updateAgain()
  },


  updateAgain: function () {
    ajaxHelpers.getTasks()
    .then((response) => {
      console.log(response.data.tasks);
      this.setState({tasks: response.data.tasks})
    });
  },

  handleOnDelete(task){
    ajaxHelpers.deleteTask(task._id)
    .then((response) => {
      this.context.router.push({pathname: '/deleteTask'})
    })
  },

  handleOnEdit(task){
      ajaxHelpers.getTask(task._id)
      .then((response)=>{
        console.log("we have an edit response", response.data);
        this.setState({
          editing: true,
          selectedTask: response.data,
        });
      })
  },

  handleOnChange: function(propertyName){
    return function (e){
      var thisTask = this.state.selectedTask;
      thisTask[propertyName] = e.target.value;
      this.setState({
        selectedTask: thisTask
      })
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

    ajaxHelpers.updateTask(taskToUpdate)
    .then( (response) => {
      this.updateAgain()
      this.setState({ editing: false });
    })
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

    if( this.state.editing ){

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

    if(!this.state.tasks){
      return <div>Loading...</div>
    }


    let tasksList = this.state.tasks.map( (task) => {
      return(
        <ListTask
          className="list-group-item"
          key={task._id}
          task={task}
          handleOnDelete={this.handleOnDelete}
          handleOnEdit={this.handleOnEdit}
        />
      )
    });

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
});

export default ListTaskContainer;
