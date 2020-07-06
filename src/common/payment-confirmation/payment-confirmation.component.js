import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

class PaymentConfirmation extends Component {

	render() {
		return (
			<Card>
				<Card.Header>
					Confirm Payment
				</Card.Header>
			  	<Card.Body className="text-center">
			  		<Card.Text>
			  			By clicking confirm the final price of the game will be charged into you credit card.
			  		</Card.Text>
			  		<Card.Text>
			  			Once you confirm, you can't return the game nor will you be refunded.
			  		</Card.Text>
			  	</Card.Body>
			  	<Card.Footer className="">
			  		<div className="row">
                    	<div className="col text-left">
                        	<button className="btn btn-outline-success" onClick={this.props.previous}><span className="fa fa-angle-left mr-3"/>Previous</button>	
                    	</div>
                    	<div className="col text-right">
                    		<button className="btn btn-outline-success" onClick={this.props.confirm}>Confirm<span className="fa fa-angle-right ml-3"/></button>
                    	</div>
                    </div>
                </Card.Footer>
			</Card>
		);
	}
}

export default PaymentConfirmation;