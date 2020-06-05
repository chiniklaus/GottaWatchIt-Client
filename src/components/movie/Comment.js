import React from 'react'

class Comment
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        }
        this.load = this.load.bind(this)
    }

    async load() {
        var imgUser = await this.props.getPicture(this.props.username)
        this.setState({src: imgUser.profileImage})
    }

    componentDidMount() {
        this.load()
    }

    render() {
        return (
            <div className="container-fluid mt-2 border-bottom">
                <div className="row pl-2">
                    <div className="col-1 pr-0 mr-0">
                        <img className="img-fluid" 
                            style={{height: 30}}
                            src={'data:image/png;base64,' + this.state.src}
                            onClick={() => this.props.navigateToUser(this.props.username)} 
                            />
                    </div>
                    <div className="col-2 pl-3">
                        <h5 className="pt-1">
                            {this.props.username}
                        </h5>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3 pr-2">
                        <p style={{textAlign: 'right'}}>{this.props.date}</p>
                    </div>
                </div>
                <div className="row pl-4">
                    <h5>
                        <small>
                            {this.props.comment}
                        </small>
                    </h5>
                </div>
            </div>
        )
    }
}

export default Comment;
