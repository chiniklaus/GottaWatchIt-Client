import React from 'react'

class Comment
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid border-bottom mt-2">
                <div className="row">
                    <h5>
                        {this.props.username}
                    </h5>
                </div>
                <div className="row">
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
