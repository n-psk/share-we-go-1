import React, { useReducer } from 'react';
import ConnectApiMaps, { Map } from 'maps-google-react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Fab from '@material-ui/core/Fab';
import CallIcon from '@material-ui/icons/Call';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import HistoryIcon from '@material-ui/icons/History';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SearchMap from './components/SearchMap';
import SearchBar from './components/SearchBar';
import firebase from '../../connect/firebase'
import { get, post, d } from '../../RESTful_API';
import taxiIcon from './img/icon-taxi.png'
import './styles/map.css';
import './styles/index.css';
import './styles/share-location-bar.css';
import ChatBar from './components/ChatBar';
import InputCaht from './components/InputChat';
// import undefined from 'firebase/empty-import';
import { dateTime } from '../../module';
import $ from 'jquery';


const drawerWidth = window.innerWidth;

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
        backgroundColor: "rgba(0,0,0,0.4)",
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
        height: '45px',
        bottom: '16px',
        width: '-webkit-fill-available',
        position: 'absolute',
        marginLeft: '22px',
        marginRight: '22px',
        borderRadius: 12
    },
    bigAvatar: {
        margin: 10,
        marginTop: 50,
        width: 90,
        height: 90,
    },
    mediumAvatar: {
        margin: '5px 10px',
        width: 45,
        height: 45,
    },
    buttonVisibility: {
        position: 'absolute',
        right: '10px',
        top: '95px',
    },
    buttonChat: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffffff',
    },
    buttonTaxi: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffd91b',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #ffc800',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttonCall: {
        margin: theme.spacing(1),
    },
    callIcon: {
        marginRight: theme.spacing(1),
    },
    buttonExitShare: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffffff',
    },
    buttonTaxiDoc: {
        margin: '5px',
        color: '#6d6d6d',
        backgroundColor: '#ffffff',
    }
}));

