import React, { PropTypes } from 'react';
import TaskForm from '../components/TaskForm';
import ajaxHelpers from '../utils/ajaxHelpers';
import {Link} from 'react-router';
import ListTask from '../components/ListTask';

const AddContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      tasks:[],
      task: {
        taskName: '',
        date: '',
        time: '',
        location: '',
        category: '',
        detail: ''
      }
    }
  },

  handleOnChange: function(propertyName){
    return function (e){
      let task = this.state.task;
      task[propertyName] = e.target.value;
      this.setState({
        task: task
      })
    }.bind(this)
  },

  componentDidMount: function() {
    ajaxHelpers.getTasks()
    //TODO show my tasks
    .then(function(response){
      this.setState({
        tasks: response.data.tasks
      });
    }.bind(this));
  },

  handleOnEdit: function(){
    <Link to='editTask'></Link>
  },

  handleOnDelete: function() {
    ajaxHelpers.deleteTask()
    .then(function(response){
      console.log("handleOnDelete");
      this.setState({
        tasks: response.data.tasks
      });
    }.bind(this));
  },

  handleOnSubmitTask: function(e){
    e.preventDefault();

    if (this.state.task.taskName !== ''){
      console.log();
      ajaxHelpers.addTask(this.state.task)
      .then( (response) => {
        console.log('Response:', response);
        this.context.router.push({pathname: '/listTasks'});
      })
    };
  },

  render: function () {

    const listStyle = {
      border: "1px solid black"
    }

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

    return (
    <div>
      <Link to='listTasks'>
        <button type="button" id='list-task' className='btn btn-info btn-lg'>&#9776;</button>
      </Link>
      <h2>New Task</h2>
      <TaskForm
        changeFxn={this.handleOnChange}
        onSubmitTask={this.handleOnSubmitTask}
        thisTask={this.state.task}
      />
      {tasksList}
    </div>
    );
  }
})

export default AddContainer;
