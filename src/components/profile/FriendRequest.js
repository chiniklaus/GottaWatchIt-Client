import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';
import AccountUpdateService from "../../services/AccountUpdateService";

class FriendRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            src: ''
        }
        this.load = this.load.bind(this)
    }


    async load() {
        var imgUser = await this.props.getPicture(this.props.info)
        this.setState({src: imgUser.profileImage})
    }

    componentDidMount() {
        this.load()
    }

    render() {
        return (
            <MDBCol style={{ maxWidth: "20rem" }} className="p-3">
                <MDBCard style={{
                    display: 'flex',
                    alignItems: 'center'}}>
                    <img 
                        className="img-fluid p-2" 
                        src={'data:image/png;base64,' + this.state.src}
                        onClick={() => this.props.navigateToUser(this.props.info)}
                        />
                    <MDBCardBody>
                    <MDBCardTitle className="text-center">{this.props.info}</MDBCardTitle>
                    <MDBBtn className="text-center" onClick={() => this.props.acceptFriend(this.props.info)}>Accept</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}

export default FriendRequest;
