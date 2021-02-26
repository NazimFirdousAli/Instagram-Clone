import React, { useState,useContext } from 'react'
import Topbar from '../Topbar/Topbar.js'
import profilePicture from '../../../Images/Lion.jpg'
// import Context from '../../../Context.js'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

//GQL
import { gql } from '@apollo/client'

// const USER = gql`
// query{
//     loggedInUser{
//         name
//         email
//         phonenumber
//         avatar
//     }
// }
// `

const UPDATEUSER = gql`
mutation($name:String!,$email:String!,$phonenumber:String!,$avatar:Upload){
    updateDetails(name:$name,email:$email,phonenumber:$phonenumber,avatar:$avatar){
        name,
        phonenumber,
        email,
        avatar
    }
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
    avatar: ''

}

function UpdateProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [previousValue, setPreviousValue] = useState(initialState)

    // const userValues = useContext(Context)
    // const { data, loading, error } = useQuery(USER)

    // console.log(data)

    function ShowValue(event){
        
    }
    


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const formSubmit = () => {
        
    }
    const updateValues = (event) => {
        // setPreviousValue({
        //     ...data,
        //     [event.target.name]:event.target.value
        // });
        // return(
        //     console.log(previousValue)
        // )
    }
    
    // if (loading) return <h1>Loading</h1>
    return (
        <div style={{ backgroundColor: '#FAFAFA', minHeight: '100%' }}>
            <Topbar />
            <div className={classes.root} style={{ border: '1px solid #DBDBDB', height: '450px' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    classes={{
                        indicator: classes.indicator
                    }}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Edit Profile" {...a11yProps(0)} />
                    <Tab label="Change Password" {...a11yProps(1)} />
                    <Tab label="Apps and Websites" {...a11yProps(2)} />
                    <Tab label="Email and SMS" {...a11yProps(3)} />
                    <Tab label="Push Notification" {...a11yProps(4)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '70px' }}>
                        <form onSubmit={formSubmit} >
                            <CardHeader
                                avatar={
                                    <img src={profilePicture} className={classes.avatar} alt='Saad' />
                                }
                                action={
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                    >
                                    </IconButton>
                                }
                                title="Username"
                            />
                            <input type='file' className={classes.margin}/>
                            <div style={{ textAlign: 'right' }}>
                                <label><b>Username</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input name="name" onChange={updateValues} type="text" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }}></input>
                                <br />
                                <br />
                                <label><b>Phone Number</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input onChange={updateValues} name="phonenumber" type="number" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }}></input>
                                <br />
                                <br />
                                <label><b>Email</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input onChange={updateValues} name="email" type="email" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }}></input>
                                <br />
                                <br />
                                <br />
                                <div style={{ marginRight: '90px' }}>
                                    <Button type='submit' variant="contained" style={{ backgroundColor: '#17a2f7', color: 'white' }}>
                                        Submit</Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '70px' }}>
                        <form>
                            <CardHeader
                                avatar={
                                    <img src={profilePicture} className={classes.avatar} alt='Saad' />
                                }
                                action={
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                    >
                                    </IconButton>
                                }
                                title='USERNAME'
                            />
                            <div style={{ textAlign: 'right' }}>
                                <label><b>Old Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA' }}></input>
                                <br />
                                <br />
                                <label><b>New Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA' }}></input>
                                <br />
                                <br />
                                <label><b>Confirm Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA', }}></input>
                                <br />
                                <br />
                                <br />
                                <div style={{ marginRight: '90px' }}>
                                    <Button variant="contained" style={{ backgroundColor: '#17a2f7', color: 'white' }}>
                                        Change password</Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Work in progress...
      </TabPanel>
                <TabPanel value={value} index={3}>
                    Work in progress...
      </TabPanel>
                <TabPanel value={value} index={4}>
                    Work in progress...
      </TabPanel>
            </div>

        </div>
    )
}

export default UpdateProfile
