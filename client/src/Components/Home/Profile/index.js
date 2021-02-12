import React, { useState } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';

// Component
import profilePicture from '../../../Assets/Images/profilePicture.jpg'
import Topbar from '../Topbar/Topbar'
import Tabs from './Tabs'
import './styles.css'
const Profile = () => {
    const [name, setName] = useState('Muhammad Saad Ali')
    const [post, setPost] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)

    return (
        <div >
            <Topbar />
            <br />
            <div>
                <Grid className='flex' container spacing={1}>
                    <img alt="Avatar" src={profilePicture} className="avatar" />
                    <div >

                        <div className='nameSection' >
                            <div className='marginLeft'>{name}</div>

                            <div className='marginLeft'>
                                <button> Edit Profile</button>
                            </div>
                            <div className='marginLeft'>  <SettingsIcon /></div>

                        </div>
                        <div className='nameSection' >
                            <div className='marginLeft row'> <p>Post </p><span>{post}</span> </div>

                            <div className='marginLeft row'>
                                <p> Followers </p><span>{followers}</span>
                            </div>
                            <div className='marginLeft row'>  <p> Following </p> <p> {following} </p> </div>

                        </div>
                        <div className='nameSection' >
                            <div className='marginLeft '> <b> {name} </b> </div>

                        </div>
                    </div>
                </Grid>
            </div>
            <div className='stories'>

                {/* Stories Section */}

            </div>
            <div className=''>
                <Tabs />
            </div>
        </div>
    )
}

export default Profile