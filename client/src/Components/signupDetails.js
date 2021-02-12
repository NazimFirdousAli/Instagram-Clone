import React from 'react'

function SignupDetails() {
    return (
        <div>
            <p>Write Details</p>
            <form>
                <label>Upload Picture</label><br />
                <input type="file" id="avatar" name="filename" /><br /><br />
                <input type="radio" id="male" name="gender" value="male"/>
                <label>Male</label>
                <input type="radio" id="female" name="gender" value="female"/>
                <label>Female</label>
                <br/><br/>
                <label>Date Of Birth</label>
                <input type="date"/>
            </form>
        </div>
    )
}

export default SignupDetails
