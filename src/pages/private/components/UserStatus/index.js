import React, { Fragment } from 'react';

import ConnectApiMaps, { Map } from 'maps-google-react';

import { StyleBaseline } from './components/StyleBaseLine';
import { CustomMarker } from './components/CustomMarker';

import { get } from '../../../../RESTful_API'


class UserStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            share: null
        }
    }

    updateData(key) {
        const me = this

        get.share.location(key).then(function (location) {
            me.setState({ share: { [key]: { location_share: location } } })
        })

        get.share.date(key).then(function (date) {
            me.setState({ share: { [key]: { date_share: date } } })
        })

        get.share.max_number(key).then(function (max_number) {
            me.setState({ share: { [key]: { max_number_share: max_number } } })
        })

        get.share.sex(key).then(function (sex) {
            me.setState({ share: { [key]: { sex_share: sex } } })
        })

        get.share.member(key).then(function (member) {
            me.setState({ share: { [key]: { member_share: member } } })
        })

    }
    render() {
        return (
            <Fragment>
                <StyleBaseline>
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

                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    })
                                })
                            })
                        }}
                    ></Map>
                </StyleBaseline>
            </Fragment>
        )
    }
}