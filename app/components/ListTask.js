import React from 'react';
import {Link} from 'react-router';


// ES6 syntactic sugar: get rid of props. { xx, yy, zz }
function ListTask({task, handleOnEdit, handleOnDelete}) {
  return (
    <div className="card card-block">
      <h3 className="card-title">{task.taskName}</h3>
      <h5 className="card-title">Category: {task.category}</h5>
      <h5 className="card-title">{task.date}</h5>
      <h5 className="card-title">{task.time}</h5>
      <h5 className="card-title">Location: {task.location}</h5>
      <p className="card-text">{task.detail}</p>
      <button type="button" onClick={() => handleOnEdit(task)} className="btn btn-primary">&#x270D;</button>
      <button type="button" onClick={() => handleOnDelete(task)} className="btn btn-primary">&#10005;</button>
    </div>
  );
}

export default ListTask
