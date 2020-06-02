import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import LoginService from "../../services/LoginService";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom"

class Register
    extends React.Component {
    constructor() {
        super();
        this.loginService = LoginService.getInstance();
        this.state = {
            username: '',
            password: '',
            verifyPassword: '',
            type: '',
            account: {}
        }
        this.createUser= this.createUser.bind(this)
    }

    async createUser() {

        if (this.state.password !== this.state.verifyPassword) {
            this.props.history.push('./registerFailed');
        }
        else {
            var success = await this.loginService.createAccount(
                {
                    username: this.state.username,
                    password: this.state.password,
                    type: this.state.type
                }
            )
            
            if (success) {
                this.props.history.push('./registerSuccessfulNotification');
            } else {
                this.props.history.push('./userAlreadyExist');
            }
        }
    }

    usernameChanged = event =>
        this.setState({username: event.target.value});

    passwordChanged = event =>
        this.setState({password: event.target.value});

    verifyPasswordChanged = event =>
        this.setState({verifyPassword: event.target.value});

    usertypeChanged = event =>
        this.setState({type: event.target.value});

    render() {
        return (
            <div>
                <div className="container">
                <div className="row">
                    <h1>Sign Up</h1>
                </div>

                <form>
                    <div className="form-group row">
                        <label htmlFor="usernameFld"
                               className="username col-sm-2 col-form-label">
                            Username
                        </label>
                        <div className="col-sm-8">
                            <input className="form-control"
                                   id="usernameFld"
                                   placeholder="username"
                                   onChange={this.usernameChanged}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="passwordFld" className="password col-sm-2 col-form-label">
                            Password
                        </label>
                        <div className="col-sm-8">
                            <input type="password"
                                   className="form-control wbdv-password-fld"
                                   id="passwordFld"
                                   placeholder="password123"
                                   onChange={this.passwordChanged}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="verifyPasswordFld" className="password2 col-sm-2 col-form-label">
                            Verify Password
                        </label>
                        <div className="col-sm-8">
                            <input type="password"
                                   className="form-control wbdv-password-fld"
                                   id="verifyPasswordFld"
                                   placeholder="password123"
                                   onChange={this.verifyPasswordChanged}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="userType" className="userType col-sm-2 col-form-label">
                            User Type
                        </label>

                        <label className="col-5">
                            <input name="a"
                                   type="radio"
                                   onClick={this.usertypeChanged}
                                   value="Regular"/>
                                   Regular User
                        </label>

                        <label className="col-4 float-right">
                            <input name="a"
                                   type="radio"
                                   onClick={this.usertypeChanged}
                                   value="Admin"/>
                                   Admin User
                        </label>

                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"/>
                        <div className="col-sm-8">
                            <Button id="registerBtn"
                                    className="btn btn-primary btn-block"
                                    onClick={this.createUser}
                                    style={{color: 'white'}}>
                                    Sign up
                            </Button>
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/login">
                                        Log in
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

export default withRouter(Register);
