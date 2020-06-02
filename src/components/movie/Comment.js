import React from 'react'

class Comment
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid mt-2 border-bottom">
                <div className="row pl-2">
                    <div className="col-3 ml-0 pl-0">
                        <h5>
                            {this.props.username}
                        </h5>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3 pr-2">
                        <p style={{textAlign: 'right'}}>{this.props.date}</p>
                    </div>
                </div>
                <div className="row pl-2">
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
