import React, { Component } from 'react';
import SearchBar from './../common/search-bar/search-bar.component';
import GameGallery from './../common/game-gallery/game-gallery.component';
import Language from '../common/language';

class Home extends Component {

	state = {
		loading: true,
		list: []
	}

	constructor(props) {
		super();
		const requestOptions = {
	        method: 'GET',
	        params: {
	        	language: Language.getLanguage()
	        }
    	};
        fetch('http://192.168.137.1:4000/home/'+Language.getLanguage(),requestOptions)
        .then(response => response.json())
        .then((data) => {
        	// console.log(data);
        	this.setState({loading: false, list: data.games});
        	// this.state.list = data.games;
        });
	}

	componentDidMount() {

	}

	render() {
		if ( this.state.loading ) {
			return <h3>{Language.getTextByCode('LOADING')}...</h3>
		} else {
			return (
				<div className="container-fluid home-container">
					<div className="row my-5 mx-5">
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