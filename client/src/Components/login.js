import React, { useState } from 'react'
import { Link, useHistory, Redirect } from "react-router-dom";
// import useWebAnimations, { fadeIn } from "@wellyshen/use-web-animations";
import { gql, useMutation } from '@apollo/client'
import AUTH_TOKEN from './constants.js'




import mobile from '../Images/43cc71bb1b43.png'
import instalogo from '../Images/instalogo.png'
// import mobilePic1 from '../Images/9144d6673849.jpg'
// import mobilePic2 from '../Images/177140221987.jpg'
// import mobilePic3 from '../Images/ff2c097a681e.jpg'



import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#FAFAFA",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: "#FFFFFF",
        height: '400px',
        width: '320px',
        marginTop: '30px',
        border: '1px solid #FAFAFA '


    },
    mobile: {
        marginLeft: '40%',
        marginTop: '33px'
    },
    logo: {
        marginTop: '5px'
    },
    InputField: {
        border: '1px solid #EDEDED',
    },
    paper2: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: "#FFFFFF",
        height: '41px',
        width: '320px',
        marginTop: '13px',
    },
    textField: {
        marginTop: '20px',
        backgroundColor: "#FAFAFA",
        height: '50',
        width: "255px",
        border: '1px solid #EDEDED',
        paddingLeft: "6px",
        borderRadius: '3px'
    },
    textField1: {
        marginTop: '15px',
        backgroundColor: "#FAFAFA",
        border: '1px solid #EDEDED',
        paddingLeft: "6px",
        borderRadius: '3px'

    },
    buttonLogin: {
        backgroundColor: "#0095f6",
        height: 30,
        width: 266,
        marginTop: '20px'
    },
    para1: {
        fontSize: '14px',
        margin: '15px',
    },
}));

const LOGIN = gql`
mutation($email:String!, $password:String!){
    Login(email:$email,password:$password){
        token
        user{
            id
            name
            email
            password
            avatar
        }
    }
}

`
const initialState = {
    email: '',
    password: ''
}

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const classes = useStyles();
    // const { ref } = useWebAnimations({ ...fadeIn });

    const [Form, setForm] = useState(initialState)
    const onFormChange = (event) => {
        setForm({
            ...Form,
            [event.target.name]: event.target.value
        })
    }

    const history = useHistory();
    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {

            console.log(data)
            localStorage.setItem(AUTH_TOKEN, data.Login.token)
            history.push('/Feed')
            console.log(localStorage)

        },
        onError: ({message}) => {
            alert(message)
        }
    })

    const onValueChange = (event) => {
        event.preventDefault();

        if (localStorage.getItem("authentication_secret_token") === null) {
            console.log(Form)
            login({ variables: Form })
        }
        else {
            alert("User already exist")
            console.log(localStorage)
        }

    }

    if (localStorage.getItem(AUTH_TOKEN)) return <Redirect to='/Feed' />
    return (
        <div className={classes.root}>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <div>
                        <img className={classes.mobile} src={mobile} alt='Mobile Phone' />
                        {/* <img src={mobilePic1} className="target" ref={ref} />
                    <img src={mobilePic2} className="target" ref={ref} />
                    <img src={mobilePic3} className="target" ref={ref} />
                     */}
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div className={classes.logo}>
                            <img src={instalogo} alt="LOGO" />
                        </div>
                        <div>
                            <form className={classes.FormInput} onSubmit={onValueChange} >
                                <TextField name="email" onChange={onFormChange} className={classes.InputField} className={classes.textField} InputProps={{ disableUnderline: true }} InputLabelProps={{ style: { color: '#9B8E9B', paddingLeft: "5px", fontSize: "15px", fontFamily: "Segoe UI" }, }} id="Username" label="Enter email" required />
                                <TextField name="password" onChange={onFormChange} className={classes.InputField} className={classes.textField1} InputLabelProps={{ style: { color: '#9B8E9B', paddingLeft: "5px", fontSize: "15px", fontFamily: "Segoe UI" }, }} label='Password' type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        disableUnderline: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button style={{ fontSize: "12px" }} aria-label="toggle password visibility" onClick={toggleShowPassword}>
                                                    {showPassword ? "Hide" : "Show"}

                                                </Button>
                                            </InputAdornment>
                                        )
                                    }}
                                    required />
                                <Button type='submit' style={{ backgroundColor: "#0095F6", color: "white" }} className={classes.buttonLogin} variant="contained" >Log In</Button>
                            </form>
                        </div>
                    </Paper>
                    <Paper className={classes.paper2}>
                        <div className={classes.para1}>
                            <p>Don't have an account? <Link to="/Signup" style={{ textDecoration: 'none' }}><span style={{ color: "#0095F6" }}>Sign up</span></Link></p>
                        </div>
                    </Paper>

                </Grid>
            </Grid>
        </div>

    )
}

export default Login
