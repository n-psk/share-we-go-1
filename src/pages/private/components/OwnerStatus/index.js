import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import ConnectApiMaps, { Map } from 'maps-google-react';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';


import { StyleBaseLine } from '../../../../components/StyleBaseLine';
// import { CustomMarker } from '../../../../components/CustomMarker';
import { AutocompleteDirectionsHandler } from '../../../../components/AutocompleteDirectionsHandler';

import { get } from '../../../../RESTful_API'
import ChatSlide from '../ChatSlide';
import MemberTypeIconStatus from '../MemberModalTypeIconStatus';
import CallTaxiModal from '../CallTaxiModal';


class OwnerStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openChatSlide: false,
            openCallTaxi: false,
            share:null
        }

        setInterval(()=> {},)
    }

    onChatSlide() {
        this.setState({ openChatSlide: true })
    }

    offChatSlide() {
        this.setState({ openChatSlide: false })
    }

    onCallTaxi() {
        this.setState({ openCallTaxi: true })
    }

    offCallTaxi() {
        this.setState({ openCallTaxi: false })
    }

    exitShareGroup() {

    }

    render() {

        const latlng = {
            lat: 14.012107100000001,
            lng: 100.7210703
        }

        const { classes } = this.props;

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
                            get.users.profile(this.props.status.owner.uid).then(function (prof) {

                                function CustomMarker( latlng, map, args, img) {
                                    this.latlng = latlng;
                                    this.args = args;
                                    this.img = img;
                                    this.maps = map
                                    // this.google = google
                                    // setGoogle(google)
                                }
                                
                                CustomMarker.prototype = new google.maps.OverlayView();
                                
                                CustomMarker.prototype.onAdd = function () {
                                    var self = this;
                                    var div = this.div;
                                    if (!div) {
                                        // Generate marker html
                                        div = this.div = document.createElement('div');
                                        div.className = 'custom-marker';
                                        div.style.position = 'absolute';
                                        var innerDiv = document.createElement('div');
                                        innerDiv.className = 'custom-marker-inner';
                                        innerDiv.innerHTML = `<img  src="${this.img}" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;"/>`
                                        div.appendChild(innerDiv);
                                
                                        if (typeof (self.args.marker_id) !== 'undefined') {
                                            div.dataset.marker_id = self.args.marker_id;
                                        }
                                
                                        google.maps.event.addDomListener(div, "click", function (event) {
                                            google.maps.event.trigger(self, "click");
                                        });
                                
                                        var panes = this.getPanes();
                                        panes.overlayImage.appendChild(div);
                                    }
                                };
                                
                                CustomMarker.prototype.draw = function () {
                                    // มี bug icon ไม่เกาะ map
                                    if (this.div) {
                                        // กำหนด ตำแหน่ง ของhtml ที่สร้างไว้
                                        let positionA = new this.google.maps.LatLng(this.latlng.lat, this.latlng.lng);
                                
                                        this.pos = this.getProjection().fromLatLngToDivPixel(positionA);
                                        // console.log(this.pos);
                                        this.div.style.left = this.pos.x + 'px';
                                        this.div.style.top = this.pos.y + 'px';
                                    }
                                };
                                
                                CustomMarker.prototype.getPosition = function () {
                                    return this.latlng;
                                };


                                get.users.location(this.props.status.owner.uid).then(function (geo) {
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

                                get.share.location(this.props.status.share_id).then(function (data) {
                                    new AutocompleteDirectionsHandler(google, map, data);
                                })
                            })
                        }}
                    >
                        <MemberTypeIconStatus uid={this.props.status.uid} />

                        <Grid container style={{
                            width: 'min-content',
                            position: 'absolute',
                            right: '15px',
                            bottom: '80px',

                        }} >
                            <Fab size="medium" onClick={this.onCallTaxi.bind(this)} aria-label="add" className={classes.buttonTaxi}>
                                <LocalTaxiIcon />
                            </Fab>
                            <Fab size="medium" onClick={this.onChatSlide.bind(this)} color="secondary" aria-label="add" className={classes.buttonChat}>
                                <QuestionAnswerIcon />
                            </Fab>
                            <CallTaxiModal
                                uid={this.props.status.uid}
                                open={this.state.oprnCallTaxi}
                                onClose={this.offCallTaxi.bind(this)} />
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
    buttonTaxi: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffd91b',
    },
    buttonChat: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffffff',
    }
}

OwnerStatus.propTypes = {
   status: PropTypes.object
}

export default ConnectApiMaps({
    apiKey: "AIzaSyBy2VY1e11qs-60Ul6aYT5klWYRI1K3RB0",
    libraries: ['places', 'geometry'],
})(withStyles(styles)(OwnerStatus))