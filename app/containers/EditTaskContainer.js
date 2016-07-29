import React, { PropTypes } from 'react';
import TaskForm from '../components/TaskForm';
import ajaxHelpers from '../utils/ajaxHelpers';
import {Link} from 'react-router';
import ListTask from '../components/ListTask';

const EditContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      taskMongoid: this.props.location.query.taskMongoid,
      task: {}
    }
  },

  componentWillMount: function() {
    ajaxHelpers.getTask(this.props.location.query.taskMongoid)
    .then((response)=>{
      this.setState({
        task: response.data
      });
    });
  },

  handleOnChange: function(propertyName){
    return function (e){
      console.log("logging state before type", this.state.task);
      var task = this.state.task;
      task[propertyName] = e.target.value;
      this.setState({
        task: task
      })
      console.log("logging state after type", this.state.task);
    }.bind(this)
  },

  handleOnSubmitTask: function(e){
    e.preventDefault();

    let taskToUpdate = {
        identifier: {
          taskMongoid: this.state.taskMongoid
        },
        objToChange: {
          taskName: this.state.task.taskName,
          date: this.state.task.date,
          time: this.state.task.time,
          location: this.state.task.location,
          category: this.state.task.category,
          detail: this.state.task.detail
        }
    };
    console.log("about to update with this object", taskToUpdate);

    ajaxHelpers.updateTask(taskToUpdate)
    .then(function(response){
      console.log("response for updating task: ", response);
      this.context.router.push({pathname: '/listTasks'});
    }.bind(this))

  },



  render: function () {

    if (!this.state.task.taskName) {
      return <div>LOADING!</div>
    }



    return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm
        changeFxn={this.handleOnChange}
        onSubmitTask={this.handleOnSubmitTask}
        thisTask={this.state.task}
        />
    </div>
    );
  }
  })

  export default EditContainer;


// this used to be in the render...
  // const objEdit = {
  //     query: this.props.location.query
  //   }
