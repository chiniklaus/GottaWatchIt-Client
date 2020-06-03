import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

class SentRequest extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <MDBCol style={{ maxWidth: "20rem" }} className="p-3">
                <MDBCard style={{
                    display: 'flex',
                    alignItems: 'center'}}>
                    <img className="img-fluid" 
                            src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                            onClick={() => this.props.navigateToUser(this.props.info)} 
                            />
                    <MDBCardBody>
                    <MDBCardTitle className="text-center">{this.props.info}</MDBCardTitle>
                    <MDBBtn onClick={() => this.props.cancelRequest(this.props.info)}>Cancel Request</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}

export default SentRequest;
