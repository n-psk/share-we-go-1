import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { dateTime } from '../module';

const useLocation = (props) => {
  const [locationState, setState] = useState({
    location: null
  });

  useEffect(() => {
    const unsubscribe = props.db.auth().onAuthStateChanged(authState => {
      let path = `users/${authState.uid}/location`
      let _log = `users/${authState.uid}/_log/location`

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          let data_location = {
            coords: {
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude,
              altitudeAccuracy: position.coords.altitudeAccuracy,
              heading: position.coords.heading,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
            },
            timestamp: position.timestamp
          }

          props.db.database().ref(`${path}`).update(data_location)
          props.db.database().ref(`${_log}`).push({
            date: dateTime,
            location: data_location
          })

        })
      }

      props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
        setState({ location: (snapshot.val()) })
      })
    })
    return unsubscribe;
  }, [props]);
  return locationState;
}

useLocation.propTypes = {
  db: PropTypes.object
}

export default useLocation;