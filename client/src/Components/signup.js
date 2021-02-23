import { React, useState, useEffect,createContext } from 'react'
import { Link } from "react-router-dom";
import { gql, useMutation } from '@apollo/client'
import AUTH_TOKEN from './constants.js'
import { Redirect,useHistory } from 'react-router-dom'

import instalogo from '../Images/instalogo.png'

// import from '@material-ui';
import { Paper, FormControl, TextField, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from '@material-ui/core/styles';
import 'react-phone-number-input/style.css'
import PhoneInput,{ formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import { parsePhoneNumber } from 'react-phone-number-input'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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
            height: theme.spacing(105),
        },
    },
    inputField: {
        '& > *': {

            margin: theme.spacing(1),
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '35ch',
            height: '6ch',
            marginBottom: '16px'

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
     signUp(name:$name,email:$email,password:$password, phonenumber:$phonenumber,gender:$gender,avatar:$avatar,dateofbirth:$dateofbirth){
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
const initialState = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    phonenumber: '',
    gender: '',
    avatar: '',
    dateofbirth: '',
    token: ''
}
function Signup() {
    const [form, setForm] = useState(initialState)
    const [countryCode, setCountryCode] = useState('');
    
    // console.log({ countryCode })
    
    const data = createContext(form)

    useEffect(() => {
        fetch('https://extreme-ip-lookup.com/json/')
            .then((res) => res.json())
            .then(({ countryCode }) => setCountryCode(countryCode))
            .catch((data, status) => console.log('Request failed:', data, status));
    }, []);


    const classes = useStyles()

    const [signUp] = useMutation(SIGNUP, {
        onCompleted: () => {
            setForm(initialState)
        },
        onError: ({ message }) => {
            // <Alert severity="error">error</Alert>
            alert(message)

        }
    })
    const onFormChange = (event) => {
        console.log(event)
        if(event)
        if (typeof event === 'string' || !event) {
            setForm({ ...form, phonenumber: event || '' })
        } 
        else {
            const { name, type, value } = event.target
            console.log({type})
            if (type == 'file') {
                // console.log(event.target.files[0])
                setForm({
                    ...form,
                    avatar: event.target.files[0]

                })
            }
            else {
                setForm({
                    ...form,
                    [event.target.name]: event.target.value,

                })
            }
        }
    }
    const history = useHistory();
    const submitForm = (event) => {
        event.preventDefault();
        if (form.password !== form.confirmpassword) {
            alert("Password Not Matched")
        }
        else {
            // form.avatar = form.avatar.replace(/C:\\fakepath\\/i, '')
            signUp({ variables: form })
            console.log(form)
            history.push('/Signup/details')
            

        }

    }
    // console.log(extreme-ip-lookup.com/json/)

    // console.log(typeof form.phonenumber, form.phonenumber)

    if (localStorage.getItem(AUTH_TOKEN)) return <Redirect to='/Feed' />

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
                        <form className={classes.inputField} onSubmit={submitForm} >
                            {/* helperText="incorrect entry" */}
                            <PhoneInput international defaultCountry={countryCode} name="phonenumber" onChange={onFormChange} required />
                            <TextField name="name" onChange={onFormChange} type="text" label="Full Name" variant="outlined" required />
                            <TextField name="email" onChange={onFormChange} type="email" label="Email" variant="outlined" required />
                            <TextField name="password" onChange={onFormChange} type="password" label="Password" variant="outlined" required />
                            <TextField name="confirmpassword" onChange={onFormChange} type="password" label="Confirm Password" variant="outlined" required />
                            <input type="file" id="avatar" name="avatar" onChange={onFormChange} /><br /><br />


                            <Button type="submit" variant="contained" style={{ backgroundColor: '#0095f6', color: 'white' }} >
                                Sign Up
             </Button>
                            <div style={{ color: '#C0C0C0', fontSize: '10px' }}>
                                By signing up, you agree to our Terms , Data Policy and Cookies Policy
             </div>


                        </form>
                    </Paper>

                </div>

                <div className={classes.signUpPaper}>
                    <Paper elevation={3}>
                        <div style={{ marginTop: '1.5vw' }}>
                            have an account?  <Link to="/" style={{ textDecoration: 'none' }}><span style={{ color: "#0095F6" }}>Login</span></Link>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Signup
