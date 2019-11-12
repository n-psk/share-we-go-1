import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useUserId = (props) => {
  const [userIdState, setState] = useState({
    userId: null
  });

  useEffect(() => {
    let path = `users/${props.user.uid}`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ userId: data })

    })
    return unsubscribe;
  }, [props]);
  return userIdState;
}


export default useUserId;