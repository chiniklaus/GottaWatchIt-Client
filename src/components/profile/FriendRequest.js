import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

class FriendRequest extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MDBCol style={{ maxWidth: "20rem" }} className="p-3">
                <MDBCard style={{
                    display: 'flex',
                    alignItems: 'center'}}>
                    <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                    waves />
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
