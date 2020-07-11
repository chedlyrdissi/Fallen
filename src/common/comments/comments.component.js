import React, { Component } from 'react';

import { Accordion, Card } from 'react-bootstrap';

import Comment from '../comment/comment.component';
import UserProfile from '../user-profile';
import Language from '../language';
import './comments.component.css';

class Comments extends Component {

	list = [
		{
			id: 'art1.1',
			username: 'chedli', 
			comment: 'comment1',
			replies: [
				{
					id: 'art1.1.1',
					username: 
					'chedli',
					comment: 'comment 1.1',
					replies: []
				},
				{
					id: 'art1.1.2',
					username: 'chedli',
					comment: 'comment 1.2',
					replies: []
				},	
			]
		},
		{
			id: 'art1.2',
			username: 'chedli',
			comment: 'comment 2',
			replies: [
				{
					id: 'art1.2.1',
					username: 'chedli',
					comment: 'comment 2.1',
					replies: []
				},
				{
					id: 'art1.2.2',
					username: 'chedli',
					comment: 'comment 2.2',
					replies: []
				},	
			]
		}
	];

	render() {
		return (
			<Accordion defaultActiveKey="0">
			  	<Card>
			    	<Accordion.Toggle as={Card.Header} eventKey="0">
			      		<i className="fa fa-commenting-o mr-3"></i>
			      		{Language.getTextByCode('COMMENTS')}
			    	</Accordion.Toggle>
			    	<Accordion.Collapse eventKey="0">
			      		<Card.Body>
			      			<Comment comments={this.list}/>
			      		</Card.Body>
			    	</Accordion.Collapse>
			  	</Card>
			</Accordion>
		);
	}
}

export default Comments;