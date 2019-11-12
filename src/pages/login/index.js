import React from 'react';
import Typography from '@material-ui/core/Typography';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
// import firebase from '../../connect/firebase';
import ContainerUI from '../../components/ContainerUI';
import 'firebase/auth';
// import InstallApp from '../../components/install';



const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

// Configure FirebaseUI.




const Login = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            props.db.auth.GoogleAuthProvider.PROVIDER_ID,
            props.db.auth.FacebookAuthProvider.PROVIDER_ID,
            {
                provider: props.db.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image', // 'audio'
                    size: 'normal', // 'invisible' or 'compact'
                    badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                },
                defaultCountry: 'TH',
                whitelistedCountries: ['TH', '+66']
            }
        ]
    };
    return (
        <ContainerUI>
            <Typography component="div" style={{
                flex: 1,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#274D7D',
            }}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={props.db.auth()} />
            </Typography>
            
        </ContainerUI>
    )

}


export default Login;