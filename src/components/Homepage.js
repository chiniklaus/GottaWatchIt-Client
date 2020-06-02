import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SearchResult from "./SearchResult";
import MovieDetail from "./MovieDetail";
import Login from "./Login";
import Register from "./Register";
import RegisterSuccessfulNotification from "./RegisterSuccessfulNotification";
import LoginFailed from "./LoginFailed";
import RegisterFailedNotification from "./RegisterFailedNotification";
import UserAlreadyExist from "./UserAlreadyExist";
import Profile from "./Profile";
import NavBar from "./NavBar"
import bgv from '../1.mp4';
import { MDBMask, MDBView } from "mdbreact";

export default class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            login: false,
            username: ''
            
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/currentUser", {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(currentUser => {
            if (currentUser.id !== -1) {
                this.setState({
                    login: true,
                    username: currentUser.username
                })
            }
        })
    }

    render() {
        return(
            //<div style={{backgroundImage: 'url(images/1.jpg)' }}>
            <div>
                <Router>
                    <Route path='/' render={() => <NavBar status={this.state.login} username={this.state.username}/>} />

                    <Route exact path='/' render={() => 
                                <MDBView hover>
                                    <video autoPlay muted loop>
                                        <source src={bgv} type="video/mp4"/>
                                        <h1>marvel sucks!</h1>
                                    </video>
                                    <MDBMask className="flex-center" overlay="black-strong">
                                        <p className="yellow-text text-center" style={{fontSize: 100}}>
                                            Marvel Sucks, DC is the best
                                        </p>
                                    </MDBMask>
                                </MDBView>
                    } />

                    <Route exact path="/registerSuccessfulnotification" component={RegisterSuccessfulNotification}/>

                    <Route exact path="/registerFailed" component={RegisterFailedNotification}/>

                    <Route exact path="/userAlreadyExist" component={UserAlreadyExist}/>

                    <Route exact path="/loginFailed" component={LoginFailed}/>

                    <Route exact path="/login" component={Login}/>

                    <Route exact path="/register" component={Register}/>

                    <Route exact path="/searchResult/:keyword" component={SearchResult}/>

                    <Route exact path="/search/detail/:id" 
                                    render={() => <MovieDetail />}/>
                    
                    <Route path="/profile/:username" render={(props) => <Profile {...props} username={this.state.username} />}/>
               
                </Router>
            </div>
        )
    }
}