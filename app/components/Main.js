import React from 'react';
import {Link} from 'react-router';
import kk from './keys';

const Main = React.createClass({

  componentWillMount: function(){
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       let userLat = position.coords.latitude;
  //       let userLong = position.coords.longitude;
  //   L.mapbox.accessToken = (process.env.MPX || kk.mpx); //keys
  //   Window.map = L.mapbox.map('map', 'mapbox.wheatpaste').setView(([userLat, userLong]||[40.7527, -73.9772]), 13);
  //   L.mapbox.featureLayer({
  //   type: 'Feature',
  //   geometry: {
  //     type: 'Point',
  //     coordinates: [
  //       userLong,
  //       userLat
  //     ]
  //   },
  //   properties: {
  //     title: 'You are here',
  //     'marker-size': 'large',
  //     'marker-color': '#f86767',
  //     'marker-symbol': 'star'
  //   }
  // }).addTo(Window.map);
  // })
  },

  render: function(){

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
