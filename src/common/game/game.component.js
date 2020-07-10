import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Language from '../language';
import './game.component.css';

class Game extends Component {
	
	image = 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg';
	title = 'fallen';
	price = 20.30;

	render() {
		return (
			<Card>
			  	<Card.Img variant="top" alt="" src={this.props.game.image} className="game-image" />
			  	<Card.Body className="text-center">
			    	<Card.Title>{this.props.game.title}</Card.Title>
				    <Card.Text>{ Language.getTextByCode('GAME_RANK')+': ' + this.props.game.rank}</Card.Text>
				    <Card.Text>{this.props.game.price + ' $'}</Card.Text>
				    <Link to={'/payment/' + this.props.game.title}>
				    	<Button className="btn btn-margin" variant="primary">{Language.getTextByCode('BUY')}</Button><br/>
				    </Link>
				    <Link to={'/search/' + this.props.game.title}>
				    	<Button variant="primary">{Language.getTextByCode('RELATED')} <br/> {Language.getTextByCode('ARTICLES')}</Button>
				    </Link>
			  	</Card.Body>
			</Card>
		);
	}
}

export default Game;
