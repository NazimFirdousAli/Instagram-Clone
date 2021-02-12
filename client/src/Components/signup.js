import {React,useState} from 'react'
import { Link } from "react-router-dom";
import { gql } from '@apollo/client'

import instalogo from '../Images/instalogo.png'

// import from '@material-ui';
import { Paper, FormControl, TextField, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",

    },
    paper: {
        display: 'flex',
        // flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(3),
            width: theme.spacing(50),
            height: theme.spacing(85),
        },
    },
    inputField: {
        '& > *': {

            margin: theme.spacing(1),
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '35ch',
            height: '6ch'
        },
    },
    signUpPaper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(3),
            width: theme.spacing(50),
            height: theme.spacing(8),
        },
    },

}));


const SIGNUP = gql`
mutation($name:String!,$email:String!,$password:String!,$phonenumber:String!,$gender:String,$avatar:Upload ,$dateofbirth:String){
    Signup(name:$name,email:$email,password:$password,phonenumber:$phonenumber,gender:$gender,avatar:$avatar ,dateofbirth:$dateofbirth){
        token
        user{
            id
            name
            email
            password
            phonenumber
            gender
            avatar
            dateofbirth
        }
    }
}
`

function Signup() {
    const initialState = {
            name : '',
            email : '',
            password : '',
            phonenumber : '',
            gender : '',
            avatar : '',
            dateofbirth : '',
    }

    const [form, setForm] = useState(initialState)

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className={classes.paper}>
                    <Paper elevation={2}>
                        <br />
                        <img src={instalogo} alt="LOGO" />
                        <h5 style={{ color: '#A9A9A9', fontFamily: "Segoe UI", fontSize: "17px", fontWeight: "600" }}>
                            Sign up to see photos and videos from your friends.
            </h5>
                        <Button variant="contained" style={{ backgroundColor: '#0095f6', color: 'white' }} >
                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                <FacebookIcon fontSize="small" /> Login with facebook
               </div>             </Button>

                        <br /><br />
                        <div style={{ width: '100%', height: '12px', borderBottom: '1px solid #A9A9A9', textAlign: 'center', color: "#A9A9A9" }}>
                            <span style={{ backgroundColor: 'white', padding: ' 0 10px' }}>
                                OR
             </span>
                        </div>
                        <br />
                        <FormControl className={classes.inputField}>
                            <TextField label="Mobile Number or Email" variant="outlined" />
                            <TextField label="Full Name" variant="outlined" />
                            <TextField label="User name or Email" variant="outlined" />
                            <TextField label="Password" variant="outlined" />

                            <Button variant="contained" style={{ backgroundColor: '#0095f6', color: 'white' }} >
                                Sign Up
             </Button>
                            <div style={{ color: '#C0C0C0', fontSize: '10px' }}>
                                By signing up, you agree to our Terms , Data Policy and Cookies Policy
             </div>


                        </FormControl>
                    </Paper>

                </div>

                <div className={classes.signUpPaper}>
                    <Paper elevation={3}>
                        <div style={{ marginTop: '1.5vw' }}>
                            have an account?<span style={{ color: "#0095F6" }}><Link to="/">Login</Link></span>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Signup
