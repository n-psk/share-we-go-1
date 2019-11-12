import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useHistoryId = (props) => {
  const [historyIdState, setState] = useState({
    historyId: null
  });

  useEffect(() => {
    let path = `history/${props.user.uid}`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ historyId: data })

    })
    return unsubscribe;
  }, [props]);
  return historyIdState;
}

export default useHistoryId;