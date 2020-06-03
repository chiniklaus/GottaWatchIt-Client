import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

class FriendRequest extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MDBCol style={{ maxWidth: "20rem" }} className="p-3">
                <MDBCard>
                    <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                    waves />
                    <MDBCardBody>
                    <MDBCardTitle className="text-center">{this.props.info}</MDBCardTitle>
                    <MDBCardText>she a bitch</MDBCardText>
                    <MDBBtn onClick={() => this.props.acceptFriend(this.props.info)}>Click</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}

export default FriendRequest;
