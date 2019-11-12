import React, { useState, useEffect } from 'react';
import { dateTime } from '../module';

const useProfile = (props, user) => {
  const [userState, setState] = useState({
    profile: null
  });

  useEffect(() => {
    let path = `users/${user.uid}/profile`
    let _log = `users/${user.uid}/_log/profile`

    const unsubscribe = props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())
      if (data !== null) {

        setState({ profile: data })
      } else {
        props.db.database().ref(`${path}`).update(user.providerData[0])
        props.db.database().ref(`${_log}`).push({
          date: dateTime,
          location: user.providerData[0]
        })
      }
    })
    return unsubscribe;
  }, [props, user]);
  return userState;
}

export default useProfile;