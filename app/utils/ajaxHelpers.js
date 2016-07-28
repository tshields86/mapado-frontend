import axios from 'axios';
import kk from '../components/keys.js';

const helpers = {
  getTasks: function(){
    // fetch some data from using a promise
    return axios.get('https://mapado-nyc-backend.herokuapp.com/api/tasks');
  },
  getTask: function(task){
    return axios.get('https://mapado-nyc-backend.herokuapp.com/api/task/'+ task);
  },
  addTask: function(task){
    return axios.post('https://mapado-nyc-backend.herokuapp.com/api/task', task);
  },
  deleteTask: function(task){
    return axios.delete('https://mapado-nyc-backend.herokuapp.com/api/task/'+ task);
  },
  updateTask: function(task){
    return axios.put('https://mapado-nyc-backend.herokuapp.com/api/task/', task);
  },
  geoCode: function(address){
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address +',+New+York,+NY&key=' + (process.env.GOOG || kk.goog));
  }
}

export default helpers;
