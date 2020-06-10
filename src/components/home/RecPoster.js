import React from 'react'
import { MDBMask, MDBView, MDBIcon } from "mdbreact";

class RecPoster extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posterMovie: {
                poster: ''
            }
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/movie/${this.props.rec.imdbid}`)
        .then(response => response.json())
        .then(movie => {this.setState({posterMovie: movie})})
    }

    render() {
        return (
            <div className="col-3 p-4">
                <MDBView hover>
                    {this.state.posterMovie.poster !== '' &&
                        <img
                            src={this.state.posterMovie.poster}
                            className="img-fluid"
                            alt=""
                        />
                    }
                    <MDBMask className="flex-center" overlay="black-strong">
                        <div className="container-fluid">
                            <p className="white-text text-center">{this.state.posterMovie.name}</p>
                            <p className="white-text text-center">
                                <MDBIcon far icon="arrow-alt-circle-right"
                                                className="align-bottom white-text"
                                                onClick={() => this.props.navigate(this.props.rec.imdbid)}/>
                            </p>
                        </div>
                    </MDBMask>
                    
                </MDBView>
            </div>
        )
    }
}

export default RecPoster