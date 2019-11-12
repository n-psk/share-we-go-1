import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useUserId = (firebase, user) => {
  const [userIdState, setState] = useState({
    userId: null
  });

  useEffect(() => {
    let path = `users/${user.uid}`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = firebase.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ userId: data })

    })
    return unsubscribe;
  }, [firebase, user]);
  return userIdState;
}

export default useUserId;