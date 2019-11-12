import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useShareAll = (props) => {
  const [shareAllState, setState] = useState({
    shareAll: null
  });

  useEffect(() => {
    let path = `share`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ shareAll: data })

    })
    return unsubscribe;
  }, [props]);
  return shareAllState;
}

export default useShareAll;