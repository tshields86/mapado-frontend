import React from 'react';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
//routing
import Main from '../components/Main';
import Home from '../components/Home';
import AddContainer from '../containers/AddContainer';
import ListTaskContainer from '../containers/ListTaskContainer';
import EditTaskContainer from '../containers/EditTaskContainer';
import DeleteTemp from '../containers/DeleteTemp';

//jsx router. tell our data cop where to send our data
//      <Route path='editTask' component={EditTaskContainer}/>
        // <Route path='/editTask/:id' component={EditTaskContainer}></Route>
const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='addTask' component={AddContainer}/>
      <Route path='listTasks' component={ListTaskContainer}/>
      <Route path='editTask' component={EditTaskContainer}/>
      <Route path='deleteTask' component={DeleteTemp}/>
    </Route>
  </Router>
);

export default routes;
