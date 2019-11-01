import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import ConnectApiMaps, { Map } from 'maps-google-react';
import $ from 'jquery';

import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import { StyleBaseLine } from '../../../../components/StyleBaseLine';
// import { CustomMarker } from '../../../../components/CustomMarker';

import { get, post } from '../../../../RESTful_API'
import { VisibilityButton } from '../../../../components/VisibilityButton';
import OpenCreateShare from '../OpenCreateShare';
import { dateTime } from '../../../../module'



class UserStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            share: null,
            map: null,
            openVisibility: false,
            openCreateShare: false,
            openMenuSlide: false
        }
    }

    updateDataShareClient(key) {
        const me = this

        get.share.id(key).then(function (data) {
            me.setState({ share: data })
        })

        // get.share.location(key).then(function (location) {
        //     me.setState({ share: { [key]: { location_share: location } } })
        // })

        // get.share.date(key).then(function (date) {
        //     me.setState({ share: { [key]: { date_share: date } } })
        // })

        // get.share.max_number(key).then(function (max_number) {
        //     me.setState({ share: { [key]: { max_number_share: max_number } } })
        // })

        // get.share.sex(key).then(function (sex) {
        //     me.setState({ share: { [key]: { sex_share: sex } } })
        // })

        // get.share.member(key).then(function (member) {
        //     me.setState({ share: { [key]: { member_share: member } } })
        // })

    }

    joinLocation(key, uid, data) {
        post.share.member(key, {
            [uid]: {
                id: `${uid}`,
                profile: data
            }
        },
            dateTime
        )

        post.status.share(
            uid,
            {
                id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );

        post.status.owner(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );

        post.status.member(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "true"
            },
            dateTime
        );

        post.status.alert(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );

        post.status.process(
            uid,
            {
                share_id: `${key}`,
                uid: `${uid}`,
                value: "false"
            },
            dateTime
        );
    }

    // MapSearch(props, map, handleDrawerOpen) {
    //     return (
    //         <SearchBar >
    //             <SearchMap onClick={handleDrawerOpen} map={map} {...props} />
    //         </SearchBar>
    //     )
    // }

    onVisibility() {
        this.setState({ openVisibility: true })
    }

    offVisibility() {
        this.setState({ openVisibility: false })
    }

    onCreateShare() {
        this.setState({ openCreateShare: true })
    }

    offCreateShare() {
        this.setState({ openCreateShare: false })
    }

    onMenuSlide() {
        this.setState({ openMenuSlide: true })
    }

    offMenuSlide() {
        this.setState({ openMenuSlide: false })
    }

    render() {

        const latlng = {
            lat: 14.012107100000001,
            lng: 100.7210703
        }

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

                            this.MapSearch(this.props, map, this.onMenuSlide.bind(this))
                            get.users.profile(this.props.uid).then(function (prof) {

                                function CustomMarker(google, latlng, map, args, img) {
                                    this.latlng = latlng;
                                    this.args = args;
                                    this.img = img;
                                    this.maps = map
                                    this.google = google
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

                                // share 
                                get.share.all().then(function (data) {
                                    Object.keys(data).map((key) => {
                                        // console.log(key); // all key

                                        get.status.share(key).then(function (status) {
                                            if (status.value === "true") {
                                                // console.log(status.value);
                                                get.share.location(key).then((data) => {

                                                    // new AutocompleteDirectionsHandler(google, map, data);

                                                    let myLatlng = new google.maps.LatLng(data.routes[0].legs[0].start_location.lat, data.routes[0].legs[0].start_location.lng);

                                                    let marker1 = new CustomMarker(
                                                        myLatlng,
                                                        map,
                                                        {},
                                                        "https://img.icons8.com/ios-glyphs/30/000000/car-cleaning.png"
                                                    );

                                                    let pos = {
                                                        lat: data.routes[0].legs[0].start_location.lat,
                                                        lng: data.routes[0].legs[0].start_location.lng
                                                    };

                                                    marker1.latlng = { lat: pos.lat, lng: pos.lng };
                                                    marker1.draw();

                                                    map.setCenter(pos);

                                                    if (this.status.share !== null) {

                                                        var contentString = `
                                                        <center>
                                                        <h2>ข้อมูลการแชร์</h2>
                                                        </center>
                                                        <hr></hr>
                                                        <u style="font-size: 15px">ต้นทาง:</u></<u><b> ${ this.state.share[key].location.routes[0].legs[0].start_address} </b>
                                                        <br></br>
                                                        <u style="font-size: 15px">ปลายทาง:</u></<u><b> ${ this.state.share[key].location.routes[0].legs[0].end_address} </b>
                                                        <br></br>
                                                        <u style="font-size: 15px">เริ่มแชร์เมื่อ:</u></<u><b> ${ this.state.share[key].date.start_time.value} </b>
                                                        <br></br>
                                                        <u style="font-size: 15px">ปิดแชร์เวลา:</u></<u><b> ${ this.state.share[key].date.end_time.value} </b>
                                                        <br></br>
                                                        <u style="font-size: 15px">ต้องการผู้เดินทางเพิ่ม:</u></<u><b> ${ Object.keys(this.state.share[key].member).length} / ${this.state.share[key].max_number.value} คน </b>
                                                        <br></br>
                                                        <u style="font-size: 15px">เดินทางกับเพศ:</u></<u><b> ${ this.state.share[key].sex.value} </b>
                                                        <hr></hr>
                                                        <center><button style="background-color: #ffffff;
                                                        font-size: 17px;
                                                        width: -webkit-fill-available;
                                                        border-radius: 12px;
                                                        color: rgba(0, 0, 0, 0.87);
                                                        box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
                                                        }" id="join-share-${key}" >เข้าร่วม</button></center>`

                                                        var infowindow = new google.maps.InfoWindow({
                                                            content: "",
                                                            maxWidth: 500
                                                        });


                                                        marker1.addListener('click', function () {
                                                            infowindow.setContent(contentString)
                                                            infowindow.open(map, marker1);

                                                            if (Object.keys(this.state.share[key].member).length >= this.state.share[key].max_number.value) {
                                                                $(`#join-share-${key}`).attr("disabled", true)
                                                            }
                                                        });

                                                        $(document).on('click', `#join-share-${key}`, function () {
                                                            get.users.profile(user.uid).then((profile) => {

                                                                this.joinLocation(key, user.uid, profile)
                                                            })
                                                        })
                                                    } else {
                                                        this.updateDataShareClient(key)
                                                    }
                                                })
                                            }
                                        })
                                    })
                                })
                            })
                        }}
                    >
                        {/* <MapSearch /> */}
                        <VisibilityButton open={this.state.openVisibility} on={this.onVisibility.bind(this)} off={this.offVisibility.bind(this)} />
                        <Button onClick={this.onCreateShare.bind(this)} variant="contained" style={{ backgroundColor: '#ffffff' }} className={this.props.classes.fab}>
                            <AddIcon color="action" fontSize="large" />
                        </Button>
                    </Map>
                    <OpenCreateShare open={this.state.openCreateShare} onClose={this.offCreateShare.bind(this)} />
                    <MenuSlide open={this.state.openMenuSlide} onClose={this.offMenuSlide.bind(this)} uid={uid} />
                </StyleBaseLine>
            </Fragment>
        )
    }
}

UserStatus.propTypes = {
    uid: PropTypes.string
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
    }
}

export default ConnectApiMaps({
    apiKey: "AIzaSyBy2VY1e11qs-60Ul6aYT5klWYRI1K3RB0",
    libraries: ['places', 'geometry'],
})(withStyles(styles)(UserStatus))