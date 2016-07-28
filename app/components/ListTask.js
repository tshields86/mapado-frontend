import React from 'react';
import {Link} from 'react-router';

function ListTask(props) {
  return (
    <div>
        {props.tasks}
    </div>
  );
}

export default ListTask
