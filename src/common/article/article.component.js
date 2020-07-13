import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Comments from '../comments/comments.component';
import { Link } from 'react-router-dom';
import Language from '../language';

import './article.component.css'

class Article extends Component {

	buyClick = (e) => {
		// console.log("buy");
	};

	render() {
		return (
			<div className="container border text-center">
				<div className="row">
					<div className="col col-2">
						<div className="row centered m-3">
							<img className="article-image" alt="" src={ this.props.game.image } />
						</div>
						<div className="row centered">
							{ this.props.game.title }
						</div>
						<div className="row centered">
							{ (Language.getLanguage() === 'de'? '€ ':'') + this.props.game.price[Language.getLanguage()] + (Language.getLanguage() === 'en'? ' $':'') }
						</div>
						<div className="row centered">
							<Link to={'/payment/'+this.props.game.title}>
						    	<button className="btn btn-outline-primary btn-margin" onClick={this.buyClick}>{Language.getTextByCode('BUY')}</button>
							</Link>
						</div>
						<div className="row centered">
							{Language.getTextByCode('GAME_RANK')}: <br/> {this.props.game.rank}
						</div>
					</div>
					<div className="col col-10 text-left">
						<Card style={{height: '100%'}}>
							<Card.Header><span className="text-left">{this.props.article.title}</span> <span className="text-right">{Language.getTextByCode('ARTICLE_RANK')}: {this.props.article.rank}</span></Card.Header>
						  	<Card.Body>
						    	<Card.Text>
						    		{this.props.article.body[Language.getLanguage()]}
						    	</Card.Text>
							</Card.Body>
							<Card.Footer>
						    	<Comments article={this.props.article.title} comments={this.props.comments}/>
						    </Card.Footer>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

export default Article;