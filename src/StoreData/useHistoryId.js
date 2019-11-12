import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useHistoryId = (firebase, user) => {
  const [historyIdState, setState] = useState({
    historyId: null
  });

  useEffect(() => {
    let path = `history/${user.uid}`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = firebase.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ historyId: data })

    })
    return unsubscribe;
  }, [firebase, user]);
  return historyIdState;
}

export default useHistoryId;