import React, { Component } from 'react';
import Articles from '../common/articles/articles.component';
import HomeButton from '../common/home-button/home-button.component';
import GameGallery from '../common/game-gallery/game-gallery.component';

class Search extends Component {

	state = {
		loading: true,
		games: [],
	}

	constructor(props) {
		super(props);
		console.log(this.props.match.params.title);
	      const requestOptions = {
	          method: 'POST',
	          body: {
	          	title: this.props.match.params.title
	          }
	      };
	        fetch('http://192.168.137.1:4000/search',requestOptions)
	        .then(response => response.json())
	        .then((data) => {
	          console.log(data);
	          this.setState({loading: false, games: data.games});
	          // this.state.list = data.games;
	        });
	}

	render() {
		if ( this.state.loading ) {
			return (<h3>Loading ... </h3>);
		} else {
			return (
				<div className="container">
					<div className="row m-5">
						<HomeButton/>
					</div>
					<div className="row m-5">
						<GameGallery list={this.state.games} />
					</div>
					<div className="row m-5">
						<Articles
					  		className="" 
					  		articles={ [
					  			{ id: 1, title: 'title1', rank: 3, game: {image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg', title: 'title1'}},
					  			{ id: 2, title: 'title2', rank: 2, game: {image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg', title: 'title2'}},
					  			{ id: 3, title: 'title3', rank: 1, game: {image: 'https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg', title: 'title3'}}
					  		]}
				  		/>
					</div>
					
				</div>
			);
		}
	}
}

export default Search;