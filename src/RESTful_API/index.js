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

    fetch(`http://localhost:5000/share-we-go/us-central1/api/geolocation/${id}`, {
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

export function postProfile(id, data) {

    fetch(`http://localhost:5000/share-we-go/us-central1/api/profile/${id}`, {
        mode: 'no-cors',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // console.log(data);
    
}


export function getProfile(id) {

   return fetch(`http://localhost:5000/share-we-go/us-central1/api/profile/${id}`).then(
        function(res) {
           return res.json();
        }
    )
}

export function getGEOLocation(id) {

    return fetch(`http://localhost:5000/share-we-go/us-central1/api/geolocation/${id}`).then(
         function(res) {
            return res.json();
         }
     )
 }



