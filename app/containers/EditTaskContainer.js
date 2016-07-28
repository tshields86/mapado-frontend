import React, { PropTypes } from 'react';
import AddTask from '../components/AddTask';
import ajaxHelpers from '../utils/ajaxHelpers';
import {Link} from 'react-router';
import ListTask from '../components/ListTask';
import EditTask from '../components/EditTask';
import HomeStyles from '../styles/HomeStyles';

const EditContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      taskMongoid: this.props.location.query.taskMongoid,
      taskName: this.props.location.query.taskName,
      date: this.props.location.query.date,
      time: this.props.location.query.time,
      location: this.props.location.query.location,
      category: this.props.location.query.category,
      detail: this.props.location.query.detail
    }
  },


  componentWillMount: function() {
    console.log('component will mount');
    ajaxHelpers.getTask(this.props.params.id)
    .then((response)=>{
      console.log('response in componentWillMount', response);
      this.setState({
        tasks: response
      });
    });
  },

  handleOnTaskName: function(e){
    this.setState({
      taskName: e.target.value,
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

    console.log('taskToUpdate', taskToUpdate);

    ajaxHelpers.updateTask(taskToUpdate)
    .then(function(response){
      console.log('Response:', response);
      // routingToList();
      })

      setTimeout(()=>{
        this.context.router.push({
          pathname: '/listTasks'});
      }, 10)

  },


  render: function () {

    const objEdit = {
        query: this.props.location.query
      }
    return (
    <div>
      <EditTask
        thisTask={this.state}
        onEditTaskName={this.handleOnTaskName}
        onEditDate={this.handleOnDate}
        onEditTime={this.handleOnTime}
        onEditLocation={this.handleOnLocation}
        onEditCategory={this.handleOnCategory}
        onEditDetail={this.handleOnDetail}
        onSubmitTask={this.handleOnSubmitTask}
        />
    </div>
    );
  }
  })

  export default EditContainer;
