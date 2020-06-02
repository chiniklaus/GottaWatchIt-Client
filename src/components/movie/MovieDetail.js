import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import Comment from "./Comment";
import SearchService from "../../services/SearchService";
import AccountUpdateService from "../../services/AccountUpdateService";
import LoginService from "../../services/LoginService";
import ActionService from "../../services/ActionService";
import MovieService from "../../services/MovieService";

class MovieDetail
    extends React.Component {
    constructor(props) {
        super(props);
        this.loginService = LoginService.getInstance();
        this.searchService = SearchService.getInstance();
        this.accountUpdateService = AccountUpdateService.getInstance();
        this.actionService = ActionService.getInstance();
        this.movieService = MovieService.getInstance();
        this.state = {
            movie: {},
            likeme: [],
            loveme: [],
            show: false,
            showRating: false,
            showComment: false,
            myRating: '',
            myComment: '',
            averageRating: '',
            comments: []
        }
        this.likeMovie = this.likeMovie.bind(this)
        this.selectFavoriteMovie = this.selectFavoriteMovie.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleRatingClose = this.handleRatingClose.bind(this)
        this.handleRatingShow = this.handleRatingShow.bind(this)
        this.rateMovie = this.rateMovie.bind(this)
        this.setRating = this.setRating.bind(this)
        this.setComment = this.setComment.bind(this)
    }

    async searchMovieByID(id) {
        var searchResult = await this.searchService.searchMovieByID(id)
        this.loginService.currentUser().then(response => {this.setState({currentUser: response})})
        this.movieService.createMovie(searchResult.imdbID, searchResult.Title, searchResult.Poster);
        this.setState({movie: searchResult})
        this.actionService.getAverageRating(this.state.movie.imdbID).then(response => {this.setState({averageRating: response})})
        this.actionService.getComments(this.state.movie.imdbID).then(response => {this.setState({comments: response})})
    }

    async likeMovie() {
        await this.accountUpdateService.likeMovie(
            this.state.movie.imdbID,
            this.state.movie.Title,
            this.state.currentUser.id,
            this.state.currentUser.username)
        this.handleShow()
    }

    async selectFavoriteMovie() {
        await AccountUpdateService.getInstance().selectFavoriteMovie(
            this.state.movie.imdbID,
            this.state.movie.Title,
            this.state.currentUser.id,
            this.state.currentUser.username)
        this.handleShow()
    }

    async rateMovie() {
        await this.actionService
            .rateMovie(this.state.movie.Title, this.state.movie.imdbID, this.state.currentUser.id, this.state.myRating, this.state.currentUser.username)
        this.handleRatingClose()
        this.setState({myRating : ''})
    }

    async addComment() {
        var date = new Date().toLocaleDateString()
        console.log(date)
        await this.actionService
            .addComment(this.state.movie.Title,
                        this.state.movie.imdbID,
                        this.state.currentUser.id,
                        this.state.myComment,
                        this.state.currentUser.username,
                        date
                        )
        this.handleRatingClose()
        this.setState({myComment : ''})
    }

    componentDidMount() {
        var id = window.location.pathname.split('/')[3]
        this.searchMovieByID(id)
    }

    handleClose = () => this.setState({show: false})
    handleShow() {
        this.setState({show: true})
    }

    handleRatingClose = () => this.setState({showRating: false})
    handleRatingShow() {
        this.setState({showRating: true})
    }

    setRating = (event) => {
        const value = event.target.value
        this.setState({myRating: value})
    }

    setComment = (event) => {
        const value = event.target.value
        this.setState({myComment: value})
    }

    sendAction = () => {
        if (this.state.myRating !== '') {
            this.rateMovie()
        }
        if (this.state.myComment !== '') {
            this.addComment()
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.myComment !== this.state.myComment && this.state.myComment === '') {
            var id = window.location.pathname.split('/')[3]
            this.searchMovieByID(id)
        } else if (prevState.myRating !== this.state.myRating && this.state.myRating === '') {
            var id = window.location.pathname.split('/')[3]
            this.searchMovieByID(id)
        }
    }

    render() {
        return (
            <div>
                <div className="container row">
                    <div className="col-4 mt-4">
                        <div className="row justify-content-center">
                            <p>
                                {this.state.movie.Poster &&
                                    <img    className="img-fluid mx-auto rounded"
                                            src={this.state.movie.Poster}
                                            alt="cleaning images"
                                    />
                                }
                            </p>
                            
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        <div>
                            <h1>{this.state.movie.Title}</h1>

                            <h5>
                                {'Director: '}
                                {this.state.movie.Director}
                            </h5>
                            <h5>
                                {'NU-Movies rating: '}
                                {this.state.averageRating}
                                {'/5'}
                            </h5>
                            <h5>
                                {'IMDB rating: '}
                                {this.state.movie.imdbRating}
                                {'/10'}
                            </h5>
                            <h5>
                                {'Release year: '}
                                {this.state.movie.Year}
                            </h5>
                            <h5>
                                {'Starring: '}
                                {this.state.movie.Actors}
                            </h5>
                            <h5 className="font-italic font-weight-bold">
                                <small >
                                    {this.state.movie.Plot}
                                </small>
                            </h5>
                        </div>
                        <div>
                            <div className="row pt-4">
                                <div className="col-4">
                                    <button type="button" className="btn btn-outline-primary btn-block" onClick={this.likeMovie}>Like this movie!</button>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-outline-danger btn-block" onClick={this.selectFavoriteMovie}>Select as favorite</button>
                                </div>
                                <div className="col-4">
                                    <button type="button" className="btn btn-outline-success btn-block" onClick={this.handleRatingShow}>Rate & comment!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                                                
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Congratulations!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Your action have been recorded</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    
                    <Modal show={this.state.showRating} 
                            onHide={this.handleRatingClose} 
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                        <Modal.Title>What are your thoughts?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Rate this movie:</h5>
                            <div class="custom-control custom-radio custom-control-inline">
                                <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" name="customRadioInline1" onChange={e => this.setRating(e)} class="custom-control-input" value="1"/>
                                <label class="custom-control-label" for="customRadioInline1">1</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" name="customRadioInline1" onChange={e => this.setRating(e)} class="custom-control-input" value="2"/>
                                <label class="custom-control-label" for="customRadioInline2">2</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline3" name="customRadioInline1" onChange={e => this.setRating(e)} class="custom-control-input" value="3"/>
                                <label class="custom-control-label" for="customRadioInline3">3</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline4" name="customRadioInline1" onChange={e => this.setRating(e)} class="custom-control-input" value="4"/>
                                <label class="custom-control-label" for="customRadioInline4">4</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline5" name="customRadioInline1" onChange={e => this.setRating(e)} class="custom-control-input" value="5"/>
                                <label class="custom-control-label" for="customRadioInline5">5</label>
                                </div>
                            </div>
                            <h5>Leave your comment:</h5>
                            <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Your comment:</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => this.setComment(e)}></textarea>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={this.sendAction}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={this.handleRatingClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="container row">
                    <div className="col-4"></div>
                    <div className="col-6 mt-4">
                        <h2>Comments</h2>
                        <div className="container-fluid  border-top pl-0 pr-0">
                            {                                    
                                this.state.comments.map(
                                    comment =>
                                            <Comment username={comment.userName} comment={comment.comment} date={comment.date} key={comment.id}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetail;
