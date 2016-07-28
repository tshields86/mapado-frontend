import React from 'react';
import {Link} from 'react-router';
import ListTask from './ListTask';
import HomeStyles from '../styles/HomeStyles';


const AddStyle = {
  border: '1px solid black'
}

function AddTask(props) {
  return (
    <div>
      <Link to='listTasks'>
        <button type="button" id='list-task' style={HomeStyles.button}>&#9776;</button>
      </Link>
      <h2>New Task</h2>
      <div style={AddStyle}>
        <form>
          <div>
            <b>Task: </b>
            <br/>
            <input
              type='text'
              onChange={props.changeFxn('taskName')}
              value={props.currentTask.taskName}
            />

            <b>Date: </b>
            <input
              type='date'
              className='date'
              onChange={props.changeFxn('date')}
              value={props.currentTask.date}
            />

            <br/><br/>

            <b>Location: </b>
            <input
              type='text'
              className='location'
              onChange={props.changeFxn('location')}
              value={props.currentTask.location}
            />

            <br/><br/><br/>

            <select
              onChange={props.changeFxn('category')}
              value={props.currentTask.category}
            >
              <option>Select</option>
              <option value="personal">Personal</option>
              <option value="school">School</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>

            <br/><br/>

            <b>Time: </b>
              <br/>
            <input
              type='time'
              onChange={props.changeFxn('time')}
              value={props.currentTask.time}
            />

              <br/><br/>

            <b>Description: </b>
              <br/>
            <textarea
              maxLength='140'
              placeholder='What is the plan..'
              onChange={props.changeFxn('detail')}
              value={props.currentTask.detail}
            />

          </div>

            <br/>

          <div>
            <button className='task-add-btn'
                    type='submit'
                    style={HomeStyles.button}
                    onClick={props.onSubmitTask}
                    >&#x2b;
            </button>
            <br/><br/>
          </div>

        </form>
        {props.tasks}
      </div>
    </div>
  )
}

export default AddTask;
