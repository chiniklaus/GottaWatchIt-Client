import React from 'react'
import Recommendation from './Recommendation';

class Recommendations
    extends React.Component {
    constructor(props) {
        super(props)
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
                                    <Recommendation className="mr-5"
                                                    re={re}
                                                    key={re.id}
                                                    navigate={this.props.navigate}/>
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
                                    <Recommendation className="mr-5" 
                                                    re={re}
                                                    key={re.id}
                                                    navigate={this.props.navigate}
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
