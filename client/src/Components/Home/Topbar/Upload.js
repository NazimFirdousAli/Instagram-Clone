import { React, useState } from 'react'
import TopBar from './Topbar.js'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import pleaseUploadImage  from '../../../Images/UploadImage.jpg'


import { Button } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';

import { Link, useHistory, Redirect } from "react-router-dom";
import { gql, useMutation,useQuery } from '@apollo/client'



const ShowData =  gql`
query {
  loggedInUser {
    name,
    email,
    avatar

  }
}
`

const CREATEPOST = gql`
mutation($picture:Upload!, $content:String!){
    createPost(picture:$picture,content:$content){
        picture
        content
    }
}

`

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginLeft: '35%',
        marginTop: '5%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    textField: {
        backgroundColor: '#B0B0B0',
        borderRadius: '4px',
        width: '310px',
        marginLeft: '20px'
    }

}));

const initialState = {
    picture: '',
    content: ''
}

// const [open, setOpen] = React.useState(false);

// const handleOpen = () => {
//   setOpen(true);

// }
// const handleClose = () => {
//   setOpen(false);
// };



function UploadPictures({handleClose}) {
    const classes = useStyles();
    const [form, setForm] = useState(initialState)
    const [imagePreview, setImagePreview] = useState(pleaseUploadImage)
    const history = useHistory();
    const {data,loading} = useQuery(ShowData);
    const [createPost] = useMutation(CREATEPOST, {
        onCompleted: () => {
            setForm(initialState)
            alert("POST ADDED")
        },
        onError: ({ message }) => {
            // <Alert severity="error">error</Alert>
            alert(message)

        }
    })


    const onFormChange = (event) => {
        const { name, type, value } = event.target
        if (type == 'file') {
            setImagePreview( URL.createObjectURL(event.target.files[0]))
            setForm({
                ...form,
                picture: event.target.files[0]
            })
        }
        else {
            setForm({
                ...form,
                [event.target.name]: event.target.value
            })
        }
    }


    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log(form)
        createPost({ variables: form })
    }
    return (
        <div>
            <Card className={classes.root}>
                <CancelIcon onClick={handleClose}/>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={`/images/${data.loggedInUser.avatar}`} ></Avatar>
                    }
                    title={data.loggedInUser.name}
                />
                <form onSubmit={onFormSubmit}>
                    <img id="image-file" alt="Please add the image" src={imagePreview} height="200px" width="200px" style={{marginLeft:"20%"}} required/><br />
                    <input type="file" id="picture" name="picture" accept="image/*" onChange={onFormChange} required/>
                    <TextField name="content" type="text" className={classes.textField} InputProps={{ disableUnderline: true }} InputLabelProps={{ style: { color: 'black', paddingLeft: "5px", fontSize: "15px", fontFamily: "Segoe UI" }, }} label="Caption" onChange={onFormChange} required />
                    <br/>
                    <Button type='submit' style={{ backgroundColor: "#0095F6", color: "white", marginLeft: '40%' }} variant="contained" >Post</Button>
                </form>
            </Card>

        </div>
    )
}

export default UploadPictures
