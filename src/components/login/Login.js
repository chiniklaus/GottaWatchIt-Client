import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import { withRouter } from "react-router-dom"
import {Button} from 'react-bootstrap'
import LoginService from "../../services/LoginService";

class Login
    extends React.Component {
    constructor(props) {
        super(props);
        this.loginService = LoginService.getInstance();
        this.state = {
            username: '',
            password: ''
        }
        this.verifyUser= this.verifyUser.bind(this)
    }

    async verifyUser() {
        var success = await this.loginService.verifyAccount(
            {
                username: this.state.username,
                password: this.state.password
            }
        )
        if (success) {
            window.location.href = '/';
        } else {
            this.props.history.push('/loginFailed');
        }
    }

    usernameChanged = event =>
        this.setState({username: event.target.value});

    passwordChanged = event =>
        this.setState({password: event.target.value});

    render() {
        return (
            <div>
                <div className="container mt-5">
                <h1>Sign In</h1>
                <form>
                    <div className="form-group row username">
                        <label htmlFor="username" onChange={this.keywordChanged} className="col-sm-2 col-form-label">
                            Username
                        </label>

                        <div className="col-sm-8">
                            <input className="form-control"
                                   id="username"
                                   placeholder="username"
                                   onChange={this.usernameChanged}>
                            </input>
                        </div>

                    </div>

                    <div className="form-group row password">
                        <label htmlFor="password" className="col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-8 pt-2">
                            <input type="password"
                                   className="form-control wbdv-password-fld"
                                   id="password"
                                   placeholder="password123"
                                   onChange={this.passwordChanged}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"/>
                        <div className="col-sm-8 pt-2">
                            <Button className="btn-primary btn-block btn-signIn"
                                    onClick={this.verifyUser}>
                                Sign In
                            </Button>
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/register">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

export default withRouter(Login);
