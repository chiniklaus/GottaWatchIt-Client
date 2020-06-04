import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';

class SentRequest extends React.Component {
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
                    <img className="img-fluid p-2" 
                            src={'data:image/png;base64,' + this.state.src}
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
