import React from 'react';
import Stories from './Stories/Stories';
import HomePosts from './HomePost';
import Topbar from '../Topbar/Topbar';
import Suggestion from './Suggestion/Suggestion'
import './index.css'

export default function Feed() {
    return (
        <div>

            <Topbar />
            <div className="container" >
                <div className="box">
                    <Stories />
                    <HomePosts />
                </div>
                <div>
                    <Suggestion />
                </div>
            </div>
        </div>
    )
}
