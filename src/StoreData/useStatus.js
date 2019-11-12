import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { dateTime } from '../module';

function useStatus(props) {

  console.log(props);

  const [statusState, setState] = useState({
    status: null
  });

  useEffect(() => {
    let path = `status/${props.user.uid}`
    // let _log = `status/${user.uid}/_log`

    const unsubscribe = props.db.database().ref(`${path}`).once("value").then(function (snapshot) {
      let data = (snapshot.val())
      if (data !== null) {

        setState({ status: data })
      } else {
        let data_status = {
          process: {
            share_id: '',
            uid: `${props.user.uid}`,
            value: 'false'
          },
          share: {
            id: '',
            uid: `${props.user.uid}`,
            value: 'false'
          },
          owner: {
            share_id: '',
            uid: `${props.user.uid}`,
            value: 'false'
          },
          member: {
            share_id: '',
            uid: `${props.user.uid}`,
            value: 'false'
          },
          alert: {
            share_id: '',
            uid: `${props.user.uid}`,
            value: 'false'
          }
        }
        props.db.database().ref(`${path}`).update(data_status)
        // firebase.database().ref(`${_log}`).push({
        //   date: dateTime,
        //   location: data_status
        // })
      }
    })
    return unsubscribe;
  }, [props]);
  return statusState;
}

useStatus.propTypes = {
  db: PropTypes.object,
  user: PropTypes.object
}

export default useStatus;