import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SearchResult from "../search/SearchResult";
import MovieDetail from "../movie/MovieDetail";
import Login from "../login/Login";
import Register from "../login/Register";
import RegisterSuccessfulNotification from "../login/RegisterSuccessfulNotification";
import LoginFailed from "../login/LoginFailed";
import RegisterFailedNotification from "../login/RegisterFailedNotification";
import UserAlreadyExist from "../login/UserAlreadyExist";
import Profile from "../profile/Profile";
import NavBar from "../login/NavBar"
import HomepageRecommendations from "./HomepageRecommendations"

export default class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            login: false,
            username: '',
            currentUser: {},
            recs: []
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
                    username: currentUser.username,
                    currentUser: currentUser
                })
            }
        })

        fetch("http://localhost:8080/api/recommendation/all", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(recs => {
            this.setState({
                recs: recs
            })
        })
    }

    render() {
        return(
            <div>
                <Router>
                    <Route path='/' render={() => <NavBar status={this.state.login} username={this.state.username}/>} />

                    <Route exact path='/' render={(props) => 
                                <HomepageRecommendations {...props} recs={this.state.recs} navigate={this.navigate}/>
                    } />

                    <Route exact path="/registerSuccessfulnotification" component={RegisterSuccessfulNotification}/>

                    <Route exact path="/registerFailed" component={RegisterFailedNotification}/>

                    <Route exact path="/userAlreadyExist" component={UserAlreadyExist}/>

                    <Route exact path="/loginFailed" component={LoginFailed}/>

                    <Route exact path="/login" component={Login}/>

                    <Route exact path="/register" component={Register}/>

                    <Route exact path="/searchResult/:keyword" component={SearchResult}/>

                    <Route exact path="/search/detail/:id" 
                                    render={(props) => <MovieDetail {...props} username={this.state.username}/>}/>
                    
                    <Route path="/profile/:username" render={(props) => <Profile {...props} username={this.state.username} />}/>
               
                </Router>
            </div>
        )
    }
}