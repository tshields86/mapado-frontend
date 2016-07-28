import React, { PropTypes } from 'react';
import {Link} from 'react-router';

  const DeleteTemp = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function(){
    setTimeout(()=>{
      console.log("DeleteTemp setTimeout triggered");
      this.context.router.push({
        pathname: '/listTasks'});
    }, 10)
    return (
      <div>
      </div>
    )
  }
})

export default DeleteTemp;
