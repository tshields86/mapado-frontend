import React from 'react';
import {Link} from 'react-router';

const Home = React.createClass({

  render: function(){
    return (
      <div>
        <Link to='listTasks'>
          <button type="button" className="btn btn-primary" id='list-task' >&#9776;</button>
        </Link>
      </div>
    );
  }
});

export default Home;
