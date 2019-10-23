import React from 'react';
import os from 'os';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const post = {
    users: {
        user: function (id, data, date) {

            fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/user`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/_log/user`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: data,
                    date: date
                })
            });

        },
        location: function (id, data, date) {

            let data_location = {
                coords: {
                    accuracy: data.coords.accuracy,
                    altitude: data.coords.altitude,
                    altitudeAccuracy: data.coords.altitudeAccuracy,
                    heading: data.coords.heading,
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    speed: data.coords.speed,
                },
                timestamp: data.timestamp
            }

            fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/location`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data_location)
            });

            fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/_log/location`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: data_location,
                    date: date
                })
            });

        },
        profile: function (id, data, date) {

            fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/profile`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/_log/profile`, {
                mode: 'no-cors',
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    profile: data,
                    date: date
                })
            });

        }
    }
}

export const get = {
    users: {
        profile: function (id) {

            return fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/profile`).then(
                function (res) {
                    return res.json();
                }
            )
        },
        location: function (id) {

            return fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/location`).then(
                function (res) {
                    return res.json();
                }
            )
        },

    }
}

// export function setUser(id, data, date) {

//     fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/user`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     });

//     fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/_log/user`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             user: data,
//             date: date
//         })
//     });
// }

// export function setGEOLocation(id, data, date) {
//     console.log(data);
//     let data_location = {
//         coords: {
//             accuracy: data.coords.accuracy,
//             altitude: data.coords.altitude,
//             altitudeAccuracy: data.coords.altitudeAccuracy,
//             heading: data.coords.heading,
//             latitude: data.coords.latitude,
//             longitude: data.coords.longitude,
//             speed: data.coords.speed,
//         },
//         timestamp: data.timestamp
//     }
//     fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/location`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data_location)
//     });

//     fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/_log/location`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             location: data_location,
//             date: date
//         })
//     });
// }

// export function postProfile(id, data, date) {

//     fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/profile`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     });

//     fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/_log/profile`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             profile: data,
//             date: date
//         })
//     });
//     // console.log(data);

// }


// export function getProfile(id) {

//     return fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/profile`).then(
//         function (res) {
//             return res.json();
//         }
//     )
// }

// export function getGEOLocation(id) {

//     return fetch(`http://localhost:5000/share-we-go/us-central1/api/users/${id}/location`).then(
//         function (res) {
//             return res.json();
//         }
//     )
// }

export function getStatusShare(id) {

    return fetch(`http://localhost:5000/share-we-go/us-central1/api/status/${id}/share`).then(
        function (res) {
            return res.json();
        }
    )
}

export function postStatusShare(id, data) {

    fetch(`http://localhost:5000/share-we-go/us-central1/api/status/${id}/share`, {
        mode: 'no-cors',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function postBaseShareLocation(id, data) {

    fetch(`http://localhost:5000/share-we-go/us-central1/api/base_share_location/${id}`, {
        mode: 'no-cors',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function getShareLocationPrivate(id) {

    return fetch(`http://localhost:5000/share-we-go/us-central1/api/share_location_private/${id}`).then(
        function (res) {
            return res.json();
        }
    )
}




