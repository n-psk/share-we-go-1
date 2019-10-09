import React from 'react';

export const routerPublic = [
    {
        path:"/",
        exact: true,
        page:() => (<Login/>)
    },
    {
        path:"/login",
        page:() => (<Login/>)
    }
];

export const routerPrivate = [
    {
        path:"/",
        exact: true,
        page:() => (<Private/>)
    },
    {
        path:"/profile",
        page:() => (<Profile/>)
    },
    {
        path:"/share_location",
        page:() => (<ShareLocation/>)
    },
    {
        path:"/share_group",
        page:() => (<ShareGroup/>)
    },
    {
        path:"/history",
        page:() => (<History/>)
    }
]