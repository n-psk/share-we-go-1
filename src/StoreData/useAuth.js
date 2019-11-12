import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useAuth = (props) => {
  const [authState, setState] = useState({
    isLoading: true,
    auth: null
  });

  useEffect(() => {
    const unsubscribe = props.db.auth().onAuthStateChanged(authState =>
      setState({ isLoading: false, auth: authState })
    );
    return unsubscribe;
  }, [props]);
  return authState;
}

useAuth.propTypes = {
  db: PropTypes.object
}

export default useAuth;