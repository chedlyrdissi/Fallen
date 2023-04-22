import React, {Component} from 'react';
import $ from 'jquery';

import {TextField} from '@material-ui/core';

import Language from '../language';
import UserProfile from '../user-profile';

import './comment-form.component.css';

class CommentForm extends Component {

	replySubmitted = (e) => {
		e.preventDefault();

		let commentId = this.props.comid;
		let commentValue = $("[commentid='"+e.target.getAttribute('target')+"']")[0];
	
		if (commentValue.childNodes[1]) {
			commentValue = commentValue.childNodes[1].childNodes[0].value;
		} else {
			commentValue = commentValue.childNodes[0].childNodes[0].value;
		}

		// console.log(this.props.article);

		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({
	        	base: commentId.slice(0, commentId.lastIndexOf('.')),
	        	id: UserProfile.getUser().id,
	        	comment: commentValue,
	        	commentId: commentId,
	        	username: UserProfile.getUser().username
	        })
    	};
        fetch(`fallen-api/comment/${this.props.article}`, requestOptions)
        .then(response => response.json())
        .then((data) => {
        	// this.setState({});
        	window.location.reload(false);
        });

		return false;
	}

	render() {
		return (
			<form method="" action="" onSubmit={this.replySubmitted} target={this.props.comid}>
				<TextField autoFocus margin="dense" commentid={this.props.comid} name="reply" label={Language.getTextByCode(this.props.label)} type="text" fullWidth required/>
			</form>
		);
	}
}

export default CommentForm;