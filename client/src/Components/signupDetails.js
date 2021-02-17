import React, { useState } from 'react'


import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';









const useStyles = makeStyles((theme) => ({
    root: {

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
        }
    },
    avatar: {
        marginLeft: '35%',
        marginTop: '20px'

    },
    avatarLarge: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    iconButton: {
        marginLeft: '70px',
        marginTop: '-30px'

    },
    radioButton: {
        marginLeft: '70px'
    },
    birthday: {
        marginLeft: '70px'

    },
    buttonSignup: {
        marginLeft: '38%'
    }


}));

const initialState = {
    avatar: '',
    gender: '',
    dateofbirth: ''
}

function SignupDetails() {
    const classes = useStyles()
    const [form, setForm] = useState(initialState)

    const onFormChange = (event) => {
        const { name, type, value } = event.target

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

    const submitForm = () => {
        console.log(form)

    }

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className={classes.paper}>
                    <Paper elevation={2}>
                        <br />
                        <form onSubmit={submitForm}>
                            <div className={classes.avatar}>
                                <Avatar className={classes.avatarLarge} alt="Remy Sharp" src="" />

                                <input style={{ display: 'none', }} id="icon-button-file" name="avatar" type="file" onChange={onFormChange} />
                                <label htmlFor="icon-button-file">
                                    <IconButton style={{ color: "#0095F6" }} className={classes.iconButton} aria-label="upload picture" component="span" type>
                                        <PhotoCamera />
                                    </IconButton>
                                </label>

                                <br /><br />

                            </div>
                            <div className={classes.radioButton}>
                                <FormLabel component="legend" style={{ fontSize: 20 }}><b>Gender</b></FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" style={{ marginTop: '8px' }} name="gender" onChange={onFormChange}  >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" style={{ marginTop: '-9px' }} control={<Radio />} label="Male" />
                                </RadioGroup>
                            </div>
                            <br /> <br />
                            <div className={classes.birthday}>
                                <FormLabel component="legend" style={{ fontSize: 20 }}><b>Date Of Birth</b></FormLabel>
                                <TextField
                                    id="date"
                                    type="date"
                                    name="dateofbirth"
                                    defaultValue="2017-05-24"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={onFormChange}
                                />
                            </div>
                            <br /><br />
                            <Button type='submit' style={{ backgroundColor: "#0095F6", color: "white" }} className={classes.buttonSignup} variant="contained" >Register</Button>

                        </form>
                    </Paper>
                </div >
            </div >
        </div>
    )
}

export default SignupDetails
