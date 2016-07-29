import React from 'react';
import _ from 'lodash';
import ajaxHelpers from '../utils/ajaxHelpers';
import {Link} from 'react-router';
import ListTask from '../components/ListTask';
import AddTask from '../components/AddTask';
import { parse, stringify } from 'query-string';
import kk from '../components/keys';


const ListTaskContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },



  getInitialState: function() {
    return {
      isLoading: true,
      _id: '',
      tasks: [],
      mapTasks: []
    }
  },


  componentDidUpdate: function() {
    // console.log("this.state.tasks", this.state.tasks);
    // Window.map.featureLayer.on('ready', function(e){
    //   let marks = []
    //   this.eachLayer(function(marker) {
    //     console.log("this is a marker", marker);
    //     marks.push(marker)
    //   })
    //   console.log("somemarks", marks);
    // })
    // L.mapbox.clearLayers(L.mapbox.featureLayer)

    // looping through
    for(let task in this.state.tasks){
      ajaxHelpers.geoCode(this.state.tasks[task].location)
      .then((response)=>{
        let taskHolder = parseInt(task)+1;
        // console.log("geometry prob: ", response.data.results);
        let lat = response.data.results[0].geometry.location.lng;
        let lng = response.data.results[0].geometry.location.lat;
        let taskName = this.state.tasks[task].taskName;
        let detail = this.state.tasks[task].detail;
        this.pointOnMap(lng, lat, '#0073E5', taskName, detail, taskHolder);
      });
      }
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

  handleOnDelete(e){
    ajaxHelpers.deleteTask(e.target.id)
    .then(function(response){
    })
    setTimeout(()=>{this.context.router.push({pathname: '/deleteTask'})}, 10)
  },

  handleOnEdit(e){
      e.preventDefault();
    console.log("logging e.target.id: ", e.target.id);
    console.log("this.state.tasks ", this.state.tasks);

    const check = function (obj) {
      return obj._id === e.target.id
    }

    let obj = this.state.tasks.filter(check)

    this.context.router.push({
      pathname: '/editTask',
      query: {
        specificIndex: obj[0].id,
        taskMongoid: obj[0]._id,
        taskName: obj[0].taskName,
        date: obj[0].date,
        time: obj[0].time,
        location: obj[0].location,
        category: obj[0].category,
        detail: obj[0].detail
      }
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

  reblip: function(){
    let markers = [];

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

  return (
    <div>
      <h2>All Tasks</h2>
      <Link to='/'>
          <button type="button" id='home' className="btn btn-primary">&#x25B2;</button>
      </Link>
    <br></br>
      <Link to='addTask'>
          <button type='button' className='btn btn-primary' >&#x2b;</button>
      </Link>
      {tasksList}
    </div>
    )
  }
});

export default ListTaskContainer;
