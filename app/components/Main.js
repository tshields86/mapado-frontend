import React from 'react';
import {Link} from 'react-router';
import kk from './keys';

const Main = React.createClass({

  componentWillMount: function(){
      navigator.geolocation.getCurrentPosition(function(position) {
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
    // const StyleAll = {
    //   boxSizing: 'border-box',
    //   textAlign: 'center',
    //   fontFamily: "helvetica",
    //   color: "#F5F5F5"
    // }
    // const StyleHeader = {
    //   position: 'fixed',
    //   margin: '0auto',
    //   textAlign: "center",
    //   fontSize: "60px",
    //   margin: "15px 50px 0px 50px",
    //   textShadow: '4px -2px 4px rgba(0, 0, 0, 1)',
    //   color: "#F5F5F5"
    // }
    // const StyleMap = {
    //   // width: '90%',
    //   height: '100%',
    //   zIndex: '-3000',
    //   position: 'fixed',
    //   border: '0',
    //   padding: '0'
    // };
    // const StyleData = {
    //   // width: '25vw',
    //   zIndex: '3000',
    //   // float: 'right',
    //   background: "rgba(1,1,1,0.75)",
    // }

    return(
      <div >
        <h1>Mapado NYC</h1>
        <div className="row">
          <div id='map' className="col-md-9" ></div>
          <div className="col-md-10" >{this.props.children}</div>
        </div>
      </div>
    )
  }
});

export default Main;
