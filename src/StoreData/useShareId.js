import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useShareId = (firebase, user) => {
  const [shareIdState, setState] = useState({
    shareId: null
  });

  useEffect(() => {
    let path = `share/${user.uid}`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = firebase.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ shareId: data })

    })
    return unsubscribe;
  }, [firebase, user]);
  return shareIdState;
}

export default useShareId;