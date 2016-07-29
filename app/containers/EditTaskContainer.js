import React, { PropTypes } from 'react';
import AddTask from '../components/AddTask';
import ajaxHelpers from '../utils/ajaxHelpers';
import {Link} from 'react-router';
import ListTask from '../components/ListTask';
import HomeStyles from '../styles/HomeStyles';

const EditContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      task:{
        taskMongoid: this.props.location.query.taskMongoid,
        taskName: this.props.location.query.taskName,
        date: this.props.location.query.date,
        time: this.props.location.query.time,
        location: this.props.location.query.location,
        category: this.props.location.query.category,
        detail: this.props.location.query.detail
      }
    }
  },


  componentWillMount: function() {
    ajaxHelpers.getTask(this.props.params.id)
    .then((response)=>{
      this.setState({
        tasks: response
      });
    });
  },

  handleOnChange: function(propertyName){
    return function (e){
      var task ={};
      task[propertyName] = e.target.value;
      this.setState({
        task: task
      })
    }.bind(this)
  },

  componentDidMount: function() {
    ajaxHelpers.updateTask()
    //TODO show my tasks
    .then(function(response){
      this.setState({
        tasks: response.data.tasks
      });
    }.bind(this));
  },

  handleOnSubmitTask: function(e){
    e.preventDefault();

    const taskToUpdate = {
        identifier: {
          taskMongoid: this.state.taskMongoid
        },
        objToChange: {
          taskName: this.state.taskName,
          date: this.state.date,
          time: this.state.time,
          location: this.state.location,
          category: this.state.category,
          detail: this.state.detail
        }
    };

    ajaxHelpers.updateTask(taskToUpdate)
    .then(function(response){
      console.log('Response:', response);
      })
    .then(() => {
      this.context.router.push({pathname: '/listTasks'});
    })

  },


  render: function () {

    const objEdit = {
        query: this.props.location.query
      }
    return (
    <div>
      <h2>Edit Task</h2>
      <AddTask
        changeFxn={this.handleOnChange}
        onSubmitTask={this.handleOnSubmitTask}
        thisTask={this.state.task}
        />
    </div>
    );
  }
  })

  export default EditContainer;
