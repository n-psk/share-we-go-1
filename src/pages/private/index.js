import React, { Fragment } from 'react';
// import UserStatus from './components/UserStatus';
// import MemberStatus from './components/MemberStatus';
import OwnerStatus from './components/OwnerStatus';
import { get } from '../../RESTful_API';

class Private extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: null
        }
        const me = this
        setInterval(() => {
            get.status.id(this.props.auth.uid).then(function (data) {
                me.updateStatus(data)
            })
        }, 1000)

    }

    updateStatus(data) {

        this.setState({ status: data })
    }

    render() {
        return (
            <Fragment>
                {this.state.status !== null
                    ? (<Fragment>
                        {this.state.status.owner.value !== "false"
                            ? <OwnerStatus {...this.state} />
                            : (<Fragment>
                                {/* {this.state.status.member.value !== "false"
                                    ? <MemberStatus />
                                    : <UserStatus />
                                } */}
                            </Fragment>)
                        }
                    </Fragment>)
                    : (<Fragment></Fragment>)
                }
            </Fragment>
        )
    }
}

export default Private;