import React, { Component } from 'react';
import Articles from '../common/articles/articles.component';
import HomeButton from '../common/home-button/home-button.component';
import GameGallery from '../common/game-gallery/game-gallery.component';

class Search extends Component {

	state = {
		loading: true,
		games: [],
		articles: []
	}

	constructor(props) {
		super(props);
	    const requestOptions = {
	        method: 'GET',
	        params: {          	
	        	title: this.props.match.params.title
	        }
	    };
	    fetch('http://192.168.137.1:4000/search/'+this.props.match.params.title, requestOptions)
	    .then(response => response.json())
	    .then((data) => {
	    	console.log(data);
	        this.setState(
	        	{
	        		loading: false, 
	        		games: data.games, 
	        		articles: data.articles
	        	}
	        );
	    });
	}

	render() {
		if ( this.state.loading ) {
			return (<h3>Loading ... </h3>);
		} else {
			let art;
			if (this.state.articles.length === 0) {
				art = (<h3>No articles found by the search were found</h3>);
			} else {
				art = (<Articles className="container" articles={this.state.articles}/>);
			}

			let games;
			if (this.state.games.length === 0) {
				games = (<h3>No games found by the search were found</h3>);
			} else {
				games = (<GameGallery list={this.state.games} />);
			}

			return (
				<div className="container">
					<div className="row m-5">
						<HomeButton/>
					</div>
					<div className="row m-5">
						{games}
					</div>
					<div className="row m-5">
						{art}
					</div>		
				</div>
			);
		}
	}
}

export default Search;