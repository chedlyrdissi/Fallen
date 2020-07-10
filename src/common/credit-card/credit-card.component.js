import React, { Component } from 'react';
import $ from 'jquery';
import Inputmask from "inputmask";
import Card from 'react-bootstrap/Card';
import Language from '../language';

class CreditCard extends Component {

	componentDidMount() {
		$(document).ready(function() {

			var cardim = new Inputmask("9999 9999 9999 9999");
			cardim.mask(document.getElementById("cardNum"));

			var cvvim = new Inputmask("999");
			cvvim.mask(document.getElementById("cvvNum"));

			var yearim = new Inputmask("2029");
			yearim.mask(document.getElementById("paymentYear"));

			var monthim = new Inputmask("12");
			monthim.mask(document.getElementById("paymentMonth"));

			var validMap = {
				"cardNum": false,
				"cvvNum": false,
				"nameFieldPayment": false,
				"paymentYear": false,
				"paymentMonth": false,				
			};

			function updateButton() {
				for (let i in validMap) {
					if ( !validMap[i] ) {
						$("#creditCardNext").prop('disabled', true);
						return;
					}
				}
				$("#creditCardNext").prop('disabled', false);
			}


			$("#cardNum").on('input', function(){
		    	if (this.value === '' ||
		    		this.value.includes("_") ||
		    		isNaN(this.value.replace(/ /g, ''))) {
		    		$("#cardNum").removeClass("is-valid");
		    		$("#cardNum").addClass("is-invalid");
		    		validMap["cardNum"] = false;
		    	} else {
		    		$("#cardNum").removeClass("is-invalid");
		    		$("#cardNum").addClass("is-valid");
		    		validMap["cardNum"] = true;
		    	}
		    	updateButton();
		    });
		    $("#cvvNum").on('input', function(){
		    	if (this.value === '' ||
		    		this.value.includes("_") ||
		    		this.value < 0 ||
		    		this.value > 999 ||
		    		isNaN(this.value) ||
		    		this.value.length !== 3) {
		    		$("#cvvNum").removeClass("is-valid");
		    		$("#cvvNum").addClass("is-invalid");
		    		validMap["cvvNum"] = false;
		    	} else {
		    		$("#cvvNum").removeClass("is-invalid");
		    		$("#cvvNum").addClass("is-valid");
		    		validMap["cvvNum"] = true;
		    	}
		    	updateButton();
		    });
		    $("#nameFieldPayment").on('input', function(){
		    	if (this.value === '') {
		    		$("#nameFieldPayment").removeClass("is-valid");
		    		$("#nameFieldPayment").addClass("is-invalid");
		    		validMap["nameFieldPayment"] = false;
		    	} else {
		    		$("#nameFieldPayment").removeClass("is-invalid");
		    		$("#nameFieldPayment").addClass("is-valid");
		    		validMap["nameFieldPayment"] = true;
		    	}
		    	updateButton();
		    });
		    $("#paymentYear").on('input', function(){
		    	if (this.value === '' ||
		    		parseInt(this.value) > 2025 ||
		    		parseInt(this.value) < 2020) {
		    		$("#paymentYear").removeClass("is-valid");
		    		$("#paymentYear").addClass("is-invalid");
		    		validMap["paymentYear"] = false;
		    	} else {
		    		$("#paymentYear").removeClass("is-invalid");
		    		$("#paymentYear").addClass("is-valid");
		    		validMap["paymentYear"] = true;
		    	}
		    	updateButton();
		    });
		    $("#paymentMonth").on('input', function(){
		    	if (this.value === '' ||
		    		parseInt(this.value) > 12 ||
		    		parseInt(this.value) < 0) {
		    		$("#paymentMonth").removeClass("is-valid");
		    		$("#paymentMonth").addClass("is-invalid");
		    		validMap["paymentMonth"] = false;
		    	} else {
		    		$("#paymentMonth").removeClass("is-invalid");
		    		$("#paymentMonth").addClass("is-valid");
		    		validMap["paymentMonth"] = true;
		    	}
		    	updateButton();
		    });
		    $("#creditCardNext").prop('disabled', true);
		});
	}

	render() {
		return (
			<Card>
			  	<Card.Body className="text-center">
			  		<div className="form-group">
                            <label>{Language.getTextByCode('FULL_NAME_ON_CARD')}</label>
                            <input type="text" name="paymentInfoField" placeholder="Jason Doe" required className="form-control is-invalid" id="nameFieldPayment"/>
                        </div>
                        <div className="form-group">
                            <label>{Language.getTextByCode('CARD_NUMBER')}</label>
                            <div className="input-group">
                                <input type="tel" name="paymentInfoField" id="cardNum" placeholder="Your card number" className="form-control is-invalid" required/>
                                <div className="input-group-append">
                                    <span className="input-group-text text-muted">
                                        <i className="text-primary fa fa-cc-visa mx-1"></i>
                                        <i className="text-primary fa fa-cc-amex mx-1"></i>
                                        <i className="text-primary fa fa-cc-mastercard mx-1"></i>
                                    </span>
                                </div>
                             </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="form-group">
                                    <label><span className="hidden-xs">{Language.getTextByCode('EXPIRATION')}</span></label>
                                        <div className="input-group">
                                            <input type="number" placeholder="MM" name="paymentInfoField" className="form-control is-invalid" min="1" max="12" required id="paymentMonth"/>
                                            <input type="number" placeholder="YY" name="paymentInfoField" className="form-control is-invalid" min="2020" required id="paymentYear"/>
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group mb-4">
                                    <label data-toggle="tooltip" title="Three-digits code on the back of your card">{Language.getTextByCode('CVV')}
                                        <i className="fa fa-question-circle"></i>
                                    </label>
                                    <input type="tel" min="0" max="999" name="paymentInfoField" id="cvvNum" required className="form-control is-invalid"/>
                                </div>
                            </div>
                        </div>
			  	</Card.Body>
			  	<Card.Footer className="">
			  		<div className="row">
                    	<div className="col text-left">
                        	<button className="btn btn-outline-success" onClick={this.props.previous}><span className="fa fa-angle-left mr-3"/>{Language.getTextByCode('PREVIOUS')}</button>	
                    	</div>
                    	<div className="col text-right">
                    		<button id="creditCardNext" className="btn btn-outline-success" onClick={this.props.next}>{Language.getTextByCode('NEXT')}<span className="fa fa-angle-right ml-3"/></button>
                    	</div>
                    </div>
                </Card.Footer>
			</Card>
			
		);
	}
}

export default CreditCard;