import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import { post } from '../../../../RESTful_API';
import { dateTime } from '../../../../module';
// import firebase from '../../../../connect/firebase'
// import io from 'socket.io-client';

const useStyles = makeStyles(theme => ({
    root: {
        // display: 'flex',
        marginTop: (window.innerHeight / 2.5)
    },
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

export default function RadioButtonsGroup(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('MaleAndFemale');

    // const socket = io(`http://localhost:8080/`);

    function handleChange(event) {
        setValue(event.target.value);
    }

    let path = `share/${props.auth.uid}/sex`
    let _log = `share/${props.auth.uid}/sex/_log`

    props.db.database().ref(`${path}`).update({ value: value })
    props.db.database().ref(`${_log}`).push({sex:{ value: value }, date:dateTime})

    // firebase.auth().onAuthStateChanged((user) => {
    //     post.share.sex(user.uid, { value: value }, dateTime)
    // })
    // socket.emit('gender', value)


    return (
        <div className={classes.root}>
            <center>
                <FormControl component="fieldset" className={classes.formControl}>

                    <FormLabel component="legend">Select gender</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        className={classes.group}
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="Male" control={<Radio color="primary" />} label="ชาย" />
                        <FormControlLabel value="Female" control={<Radio color="primary" />} label="หญิง " />
                        <FormControlLabel value="MaleAndFemale" control={<Radio color="primary" />} label="ทุกเพศ " />

                    </RadioGroup>
                </FormControl>
            </center>
        </div>
    );
}