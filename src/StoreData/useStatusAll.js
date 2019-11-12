import React, { useState, useEffect } from 'react';
// import { dateTime } from '../module';

const useStatusAll = (props) => {
  const [statusAllState, setState] = useState({
    statusAll: null
  });

  useEffect(() => {
    let path = `status`
    // let _log = `users/${user.uid}/_log/`

    const unsubscribe = props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())

      setState({ statusAll: data })

    })
    return unsubscribe;
  }, [props]);
  return statusAllState;
}

export default useStatusAll;