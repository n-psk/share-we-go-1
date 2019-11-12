import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { dateTime } from '../module';

const useUser = (props) => {
  const [userState, setState] = useState({
    user: null
  });

  useEffect(() => {
    const unsubscribe = props.db.auth().onAuthStateChanged(authState => {

      let path = `users/${authState.uid}/user`
      let _log = `users/${authState.uid}/_log/user`

      let new_data = JSON.stringify(authState)
      let new_data_log = JSON.stringify(
        {
          date: dateTime,
          user: authState
        }
      )

      props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
        let data = (snapshot.val())
        if (data !== null) {

          setState({ user: data })
        }
        else {
          props.db.database().ref(`${path}`).update(JSON.parse(new_data))
          props.db.database().ref(`${_log}`).push(new_data_log)
          setState({ user: data })
        }
      })
    })
    return unsubscribe;
  }, [props]);
  return userState;
}

useUser.propTypes = {
  db: PropTypes.object
}

export default useUser;