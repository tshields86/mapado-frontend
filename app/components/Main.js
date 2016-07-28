import React from 'react';
import {Link} from 'react-router';
import kk from './keys';

const Main = React.createClass({

  componentWillMount: function(){
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("user latitude" + position.coords.latitude);
        console.log("user longitude" + position.coords.longitude);
        let userLat = position.coords.latitude;
        let userLong = position.coords.longitude;
    L.mapbox.accessToken = (process.env.MPX || kk.mpx); //keys
    Window.map = L.mapbox.map('map', 'mapbox.wheatpaste').setView(([userLat, userLong]||[40.7527, -73.9772]), 13);
    L.mapbox.featureLayer({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        userLong,
        userLat
      ]
    },
    properties: {
      title: 'You are here',
      'marker-size': 'large',
      'marker-color': '#f86767',
      'marker-symbol': 'star'
    }
  }).addTo(Window.map);
  })
  },

  render: function(){
    const StyleAll = {
      boxSizing: 'border-box',
      textAlign: 'center',
      fontFamily: "helvetica",
      color: "#F5F5F5"
    }
    const StyleHeader = {
      position: 'fixed',
      margin: '0auto',
      textAlign: "center",
      fontSize: "60px",
      margin: "15px 50px 0px 50px",
      textShadow: '4px -2px 4px rgba(0, 0, 0, 1)',
      color: "#F5F5F5"
    }
    const StyleMap = {
      width: '100vw',
      height: '65vw',
      zIndex: '-3000',
      position: 'fixed',
      border: '0',
      padding: '0'
    };
    const StyleData = {
      width: '25vw',
      zIndex: '3000',
      float: 'right',
      marginRight: '2vw',
      background: "rgba(1,1,1,0.75)",
    }

    return(
      <div style={StyleAll}>
        <h1 style={StyleHeader}>Mapado NYC</h1>
        <div id='map' style={StyleMap}></div>
        <div style={StyleData}>{this.props.children}</div>
      </div>
    )
  }
});

export default Main;
