import React, { useState } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';

// Component
import profilePicture from '../../../Images/Lion.jpg'
import Topbar from '../Topbar/Topbar'
import Tabs from './Tabs'
import './styles.css'



import {gql,useQuery } from '@apollo/client'
// import { Token } from 'graphql';

const ShowData =  gql`
query {
  loggedInUser {
    name,
    email,
    avatar

  }
}
`


const Profile = () => {
    const {data, loading} = useQuery(ShowData);
    console.log(data)
    const [post, setPost] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    if (loading || !data) return <h3>loading...</h3>
    return (
        <div >
            <Topbar />
            <br />
            <div>
                <Grid className='flex' container spacing={1}>
                    <img alt="Avatar" src={`/images/${data.loggedInUser.avatar}`} className="avatar" />
                    <div >

                        <div className='nameSection' >
                            <div className='marginLeft'>{data.loggedInUser.name}</div>

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
                            <div className='marginLeft '> <b>{data.loggedInUser.name}</b> </div>

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