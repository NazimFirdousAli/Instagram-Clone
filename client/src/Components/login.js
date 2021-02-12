import React, { useState } from 'react'
import { Link } from "react-router-dom";

import Signup from './signup'
import mobile from '../Images/43cc71bb1b43.png'
import instalogo from '../Images/instalogo.png'


import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';
import { FormControlLabel } from '@material-ui/core';


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
    FormInput:{
        

    },
    InputField:{
        height: 50,
        width: 266,
        border: '1px solid #EDEDED'
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
        width: "266",
        border: '1px solid #EDEDED'
    },
    textField1: {
        marginTop: '15px',
        backgroundColor: "#FAFAFA",

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
    para2: {
        textAlign: 'center',
        margin: '60px 30px 10px 60px'
    }
}));

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <img className={classes.mobile} src={mobile} alt='Mobile Phone' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div className={classes.logo}>
                            <img src={instalogo} alt="LOGO" />
                        </div>
                        <div>
                            <FormControl className={classes.FormInput}>
                                <TextField className={classes.InputField}  InputProps={{ disableUnderline: true }} className={classes.textField} FloatingLabelStyle={{ color: 'black' }} id="Username" label="Phonenumber, username, or email" />
                                <TextField  className={classes.InputField}  className={classes.textField1} label='Password' type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        disableUnderline: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                                    {showPassword ? "Hide" : "Show"}
                                                </Button>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </FormControl>
                        </div>
                        <Button style={{ backgroundColor: "#0095F6", color: "white" }} className={classes.buttonLogin} variant="contained" >Log In</Button>
                    </Paper>
                    <Paper className={classes.paper2}>
                        <div className={classes.para1}>
                            <p>Don't have an account? <span style={{ color: "#0095F6" }}><Link to="/Signup">Sign up</Link></span></p>
                        </div>
                    </Paper>
                    <div >
                        <p className={classes.para2}>Get the app.</p>
                    </div>
                </Grid>
            </Grid>
        </div>

    )
}

export default Login
