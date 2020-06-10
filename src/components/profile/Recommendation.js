import React from 'react'
import { MDBBtn } from 'mdbreact';
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
            <div className="card m-5" style={{backgroundColor: 'rgba(255,255,255,0.3)', width: 800}}>
                        <div className="row no-gutters">
                            <div>
                                <img 
                                    style={{height: 300}}
                                    className="img-fluid p-2" 
                                    src={this.state.movie.poster}
                                    onClick={() => this.props.navigate(this.props.re.imdbid)}
                                />
                            </div>
                            <div>
                                <div className="card-body">
                                    <h3 className="card-title font-weight-bold">{this.props.re.fromUsername + ': ' + this.props.re.title}</h3>
                                    <h5 className="ccard-subtitle pt-1">
                                        <stonrg>{this.props.re.words}</stonrg>
                                    </h5>
                                    <MDBBtn className="text-center" onClick={() => this.props.delete(this.props.re.id)}>Remove</MDBBtn>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}

export default Recommendation;
