import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import Avatar from 'react-avatar-edit'

class Edit extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal show={this.props.show} 
                             size="lg"
                             onHide={this.props.handleClose} 
                             aria-labelledby="contained-modal-title-vcenter" centered>
                         <Modal.Header closeButton>
                         <Modal.Title>Update your account</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <Avatar
                                width={390}
                                height={295}
                                onCrop={this.props.onCrop}
                                onClose={this.props.onClose}
                                src={this.props.src}
                            />
                            <img src={this.props.preview} alt="Preview" />
                             <h5>New username:</h5>
                             <div className="form-group">
                                     <input className="form-control"
                                    id="usernameFld"
                                    placeholder="username"
                                    onChange={e => this.props.setUsername(e)}/>
                             </div>
                             <h5>New password:</h5>
                             <h5>(leave this blank to keep old password)</h5>
                             <div className="form-group">
                                     <input 
                                     type="password"
                                     className="form-control"
                                    id="usernameFld"
                                    placeholder="new password"
                                    onChange={e => this.props.setPassword(e)}/>
                             </div>
                             <h5>Confirm password:</h5>
                             <div className="form-group">
                                     <input 
                                     type="password"
                                     className="form-control"
                                    id="usernameFld"
                                    placeholder="confirm password"
                                    onChange={e => this.props.confirmPassword(e)}/>
                             </div>
                         </Modal.Body>
                         <Modal.Footer>
                         <Button variant="danger" onClick={this.props.editAccount}>
                             Save
                         </Button>
                         <Button variant="secondary" onClick={this.props.handleClose}>
                             Close
                         </Button>
                         </Modal.Footer>
                     </Modal>
        )
    }
}

export default Edit;
