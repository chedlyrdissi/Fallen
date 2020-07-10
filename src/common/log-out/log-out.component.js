import React, { Component } from 'react';
// import $ from 'jquery';
import UserProfile from '../user-profile';
import Language from '../language';

// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);
// reactLocalStorage.setObject('var', {'test': 'test'});
// reactLocalStorage.getObject('var');

import './log-out.component.css'

class LogOut extends Component {

	componentDidMount() {}

	submitForm = (e) => {
		e.preventDefault();
		UserProfile.logOut();
    	this.props.reload();
		console.log('logging out');
		return false;
	}

	render() {
		return (
	    	<form action="" method="" className="p-3 text-center" onSubmit={this.submitForm}>
		      	<button className="btn btn-outline-primary" type="submit">{Language.getTextByCode('LOG_OUT')}</button>
			</form>
		);
	}
}

export default LogOut;