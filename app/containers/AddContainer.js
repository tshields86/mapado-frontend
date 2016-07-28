import React, { PropTypes } from 'react';
import AddTask from '../components/AddTask';
import ajaxHelpers from '../utils/ajaxHelpers';
import {Link} from 'react-router';
import ListTask from '../components/ListTask';

const AddContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      taskName: null,
      date: null,
      time: null,
      location: null,
      category: null,
      detail: null
    }
  },

  handleOnTaskName: function(e){
    this.setState({
      taskName: e.target.value
    })
  },
  handleOnDate: function(e){
    this.setState({
      date: e.target.value
    })
  },
  handleOnTime: function(e){
    this.setState({
      time: e.target.value
    })
  },
  handleOnLocation: function(e){
    this.setState({
      location: e.target.value
    })
  },
  handleOnCategory: function(e){
    this.setState({
      category: e.target.value
    })
  },
  handleOnDetail: function(e){
    this.setState({
      detail: e.target.value
    })
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

    const task = {
      taskName: this.state.taskName,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      category: this.state.category,
      detail: this.state.detail
    };

    if (task.taskName !== null){
    ajaxHelpers.addTask(task)
    .then(function(response){
      console.log('Response:', response);
      // routingToList();
      })
    };
    setTimeout(()=>{
      this.context.router.push({pathname: '/listTasks'});
    }, 10)

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
      <AddTask
        onAddTaskName={this.handleOnTaskName}
        onAddDate={this.handleOnDate}
        onAddTime={this.handleOnTime}
        onAddLocation={this.handleOnLocation}
        onAddCategory={this.handleOnCategory}
        onAddDetail={this.handleOnDetail}
        onSubmitTask={this.handleOnSubmitTask}
        tasks={tasksListElement}
        />

    </div>
    );
  }
})

export default AddContainer;
