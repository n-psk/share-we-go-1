import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useAuth = (props) => {
  const [authState, setState] = useState({
    isLoading: true,
    auth: null
  });

  useEffect(() => {
    const unsubscribe = props.db.auth().onAuthStateChanged(auth =>
      setState({ isLoading: false, auth: auth })
    );
    return unsubscribe;
  }, [props]);
  return authState;
}


export default useAuth;