import React, { Component } from 'react';
import $ from 'jquery';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import UserProfile from '../user-profile';
import Language from '../language';
// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);
// reactLocalStorage.setObject('var', {'test': 'test'});
// reactLocalStorage.getObject('var');

import './sign-up.component.css'

class SignUp extends Component {
	state = {
		open: false
	}

	handleClickOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.setState({open: false});
	}

	componentDidMount() {}

	submitForm = (e) => {
		e.preventDefault();
		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({
	        	username: $("#username").prop('value'),
	        	password: $("#password").prop('value'),
	        	language: Language.getLanguage()
	        })
    	};
        fetch(`fallen-api/sign-up`,requestOptions)
        .then(response => response.json())
        .then((data) => {
        	if ( data.valid ) {
	        	UserProfile.logIn(data.username, data.id);

	        	this.setState({open: false,message: undefined});
	        	this.props.reload();

        	} else {
        		this.setState({
        			usernameState: 'invalid',
        			passwordState: 'invalid',
        			message: data.message        			
        		});
        	}
        });

		console.log('submitted');
		return false;
	}



	render() {
		return (
			<div>
		      	<button className="btn btn-outline-primary" onClick={this.handleClickOpen}>{Language.getTextByCode("SIGN_UP")}</button>
			    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
			    	<form action="" method="" className="p-3 text-center" onSubmit={this.submitForm}>
			        	<DialogTitle id="form-dialog-title">{Language.getTextByCode("SIGN_UP")}</DialogTitle>
			        	<DialogContent>
			        		{this.state.message ? <p id="signUpMsg" className="alert alert-danger">{this.state.message}</p> : ''}
							<TextField autoFocus error={this.state.usernameState === 'invalid'} margin="dense" id="username" name="username" label={Language.getTextByCode("USERNAME")} type="text" fullWidth required/>
							<TextField autoFocus error={this.state.passwordState === 'invalid'} margin="dense" id="password" name="password" label={Language.getTextByCode("PASSWORD")} type="password" fullWidth required/>
							<TextField autoFocus error={this.state.passwordState === 'invalid'} margin="dense" id="confirmPassword" label={Language.getTextByCode("CONFIRM_PASSWORD")} type="password" fullWidth required/>
			        	</DialogContent>
				        <DialogActions>
				        	<button className="btn btn-outline-danger" type="button" onClick={this.handleClose}>{Language.getTextByCode("CANCEL")}</button>
					      	<button className="btn btn-outline-primary" type="submit">{Language.getTextByCode("SIGN_UP")}</button>
				        </DialogActions>
					</form>
			    </Dialog>
		    </div>
		);
	}
}

export default SignUp;