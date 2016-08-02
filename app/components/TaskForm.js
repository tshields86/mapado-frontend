import React from 'react';
import {Link} from 'react-router';

function TaskForm(props) {
  return (
      <form className="bootstrap-iso form">
          <div className="form-group">
            <label htmlFor="">Task</label>
            <input
              className="form-control"
              type='text'
              onChange={props.changeFxn('taskName')}
              value={props.thisTask.taskName}
              placeholder="Enter Task"
              id="form-taskname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="form-date">Date</label>
            <input
              className="form-control"
              placeholder="MM/DD/YYY"
              type="date"
              onChange={props.changeFxn('date')}
              value={props.thisTask.date}
              id="form-date"
              name="date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="form-location">Location</label>
            <input
              className="form-control"
              type='text'
              onChange={props.changeFxn('location')}
              value={props.thisTask.location}
              id="form-location"
            />
          </div>

          <select
            onChange={props.changeFxn('category')}
            value={props.thisTask.category}
            className="custom-select"
          >
            <option>Choose Category</option>
            <option value="personal">Personal</option>
            <option value="school">School</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>

          <div className="form-group">
            <label htmlFor="form-time">Time</label>
            <input
              className="form-control"
              type='time'
              onChange={props.changeFxn('time')}
              value={props.thisTask.time}
              id="form-time"
            />
          </div>

          <div className="form-group">
            <label htmlFor="form-description">Description</label>
            <textarea
              className="form-control"
              maxLength='140'
              placeholder='What is the plan..'
              onChange={props.changeFxn('detail')}
              value={props.thisTask.detail}
              id="form-description"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={props.onSubmitTask}
          >&#x2b;
          </button>
      </form>
  )
}

export default TaskForm;
