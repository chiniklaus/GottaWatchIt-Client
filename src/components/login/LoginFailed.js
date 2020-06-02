import React from 'react'

import {BrowserRouter as Link} from 'react-router-dom'

class LoginFailed
    extends React.Component {

    render() {
        return (
            <div className="container">
                <h1 style={{color: 'white'}}>row</h1>
                <h1 style={{color: 'white'}}>row</h1>
                <h2>Username or password incorrect. Please <Link to="/login">try again</Link></h2>
            </div>
        )
    }
}

export default LoginFailed;
