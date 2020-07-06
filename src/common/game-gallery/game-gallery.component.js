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
		console.log("previous "+this.state.index);
	};

	next = (e) => {
		this.setState({index: (this.state.index+1)%this.props.list.length });
		console.log("next "+this.state.index);
	};

	render() {
		return (
			<div className="group">
				<label>Games</label>
				<div className="p-auto">
					<div className="row">
						<div className="col col-1 my-auto">
							<img id="prevIcon" alt="" className="gallery-icon" onClick={this.previous} src="/resources/arrow-left.png" />
						</div>
						<div className="col col-3"><Game 
							title={this.props.list[(this.state.index-1+this.props.list.length)%this.props.list.length].title} 
							image={this.props.list[(this.state.index-1+this.props.list.length)%this.props.list.length].image} 
							price={this.props.list[(this.state.index-1+this.props.list.length)%this.props.list.length].price}/>
						</div>
						<div className="col col-4"><Game 
							title={this.props.list[this.state.index].title} 
							image={this.props.list[this.state.index].image} 
							price={this.props.list[this.state.index].price}/>
						</div>
						<div className="col col-3"><Game 
							title={this.props.list[(this.state.index+1)%this.props.list.length].title} 
							image={this.props.list[(this.state.index+1)%this.props.list.length].image} 
							price={this.props.list[(this.state.index+1)%this.props.list.length].price}/>
						</div>
						<div className="col col-1 my-auto">
							<img id="nextIcon" alt="" className="gallery-icon" onClick={this.next} src="/resources/arrow-right.png" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GameGallery;
