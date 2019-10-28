import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import HistoryBar from './components/HistoryBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import firebase from '../../connect/firebase';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CommuteIcon from '@material-ui/icons/Commute';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import WcIcon from '@material-ui/icons/Wc';



export default class History extends React.Component {

    state = {
        keys: [{ test: 'test' }, { test: 'test' }],
        history: [{
            date_time: {
                start_time: 'อ 14 ต.ค 2560',
                end_time: 'อ 14 ต.ค 2560'
            },
            host: {
                routes: [{
                    legs: [{
                        start_address: 'ขอนแก่น',
                        start_address: 'กรุงเทพ'
                    }]
                }]
            },
            number_of_trave: 3,
            gender: 'Man'

        }],
        expanded: true
    }


    handleChange = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

    goBack() {
        // Router.back();
    }

    componentDidMount() {
        // const me = this;
        // firebase.auth().onAuthStateChanged((user) => {
        //   if (user) {
        //     firebase.database().ref(`/history/${user.uid}`).once('value').then(function (snapshot) {
        //       let data = (snapshot.val());
        //       let keys = Object.keys(snapshot.val());
        //       // let keys = snapshot.key;
        //       // console.log(data[dataKeys[0]].share);
        //       me.setState({
        //         keys: keys,
        //         history: data,
        //       })

        //     })
        //   }
        // })

    }

    render() {


        return (
            <React.Fragment>
                <CssBaseline />

                {/* app-bar */}
                <HistoryBar>
                    <IconButton style={{ position: "absolute", left: 0 }}>
                        <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                    <div
                        style={{
                            position: 'absolute',
                            left: (window.innerWidth / 2.5),
                        }}
                    >
                        <h2>ประวัติ</h2>
                    </div>
                </HistoryBar>
                {/* end-app-bar */}
                <div style={{ width: '100%', marginTop: '60px' }}>
                    {/* {this.state.keys.map((key) =>
                        <ExpansionPanel expanded={this.state.expanded === key} onChange={this.handleChange(`${key}`)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography style={{
                                    flexBasis: '33.33%',
                                    flexShrink: 0,
                                }}>เวลา: </Typography>
                                <Typography >{this.state.history[key].date_time.start_time}</Typography>
                            </ExpansionPanelSummary>
                            <body>

                                <center>
                                    <h4 body bgcolor="#607B8B">     <CommuteIcon></CommuteIcon>    ต้นทาง - ปลายทาง</h4>
                                    <hr></hr>
                                </center>
                                <b font color="607B8B"><u>ต้นทาง:</u></b> {this.state.history[key].host.routes[0].legs[0].start_address}
                                <br></br>
                                <b><u>ปลายทาง:</u></b> {this.state.history[key].host.routes[0].legs[0].end_address}
                                <center>
                                    <h4>  <AccessTimeIcon></AccessTimeIcon>  เริ่มการแชร์ - ปิดการแชร์</h4>

                                    <hr border="5" shadow="5"></hr>
                                    <b><u>เริ่มการแชร์:</u></b> {this.state.history[key].date_time.start_time}
                                    <br></br>
                                    <b><u>ปิดการแชร์:</u></b> {this.state.history[key].date_time.end_time}
                                    <br></br>
                                    <h4>     <WcIcon></WcIcon>    ผู้ร่วมเดินทาง - เพศผู้ร่วมเดินทาง</h4>
                                    <hr></hr>
                                    <b><u>ต้องการผู้ร่วมเดินทางเพิ่ม:</u> </b> {this.state.history[key].number_of_travel} คน<br />
                                    <b><u>    ต้องการร่วมเดินทางกับเพศ:</u> </b> {this.state.history[key].gender}
                                </center>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </body>
                        </ExpansionPanel>
                    )} */}
                    <ExpansionPanel expanded={this.state.expanded === true} onChange={this.handleChange(0)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography style={{
                                flexBasis: '33.33%',
                                flexShrink: 0,
                            }}>เวลา: </Typography>
                            <Typography >อ 14 ต.ค 2560</Typography>
                        </ExpansionPanelSummary>
                        <div>
                            <center style={{ backgroundColor: 'darkgray' }}>
                                <h4 style={{ padding: '10px' }}><CommuteIcon></CommuteIcon>ต้นทาง - ปลายทาง</h4>
                            </center>
                            <center>
                                <b><u>ต้นทาง:</u></b> ขอนแก่น
                                <br></br>
                                <b><u>ปลายทาง:</u></b> กรุงเทพ
                            </center>
                            <center style={{ backgroundColor: 'darkgray' }}>
                                <h4 style={{ padding: '10px' }}>  <AccessTimeIcon></AccessTimeIcon>  เริ่มการแชร์ - ปิดการแชร์</h4>
                            </center>
                            <center>
                                <b><u>เริ่มการแชร์:</u></b> อ 14 ต.ค 2560
                                    <br></br>
                                <b><u>ปิดการแชร์:</u></b> อ 14 ต.ค 2560
                                    <br></br>
                            </center>
                            <center style={{ backgroundColor: 'darkgray' }}>
                                <h4 style={{ padding: '10px' }}><WcIcon></WcIcon>ผู้ร่วมเดินทาง - เพศผู้ร่วมเดินทาง</h4>
                            </center>
                            <center>
                                <b><u>ต้องการผู้ร่วมเดินทางเพิ่ม:</u> </b> 3 คน<br />
                                <b><u>ต้องการร่วมเดินทางกับเพศ:</u> </b> Man
                            </center>
                            <br/>
                        </div>
                    </ExpansionPanel>
                </div>
            </React.Fragment>
        );
    }
}