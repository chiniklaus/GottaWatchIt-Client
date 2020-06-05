import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import { MDBDropdownMenu, MDBDropdownItem, MDBDropdown, MDBDropdownToggle } from "mdbreact";

class RecommendationEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            selected: 'Select a friend'
        }
        this.load = this.load.bind(this)
    }

    async load() {
        var friends = await this.props.getFriends()
        this.setState({friends: friends})
        console.log(friends)
    }

    componentDidMount() {
        this.load()
    }

    render() {
        return (
            <Modal show={this.props.showEditor} 
                             size="lg"
                             onHide={this.props.handleCloseEditor} 
                             aria-labelledby="contained-modal-title-vcenter" centered>
                         <Modal.Header closeButton>
                         <Modal.Title>Write a recommendation!</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                             <h5>Title</h5>
                             <div className="form-group">
                                     <input className="form-control"
                                    id="title"
                                    placeholder="recommendation title"
                                    onChange={e => this.props.setTitle(e)}/>
                             </div>
                             <h5>Content</h5>
                             <div className="form-group">
                                     <input className="form-control"
                                     id="words"
                                     placeholder="recommendation content"
                                    onChange={e => this.props.setWords(e)}/>
                             </div>
                                <MDBDropdown>
                                    <MDBDropdownToggle caret color="primary">
                                        {this.state.selected}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu basic>
                                    {                                    
                                    this.state.friends.map(
                                        friend =>
                                            <MDBDropdownItem onClick={() => this.setState({selected: friend})}>{friend}</MDBDropdownItem>
                                    )}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                         </Modal.Body>
                         <Modal.Footer>
                         <Button variant="danger" onClick={() => this.props.recordRecommendation(this.state.selected)}>
                             Send it!
                         </Button>
                         <Button variant="secondary" onClick={this.props.handleCloseEditor}>
                             Close
                         </Button>
                         </Modal.Footer>
            </Modal>
        )
    }
}

export default RecommendationEditor;
