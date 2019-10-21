import React from 'react';
import ConnectApiMaps, { Map } from 'maps-google-react';
import {Link} from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
// import AddIcon from '@material-ui/icons/Add';
// import GroupIcon from '@material-ui/icons/Group';
// import Fab from '@material-ui/core/Fab';
import HistoryIcon from '@material-ui/icons/History';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchMap from '../components/SearchMap';
import SearchBar from '../components/SearchBar';
import firebase from '../connect/firebase'
import { getProfile, getGEOLocation } from '../RESTful_API';
import '../styles/map.css';
import '../App.css';
import '../styles/share-location-bar.css';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
        backgroundColor:"rgba(0,0,0,0.4)",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'contents',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        // flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    bigAvatar: {
        margin: 10,
        marginTop: 50,
        width: 60,
        height: 60,
    },
}));

const Private = function (props) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [profile, setProfile] = React.useState({});
    const [map, setMap] = React.useState({});

    // กำหนดตัวแปล latlng
    let latlng;

    function handleDrawerOpen() {
        setOpen(true);
        firebase.auth().onAuthStateChanged((user) => {
            getProfile(user.uid).then(function (data) {
                setProfile(data)
            })
        })
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function Logout() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            window.location.reload()
        }).catch(function (error) {
            // An error happened.
        });
    }

    if (latlng == undefined) {
        // แทนค่า ตัวแปล latlng ลงไป
        latlng = { lat: 14.013235199999999, lng: 100.6985216 }

    }


    return (
        <React.Fragment>
            <CssBaseline />
            <div className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })} >
                <Map
                    google={props.google}
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
                        function CustomMarker(latlng, map, args, img) {
                            this.latlng = latlng;
                            this.args = args;
                            this.img = img;
                            this.setMap(map);
                            this.maps = map
                            setMap(map)
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
                                let positionA = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);

                                this.pos = this.getProjection().fromLatLngToDivPixel(positionA);
                                // console.log(this.pos);
                                this.div.style.left = this.pos.x + 'px';
                                this.div.style.top = this.pos.y + 'px';
                            }
                        };

                        CustomMarker.prototype.getPosition = function () {
                            return this.latlng;
                        };

                        firebase.auth().onAuthStateChanged((user) => {

                            getProfile(user.uid).then(function (prof) {
                                getGEOLocation(user.uid).then(function (geo) {
                                    var myLatlng = new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude);

                                    var marker1 = new CustomMarker(
                                        myLatlng,
                                        map,
                                        {},
                                        prof.photoURL
                                    );

                                    var pos = {
                                        lat: geo.coords.latitude,
                                        lng: geo.coords.longitude
                                    };

                                    marker1.latlng = { lat: pos.lat, lng: pos.lng };
                                    marker1.draw();

                                    map.setCenter(pos);
                                })
                            })
                        })

                    }}
                >
                    <SearchBar >
                        <SearchMap onClick={handleDrawerOpen} map={map} {...props} />
                    </SearchBar>
                </Map>
            </div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} style={{ position: "absolute" }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <div>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Remy Sharp" src={profile.photoURL} className={classes.bigAvatar} />
                        </Grid>
                        <center style={{ marginBottom: '10px' }}>
                            <span>{profile.displayName}</span>
                        </center>
                    </div>
                </div>
                <Divider />
                <List>
                    <Link to="/profile">
                        <ListItem button key={0}>
                            <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </Link>
                    <Link to="/history">
                        <ListItem button key={1}>
                            <ListItemIcon> <HistoryIcon /></ListItemIcon>
                            <ListItemText primary="History" />
                        </ListItem>
                    </Link>
                </List>
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    width: '-webkit-fill-available'
                }}>
                    <Button
                        onClick={Logout}
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        style={{
                            width: '-webkit-fill-available',
                            height: '56px',
                            borderRadius: '0px'
                        }}>Logout</Button>
                </div>
            </Drawer>
        </React.Fragment>
    )

}

export default ConnectApiMaps({
    apiKey: "AIzaSyCfdx1_dkKY9BejzU-We23YqfEynZtAIJc",
    libraries: ['places', 'geometry'],
})(Private)