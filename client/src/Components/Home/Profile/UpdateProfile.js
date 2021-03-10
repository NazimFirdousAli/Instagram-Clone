import React, { useState, useEffect } from 'react'
import Topbar from '../Topbar/Topbar.js'
import profilePicture from '../../../Images/Lion.jpg'
// import Context from '../../../Context.js'
import _ from 'lodash';


//import context
import { withAuthContext } from '../../../context'


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles'



import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

//GQL
import { gql, useMutation } from '@apollo/client'


const UPDATEUSER = gql`
mutation($name:String!,$email:String!,$phonenumber:String!,$avatar:Upload){
    data: updateDetails(name:$name,email:$email,phonenumber:$phonenumber,avatar:$avatar){
        name,
        phonenumber,
        email,
        avatar
    }
}
`
const UPDATEPASSWORD = gql`
mutation($oldPassword:String!,$newPassword:String!){
    updatePassword(oldPassword:$oldPassword,newPassword:$newPassword)
}
`

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
        marginTop: '60px',
        marginLeft: '20%',
        marginRight: '20%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    indicator: {
        backgroundColor: '#262626',
        left: '0px'
    },
    avatar: {
        width: '9vh',
        height: '9vh',
        borderRadius: '50%',
        border: '1px solid #DBDBDB'
    },
    margin: {
        margin: '0px 0px 50px 0px',
        fontSize: '9px',
        textAlign: 'center',
        color: '#17A2F7'
    },

}));

const initialState = {
    name: '',
    email: '',
    phonenumber: '',
    avatar: {
        file: null,
        preview: ''
    }

}
const initialState1 = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
}



function UpdateProfile({ user }) {
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);
    const [isLoading, setLoading] = useState(true);



    // donot change
    const [previousValues, setPreviousValues] = useState(initialState)
    // changeable
    const [userData, setUserData] = useState(initialState);


    const [password, setPassword] = useState(initialState1)


    const [updateDetails] = useMutation(UPDATEUSER, {
        onCompleted: ({ data }) => {
            setPreviousValues(reformUser(data))
            setUserData(reformUser(data))
            setLoading(false)
        },
        onError: ({ message }) => {
            alert(message)
            setLoading(false)
        }
    })
    // console.log(user)
    const reformUser = (data) => {
        console.log(data)
        const { name, email, phonenumber, ...user } = data;
        const avatar = {
            file: null,
            preview: `/images/${user.avatar}`
        }
        return { name, email, phonenumber, avatar };
    }
    // console.log(reformUser)

    useEffect(() => {
        if (user) {
            setUserData(reformUser(user))
            setPreviousValues(reformUser(user))
            setLoading(false);
        }
    }, [user]);
    

    const handleChangeTab = (event, newValue) => setTabValue(newValue);

    const handleChange = ({ target: { name, value, files } }) => {
        setUserData(prev => ({
            ...prev,
            [name]: name === 'avatar'
                ? {
                    file: files[0],
                    preview: URL.createObjectURL(files[0])
                }
                : value
        }))
    }
    // console.log(userData)
    // console.log(previousValues)



    const formSubmit = (ev) => {
        ev.preventDefault();
        if (!canBeSubmitted()) {
            return console.log("Form is not changed at all...")
        }
        setLoading(true);
        const variables = {
            ...userData,
            avatar: userData.avatar.file
        }
        updateDetails({ variables })
    }
    function canBeSubmitted() {
        return !_.isEqual(previousValues, userData);
    }
    console.log('canBeSubmitted', !canBeSubmitted())

    const [updatepassword] = useMutation(UPDATEPASSWORD, {
        onCompleted: () => {
            alert('Password Changed Sucessfully')
            setPassword(initialState1)
        },
        onError: ({ message }) => {
            alert(message)

        }
    })
    const onFormSubmit = (event) => {
        event.preventDefault();
        if (password.newPassword != password.confirmPassword) {
            alert("New and confirm Password not Match")
        }
        else {
            updatepassword({ variables: password })
        }

    }

    const onPasswordChange = (event) => {
        setPassword(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }









    // include loading from updateProfile api
    if (isLoading) return <h1>Loading</h1>;
    return (
        <div style={{ backgroundColor: '#FAFAFA', minHeight: '100%' }}>
            <Topbar />
            <div className={classes.root} style={{ border: '1px solid #DBDBDB', height: '450px' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    classes={{
                        indicator: classes.indicator
                    }}
                    onChange={handleChangeTab}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Edit Profile" {...a11yProps(0)} />
                    <Tab label="Change Password" {...a11yProps(1)} />
                    <Tab label="Apps and Websites" {...a11yProps(2)} />
                    <Tab label="Email and SMS" {...a11yProps(3)} />
                    <Tab label="Push Notification" {...a11yProps(4)} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '70px' }}>




                        <form onSubmit={formSubmit} >
                            <CardHeader
                                avatar={
                                    <img src={`${userData.avatar.preview}`} className={classes.avatar} alt={userData.name} />
                                }
                                action={
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                    >
                                    </IconButton>
                                }
                                title={userData.name}
                            />
                            <input type='file' className={classes.margin} name='avatar' onChange={handleChange} />
                            <div style={{ textAlign: 'right' }}>
                                <label><b>Username</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input value={userData.name} name="name" onChange={handleChange} type="text" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }} />
                                <br />
                                <br />
                                <label><b>Phone Number</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input value={userData.phonenumber} onChange={handleChange} name="phonenumber" type="number" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }} />
                                <br />
                                <br />
                                <label><b>Email</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input value={userData.email} onChange={handleChange} name="email" type="email" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }} />
                                <br />
                                <br />
                                <br />
                                <div style={{ marginRight: '90px' }}>
                                    <Button disabled={!canBeSubmitted()} type='submit' variant="contained" style={{ backgroundColor: '#17a2f7', color: 'white' }}>
                                        Submit</Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '70px' }}>
                        <form onSubmit={onFormSubmit}>
                            <CardHeader
                                avatar={
                                    <img src={userData.avatar.preview} className={classes.avatar} alt={userData.name} />
                                }
                                action={
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                    >
                                    </IconButton>
                                }
                                title={userData.name}
                            />
                            <div style={{ textAlign: 'right' }}>
                                <label><b>Old Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input onChange={onPasswordChange} name="oldPassword" value={password.oldPassword} type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA' }} required />
                                <br />
                                <br />
                                <label><b>New Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input onChange={onPasswordChange} name="newPassword" value={password.newPassword} type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA' }} required />
                                <br />
                                <br />
                                <label><b>Confirm Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input onChange={onPasswordChange} name="confirmPassword" value={password.confirmPassword} type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA', }} required />
                                <br />
                                <br />
                                <br />
                                <div style={{ marginRight: '90px' }}>
                                    <Button type="submit" variant="contained" style={{ backgroundColor: '#17a2f7', color: 'white' }}>
                                        Change password</Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    Work in progress...
      </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    Work in progress...
      </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    Work in progress...
      </TabPanel>
            </div>

        </div>
    )
}

export default withAuthContext(UpdateProfile)
