import React from 'react'
import {Button, Modal} from 'react-bootstrap'

class Warning extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal show={this.props.showWarning} onHide={this.props.handleWarningClose}>
                         <Modal.Header closeButton>
                         <Modal.Title>Error</Modal.Title>
                         </Modal.Header>
                                     <Modal.Body>'confirm password does not match.'</Modal.Body>
                         <Modal.Footer>
                         <Button variant="secondary" onClick={this.props.handleWarningClose}>
                             Close
                         </Button>
                         </Modal.Footer>
            </Modal>
        )
    }
}

export default Warning;
