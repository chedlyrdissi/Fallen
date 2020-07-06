import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './game.component.css';

class Game extends Component {
	
	image = 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg';
	title = 'fallen';
	price = 20.30;

	buyClick = (e) => {
		console.log('buy');
	};

	articlesClick = (e) => {
		console.log('articles');	
	};

	render() {
		return (
			<Card>
			  	<Card.Img variant="top" alt="" src={this.props.image} className="game-image" />
			  	<Card.Body className="text-center">
			    	<Card.Title>{this.props.title}</Card.Title>
				    <Card.Text>{this.props.price + ' $'}</Card.Text>
				    <Link to={'/payment/' + this.props.title}>
				    	<Button className="btn btn-margin" variant="primary" onClick={this.buyClick}>Buy</Button><br/>
				    </Link>
				    <Link to={'/search/' + this.props.title}>
				    	<Button variant="primary" onClick={this.articlesClick}>Related <br/> articles</Button>
				    </Link>
			  	</Card.Body>
			</Card>
		);
	}
}

export default Game;
