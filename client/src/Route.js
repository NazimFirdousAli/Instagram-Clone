import React from 'react'
import Signup from './Components/signup.js'
import Login from './Components/login.js'
import SignupDetails from './Components/signupDetails.js'
import Feed from './Components/Home/Feed/index.js'
import AuthenticationRoute from './Components/authenticationRoute.js'


// import Feed from './Components/Home/Feed/index.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

function onError (){
    return(
        <div>Error 404 page not found</div>
    )
}

const RouteConfig = () => {
    return (
        <div>
            
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/Signup" component={Signup}/>
                    {/* <Route exact path="/Feed" component={Feed}/> */}
                    <Route exact path="/Signup" component={Signup}/>
                    <Route exact path="/AddDetails" component={SignupDetails}/>
                    <AuthenticationRoute  path="/Feed" component={Feed}/>
                    <Route path="*" component={onError}/>
                        
                    
                    

                </Switch>
            </Router>

        </div>
    )
}

export default RouteConfig
