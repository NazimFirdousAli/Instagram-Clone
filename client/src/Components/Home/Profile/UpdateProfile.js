import React from 'react'
import Topbar from '../Topbar/Topbar.js'
import profilePicture from '../../../Images/Lion.jpg'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';





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
        margin: '-50px 0px 0px 0px',
        fontSize: '9px',
        textAlign: 'center',
        color: '#17A2F7'
    },

}));



function UpdateProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={value} index={0}>
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
                            <Button className={classes.margin}>
                                Update Picture
                                </Button>
                            <div style={{ textAlign: 'right' }}>
                                <label><b>Username</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }}></input>
                                <br />
                                <br />
                                <label><b>Phone Number</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="number" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }}></input>
                                <br />
                                <br />
                                <label><b>Email</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="email" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }}></input>
                                <br />
                                <br />
                                <br />
                                <div style={{ marginRight: '90px' }}>
                                    <Button variant="contained" style={{ backgroundColor: '#17a2f7', color: 'white' }}>
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
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px',backgroundColor:'#FAFAFA' }}></input>
                                <br />
                                <br />
                                <label><b>New Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px',backgroundColor:'#FAFAFA' }}></input>
                                <br />
                                <br />
                                <label><b>Confirm Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px',backgroundColor:'#FAFAFA', }}></input>
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
                    Item Three
      </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
      </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
      </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
      </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
      </TabPanel>
            </div>

        </div>
    )
}

export default UpdateProfile
