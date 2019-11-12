import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useShareAll = (firebase) => {
  const [shareAllState, setState] = useState({
    shareAll: null
  });

  useEffect(() => {
    let path = `share`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = firebase.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ shareAll: data })

    })
    return unsubscribe;
  }, [firebase]);
  return shareAllState;
}

export default useShareAll;