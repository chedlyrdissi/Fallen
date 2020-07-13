import React, {Component} from 'react';

import { Accordion, Card } from 'react-bootstrap';

import CommentForm from '../comment-form/comment-form.component';

import Language from '../language';

class Comment extends Component {

	getNextCommentId(base, list) {
		// console.log('func');
		// console.log(base);
		// console.log(list);
		let com, res;
		for(let i of list){
			if(base === i.id) {
				com = i;
				break
			}
		}
		if(com.replies.length > 0) {
			let buf = com.replies[com.replies.length - 1].id;
			res = buf.slice(0, buf.lastIndexOf('.')) + '.' + ( parseInt(buf.slice(buf.lastIndexOf('.')+1)) + 1);

		} else {
			res = com.id + '.1'
		}
		// console.log(res);
		// console.log('end func');
		return res;
	}

	render() {
		let list = [];
		for(let com of this.props.comments) {
			list.push(
				<div className="container-fluid" key={com.username+com.comment}>
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
										<CommentForm label={'REPLY'} article={this.props.article} comid={this.getNextCommentId(com.id, this.props.comments)}/>						      			
						      		</Card.Body>
						    	</Accordion.Collapse>
						  	</Card>
						</Accordion>
					</div>
					<div className="row">
						<div className="col-1"></div>
						<div className="col-11">
							<Comment className="ml-3" article={this.props.article} comments={com.replies}/>
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