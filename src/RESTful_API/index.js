import React from 'react';
import os from 'os';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export function setUser(id, data) {

    fetch(`http://localhost:5000/share-we-go/us-central1/api/user/${id}`, {
        mode: 'no-cors',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            data: data
        })
    });
}

export function setGEOLocation(id, data) {
    console.log(data);

    fetch(`http://localhost:5000/share-we-go/us-central1/api/geoLocation/${id}`, {
        mode: 'no-cors',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            data: {
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
        })
    });
}

// export function setDateTime(id) {
//     let d = new Date();

//     fetch(`http://localhost:5000/share-we-go/us-central1/api/dateTime/${id}`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             id: id,
//             data: {
//                 year: d.getFullYear(),
//                 month:d.getMonth() + 1,
//                 day: d.getDate(),
//                 hours: d.getHours(),
//                 minutes:d.getMinutes(),
//                 seconds:d.getSeconds()
//             }
//         })
//     });
// }


// export function setOS(id) {

//     fetch(`http://localhost:5000/share-we-go/us-central1/api/os/${id}`, {
//         mode: 'no-cors',
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             id: id,
//             data: {

//             }
//         })
//     });
// }