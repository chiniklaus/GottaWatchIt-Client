import React from 'react'
import { Link } from 'react-router-dom';

class News
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to={`/search/detail/${this.props.info}`} onClick={this.props.clickAction}>
                    {this.props.info} just got liked by other users!
                </Link>
            </div>
            // <div className="container row">
            //     <div className="col-4">
            //         <p>
            //             <Img src={this.state.movie.Poster}/>
            //         </p>
            //     </div>
            //     <div className="col-8">
            //         <h2>
            //             {this.state.movie.Title}
            //         </h2>
            //         <p>
            //             Release Year: {this.state.movie.Year}
            //         </p>
            //         <p>
            //             imdbID: {this.state.movie.imdbID}
            //         </p>
            //     </div>
            // </div>
        )
    }
}

export default News;
