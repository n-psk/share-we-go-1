import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { routerPublic, routerPrivate } from './router';
import Loading from './pages/loading';
import PropTypes from 'prop-types';
import Login from './pages/login';
import Private from './pages/private';
import Profile from './pages/profile';
import DocTaxi from './pages/doc_taxi';
import ShareLocation from './pages/share_location';
import History from './pages/history';
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
              ? (<React.Fragment>
                <Route path="/" exact>
                  <Login db={props.db} />
                </Route>

                <Route path="/login" >
                  <Login db={props.db} />
                </Route>
              </React.Fragment>)
              : (<React.Fragment>
                <Route
                  path='/'
                  exact>
                  <Private
                    user={user}
                    location={location}
                    auth={auth}
                    db={props.db} />
                </Route>
                <Route
                  path='private'>
                  <Private
                    user={user}
                    location={location}
                    auth={auth}
                    db={props.db} />
                </Route>
                <Route
                  path='/profile:id'>
                  <Profile
                    user={user}
                    location={location}
                    auth={auth}
                    db={props.db} />
                </Route>
                <Route
                  path='/share_location'>
                  <ShareLocation
                    user={user}
                    location={location}
                    auth={auth}
                    db={props.db} />
                </Route>
                <Route
                  path='/history'>
                  <History
                    user={user}
                    location={location}
                    auth={auth}
                    db={props.db} />
                </Route>

                <Route
                  path='/doc_taxi'>
                  <DocTaxi
                    user={user}
                    location={location}
                    auth={auth}
                    db={props.db} />
                </Route>
              </React.Fragment>)
            }
          </React.Fragment>)
        }
      </Router>
    </React.Fragment >
  )
}

App.propType = {
  db: PropTypes.object
}


export default App;