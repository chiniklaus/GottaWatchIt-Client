import React from 'react'
import ProfileLikeMovie from "./ProfileLikeMovie";
import ProfileFavoriteMovie from './ProfileFavoriteMovie'

class Friends
    extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valid: [],
            rec: [],
            req: []
        }
    }

    calculateFriends() {
        var requested = this.props.requested
        var received = this.props.received
        var valid = []
        var req = []
        var rec = []
        requested.forEach(element => {
            if (element.valid == true) {
                valid.push(element.receiverName)
            } else {
                req.push(element.receiverName)
            }
        });

        received.forEach(element => {
            if (element.valid == true) {
                valid.push(element.requestedName)
            } else {
                rec.push(element.requestedName)
            }
        });

        this.setState({valid: valid, req: req, rec: rec})
    }

    componentDidMount() {
        this.calculateFriends()
    }

    render() {
        return (
            <div>
                <div className="container pt-2 pl-4 pr-4">
                    <div className="row">
                        <h3 className="pl-3 pt-2">friend requests</h3>
                    </div>
                    <div className="row border-bottom pb-1">
                        {                                    
                           this.state.rec.map(
                            re =>
                                  <p className="mr-5">{re}</p>
                            )
                        }
                        {
                            this.state.rec.length == 0 &&
                            <h4 className="pl-3 pt-2">
                                <strong>
                                    you have no friend requests
                                </strong>
                            </h4>
                        }
                    </div>

                    <div className="row">
                        <h3 className="pl-3 pt-2">sent requests</h3>    
                    </div>
                    <div className="row border-bottom pl-3">
                        {                                    
                           this.state.req.map(
                            re =>
                                  <p className="mr-5">{re}</p>
                            )
                        }
                    </div>
                    
                    <div className="row">
                        <h3 className="pl-3 pt-2">friends</h3>
                    </div>
                    <div className="row border-bottom pl-3">
                        {                                    
                           this.state.valid.map(
                            re =>
                                  <p className="mr-3">{re}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;
