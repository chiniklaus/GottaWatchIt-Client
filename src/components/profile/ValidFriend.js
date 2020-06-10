import React from 'react'
import { MDBMask, MDBView, MDBIcon } from "mdbreact";
import "./style/Hover.css"

class ValidFriend extends React.Component {
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
            <MDBView hover>
                    <img className="img-fluid p-2"
                        style={{height: 200}}
                        src={'data:image/png;base64,' + this.state.src}
                    />
                    <MDBMask className="flex-center pointer"
                                overlay="white-strong"
                                onClick={() => this.props.navigateToUser(this.props.info)} >
                        <div className="container-fluid">
                            <h3 className="text-center"><strong>{this.props.info}</strong></h3>
                        </div>
                    </MDBMask>
            </MDBView>
        )
    }
}

export default ValidFriend;
