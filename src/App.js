import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routerPublic, routerPrivate } from './router';
import Loading from './pages/loading';
import PropTypes from 'prop-types';
// import firebase from './connect/firebase';
// import Private from './pages/private';
// import Login from './pages/login'
// import { post, get } from './RESTful_API';
// import { dateTime } from './module';
import './App.css';
import { useAuth, useLocation, useUser } from './StoreData';


const App = (props) => {
  const { isLoading, auth } = useAuth(props);
  const { user } = useUser(props);
  const { location } = useLocation(props)

  // บล็อกการ zoom
  document.firstElementChild.style.zoom = "reset";


  return (
    <React.Fragment>
      <Router>
        {isLoading == true
          ? (<React.Fragment><Loading /></React.Fragment>)
          : (<React.Fragment>
            {auth === null
              ? (<React.Fragment>{
                routerPublic.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.page}
                    db={props.db}
                  />
                ))
              }</React.Fragment>)
              : (<React.Fragment>{routerPrivate.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.page}
                  user={user}
                  location={location}
                  auth={auth}
                  db={props.db}
                />
              ))}</React.Fragment>)
            }
          </React.Fragment>)
        }
      </Router>
    </React.Fragment>
  )
}

App.propType = {
  db: PropTypes.object
}


export default App;