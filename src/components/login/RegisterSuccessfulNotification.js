import React from 'react'
import {BrowserRouter as Link} from 'react-router-dom'

export default class RegisterSuccessfulNotification extends React.Component {

    render() {
        return(
            <div className="container">
                <form>
                    <div className="row" style={{color: 'white'}}>
                        row
                    </div>
                    <div className="row" style={{color: 'white'}}>
                        row
                    </div>
                    <div className="row" style={{color: 'white'}}>
                        row
                    </div>
                    <div className="row" style={{color: 'white'}}>
                        row
                    </div>
                    <div className="row" style={{color: 'white'}}>
                        row
                    </div>
                    <div>
                        <h2>Register successful! Please</h2>
                        <h2>
                            <Link to="/login">
                                login
                            </Link>
                        </h2>
                    </div>
                </form>
            </div>
        )
    }
}
