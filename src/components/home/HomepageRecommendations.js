import React from 'react'
import RecPoster from './RecPoster'

class HomepageRecommendations
    extends React.Component {
    constructor(props) {
        super(props)
        this.navigate = this.navigate.bind(this)
    }

    navigate(imdbid) {
        this.props.history.push(`/search/detail/${imdbid}`)
    }

    render() {
        return (
            <div className="container">
                <h3 className="pt-5"><strong>movies people are talking about:</strong></h3>
                <div className="row">
                    {
                        this.props.recs.map(
                            rec =>
                            <RecPoster rec={rec} navigate={this.navigate}/>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default HomepageRecommendations;