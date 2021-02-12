import React from 'react'
import Grid from '@material-ui/core/Grid';

import profilePicture from '../../../Assets/Images/profilePicture.jpg'
import './styles.css'


export default function Posts() {

    return (
        <Grid container spacing={1} className="Posts">

            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
            <Grid item > <img alt="Posts" src={profilePicture} className="pictures" /> </Grid>
        </Grid >
    )
}
