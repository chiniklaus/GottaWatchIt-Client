import React from 'react'
import { MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBBtn } from "mdbreact";
import AccountUpdateService from "../../services/AccountUpdateService";
import LoginService from "../../services/LoginService";
import SearchService from "../../services/SearchService";
import RecommendationService from "../../services/RecommendationService";
import ProfileMovies from "./ProfileMovies"
import Edit from "./Edit"
import Warning from "./Warning"
import Friends from "./Friends"
import Recommendations from "./Recommendations"
import './style/Profile.css'

class Profile
    extends React.Component {
    constructor(props) {
        super(props)
        this.loginService = LoginService.getInstance();
        this.accountUpdateService = AccountUpdateService.getInstance();
        this.recommendationService = RecommendationService.getInstance();
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
            selectedFile: null,
            selectedBg: null,
            valid: [],
            req: [],
            rec: [],
            userType: '',
            recSent: [],
            recReceived: []
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
        this.sendRequest = this.sendRequest.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
    }

    async getCurrentUser() {
        var owner = window.location.pathname.split('/')[2]
        var cusername = await this.loginService.currentUsername()
        if (owner == cusername.username) {
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
                this.recommendationService.getRecommendationToMe(this.props.username).then(response => {this.setState({recReceived: response})})
                this.recommendationService.getRecommendationISent(this.props.username).then(response => {this.setState({recSent: response})})
        } else {
            var user = await this.loginService.getUser(owner)
            this.setState({
                currentUser: user,
                likes: user.likeActions,
                favorite: user.favorite,
                loggedIn: false,
                tab: 'movies'
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
        this.setState({tab: 'movies'})
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
            var change = false
            if (this.state.newPassword !== '') {
                change = true
                await this.accountUpdateService.updatePassword(this.state.newPassword, this.state.currentUser.username)
            }
            if (this.state.newUsername !== '') {
                change = true
                await this.accountUpdateService.updateUsername(this.state.newUsername, this.state.currentUser.username)
            }
            if (this.state.preview !== null) {
                console.log(this.state.preview)
                let data
                await fetch(this.state.preview)
                        .then(res => res.blob())
                        .then(blob => {
                        var fd = new FormData()
                        fd.append('image', blob, 'file')
                        data = fd
                        console.log(blob)
                        })
                change = true
                await this.accountUpdateService.updateProfilePicture(this.state.currentUser.username, data)
            }
            if (this.state.selectedBg !== null) {
                console.log('here')
                let data
                await fetch(this.state.selectedBg)
                        .then(res => res.blob())
                        .then(blob => {
                            var fd = new FormData()
                            fd.append('image', blob, 'file')
                            data = fd
                            console.log(blob)
                        })
                change = true
                await this.accountUpdateService.updateBackgroundPicture(this.state.currentUser.username, data)
            }

            if (change) {
                await this.loginService.logout()
                this.props.history.push('/login')
            } else {
                this.handleClose()
            }
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

    async sendRequest() {
        await this.accountUpdateService.sendRequest(this.props.username, this.state.currentUser.username)
        this.getCurrentUser()
    }

    async getPicture(username) {
        let imgUser = await AccountUpdateService.getInstance().getProfilePicture(username)     
        return imgUser
    }

    calculateFriends() {
        var requested = this.state.currentUser.requested
        var received = this.state.currentUser.received
        var valid = []
        var req = []
        var rec = []
        // 0 means no friendship, 1 means owner sent him request, 2 means he sent owner request, 3 means friends
        var userType = 0
        if (this.state.currentUser.username == this.props.username) {
            this.setState({userType: 'owner'})
            userType = -1
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
        } else {
            requested.forEach(element => {
                var va = false
                if (element.valid == true) {
                    va = true
                    valid.push(element.receiverName)
                }
                if (element.receiverName == this.props.username) {
                    if (va) {
                        userType = 3
                    } else {
                        userType = 2
                    }
                }
            });
    
            received.forEach(element => {
                var va = false
                if (element.valid == true) {
                    va = true
                    valid.push(element.requesterName)
                }
                if (element.requesterName == this.props.username) {
                    if (va) {
                        userType = 3
                    } else {
                        userType = 1
                    }
                }
            });
        }

        if (userType == 1) {this.setState({userType:'receiver'})}
        else if (userType == 2) {this.setState({userType:'requester'})}
        else if (userType == 3) {this.setState({userType:'friend'})}
        else if (userType == 0) {this.setState({userType:'stranger'})}

        this.setState({valid: valid, req: req, rec: rec})
    }

    async fileChangedHandler(event) {
        const reader = new FileReader();
        const file = event.target.files[0]
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                selectedBg: [reader.result]
            })
          }.bind(this);
    }

    render() {
        return (
            <div>
                <div className="container mt-5 mb-2 title border rounded mb-3" style={{
                        backgroundImage: 'url('+ `data:image/png;base64,${this.state.currentUser.backgroundImage}` + ')',
                }}>
                    <div className="row row-cols-3 pt-3 little-title">
                        <div className="col">
                            <div className="row p-5 m-2">
                                <img src={`data:image/png;base64,${this.state.currentUser.profileImage}`} />
                            </div>
                        </div>
                        <div className="col" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <h1 className="font-weight-bold pt-3" 
                                style={{color: 'white'}}>
                                {this.state.currentUser.username}'s studio
                            </h1>
                        </div>
                        {
                            this.state.userType == 'owner' &&
                            <div className="col pb-5" style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                                <MDBIcon icon="pencil-alt" size="lg" onClick={this.handleShow}/>
                            </div>
                        }
                        {
                            this.state.userType == 'stranger' &&
                            <div className="col pb-5" style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                                <MDBBtn className="text-center" onClick={this.sendRequest}>
                                    Add friend
                                </MDBBtn>
                            </div>
                        }
                        {
                            this.state.userType == 'requester' &&
                            <div className="col pb-5" style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                                <div className="container text-center rounded shadow-sm" style={{
                                    width: 350
                                    }}>
                                    <h5 className="font-weight-lighter pt-2 pb-2">
                                        user sent you a request
                                    </h5>
                                </div>
                            </div>
                        }
                        {
                            this.state.userType == 'receiver' &&
                            <div className="col pb-5" style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                                <div className="container text-center rounded shadow-sm" style={{
                                    width: 300
                                    }}>
                                    <h5 className="font-weight-lighter pt-2 pb-2">
                                        user request sent
                                    </h5>
                                </div>
                            </div>
                        }
                        {
                            this.state.userType == 'friend' &&
                            <div className="col pb-5" style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                                <div className="container text-center rounded shadow-sm" style={{
                                    width: 100
                                    }}>
                                    <h5 className="font-weight-lighter pt-2 pb-2">
                                        friend
                                    </h5>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="container rounded nav-container shadow-box-example z-depth-2" style={{height: 70, display: 'flex', alignItems: 'center'}}>
                    <MDBNav className="nav-pills nav-justified my-nav">
                        <MDBNavItem>
                            <MDBNavLink to={'/profile/' + this.state.currentUser.username + '/movies'}
                                        onClick={() => this.setState({tab: 'movies'})}><strong className='nav-item'>Movies</strong></MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to={'/profile/' + this.state.currentUser.username + '/friends'}
                                        onClick={() => this.setState({tab: 'friends'})}><strong className='nav-item'>Friends</strong></MDBNavLink>
                        </MDBNavItem>
                        {
                            this.state.currentUser.username === this.props.username &&
                            <MDBNavItem>
                                <MDBNavLink to={'/profile/' + this.state.currentUser.username + '/recommendations'}
                                            onClick={() => this.setState({tab: 'recommendations'})}><strong className='nav-item'>Recommendations</strong></MDBNavLink>
                            </MDBNavItem>
                        }
                    </MDBNav>
                </div>
                <Edit show={this.state.show}
                        handleClose={this.handleClose}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        selectedFile={this.state.selectedFile}
                        selectedBg={this.state.selectedBg}
                        preview={this.state.preview}
                        setUsername={this.setUsername}
                        setPassword={this.setPassword}
                        confirmPassword={this.confirmPassword}
                        editAccount={this.editAccount}
                        fileChangedHandler={this.fileChangedHandler}
                />
                <Warning showWarning={this.state.showWarning}
                        handleWarningClose={this.handleWarningClose}
                />
                {this.state.tab == 'movies' &&
                    <ProfileMovies favorite={this.state.favorite} 
                                    navigate={this.navigate} 
                                    favoriteMovieObject={this.state.favoriteMovieObject}
                                    likes={this.state.likes}
                                    getCurrentUser={this.getCurrentUser}
                    />
                }
                {this.state.tab == 'friends' &&
                    <Friends valid={this.state.valid}
                                navigateToUser={this.navigateToUser}
                                req={this.state.req}
                                rec={this.state.rec}
                                acceptFriend={this.acceptFriend}
                                cancelRequest={this.cancelRequest}
                                userType={this.state.userType}
                                getPicture={this.getPicture}
                    />
                }
                {this.state.tab == 'recommendations' &&
                    <Recommendations recSent={this.state.recSent}
                                        recReceived={this.state.recReceived}
                                        navigate={this.navigate}
                                        getCurrentUser={this.getCurrentUser}
                    />
                }
            </div>
        )
    }
}

export default Profile;