import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useStatusAll = (firebase) => {
  const [statusAllState, setState] = useState({
    statusAll: null
  });

  useEffect(() => {
    let path = `status`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = firebase.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ statusAll: data })

    })
    return unsubscribe;
  }, [firebase]);
  return statusAllState;
}

export default useStatusAll;