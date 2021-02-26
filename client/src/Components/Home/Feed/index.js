import React from 'react';
import Stories from './Stories/Stories';
import HomePosts from './HomePost';
import Topbar from '../Topbar/Topbar';
import { withAuthContext } from '../../../context';

import './index.css'

function Feed(props) {
    console.log(props.userDataLoading)
    return (
        <div>

            <Topbar />
            <div className="container" >
                <div className="box">
                    <Stories />
                    <br/>
                    <HomePosts />
                </div>
                {/* <div>
                    <Suggestion />
                </div> */}
            </div>
        </div>
    )
}

export default withAuthContext(Feed);