import React, { Fragment } from 'react';

class Private extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...this.props}
    }

    render() {
        return(
            <Fragment>

            </Fragment>
        )
    }
}

export default Private;