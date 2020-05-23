import React from 'react'
import { MDBMask, MDBView, MDBIcon } from "mdbreact";
import AccountUpdateService from "../services/AccountUpdateService";

class ProfileFavoriteMovie
    extends React.Component {
    constructor(props) {
        super(props);
        this.accountUpdateService = AccountUpdateService.getInstance();
        this.navigate = this.navigate.bind(this)
    }

    navigate = () => {
        this.props.nav(this.props.favoriteMovieObject.imdbID)
    }

    render() {
        return (
            <MDBView hover>
                {
                    this.props.favorite !== null &&
                    <div className="card" style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={this.props.favoriteMovieObject.Poster} className="card-img" alt="..."></img>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h1 className="card-title font-weight-bold">{this.props.favoriteMovieObject.Title}</h1>
                                     <h5 className="card-subtitle pt-2">
                                        {"Directed by:  "}
                                         {this.props.favoriteMovieObject.Director}
                                    </h5>
                                    <h5 className="ccard-subtitle pt-1">
                                        {"IMDB rating:   "}
                                        {this.props.favoriteMovieObject.imdbRating}
                                    </h5>
                                    <h5 className="card-text font-italic font-weight-bold pt-2"><small >{this.props.favoriteMovieObject.Plot}</small></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.props.favorite === null &&
                    <div className="card text-center" 
                            style={{backgroundColor: 'rgba(255,255,255,0.3)'}}>
                        <h3>Go select your favorite movie</h3>
                    </div>
                }
                {
                    this.props.favorite !== null &&
                     <MDBMask overlay="black-strong" onClick={this.navigate}>
                        <p className="white-text pl-5 pt-5">
                            Actors: {this.props.favoriteMovieObject.Actors}
                        </p>
                        <p className="white-text pl-5">
                            Awards: {this.props.favoriteMovieObject.Awards}
                        </p>
                        <p className="white-text pl-5">
                            Genre: {this.props.favoriteMovieObject.Genre}
                        </p>
                        <p className="white-text pl-5">
                            Writers: {this.props.favoriteMovieObject.Writer}
                        </p>
                    </MDBMask>
                }
            </MDBView>
        )
    }
}

export default ProfileFavoriteMovie;
