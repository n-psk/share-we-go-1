import React from 'react';
import { withStyles } from '@material-ui/styles';

class MemberTypeIconStatus extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid container style={{
                    width: 'min-content',
                    position: 'absolute',
                    top: '100px',

                }} >
                    <Avatar
                        alt="Remy Sharp"
                        src={shareData !== null ? shareData.owner.profile.photoURL : null}
                        className={this.props.classes.mediumAvatar}
                        style={{
                            border: '4px solid #fff',
                            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                        }}
                    />
                    {shareData !== null
                        ? (<React.Fragment>
                            {shareData.member !== null
                                ? (<React.Fragment>
                                    {Object.keys(shareData.member).map((key) => (
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={shareData.member[key].profile.photoURL}
                                            className={this.props.classes.mediumAvatar}
                                            style={{
                                                border: '4px solid #fff',
                                                boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                            }}
                                        />
                                    ))}

                                </React.Fragment>)
                                : (<React.Fragment></React.Fragment>)}
                        </React.Fragment>)
                        : (<React.Fragment></React.Fragment>)}
                </Grid>
            </React.Fragment>
        )
    }
}

const styles = {
    mediumAvatar: {
        margin: '5px 10px',
        width: 45,
        height: 45,
    }
}

export default withStyles(styles)(MemberTypeIconStatus)