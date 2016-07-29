import React from 'react';
import {Link} from 'react-router';

function ListTask(props) {
  return (
    <div id={props.task._id} className="card card-block">
      <h3 className="card-title">{props.task.taskName}</h3>
      <h5 className="card-title">Category: {props.task.category}</h5>
      <h5 className="card-title">{props.task.date}</h5>
      <h5 className="card-title">{props.task.time}</h5>
      <h5 className="card-title">Location: {props.task.location}</h5>
      <p className="card-text">{props.task.detail}</p>
      <button id={props.task._id} type="button" onClick={props.handleOnEdit} className="btn btn-primary">&#x270D;</button>
      <button id={props.task._id} type="button" onClick={props.handleOnDelete} className="btn btn-primary">&#10005;</button>
    </div>
  );
}

export default ListTask
