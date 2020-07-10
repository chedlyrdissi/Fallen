import React, { Component } from 'react';
import Language from '../language';
import Card from 'react-bootstrap/Card';

class PaymentConfirmation extends Component {

	render() {
		return (
			<Card>
				<Card.Header>
					{Language.getTextByCode("CONFIRM_PAYMENT")}
				</Card.Header>
			  	<Card.Body className="text-center">
			  		<Card.Text>
			  			{Language.getTextByCode("BY_CLICKING_CONFIRM")}.
			  		</Card.Text>
			  		<Card.Text>
			  			{Language.getTextByCode("ONCE_YOU_CONFIRM")}.
			  		</Card.Text>
			  	</Card.Body>
			  	<Card.Footer className="">
			  		<div className="row">
                    	<div className="col text-left">
                        	<button className="btn btn-outline-success" onClick={this.props.previous}><span className="fa fa-angle-left mr-3"/>{Language.getTextByCode("PREVIOUS")}</button>	
                    	</div>
                    	<div className="col text-right">
                    		<button className="btn btn-outline-success" onClick={this.props.confirm}>{Language.getTextByCode("CONFIRM")}<span className="fa fa-angle-right ml-3"/></button>
                    	</div>
                    </div>
                </Card.Footer>
			</Card>
		);
	}
}

export default PaymentConfirmation;