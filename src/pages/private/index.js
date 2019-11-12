import React, { Fragment,useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import UserStatus from './components/UserStatus';
// import MemberStatus from './components/MemberStatus';
// import OwnerStatus from './components/OwnerStatus';
// import firebase from '../../connect/firebase';
// import { get } from '../../RESTful_API';
// import  useStatus  from '../../StoreData/useStatus';

const Private = (props) => {
    const [state] = useState(...props)
    // const a = JSON.stringify(props)
    // console.log(JSON.parse(a));
    
    // const { status } = useStatus(props)

    return (
        <Fragment>
            <div>ss</div>
            {/* {status !== null
                ? (<Fragment>
                    {status.owner.value !== "false"
                        ? <OwnerStatus uid={props.auth.uid} status={status} />
                        : (<Fragment>
                            {status.member.value !== "false"
                                ? <MemberStatus uid={props.auth.uid} status={status} />
                                : <UserStatus uid={props.auth.uid} status={status} />
                            }
                        </Fragment>)
                    }
                </Fragment>)
                : (<Fragment></Fragment>)
            } */}
        </Fragment>
    )
}

Private.propType = {
    auth: PropTypes.object,
    db: PropTypes.object,
    location: PropTypes.object,
    user: PropTypes.object
}

export default withRouter(Private);