import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './article.component.css'

class Article extends Component {

	buyClick = (e) => {
		console.log("buy");
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
							{ this.props.game.price + ' $' }
						</div>
						<div className="row centered">
							<Link to={'/payment/'+this.props.game.title}>
						    	<button className="btn btn-outline-primary btn-margin" onClick={this.buyClick}>Buy</button>
							</Link>
						</div>
						<div className="row centered">
							Game Rank: <br/> {this.props.game.rank}
						</div>
					</div>
					<div className="col col-10 text-left">
						<Card style={{height: '100%'}}>
							<Card.Header><span className="text-left">{this.props.article.title}</span> <span className="text-right">Article Rank: {this.props.article.rank}</span></Card.Header>
						  	<Card.Body>
						    	<Card.Text>
						    		{this.props.article.body}
						    	</Card.Text>
							</Card.Body>
							<Card.Footer>
						    	comments
						    </Card.Footer>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

export default Article;