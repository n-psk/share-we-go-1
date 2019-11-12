import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const config = {
  apiKey: "AIzaSyBYlhJSaEBsfLWsb8tyPEoBnMdT-KvsFWA",
  authDomain: "share-we-go-project.firebaseapp.com",
  databaseURL: "https://share-we-go-project.firebaseio.com",
  projectId: "share-we-go-project",
  storageBucket: "share-we-go-project.appspot.com",
  messagingSenderId: "556361690304",
  appId: "1:556361690304:web:e67c6f6438f9e839d5d125",
  measurementId: "G-ZPWZWZ8G9G"
};

firebase.initializeApp(config);

ReactDOM.render(<App db={firebase}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
