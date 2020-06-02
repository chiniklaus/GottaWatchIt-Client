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
                {console.log(this.props)}
                <div className="container">
                    <div className="row border-bottom">
                        <h3>friend requests</h3>
                        {                                    
                           this.state.rec.map(
                            re =>
                                  <p>{re}</p>
                            )
                        }
                    </div>
                    <div className="row border-bottom">
                        <h3>sent requests</h3>
                        {                                    
                           this.state.req.map(
                            re =>
                                  <p>{re}</p>
                            )
                        }
                    </div>
                    <div className="row border-bottom">
                        <h3>friends</h3>
                        {                                    
                           this.state.valid.map(
                            re =>
                                  <p>{re}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;
