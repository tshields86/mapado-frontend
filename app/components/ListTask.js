import React from 'react';
import {Link} from 'react-router';

function ListTask(props) {
  return (
    <div id={props.task._id} className="card card-block">
            <h3 className="card-title">{props.task.taskName}</h3>
            <h3>Category: {props.task.category}</h3>
            <h4 className="card-title">{props.task.date}</h4>
            <h4 className="card-title">{props.task.time}</h4>
            <h4 className="card-title">Location: {props.task.location}</h4>
            <p className="card-text">{props.task.detail}</p>
            <button id={props.task._id} type="button" onClick={props.handleOnEdit} className="btn btn-primary">&#x270D;</button>
            <button id={props.task._id} type="button" onClick={props.handleOnDelete} className="btn btn-primary">&#10005;</button>
    </div>
  );
}

export default ListTask
