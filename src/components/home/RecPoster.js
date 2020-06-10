import React from 'react'
import { MDBMask, MDBView, MDBIcon } from "mdbreact";
import "../profile/style/Hover.css"

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
                    <MDBMask className="flex-center pointer" 
                                overlay="black-strong" 
                                onClick={() => this.props.navigate(this.props.rec.imdbid)}>
                        <div className="container-fluid">
                            <p className="white-text text-center">{this.state.posterMovie.name}</p>
                        </div>
                    </MDBMask>
                    
                </MDBView>
            </div>
        )
    }
}

export default RecPoster