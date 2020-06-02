import React from 'react'
import ProfileLikeMovie from "./ProfileLikeMovie";
import ProfileFavoriteMovie from './ProfileFavoriteMovie'

class ProfileMovies
    extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 container-fluid pt-4 pb-3">
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
                            <ProfileFavoriteMovie favorite={this.props.favorite} nav={this.props.navigate} favoriteMovieObject={this.props.favoriteMovieObject} />
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
                                    this.props.likes.map(
                                        like =>
                                            <ProfileLikeMovie key={like.movieName} like={like} nav={this.props.navigate} getCurrentUser={this.props.getCurrentUser}/>
                                    )}
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}

export default ProfileMovies;
