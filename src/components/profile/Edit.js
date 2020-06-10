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
                         <Modal.Title>Update your account (leave blank to keep old info)</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <h5>New profile picture:</h5>
                            <div className="row mb-3">
                                <div className="col-6 ml-5">
                                    <Avatar
                                        width={290}
                                        height={195}
                                        onCrop={this.props.onCrop}
                                        onClose={this.props.onClose}
                                        src={this.props.selectedFile}
                                    />
                                </div>
                                <div className="col-4" style={{display: 'flex', alignItems: 'center'}}>
                                    {
                                        this.props.preview !== null &&
                                        <div className="row" style={{display: 'flex', alignItems: 'center'}}>
                                            <p className="pr-3"><strong>preview:{' '}</strong></p>
                                            <img src={this.props.preview} alt="Preview" style={{height: 100}}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <h5>New background picture:</h5>
                            <div className="ml-5 mb-3">
                                <input type="file" onChange={this.props.fileChangedHandler} />
                                {
                                    this.props.selectedBg !== null &&
                                    <img src={this.props.selectedBg} alt="Preview" style={{height: 200}}/>
                                }
                            </div>
                             <h5>New username:</h5>
                             <div className="form-group">
                                     <input className="form-control"
                                    id="usernameFld"
                                    placeholder="username"
                                    onChange={e => this.props.setUsername(e)}/>
                             </div>
                             <h5>New password:</h5>
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
