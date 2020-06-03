import React from 'react'
import FriendRequest from './FriendRequest'
import SentRequest from './SentRequest'
import ValidFriend from './ValidFriend'
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
                    <div className="row border-bottom pb-2 pl-3">  
                        {                                      
                           this.props.rec.map(
                            re =>
                                <FriendRequest info={re}
                                                key={re}
                                                acceptFriend={this.props.acceptFriend}
                                                navigateToUser={this.props.navigateToUser}
                                                className="mr-5" />
                            )
                        }
                    </div>

                    <div className="row">
                        <h3 className="pl-3 pt-4">sent requests</h3>    
                    </div>
                    <div className="row border-bottom pb-2 pl-3">
                        {                                    
                           this.props.req.map(
                            re =>
                                <SentRequest info={re}
                                                key={re}
                                                cancelRequest={this.props.cancelRequest}
                                                navigateToUser={this.props.navigateToUser}
                                                className="mr-5" />
                            )
                        }
                    </div>
                    
                    <div className="row">
                        <h3 className="pl-3 pt-4">friends</h3>
                    </div>
                    <div className="row border-bottom pb-2 pl-3">
                        {                                    
                           this.props.valid.map(
                            re =>
                                <ValidFriend info={re} 
                                                key={re}
                                                navigateToUser={this.props.navigateToUser}
                                                className="mr-3"/>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;
