import React, { Component } from 'react';
import SearchBar from './../common/search-bar/search-bar.component';
import GameGallery from './../common/game-gallery/game-gallery.component';

class Home extends Component {

	state = {
		loading: true,
		list: []
	}

	constructor(props) {
		super();
		this.getTodos();
	}

	componentDidMount() {

	}

	async getTodos() {
        const requestOptions = {
	        method: 'GET'
    	};
        fetch('http://192.168.137.1:4000/home',requestOptions)
        .then(response => response.json())
        .then((data) => {
        	console.log(data);
        	this.setState({loading: false, list: data.games});
        	// this.state.list = data.games;
        });
    }

	render() {
		if ( this.state.loading ) {
			return <h3>Loading</h3>
		} else {
			return (
				<div className="container">
					<div className="row">
						<SearchBar />
					</div>
					
					<div className="row">
						<GameGallery list={this.state.list}/>
					</div>
				</div>
			);
		}

	}
}

export default Home;