import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './article.component.css'

class Article extends Component {

	buyClick = (e) => {
		console.log("buy");
	};

	render() {
		return (
			<div className="border text-center">
				<div className="row">
					<div className="col col-2">
						<div className="row centered">
							<img className="article-image" alt="" src={ this.props.game.image } />
						</div>
						<div className="row centered">
							{ this.props.game.title }
						</div>
						<div className="row centered">
							{ this.props.game.price + ' $' }
						</div>
						<div className="row centered">
						    <button className="btn btn-outline-primary btn-margin" onClick={this.buyClick}>Buy</button>
						</div>
						<div className="row centered">
							Game Rank: <br/> {this.props.gameRank}
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