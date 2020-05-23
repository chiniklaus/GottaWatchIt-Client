import React from 'react'
import { MDBMask, MDBView, MDBIcon } from "mdbreact";
import AccountUpdateService from "../services/AccountUpdateService";

class ProfileLikeMovie
    extends React.Component {
    constructor(props) {
        super(props);
        this.accountUpdateService = AccountUpdateService.getInstance();
        this.deleteLike = this.deleteLike.bind(this)
        this.navigate = this.navigate.bind(this)
    }

    async deleteLike() {
        await this.accountUpdateService.deleteLikeAction(this.props.like.username, this.props.like.movie.imdbid)
        this.props.getCurrentUser()
    }

    navigate = () => {
        this.props.nav(this.props.like.movie.imdbid)
    }

    render() {
        return (
            <div className="col-3 p-4">
                <MDBView hover>
                    {this.props.like.movie.poster !== '' &&
                        <img
                            src={this.props.like.movie.poster}
                            className="img-fluid"
                            alt=""
                        />
                    }
                    <MDBMask className="flex-center" overlay="black-strong">
                        <div className="container-fluid">
                            <p className="white-text text-center">{this.props.like.movieName}</p>
                            <p className="white-text text-center">
                                <MDBIcon far icon="trash-alt" className="align-bottom" onClick={this.deleteLike}/>
                                {' '}
                                <MDBIcon far icon="arrow-alt-circle-right" className="align-bottom white-text" onClick={this.navigate}/>
                            </p>
                        </div>
                    </MDBMask>
                    
                </MDBView>
            </div>
        )
    }
}

export default ProfileLikeMovie;
