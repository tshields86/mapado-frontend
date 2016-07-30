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
      ajaxHelpers.addTask(this.state.task)
      .then(function(response){
        console.log('Response:', response);
        // routingToList();
      })
      .then(()=> {
        this.context.router.push({pathname: '/listTasks'});
      })
    };

  },

  render: function () {

    const tasksListElement = [];
    const listStyle = {
      border: "1px solid black"
    }

      for (let task in this.state.tasks) {
        tasksListElement.push(
          <div key={this.state.tasks[task]._id} style={listStyle} className="task-card">
            <p>Task: {this.state.tasks[task].taskName}</p>
            <p>Date: {this.state.tasks[task].date}</p>
            <p>Time: {this.state.tasks[task].time}</p>
            <p>Location: {this.state.tasks[task].location}</p>
            <p>Category: {this.state.tasks[task].category}</p>
            <p>Detail: {this.state.tasks[task].detail}</p>
          </div>
      );
    }

    return (
    <div>
      <Link to='listTasks'>
        <button type="button" id='list-task' className='btn btn-primary'>&#9776;</button>
      </Link>
      <h2>New Task</h2>
      <TaskForm
        changeFxn={this.handleOnChange}
        onSubmitTask={this.handleOnSubmitTask}
        thisTask={this.state.task}
      />
      <tasksListElement />
    </div>
    );
  }
})

export default AddContainer;
