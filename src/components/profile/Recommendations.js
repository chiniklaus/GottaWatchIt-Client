import React from 'react'
import Recommendation from './Recommendation';

class Recommendations
    extends React.Component {
    constructor(props) {
        super(props)
        this.deleteMyRec = this.deleteMyRec.bind(this)
        this.deleteGetRec = this.deleteGetRec.bind(this)
    }


    async deleteMyRec(id) {
        await fetch(`http://localhost:8080/api/recommendation/delete/from/${id}`, {
            method: 'DELETE',
        })
        .then(response => console.log(response))

        this.props.getCurrentUser()
    }

    async deleteGetRec(id) {
        await fetch(`http://localhost:8080/api/recommendation/delete/to/${id}`, {
            method: 'DELETE',
        })
        .then(response => console.log(response))

        this.props.getCurrentUser()
    }

    render() {
        return (
            <div>
                <div className="container pt-2 pl-4 pr-4">
                        <div>
                        <div className="row">
                        <h3 className="pl-3 pt-2">recommendations received</h3>
                        </div>
                        <div className="row border-bottom pb-2 pl-3">  
                            {                                      
                            this.props.recReceived.map(
                                re =>
                                    <Recommendation re={re}
                                                    key={re.id}
                                                    navigate={this.props.navigate}
                                                    delete={this.deleteGetRec}
                                    />
                                )
                            }
                        </div>

                        <div className="row">
                            <h3 className="pl-3 pt-4">recommendations sent</h3>    
                        </div>
                        <div className="row border-bottom pb-2 pl-3">
                            {                                      
                            this.props.recSent.map(
                                re =>
                                    <Recommendation re={re}
                                                    key={re.id}
                                                    navigate={this.props.navigate}
                                                    delete={this.deleteMyRec}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recommendations;
