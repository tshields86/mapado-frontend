import React from 'react';
import {Link} from 'react-router';
import HomeStyles from '../styles/HomeStyles';

const Home = React.createClass({

  render: function(){
    return (
      <div>
        <Link to='listTasks'>
          <button type="button" id='list-task' style={HomeStyles.button}>&#9776;</button>
        </Link>
      </div>
    );
  }
});

export default Home;
