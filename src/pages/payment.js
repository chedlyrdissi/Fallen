import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'react-bootstrap/Card';
import CreditCard from './../common/credit-card/credit-card.component';
import GamePrice from './../common/game-price/game-price.component';
import PaymentConfirmation from './../common/payment-confirmation/payment-confirmation.component';
import HomeButton from './../common/home-button/home-button.component';

import UserProfile from '../common/user-profile';
import Language from '../common/language';

class Payment extends Component {
	classes;
  	steps = [<span><i className="fa fa-gamepad"></i><br/>{Language.getTextByCode('GAME')}</span>, <span><i className="fa fa-credit-card"></i><br/>{Language.getTextByCode('CREDIT_CARD')}</span>, <span><i className="fa fa-check"></i><br/>{Language.getTextByCode('CONFIRMATION')}</span>];

  	constructor(props) {
  		super(props);
	    this.state = {
	      	activeStep: 0,
	      	game: {},
	      	discount: 0,
	      	loading: true
	    };
	    this.classes = makeStyles((theme) => ({
		  	root: {
		    	width: '100%',
		  	},
		  	backButton: {
		    	marginRight: theme.spacing(1),
		  	},
		  	instructions: {
		    	marginTop: theme.spacing(1),
		    	marginBottom: theme.spacing(1),
		  	},
		}));

		const requestOptions = {
	        method: 'GET',
	        params: {          	
	        	title: this.props.match.params.title
	        }
	    };
	    fetch('http://192.168.137.1:4000/payment/'+this.props.match.params.title, requestOptions)
	    .then(response => response.json())
	    .then((data) => {
	    	console.log(data);
	        this.setState(
	        	{
	        		loading: false, 
	        		game: data.game, 
	        		discount: data.discount
	        	}
	        );
	    });
  	}

  	handleNext = () => {
  		// console.log(this.state.activeStep);
  		this.setState({ activeStep: this.state.activeStep + 1 });
	};

	handleBack = () => {
  		// console.log(this.state.activeStep);
	   	this.setState({ activeStep: this.state.activeStep - 1 });
	};

  	getStepContent() {
		switch (this.state.activeStep) {
		    case 0:
		      return <GamePrice next={this.handleNext} game={this.state.game} discount={this.state.discount}/>;
		    case 1:
		      return <CreditCard next={this.handleNext} previous={this.handleBack}/>;
		    case 2:
		      return <PaymentConfirmation previous={this.handleBack} confirm={() => {alert(Language.getTextByCode('CONFIRMED'))}}/>;
		    default:
		      return Language.getTextByCode('UNKNOWN_STEP');
		}
	}
	
	render() {
		if ( this.state.loading ) {
			return (<h3>{Language.getTextByCode('LOADING')}...</h3>);
		} else {
			if (UserProfile.isLoggedIn()) {				
				return (
					<div className="container">
						<div className="row m-5">
							<HomeButton/>
						</div>
						<div className="row justify-content-center">
							<Card>
								<Card.Header>
									<Stepper activeStep={this.state.activeStep} alternativeLabel>
								        {this.steps.map((label, index) => (
								          	<Step key={index}>
								            	<StepLabel>{label}</StepLabel>
								          	</Step>
								        ))}
								    </Stepper>
								</Card.Header>
							  	<Card.Body className="text-center">
							  		{this.getStepContent()}
							  	</Card.Body>
							</Card>
						</div>
					</div>
				);
			} else {
				return (<h3>{Language.getTextByCode('PLEASE_LOG_IN_TO_BUY')}</h3>);
			}
		}
	}
}

export default Payment;