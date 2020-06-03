import React from 'react'
import { MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from "mdbreact";
import {Button, Modal} from 'react-bootstrap'
import Avatar from 'react-avatar-edit'
import AccountUpdateService from "../../services/AccountUpdateService";
import LoginService from "../../services/LoginService";
import SearchService from "../../services/SearchService";
import ProfileMovies from "./ProfileMovies"
import Friends from "./Friends"
import i from '../../1.jpeg'

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
            loggedIn: false,
            tab: '',
            preview: null,
            src: i,
            valid: [],
            req: [],
            rec: []
        }
        this.navigate = this.navigate.bind(this)
        this.navigateToUser = this.navigateToUser.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleWarningShow = this.handleWarningShow.bind(this)
        this.handleWarningClose = this.handleWarningClose.bind(this)
        this.editAccount = this.editAccount.bind(this)
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.acceptFriend = this.acceptFriend.bind(this)
        this.cancelRequest = this.cancelRequest.bind(this)
        this.calculateFriends = this.calculateFriends.bind(this)
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
        this.calculateFriends()
    }

    navigate = (imdbid) => {
        this.props.history.push(`/search/detail/${imdbid}`)
    }

    navigateToUser = (username) => {
        this.props.history.push(`/profile/${username}`)
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
            if (this.state.newPassword !== '') {
                await this.accountUpdateService.updatePassword(this.state.newPassword, this.state.currentUser.username)
            }
            if (this.state.newUsername !== '') {
                await this.accountUpdateService.updateUsername(this.state.newUsername, this.state.currentUser.username)
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

    onClose() {
        this.setState({preview: null})
    }
      
    onCrop(preview) {
        this.setState({preview})
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.currentUser.username !== window.location.pathname.split('/')[2]) {
            this.getCurrentUser()
        }
    }

    async acceptFriend(usn) {
        await this.accountUpdateService.acceptFriend(usn, this.state.currentUser.username);
        this.getCurrentUser()
    }

    async cancelRequest(usn) {
        await this.accountUpdateService.cancelRequest(usn, this.state.currentUser.username);
        this.getCurrentUser()
    }

    calculateFriends() {
        var requested = this.state.currentUser.requested
        var received = this.state.currentUser.received
        var valid = []
        var req = []
        var rec = []
        requested.forEach(element => {
            if (element.valid == true) {
                valid.push(element.receiverName)
            } else {
                req.push(element.receiverName)
            }
        });

        received.forEach(element => {
            if (element.valid == true) {
                valid.push(element.requesterName)
            } else {
                rec.push(element.requesterName)
            }
        });

        this.setState({valid: valid, req: req, rec: rec})
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
                <div className="container">
                    <MDBNav className="nav-tabs nav-fill">
                        <MDBNavItem>
                            <MDBNavLink to={'/profile/' + this.state.currentUser.username + '/movies'}
                                        onClick={() => this.setState({tab: 'movies'})}><strong>Movies</strong></MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={'/profile/' + this.state.currentUser.username + '/friends'}
                                        onClick={() => this.setState({tab: 'friends'})}><strong>Friends</strong></MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={'/profile/' + this.state.currentUser.username + '/activity'}
                                        onClick={() => this.setState({tab: 'activity'})}><strong>Activities</strong></MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                </div>
                <Modal show={this.state.show} 
                             size="lg"
                             onHide={this.handleClose} 
                             aria-labelledby="contained-modal-title-vcenter" centered>
                         <Modal.Header closeButton>
                         <Modal.Title>Update your account</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <Avatar
                                width={390}
                                height={295}
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                src={this.state.src}
                            />
                            <img src={this.state.preview} alt="Preview" />
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
                {this.state.tab == 'movies' &&
                    <ProfileMovies favorite={this.state.favorite} 
                                    navigate={this.navigate} 
                                    favoriteMovieObject={this.state.favoriteMovieObject}
                                    likes={this.state.likes}
                                    getCurrentUser={this.getCurrentUser}/>
                }
                {this.state.tab == 'friends' &&
                    <Friends valid={this.state.valid}
                                navigateToUser={this.navigateToUser}
                                req={this.state.req}
                                rec={this.state.rec}
                                acceptFriend={this.acceptFriend}
                                cancelRequest={this.cancelRequest}/>
                }
            </div>
        )
    }
}

export default Profile;