const Private = function (props) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openChat, setOpenChat] = React.useState(false);
    const [profile, setProfile] = React.useState({});
    const [statusShare, setStatusShare] = React.useState({
        id: "",
        uid: "",
        value: "false",

    })
    const [statusOwner, setStatusOwner] = React.useState({
        share_id: "",
        uid: "",
        value: "false",

    })
    const [statusMember, setStatusMember] = React.useState({
        share_id: "",
        uid: "",
        value: "false",

    })
    const [shareData, setShareData] = React.useState(null)
    const [visibility, setVisibility] = React.useState(true)
    const [openCallTaxi, setOpenCallTaxi] = React.useState(false);
    const [openTaxiDoc, setOpenTaxiDoc] = React.useState(false);
    const [statusDocTaxi, setStatusDocTaxi] = React.useState(false);
    const [uid, setUid] = React.useState('')


    const [map, setMap] = React.useState({});

    // กำหนดตัวแปล latlng
    let latlng;

    const handleOpenCallTaxi = () => {
        setOpenCallTaxi(true);
    };

    const handleCloseCallTaxi = () => {
        setOpenCallTaxi(false);
    };

    const handleOpenTaxiDoc = () => {
        setOpenTaxiDoc(true);
    };

    const handleCloseTaxiDoc = () => {
        setOpenTaxiDoc(false);
    };

    function handleDrawerOpen() {
        setOpen(true);
        firebase.auth().onAuthStateChanged((user) => {
            get.users.profile(user.uid).then(function (data) {
                setProfile(data)
            })

            setUid(user.uid)
        })
    }

    function handleDrawerOpenChat() {
        setOpenChat(true);
    }

    function handleDrawerCloseChat() {
        setOpenChat(false);
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

    function statusVisibility() {
        setVisibility(false)
    }

    function statusVisibilityOff() {
        setVisibility(true)
    }

    function exitShare() {
        setStatusShare({
            id: "",
            uid: "",
            value: "false",
        });

        setStatusOwner({
            share_id: "",
            uid: "",
            value: "false",
        });
        
        firebase.auth().onAuthStateChanged((user) => {
            get.status.owner(user.uid).then(function (data) {
                get.share.id(data.share_id).then(function (sdata) {
                    post.history.id(data.uid, sdata, dateTime)
                })
            })
        });

        window.location.reload();
    };

    function exitShareGroup() {
        setStatusShare({
            id: "",
            uid: "",
            value: "false",
        });

        setStatusMember({
            share_id: "",
            uid: "",
            value: "false",
        });

        firebase.auth().onAuthStateChanged((user) => {
            get.status.member(user.uid).then(function (data) {
                d.share.member(data.share_id, data.uid, dateTime)
            })
        });

        window.location.reload();
    };


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

                            get.status.share(user.uid).then(function (data) {
                                setStatusShare(data)
                            })

                            get.status.owner(user.uid).then(function (data) {
                                setStatusOwner(data)
                                get.share.id(data.share_id).then(function (sdata) {
                                    setShareData(sdata)
                                })
                            })

                            get.status.member(user.uid).then(function (data) {
                                setStatusMember(data)
                                get.share.id(data.share_id).then(function (sdata) {
                                    setShareData(sdata)
                                })
                            })

                            get.status.owner(user.uid).then(function (data) {
                                if (data.value !== "false") {
                                    get.share.location(data.share_id).then(function (sdata) {
                                        setStatusOwner(data)
                                        get.share.id(data.share_id).then(function (sdata) {
                                            setShareData(sdata)
                                        })
                                        function AutocompleteDirectionsHandler(google, map) {
                                            this.map = map;
                                            this.originPlaceId = null;
                                            this.destinationPlaceId = null;
                                            this.travelMode = 'WALKING';
                                            this.directionsService = new google.maps.DirectionsService;
                                            this.directionsRenderer = new google.maps.DirectionsRenderer;
                                            this.directionsRenderer.setMap(this.map);

                                            var me = this

                                            if (data.share === true) {
                                                me.setupPlaceChangedListener(sdata.geocoded_waypoints[0].place_id, 'ORIG');
                                                me.setupPlaceChangedListener(sdata.geocoded_waypoints[1].place_id, 'DEST');
                                                me.setupClickListener(sdata.request.travelMode);

                                            } else {
                                                me.setupPlaceChangedListener(sdata.geocoded_waypoints[0].place_id, 'ORIG');
                                                me.setupPlaceChangedListener(sdata.geocoded_waypoints[1].place_id, 'DEST');
                                                me.setupClickListener(sdata.request.travelMode);
                                            }
                                        }

                                        // Sets a listener on a radio button to change the filter type on Places
                                        // Autocomplete.
                                        AutocompleteDirectionsHandler.prototype.setupClickListener = function (mode) {
                                            var me = this;

                                            me.travelMode = mode;
                                            me.route();
                                        };

                                        AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
                                            place, mode) {
                                            var me = this;

                                            console.log(place);

                                            if (!place) {
                                                alert('Please select an option from the dropdown list.');
                                                return;
                                            }
                                            if (mode === 'ORIG') {
                                                me.originPlaceId = place;
                                            } else {
                                                me.destinationPlaceId = place;
                                            }
                                            me.route();
                                        };

                                        AutocompleteDirectionsHandler.prototype.route = function () {
                                            if (!this.originPlaceId || !this.destinationPlaceId) {
                                                return;
                                            }
                                            var me = this;

                                            this.directionsService.route(
                                                {
                                                    origin: { 'placeId': this.originPlaceId },
                                                    destination: { 'placeId': this.destinationPlaceId },
                                                    travelMode: this.travelMode
                                                },
                                                function (response, status) {
                                                    if (status === 'OK') {
                                                        me.directionsRenderer.setDirections(response);
                                                        // console.log(response);

                                                    } else {
                                                        alert('Directions request failed due to ' + status);
                                                        // console.log(response, status);

                                                    }
                                                });
                                        };
                                        new AutocompleteDirectionsHandler(google, map);
                                    })
                                } else {
                                    get.status.member(user.uid).then(function (data) {
                                        if (statusMember.value !== "false") {
                                            get.share.location(data.share_id).then(function (sdata) {

                                                function AutocompleteDirectionsHandler(google, map) {
                                                    this.map = map;
                                                    this.originPlaceId = null;
                                                    this.destinationPlaceId = null;
                                                    this.travelMode = 'WALKING';
                                                    this.directionsService = new google.maps.DirectionsService;
                                                    this.directionsRenderer = new google.maps.DirectionsRenderer;
                                                    this.directionsRenderer.setMap(this.map);

                                                    var me = this

                                                    if (data.share === true) {
                                                        me.setupPlaceChangedListener(sdata.geocoded_waypoints[0].place_id, 'ORIG');
                                                        me.setupPlaceChangedListener(sdata.geocoded_waypoints[1].place_id, 'DEST');
                                                        me.setupClickListener(sdata.request.travelMode);

                                                    } else {
                                                        me.setupPlaceChangedListener(sdata.geocoded_waypoints[0].place_id, 'ORIG');
                                                        me.setupPlaceChangedListener(sdata.geocoded_waypoints[1].place_id, 'DEST');
                                                        me.setupClickListener(sdata.request.travelMode);
                                                    }
                                                }

                                                // Sets a listener on a radio button to change the filter type on Places
                                                // Autocomplete.
                                                AutocompleteDirectionsHandler.prototype.setupClickListener = function (mode) {
                                                    var me = this;

                                                    me.travelMode = mode;
                                                    me.route();
                                                };

                                                AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
                                                    place, mode) {
                                                    var me = this;

                                                    console.log(place);

                                                    if (!place) {
                                                        alert('Please select an option from the dropdown list.');
                                                        return;
                                                    }
                                                    if (mode === 'ORIG') {
                                                        me.originPlaceId = place;
                                                    } else {
                                                        me.destinationPlaceId = place;
                                                    }
                                                    me.route();
                                                };

                                                AutocompleteDirectionsHandler.prototype.route = function () {
                                                    if (!this.originPlaceId || !this.destinationPlaceId) {
                                                        return;
                                                    }
                                                    var me = this;

                                                    this.directionsService.route(
                                                        {
                                                            origin: { 'placeId': this.originPlaceId },
                                                            destination: { 'placeId': this.destinationPlaceId },
                                                            travelMode: this.travelMode
                                                        },
                                                        function (response, status) {
                                                            if (status === 'OK') {
                                                                me.directionsRenderer.setDirections(response);
                                                                // console.log(response);

                                                            } else {
                                                                alert('Directions request failed due to ' + status);
                                                                // console.log(response, status);

                                                            }
                                                        });
                                                };

                                                new AutocompleteDirectionsHandler(google, map);
                                            })
                                        } else {
                                            get.status.all().then(function (data) {
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

                                                                get.share.date(key).then(function (date) {
                                                                    get.share.max_number(key).then(function (max_number) {
                                                                        get.share.sex(key).then(function (sex) {
                                                                            get.share.member(key).then(function (member) {

                                                                                var contentString = `
                                                                                <center>
                                                                                <h2>ข้อมูลการแชร์</h2>
                                                                                </center>
                                                                                <hr></hr>
                                                                                <u style="font-size: 15px">ต้นทาง:</u></<u><b> ${data.routes[0].legs[0].start_address} </b>
                                                                                <br></br>
                                                                                <u style="font-size: 15px">ปลายทาง:</u></<u><b>  ${data.routes[0].legs[0].end_address} </b>
                                                                                <br></br>
                                                                                <u style="font-size: 15px">เริ่มแชร์เมื่อ:</u></<u><b> ${date.start_time.value} </b>
                                                                                <br></br>
                                                                                <u style="font-size: 15px">ปิดแชร์เวลา:</u></<u><b> ${date.end_time.value} </b>
                                                                                <br></br>
                                                                                <u style="font-size: 15px">ต้องการผู้เดินทางเพิ่ม:</u></<u><b> ${member !== null ? Object.keys(member).length : 0} / ${max_number.value} คน </b>
                                                                                <br></br>
                                                                                <u style="font-size: 15px">เดินทางกับเพศ:</u></<u><b> ${sex.value} </b>
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

                                                                                    if (Object.keys(member).length > max_number.value) {
                                                                                        $(`#join-share-${key}`).attr("disabled", true)
                                                                                    }
                                                                                });

                                                                                $(document).on('click', `#join-share-${key}`, function () {
                                                                                    get.status.member(user.uid).then(function (data) {
                                                                                        if (data.value !== "true") {
                                                                                            get.users.profile(user.uid).then(function (udata) {
                                                                                                post.share.member(key, { [user.uid]: { id: user.uid, profile: udata } }, dateTime)
                                                                                                post.status.member(
                                                                                                    user.uid,
                                                                                                    {
                                                                                                        share_id: key,
                                                                                                        uid: user.uid,
                                                                                                        value: "true"
                                                                                                    },
                                                                                                    dateTime
                                                                                                );

                                                                                                post.status.alert(
                                                                                                    user.uid,
                                                                                                    {
                                                                                                        share_id: key,
                                                                                                        uid: user.uid,
                                                                                                        value: "false"
                                                                                                    },
                                                                                                    dateTime
                                                                                                );

                                                                                                post.status.owner(
                                                                                                    user.uid,
                                                                                                    {
                                                                                                        share_id: key,
                                                                                                        uid: user.uid,
                                                                                                        value: "false"
                                                                                                    },
                                                                                                    dateTime
                                                                                                );

                                                                                                post.status.process(
                                                                                                    user.uid,
                                                                                                    {
                                                                                                        share_id: key,
                                                                                                        uid: user.uid,
                                                                                                        value: "false"
                                                                                                    },
                                                                                                    dateTime
                                                                                                );

                                                                                                post.status.share(
                                                                                                    user.uid,
                                                                                                    {
                                                                                                        id: key,
                                                                                                        uid: user.uid,
                                                                                                        value: "false"
                                                                                                    },
                                                                                                    dateTime
                                                                                                );

                                                                                                // window.location.reload();
                                                                                                setStatusOwner({
                                                                                                    share_id: key,
                                                                                                    uid: user.uid,
                                                                                                    value: "false"
                                                                                                });

                                                                                                setStatusMember({
                                                                                                    share_id: key,
                                                                                                    uid: user.uid,
                                                                                                    value: "true"
                                                                                                });

                                                                                                setStatusShare({
                                                                                                    share_id: key,
                                                                                                    uid: user.uid,
                                                                                                    value: "false"
                                                                                                })
                                                                                            })
                                                                                        } else {
                                                                                            $(".join-share").attr("disabled", true)
                                                                                        }
                                                                                    })
                                                                                })

                                                                            })
                                                                        })
                                                                    });

                                                                });


                                                            })

                                                        }
                                                    })
                                                })

                                            })

                                        }
                                    })
                                }
                            })




                            get.users.profile(user.uid).then(function (prof) {


                                get.users.location(user.uid).then(function (geo) {
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
                            })



                        })

                    }}
                >
                    <SearchBar >
                        <SearchMap onClick={handleDrawerOpen} map={map} {...props} />
                    </SearchBar>
                    {visibility === true
                        ? (<IconButton onClick={statusVisibility} className={classes.buttonVisibility} aria-label="Visibility">
                            <VisibilityIcon />
                        </IconButton>)
                        : (<IconButton onClick={statusVisibilityOff} className={classes.buttonVisibility} aria-label="VisibilityOff">
                            <VisibilityOffIcon />
                        </IconButton>)
                    }
                    {statusShare.value === "true"
                        ? (<React.Fragment>
                            {statusOwner.value === "true"
                                ? (<React.Fragment>
                                    <Grid container style={{
                                        width: 'min-content',
                                        position: 'absolute',
                                        top: '100px',

                                    }} >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={shareData !== null ? shareData.owner.profile.photoURL : null}
                                            className={classes.mediumAvatar}
                                            style={{
                                                border: '4px solid #fff',
                                                boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                            }}
                                        />
                                        {shareData !== null
                                            ? (<React.Fragment>
                                                {shareData.member !== null
                                                    ? (<React.Fragment>
                                                        {Object.keys(shareData.member).map((key) => (
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src={shareData.member[key].profile.photoURL}
                                                                className={classes.mediumAvatar}
                                                                style={{
                                                                    border: '4px solid #fff',
                                                                    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                                                }}
                                                            />
                                                        ))}

                                                    </React.Fragment>)
                                                    : (<React.Fragment></React.Fragment>)}
                                            </React.Fragment>)
                                            : (<React.Fragment></React.Fragment>)}

                                    </Grid>


                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={openCallTaxi}
                                        onClose={handleCloseCallTaxi}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={openCallTaxi}>
                                            <div className={classes.paper}>
                                                <Grid container justify="center" alignItems="center"
                                                    style={{
                                                        width: 'min-content'

                                                    }} >
                                                    <img src={taxiIcon} style={{ width: 150 }} />
                                                    <Link to="tel:+66803147507">
                                                        <Fab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            aria-label="add"
                                                            className={classes.buttonCall}
                                                        ><CallIcon className={classes.callIcon} />
                                                            โทร
                                                        </Fab>
                                                    </Link>
                                                </Grid>
                                            </div>
                                        </Fade>
                                    </Modal>
                                    {statusDocTaxi === true
                                        ? (
                                            <React.Fragment>
                                                <Grid container style={{
                                                    width: 'min-content',
                                                    position: 'absolute',
                                                    right: '15px',
                                                    bottom: '80px',

                                                }} >
                                                    <Fab size="medium" onClick={handleDrawerOpenChat} color="secondary" aria-label="add" className={classes.buttonChat}>
                                                        <QuestionAnswerIcon />
                                                    </Fab>
                                                </Grid>
                                                <Button variant="contained" onClick={exitShare} style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                                    เสร็จสิ้นการเดินทาง
                                        </Button>
                                            </React.Fragment>)
                                        : (
                                            <React.Fragment>
                                                <Grid container style={{
                                                    width: 'min-content',
                                                    position: 'absolute',
                                                    right: '15px',
                                                    bottom: '80px',

                                                }} >
                                                    <Fab size="medium" onClick={handleOpenCallTaxi} aria-label="add" className={classes.buttonTaxi}>
                                                        <LocalTaxiIcon />
                                                    </Fab>
                                                    <Fab size="medium" onClick={handleDrawerOpenChat} color="secondary" aria-label="add" className={classes.buttonChat}>
                                                        <QuestionAnswerIcon />
                                                    </Fab>
                                                </Grid>
                                                <Grid container style={{
                                                    width: 'min-content',
                                                    position: 'absolute',
                                                    left: '15px',
                                                    bottom: '80px',

                                                }} >
                                                    <Fab size="medium" onClick={exitShare} aria-label="exit-share" className={classes.buttonExitShare}>
                                                        <MeetingRoomIcon />
                                                    </Fab>
                                                </Grid>
                                                <Link to="/doc_taxi" >
                                                    <Button variant="contained" style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                                        เริ่มเดินทาง
                                            </Button>
                                                </Link>
                                            </React.Fragment>
                                        )
                                    }
                                </React.Fragment>)
                                : (<React.Fragment>
                                    {statusMember.value === "true" ? (
                                        <React.Fragment>
                                            <Grid container style={{
                                                width: 'min-content',
                                                position: 'absolute',
                                                top: '100px',

                                            }} >
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={shareData !== null ? shareData.owner.profile.photoURL : null}
                                                    className={classes.mediumAvatar}
                                                    style={{
                                                        border: '4px solid #fff',
                                                        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                                    }}
                                                />
                                                {shareData !== null
                                                    ? (<React.Fragment>
                                                        {shareData.member !== null
                                                            ? (<React.Fragment>
                                                                {Object.keys(shareData.member).map((key) => (
                                                                    <Avatar
                                                                        alt="Remy Sharp"
                                                                        src={shareData.member[key].profile.photoURL}
                                                                        className={classes.mediumAvatar}
                                                                        style={{
                                                                            border: '4px solid #fff',
                                                                            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                                                        }}
                                                                    />
                                                                ))}

                                                            </React.Fragment>)
                                                            : (<React.Fragment></React.Fragment>)}
                                                    </React.Fragment>)
                                                    : (<React.Fragment></React.Fragment>)}
                                            </Grid>
                                            <Grid container style={{
                                                width: 'min-content',
                                                position: 'absolute',
                                                right: '15px',
                                                bottom: '80px',

                                            }} >
                                                <Fab size="medium" onClick={handleOpenTaxiDoc} aria-label="doc-taxi" className={classes.buttonTaxiDoc}>
                                                    <AssignmentIcon />
                                                </Fab>
                                                <Fab size="medium" onClick={handleDrawerOpenChat} color="secondary" aria-label="add" className={classes.buttonChat}>
                                                    <QuestionAnswerIcon />
                                                </Fab>
                                            </Grid>
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                className={classes.modal}
                                                open={openTaxiDoc}
                                                onClose={handleCloseTaxiDoc}
                                                closeAfterTransition
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}
                                            >
                                                <Fade in={openTaxiDoc}>
                                                    <div className={classes.paper}>
                                                        <Grid container justify="center" alignItems="center" >
                                                            <center>
                                                                <h1>ทะเบียนรถ</h1>
                                                                <h2>------</h2>
                                                                <h1>สีรถ</h1>
                                                                <h2>------</h2>
                                                            </center>
                                                        </Grid>
                                                    </div>
                                                </Fade>
                                            </Modal>
                                            <Button variant="contained" onClick={exitShareGroup} style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                                ออกจากกลุ่ม
                                        </Button>
                                        </React.Fragment>
                                    )
                                        : (<React.Fragment>

                                            <Link to="/share_location" >
                                                <Button variant="contained" style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                                    <AddIcon color="action" fontSize="large" />
                                                </Button>
                                            </Link>
                                        </React.Fragment>)
                                    }

                                </React.Fragment>)
                            }
                        </React.Fragment>)
                        : (<React.Fragment>
                            {statusMember.value === "true" ? (
                                <React.Fragment>
                                    <Grid container style={{
                                        width: 'min-content',
                                        position: 'absolute',
                                        top: '100px',

                                    }} >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={shareData !== null ? shareData.owner.profile.photoURL : null}
                                            className={classes.mediumAvatar}
                                            style={{
                                                border: '4px solid #fff',
                                                boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                            }}
                                        />
                                        {shareData !== null
                                            ? (<React.Fragment>
                                                {shareData.member !== null
                                                    ? (<React.Fragment>
                                                        {Object.keys(shareData.member).map((key) => (
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src={shareData.member[key].profile.photoURL}
                                                                className={classes.mediumAvatar}
                                                                style={{
                                                                    border: '4px solid #fff',
                                                                    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                                                }}
                                                            />
                                                        ))}

                                                    </React.Fragment>)
                                                    : (<React.Fragment></React.Fragment>)}
                                            </React.Fragment>)
                                            : (<React.Fragment></React.Fragment>)}
                                    </Grid>
                                    <Grid container style={{
                                        width: 'min-content',
                                        position: 'absolute',
                                        right: '15px',
                                        bottom: '80px',

                                    }} >
                                        <Fab size="medium" onClick={handleOpenTaxiDoc} aria-label="doc-taxi" className={classes.buttonTaxiDoc}>
                                            <AssignmentIcon />
                                        </Fab>
                                        <Fab size="medium" onClick={handleDrawerOpenChat} color="secondary" aria-label="add" className={classes.buttonChat}>
                                            <QuestionAnswerIcon />
                                        </Fab>
                                    </Grid>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={openTaxiDoc}
                                        onClose={handleCloseTaxiDoc}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={openTaxiDoc}>
                                            <div className={classes.paper}>
                                                <Grid container justify="center" alignItems="center" >
                                                    <center>
                                                        <h1>ทะเบียนรถ</h1>
                                                        <h2>------</h2>
                                                        <h1>สีรถ</h1>
                                                        <h2>------</h2>
                                                    </center>
                                                </Grid>
                                            </div>
                                        </Fade>
                                    </Modal>
                                    <Button variant="contained" onClick={exitShareGroup} style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                        ออกจากกลุ่ม
                                </Button>
                                </React.Fragment>
                            )
                                : (<React.Fragment>

                                    <Link to="/share_location" >
                                        <Button variant="contained" style={{ backgroundColor: '#ffffff' }} className={classes.fab}>
                                            <AddIcon color="action" fontSize="large" />
                                        </Button>
                                    </Link>
                                </React.Fragment>)
                            }

                        </React.Fragment>)
                    }
                </Map>
            </div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openChat}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <ChatBar>
                    <IconButton onClick={handleDrawerCloseChat} style={{ position: "absolute", left: 0 }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
                    </IconButton>
                    <div style={{
                        position: 'absolute',
                        left: (window.innerWidth / 2.2),
                    }}>
                        <h2>Chat</h2>
                    </div>
                </ChatBar>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '-webkit-fill-available',
                    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
                }}>
                    <InputCaht />
                </div>
            </Drawer>
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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
                    </IconButton>
                    <div style={{
                        backgroundColor: 'darkgrey',
                        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                    }}>
                        <Grid container justify="center" alignItems="center">
                            <Avatar
                                alt="Remy Sharp"
                                src={profile.photoURL}
                                className={classes.bigAvatar}
                                style={{
                                    border: '4px solid #fff',
                                    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
                                }}
                            />
                        </Grid>
                        <center style={{ marginBottom: '10px', fontSize: 'large' }}>
                            <span>{profile.displayName}</span>
                        </center>
                    </div>
                </div>
                <List style={{
                    marginTop: '15px'
                }}>
                    <Link to={`/profile/${uid}`} style={{
                        color: 'dimgray',
                        textDecoration: 'blink'
                    }}>
                        <ListItem button key={0}>
                            <ListItemIcon style={{
                                minWidth: 0,
                                marginLeft: 15,
                                marginRight: 15
                            }}> <AccountBoxIcon fontSize="large" /></ListItemIcon>
                            <ListItemText ><span style={{ fontSize: "large" }} >Profile</span></ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/history" style={{
                        color: 'dimgray',
                        textDecoration: 'blink'
                    }}>
                        <ListItem button key={1}>
                            <ListItemIcon style={{
                                minWidth: 0,
                                marginLeft: 15,
                                marginRight: 15
                            }}> <HistoryIcon fontSize="large" /></ListItemIcon>
                            <ListItemText > <span style={{ fontSize: "large" }} >History</span></ListItemText>
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
    apiKey: "AIzaSyBy2VY1e11qs-60Ul6aYT5klWYRI1K3RB0",
    libraries: ['places', 'geometry'],
})(Private)