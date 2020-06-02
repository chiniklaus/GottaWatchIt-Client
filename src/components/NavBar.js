import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import LoginService from "../services/LoginService";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.loginService = LoginService.getInstance();
        this.state = {
            keyword: ''
        }
        this.logout= this.logout.bind(this)
    }

    async logout() {
        await this.loginService.logout()
        window.location.href = '/';
    }

    keywordChanged = event =>
        this.setState({keyword: event.target.value});

    render() {
        return(
            <div>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand style={{color: 'red'}}>
                        <Link to="/" style={{color: 'red'}}>
                                NU-Movies
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            {this.props.status &&
                                <Nav className="mr-auto">
                                    <Link className="nav-link" to={'/profile/' + this.props.username} style={{color: 'white'}}>
                                            Profile
                                    </Link>
                                    <Link className="nav-link" to="/" style={{color: 'white'}} onClick={this.logout}>
                                            Logout
                                    </Link>
                                </Nav>
                            }
                            {!this.props.status &&
                                <Nav className="mr-auto">
                                    <Link className="nav-link" to="/login" style={{color: 'white'}}>
                                            Login
                                    </Link>
                                    <Link className="nav-link" to="/register" style={{color: 'white'}}>
                                            Register
                                    </Link>
                                </Nav>
                            }
                            <Form inline>
                                <FormControl value={this.state.keyword}
                                             onChange={this.keywordChanged}
                                             type="text"
                                             placeholder="Search"
                                             className="mr-sm-2"/>
                                <Button variant="outline-success">
                                        <Link to={`/searchResult/${this.state.keyword}`} 
                                            style={{color: 'green'}}>
                                            Search
                                        </Link>
                                </Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
            </div>
        )
    }
}