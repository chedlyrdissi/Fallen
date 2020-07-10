import React, { Component } from 'react';
import Game from './.././game/game.component';
import './game-gallery.component.css';

class GameGallery extends Component {

	list = [{
		image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg',
		title: 'fallen 1',
		price: 20.30
	},{
		image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg',
		title: 'fallen 2',
		price: 21.3
	},{
		image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg',
		title: 'fallen 3',
		price: 20.30
	}];

	state = {
		index : 0
	};

	previous = (e) => {
		this.setState({index: (this.state.index-1+this.props.list.length)%this.props.list.length });
	};

	next = (e) => {
		this.setState({index: (this.state.index+1)%this.props.list.length });
	};

	render() {
		return (
			<div className="group">
				<label>Games</label>
				<div className="p-auto">
					<div className="row">
						<div className="col-1 my-auto">
							{(this.props.list.length > 3) ?
								(<img id="prevIcon" alt="" className="gallery-icon" onClick={this.previous} src="/resources/arrow-left.png" />)
								: ''}
						</div>
						<div className="col-10">
							<div className="row">
								<div className="col">
									{ (this.props.list.length > 2)?
										<Game game={this.props.list[(this.state.index-1+this.props.list.length)%this.props.list.length]}/>
										: ''
									}
								</div>
								<div className="col">
									{(this.props.list.length > 0)?
										<Game game={this.props.list[this.state.index]}/>
										:
										<h3>No games available</h3>
									} 
								</div>
								<div className="col">
									{ (this.props.list.length > 1)?
										<Game game={this.props.list[(this.state.index+1)%this.props.list.length]}/>
										: ''
									}
								</div>
							</div>
						</div>
						<div className="col-1 my-auto">
							{(this.props.list.length > 3) ?
							<img id="nextIcon" alt="" className="gallery-icon" onClick={this.next} src="/resources/arrow-right.png" />
							: ''}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GameGallery;
