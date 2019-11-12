import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useShareId = (props, user) => {
  const [shareIdState, setState] = useState({
    shareId: null
  });

  useEffect(() => {
    let path = `share/${user.uid}`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ shareId: data })

    })
    return unsubscribe;
  }, [props, user]);
  return shareIdState;
}

export default useShareId;