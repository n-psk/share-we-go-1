import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import ConnectApiMaps, { Map } from 'maps-google-react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { StyleBaseLine } from '../../../../components/StyleBaseLine';
import { CustomMarker } from '../../../../components/CustomMarker';
import { AutocompleteDirectionsHandler } from '../../../../components/AutocompleteDirectionsHandler';

import { get } from '../../../../RESTful_API'
import ChatSlide from '../ChatSlide';
import MemberTypeIconStatus from '../MemberModalTypeIconStatus';
import KeyDataTaxiCar from '../KeyDataTaxiCar';


class MemberStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openChatSlide: false,
            openKeyDataTaxiCar: false
        }
    }

    onChatSlide() {
        this.setState({ openChatSlide: true })
    }

    offChatSlide() {
        this.setState({ openChatSlide: false })
    }

    onKeyDataTaxiCar() {
        this.setState({ openKeyDataTaxiCar: true })
    }

    offKeyDataTaxiCar() {
        this.setState({ openKeyDataTaxiCar: false })
    }

    exitShareGroup() {

    }

    render() {
        return (
            <Fragment>
                <StyleBaseLine>
                    <Map
                        google={this.props.google}
                        mapOptions={
                            {
                                zoom: 15,
                                center: { lat: latlng.lat, lng: latlng.lat },
                                disableDefaultUI: true,
                                styles: [{
                                    featureType: 'poi.business',
                                    stylers: [{ visibility: 'on' }]
                                },
                                {
                                    featureType: 'transit',
                                    elementType: 'labels.icon',
                                    stylers: [{ visibility: 'off' }]
                                }]
                            }}
                        opts={(google, map) => {
                            get.users.profile(this.props.uid).then(function (prof) {


                                get.users.location(this.props.uid).then(function (geo) {
                                    let myLatlng = new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude);

                                    let marker1 = new CustomMarker(
                                        google,
                                        myLatlng,
                                        map,
                                        {},
                                        prof.photoURL
                                    );

                                    let pos = {
                                        lat: geo.coords.latitude,
                                        lng: geo.coords.longitude
                                    };

                                    marker1.latlng = { lat: pos.lat, lng: pos.lng };
                                    marker1.draw();

                                    map.setCenter(pos);

                                })

                                get.share.location(this.props.share_id).then(function (data) {
                                    new AutocompleteDirectionsHandler(google, map, data);
                                })
                            })
                        }}
                    >
                        <MemberTypeIconStatus />

                        <Grid container style={{
                            width: 'min-content',
                            position: 'absolute',
                            right: '15px',
                            bottom: '80px',

                        }} >
                            <Fab size="medium" onClick={this.onKeyDataTaxiCar.bind(this)} aria-label="doc-taxi" className={classes.buttonTaxiDoc}>
                                <AssignmentIcon />
                            </Fab>
                            <Fab size="medium" onClick={this.onChatSlide.bind(this)} color="secondary" aria-label="add" className={classes.buttonChat}>
                                <QuestionAnswerIcon />
                            </Fab>
                            <KeyDataTaxiCar open={this.props.openKeyDataTaxiCar} onClose={this.offKeyDataTaxiCar.bind(this)} />
                        </Grid>
                        <Button variant="contained" onClick={this.exitShareGroup.bind(this)} style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                            ออกจากกลุ่ม
                        </Button>
                    </Map>
                    <ChatSlide open={this.state.openChatSlide} onClose={this.offChatSlide.bind(this)} />
                </StyleBaseLine>
            </Fragment>
        )
    }
}

const styles = {
    fab: {
        height: '45px',
        bottom: '16px',
        width: '-webkit-fill-available',
        position: 'absolute',
        marginLeft: '22px',
        marginRight: '22px',
        borderRadius: 12
    },
    buttonTaxiDoc: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffffff',
    },
    buttonChat: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffffff',
    }
}

MemberStatus.propTypes = {
    uid: PropTypes.string,
    share_id: PropTypes.string,
    uid: PropTypes.string
}

export default ConnectApiMaps({
    apiKey: "AIzaSyBy2VY1e11qs-60Ul6aYT5klWYRI1K3RB0",
    libraries: ['places', 'geometry'],
})(withStyles(styles)(MemberStatus))