import React from 'react'


import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';






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
        avatar:{
            marginLegt:'100px'

        },
        avatarLarge: {

            width: theme.spacing(55),
            height: theme.spacing(55),

        }
    }


}));



function SignupDetails() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className={classes.paper}>
                    <Paper elevation={2}>
                        <br />
                        <div className={classes.avatar}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatarLarge} />
                        </div>

                    </Paper>

                </div>

            </div>
        </div>
    )
}

export default SignupDetails
