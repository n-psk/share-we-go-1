import React from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export function setUser(id, data) {
    fetch(`http://localhost:5001/share-we-go/us-central1/apis/app/user/:${id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
            id: id,
            data: data
        }
    });
}

export function setGEOLocation(id, data) {
    fetch(`http://localhost:5001/share-we-go/us-central1/apis/app/geoLocation/:${id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
            id: id,
            data: data
        }
    });
}