import React from "react";
import SearchService from "../services/SearchService";
import LoginService from "../services/LoginService";
import {BrowserRouter as Router, Link} from 'react-router-dom'

export default class SearchResult
    extends React.Component {
    
    constructor(props) {
        super(props);
        this.searchService = SearchService.getInstance();
        this.loginService = LoginService.getInstance();
        this.state = {
            searchResult: {},
            movies: [],
            error: false,
            userResult: {}
        }
        this.searchMovie = this.searchMovie.bind(this)
        this.searchUser = this.searchUser.bind(this)
    }

    async searchMovie(keyword) {
        var searchResult = await this.searchService.searchMovie(keyword)
        if (searchResult.Response !== "False") {
            this.setState({
                searchResult: searchResult,
                movies: searchResult.Search
            })
        } else {
            this.setState({
                searchResult: {},
                movies: [],
                error: true
            })
        }
    }

    async searchUser(keyword) {
        var userResult = await this.loginService.getUser(keyword)
        this.setState({
            userResult: userResult
        })
    }

    componentDidMount() {
        var keyword = window.location.pathname.split('/')[2]
        this.searchMovie(keyword)
        this.searchUser(keyword)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.location.pathname.split('/')[2] !== this.props.match.params.keyword) {
            this.setState({error: false})
            this.searchMovie(this.props.match.params.keyword);
            this.searchUser(this.props.match.params.keyword)
        }
    }
    
    render() {
        return (
            <div>
                <div className="container mt-3">
                    <h2>Movie Search Results:</h2>
                </div>
                <div className="container mt-3">
                    {this.state.error && 
                        <div>
                            <h1>Error! Too many search result</h1>
                        </div>
                    } 
                    {!this.state.error &&
                        <ul className="list-group">
                            {   
                                this.state.movies.map(
                                    (movie, index) =>
                                        <li key={index} className="list-group-item">
                                            <Link to={`/search/detail/${movie.imdbID}`}>
                                                {movie.Title}
                                            </Link>
                                        </li>
                                )
                            }
                        </ul>
                    }
                </div>
                <div className="container mt-3">
                    <h2>User Search Results:</h2>
                </div>
                <div className="container mt-3">
                        <ul className="list-group">
                            {
                                this.state.userResult.id != -1 &&
                                <li key='userResult' className="list-group-item">
                                    <Link to={`/profile/${this.state.userResult.username}`}>
                                        {this.state.userResult.username}
                                    </Link>
                                </li>
                            }
                        </ul>
                </div>
            </div>
        )
    }
}