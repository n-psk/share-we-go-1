import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles';

import Backdrop from '@material-ui/core/Backdrop';

class KeyDataTaxiCar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.props.open}>
                        <div className={classes.paper}>
                            <Grid container justify="center" alignItems="center" >
                                <center>
                                    <h1>ทะเบียนรถ</h1>
                                    <h2>------</h2>
                                    <h1>สีรถ</h1>
                                    <h2>------</h2>
                                </center>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
            </React.Fragment>
        )
    }
}

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #ffc800',
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
    },
}

KeyDataTaxiCar.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
}

export default withStyles(styles)(KeyDataTaxiCar)