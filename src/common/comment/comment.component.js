import React, {Component} from 'react';
import $ from 'jquery';

import {TextField} from '@material-ui/core';
import { Accordion, Card } from 'react-bootstrap';

import UserProfile from '../user-profile';
import Language from '../language';

class Comment extends Component {

	replySubmitted = (e) => {
		e.preventDefault();
		// submit form
		console.log($("[commentid='"+e.target.getAttribute('target')+"']")[0].childNodes[1].childNodes[0].value);
		// get new id
		let id;
		let buf;
		let pr = [];
		const base = e.target.getAttribute('target');
		console.log('base '+base);
		for(let c of this.props.comments) {
			// console.log(c.id);
			if (!c.id.indexOf(base)) {
				pr.push(c);
			}
		}
		console.log(pr);
		
		if (pr[0].replies.length>0) {
			// has replies get last id
			// console.log('has replies');
			// console.log(pr[0].replies[pr[0].replies.length-1]);
			buf = pr[0].replies[pr[0].replies.length-1].id;
			// console.log('part1 '+buf.slice(0, buf.lastIndexOf('.')));
			// console.log('part2 '+(parseInt(buf.slice(buf.lastIndexOf('.')+1))+ 1));
			// console.log();
			id = buf.slice(0, buf.lastIndexOf('.')) + '.' + ( parseInt(buf.slice(buf.lastIndexOf('.')+1)) + 1) ;
			// console.log(id);
		} else {
			// gen id
			console.log(pr[0].id+'.1');
			id = pr[0].id+'.1';
		}

		const requestOptions = {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({
	        	id: id,
	        	comment: $("[commentid='"+e.target.getAttribute('target')+"']")[0].childNodes[1].childNodes[0].value,
	        	username: UserProfile.getUser().username
	        })
    	};
        fetch('http://localhost:4000/comment/:language/:commentId',requestOptions)
        .then(response => response.json())
        .then((data) => {
        	
        });

		return false;
	}
	render() {
		let list = [];
		for(let com of this.props.comments) {
			list.push(
				<div className="container-fluid" key={com.username+com.comment}>
					<form method="" action="" onSubmit={this.replySubmitted} target={com.id}>
						<div className="row">
							<i className="fa fa-user pt-1 pr-2"></i>
							<label className="pr-3">{com.username}:</label>
							{com.comment}					
						</div>
						<div className="row">
							<Accordion defaultActiveKey="0">
							  	<Card>
							    	<Accordion.Toggle as="a" className="px-3" eventKey={com.id}>
							      		{Language.getTextByCode('REPLY')}
							    	</Accordion.Toggle>
							    	<Accordion.Collapse eventKey={com.id}>
							      		<Card.Body>
											<TextField autoFocus margin="dense" commentid={com.id} name="reply" label={Language.getTextByCode('REPLY')} type="text" fullWidth required/>						      			
							      		</Card.Body>
							    	</Accordion.Collapse>
							  	</Card>
							</Accordion>
						</div>
					</form>
					<div className="row">
						<div className="col-1"></div>
						<div className="col-11">
							<Comment className="ml-3" comments={com.replies}/>
						</div>
					</div>					
				</div>
			);	
		}
		return (
			<div>
				{list}
			</div>
		);
	}
}

export default Comment;