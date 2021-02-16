import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, TextareaAutosize, FormControl, FormLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Settings() {
    const classes = useStyles();

    return (
        <Grid container >


            <input accept="image/*" style={{ display: 'none', }} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
                <span> Upload an Image </span>
            </label>
            <TextField id="standard-basic" label="Name" />
            <TextField id="standard-basic" label="Username" />
            <TextField id="standard-basic" label="Website" />
            <TextareaAutosize rowsMin={3} id="standard-basic" placeholder="Bio" />
            <TextField id="standard-basic" label="Phone number" type="number" />
            <TextField id="standard-basic" label="Gender" />

        </Grid>
    );
}
