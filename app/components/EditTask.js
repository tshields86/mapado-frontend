import React from 'react';
import {Link} from 'react-router';
import HomeStyles from '../styles/HomeStyles';

const AddStyle = {
  border: '1px solid black'
}

function EditTask(props) {
  return (
    <div>
      <h2>Edit Task</h2>
      <div style={AddStyle}>
        <form onSubmit={props.onSubmitTask}>
          <div>
            <b>Task: </b>
            <input  type='text'
                    name='mytask'
                    onChange={props.onEditTaskName}
                    value={props.thisTask.taskName} />
                  <br/><br/>
            <b>Date: </b>
            <input  type='date'
                    name='date'
                    className='date'
                    onChange={props.onEditDate}
                    value={props.thisTask.date} />
                  <br/><br/>
            <b>Location: </b>
            <input  type='text'
                    name=''
                    className='location'
                    onChange={props.onEditLocation}
                    value={props.thisTask.location} />
            <br/><br/>
            <select name="taskCategory"
                    onChange={props.onEditCategory}
                    value={props.thisTask.category} >
              <option value="personal">Personal</option>
              <option value="school">School</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
            <br/><br/>
            <b>Time: </b>
            <input  type='time'
                    onChange={props.onEditTime}
                    value={props.thisTask.time} />
            <br/><br/>
            <b>Description: </b>
            <br/><br/>
            <textarea name='task-description'
                      maxLength='140'
                      placeholder='Beers and babes...'
                      onChange={props.onEditDetail}
                      value={props.thisTask.detail} />
          </div>
          <br/>
          <div>
            <button className='task-update-btn'
              type='submit'
              style={HomeStyles.button}
              id={props.thisTask.taskMongoid}
              >&#x21ea;
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTask;
