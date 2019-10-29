import React, { Fragment } from 'react';

import ConnectApiMaps, { Map } from 'maps-google-react';

import { StyleBaseline } from './components/StyleBaseLine';
import { CustomMarker } from './components/CustomMarker';

import { get } from '../../../../RESTful_API'


class UserStatus extends React.Component {
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