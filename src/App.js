import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {routerPublic,routerPrivate} from './router';
import Loading from './pages/loading';
import firebase from './connect/firebase';
import './App.css';

class App extends Component {
  state = {
    redirectToReferrer: true,
    auth: false,
  }
  componentDidMount() {


    // บล็อกการ zoom
    document.firstElementChild.style.zoom = "reset";

    // กำหนดเวลาโชว์การเปิดตัว
    setTimeout(() => {
      this.setState({ redirectToReferrer: false })
  }, 3000)

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

          this.setState({ auth: true })

          // if (navigator.geolocation) {
          //     navigator.geolocation.watchPosition(function (position) {
          //         var data = {
          //             displayName: user.displayName,
          //             email: user.email,
          //             isAnonymous: user.isAnonymous,
          //             metadata: user.metadata,
          //             phoneNumber: user.phoneNumber,
          //             photoURL: user.photoURL,
          //             providerData: user.providerData,
          //             ra: user.ra,
          //             refreshToken: user.refreshToken,
          //             u: user.u,
          //             uid: user.uid,
          //             _lat: user._lat,
          //             coords: {
          //                 accuracy: position.coords.accuracy,
          //                 altitude: position.coords.altitude,
          //                 altitudeAccuracy: position.coords.altitudeAccuracy,
          //                 heading: position.coords.heading,
          //                 latitude: position.coords.latitude,
          //                 longitude: position.coords.longitude,
          //                 speed: position.coords.speed
          //             }
          //         };


              // }, function () {
                  // handleLocationError(true, infoWindow, map.getCenter());
              // });
          // }
      }

  });



  }

  render() {

    const { auth, redirectToReferrer } = this.state;

    return (
      <React.Fragment>
        <Router>
        {redirectToReferrer == true
          ? (<React.Fragment><Loading/></React.Fragment>)
          : (<React.Fragment>
            {auth === false
              ? (<React.Fragment>{
                routerPublic.map((route, index) => (
                  <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.page}
                />
                ))
              }</React.Fragment>)
              : (<React.Fragment>{routerPrivate.map((route, index) => (
                <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.page}
              />
              ))}</React.Fragment>)
            }
          </React.Fragment>)
        }
        </Router>
      </React.Fragment>
    )
  }
}


export default App;