import React, { useState } from 'react';

import './style.css'
import lion from '../../../../Images/Lion.jpg'

export default function Suggestion() {
    const [name, setName] = useState('Nazim Firdous Ali')
    const [userName, setUserName] = useState('NMW@gmail.com')

    return (
        <div className='main'>
            <div className='myProfile'>

                <div className='image'>

                    <img alt="avater" src={lion} className="avatar" />
                </div>
                <div className='myName'>
                    <p><strong>{userName}</strong></p>
                    <p className='gray'>{name}</p>
                </div>
            </div>

            <div className="suggestion">

                <p> Suggestion for You </p>
                <p style={{ marginLeft: '10%' }} > See all</p>

            </div>


            <div className='suggestionProfile'>

                <div className='image'>

                    <img alt="avater" src={lion} className="suggestionAvatar" />
                </div>
                <div className='suggestionName'>
                    <p><strong>{userName}</strong></p>
                    <p className='gray'>Suggestion for you </p>
                </div>
            </div>
            <div className='suggestionProfile'>

                <div className='image'>

                    <img alt="avater" src={lion} className="suggestionAvatar" />
                </div>
                <div className='suggestionName'>
                    <p><strong>{userName}</strong></p>
                    <p className='gray'>Suggestion for you </p>
                </div>
            </div>
            <div className='suggestionProfile'>

                <div className='image'>

                    <img alt="avater" src={lion} className="suggestionAvatar" />
                </div>
                <div className='suggestionName'>
                    <p><strong>{userName}</strong></p>
                    <p className='gray'>Suggestion for you </p>
                </div>
            </div>
            <div className='suggestionProfile'>

                <div className='image'>

                    <img alt="avater" src={lion} className="suggestionAvatar" />
                </div>
                <div className='suggestionName'>
                    <p><strong>{userName}</strong></p>
                    <p className='gray'>Suggestion for you </p>
                </div>
            </div>
        </div>
    )

}
