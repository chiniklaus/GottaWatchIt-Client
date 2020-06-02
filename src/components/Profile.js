import React from 'react'
import { MDBIcon } from "mdbreact";
import {Button, Modal} from 'react-bootstrap'
import AccountUpdateService from "../services/AccountUpdateService";
import LoginService from "../services/LoginService";
import SearchService from "../services/SearchService";
import ProfileLikeMovie from "./ProfileLikeMovie";
import ProfileFavoriteMovie from './ProfileFavoriteMovie'

class Profile
    extends React.Component {
    constructor(props) {
        super(props)
        this.loginService = LoginService.getInstance();
        this.accountUpdateService = AccountUpdateService.getInstance();
        this.state = {
            currentUser: {},
            likes: [],
            favorite: [],
            favoriteMovieObject: {},
            show: false,
            showWarning: false,
            newUsername: '',
            newPassword: '',
            confirmPassword: '',
            loggedIn: false
        }
        this.navigate = this.navigate.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleWarningShow = this.handleWarningShow.bind(this)
        this.handleWarningClose = this.handleWarningClose.bind(this)
        this.editAccount = this.editAccount.bind(this)
    }

    async getCurrentUser() {
        var owner = window.location.pathname.split('/')[2]
        if (owner == this.props.username) {
            var user = await this.loginService.currentUser()
                this.setState({
                    currentUser: user,
                    likes: user.likeActions,
                    favorite: user.favorite,
                    loggedIn: true
                })

                var len = this.state.likes.length
                if (this.state.favorite !== null) {
                    var searchResult = await SearchService.getInstance().searchMovieByID(this.state.favorite.movie.imdbid)
                    this.setState({favoriteMovieObject: searchResult})
                }
        } else {
            console.log('here')
            var user = await this.loginService.getUser(owner)
            this.setState({
                currentUser: user,
                likes: user.likeActions,
                favorite: user.favorite,
                loggedIn: false
            })

            var len = this.state.likes.length
            if (this.state.favorite !== null) {
                var searchResult = await SearchService.getInstance().searchMovieByID(this.state.favorite.movie.imdbid)
                this.setState({favoriteMovieObject: searchResult})
            }
        }
    }

    navigate = (imdbid) => {
        this.props.history.push(`/search/detail/${imdbid}`)
    }

    componentDidMount() {
        this.getCurrentUser()
    }

    handleClose = () => this.setState({show: false})

    handleShow() {
        this.setState({
            show: true,
            newUsername: '',
            newPassword: '',
            confirmPassword: ''
        })
    }

    handleWarningClose = () => this.setState({showWarning: false})

    handleWarningShow() {
        this.setState({showWarning: true})
    }

    async editAccount() {
        if (this.state.newPassword !== this.state.confirmPassword) {
            this.handleClose()
            this.handleWarningShow()
        } else {
            if (this.state.newUsername !== '') {
                await this.accountUpdateService.updateUsername(this.state.newUsername, this.state.currentUser.username)
            }
            if (this.state.newPassword !== '') {
                await this.accountUpdateService.updatePassword(this.state.newPassword, this.state.currentUser.username)
            }
            await this.loginService.logout()
            this.props.history.push('/login')
        }
    }

    setUsername = (event) => {
        const value = event.target.value
        this.setState({newUsername: value})
    }

    setPassword = (event) => {
        const value = event.target.value
        this.setState({newPassword: value})
    }

    confirmPassword = (event) => {
        const value = event.target.value
        this.setState({confirmPassword: value})
    }

    render() {
        return (
            <div>
                <div className="container-fluid mt-5 mb-5">
                    <div className="row row-cols-3">
                        <div className="col"></div>
                        <div className="col">
                            <h1 className="text-center font-weight-bold"
                                style={{backgroundColor: 'rgba(255,255,255,1)'}}>
                                {this.state.currentUser.username}'s studio
                            </h1>
                        </div>
                        <div className="col">
                            <MDBIcon icon="pencil-alt" size="lg" onClick={this.handleShow}/>
                        </div>
                    </div>
                    {this.state.currentUser.type === 'Admin' &&
                    <h5 className="text-center font-weight-light ">
                        {this.state.currentUser.type}
                    </h5>}
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 container-fluid pt-3 border-top">
                        <div>
                            <h2 className="text-center font-weight-bold">
                                favorite movie
                            </h2>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="container-fluid mt-2">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8 mb-5">
                            <ProfileFavoriteMovie favorite={this.state.favorite} nav={this.navigate} favoriteMovieObject={this.state.favoriteMovieObject} />
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 container-fluid pt-3 border-top">
                        <div>
                            <h2 className="text-center font-weight-bold">
                                the movies you liked
                            </h2>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="container-fluid row">
                                    {                                    
                                    this.state.likes.map(
                                        like =>
                                            <ProfileLikeMovie key={like.movieName} like={like} nav={this.navigate} getCurrentUser={this.getCurrentUser}/>
                                    )}
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>

                    <Modal show={this.state.show} 
                            onHide={this.handleClose} 
                            aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                        <Modal.Title>Update your account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>New username:</h5>
                            <div className="form-group">
                                    <input className="form-control"
                                   id="usernameFld"
                                   placeholder="username"
                                   onChange={e => this.setUsername(e)}/>
                            </div>
                            <h5>New password:</h5>
                            <h5>(leave this blank to keep old password)</h5>
                            <div className="form-group">
                                    <input 
                                    type="password"
                                    className="form-control"
                                   id="usernameFld"
                                   placeholder="new password"
                                   onChange={e => this.setPassword(e)}/>
                            </div>
                            <h5>Confirm password:</h5>
                            <div className="form-group">
                                    <input 
                                    type="password"
                                    className="form-control"
                                   id="usernameFld"
                                   placeholder="confirm password"
                                   onChange={e => this.confirmPassword(e)}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={this.editAccount}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showWarning} onHide={this.handleWarningClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                                    <Modal.Body>'confirm password does not match.'</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleWarningClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}

export default Profile;
