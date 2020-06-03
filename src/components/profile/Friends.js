import React from 'react'
import FriendRequest from './FriendRequest'
import { MDBRow } from 'mdbreact';

class Friends
    extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="container pt-2 pl-4 pr-4">
                    <div className="row">
                        <h3 className="pl-3 pt-2">friend requests</h3>
                    </div>
                    <div className="row border-bottom pb-1">
                        <MDBRow>   
                        {                                      
                           this.props.rec.map(
                            re =>
                                <FriendRequest info={re}
                                                key={re}
                                                acceptFriend={this.props.acceptFriend}
                                                className="mr-5" />
                            )
                        }
                        </MDBRow>
                        {
                            this.props.rec.length == 0 &&
                            <h4 className="pl-5 pt-2">
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
                           this.props.req.map(
                            re =>
                                  <p key={re} className="mr-5">{re}</p>
                            )
                        }
                    </div>
                    
                    <div className="row">
                        <h3 className="pl-3 pt-2">friends</h3>
                    </div>
                    <div className="row border-bottom pl-3">
                        {                                    
                           this.props.valid.map(
                            re =>
                                  <p key={re} className="mr-3">{re}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;
