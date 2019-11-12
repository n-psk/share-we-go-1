import React, { useState, useEffect } from 'react';
import { dateTime } from '../module';

const useProfile = (firebase, user) => {
  const [userState, setState] = useState({
    profile: null
  });

  useEffect(() => {
    let path = `users/${user.uid}/profile`
    let _log = `users/${user.uid}/_log/profile`

    const unsubscribe = firebase.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())
      if (data !== null) {

        setState({ profile: data })
      } else {
        firebase.database().ref(`${path}`).update(user.providerData[0])
        firebase.database().ref(`${_log}`).push({
          date: dateTime,
          location: user.providerData[0]
        })
      }
    })
    return unsubscribe;
  }, [firebase, user]);
  return userState;
}

export default useProfile;