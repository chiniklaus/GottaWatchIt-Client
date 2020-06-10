import React from 'react'
import { MDBBtn, MDBIcon } from 'mdbreact';
import MovieService from "../../services/MovieService";

class Recommendation extends React.Component {
    constructor(props) {
        super(props)
        this.movieService = MovieService.getInstance();
        this.state = {
            movie: {}
        }
        this.load = this.load.bind(this)
    }

    async load() {
        var movie = await this.movieService.getMovie(this.props.re.imdbid)
        this.setState({movie: movie})
    }

    componentDidMount() {
        this.load()
    }

    render() {
        return (
            <div className="card m-3" style={{backgroundColor: 'rgba(255,255,255,0.3)', maxWidth: 1000, minWidth: 800}}>
                        <div className="row no-gutters">
                            <div className="col-3">
                                <img 
                                    style={{height: 300}}
                                    className="img-fluid p-2" 
                                    src={this.state.movie.poster}
                                />
                            </div>
                            <div className="col-8 mt-3 pl-3">
                                <h3>{this.state.movie.name}</h3>
                                <h5>from:{' ' + this.props.re.fromUsername}</h5>
                                <h1 className="card-title font-weight-bold pt-5">{this.props.re.title}</h1>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div>
                                <div className="card-body">
                                    <h5 className="card-subtitle pt-1 mb-5 font-italic container">
                                        <MDBIcon icon="quote-left" className="pr-2"/>
                                        {this.props.re.words}
                                        <MDBIcon icon="quote-right" className="pl-2"/>
                                    </h5>
                                    <MDBBtn className="text-center mt-2" onClick={() => this.props.delete(this.props.re.id)}>Remove</MDBBtn>
                                    <MDBBtn className="text-center mt-2" color="primary" onClick={() => this.props.navigate(this.props.re.imdbid)}>Check it out!</MDBBtn>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}

export default Recommendation;
