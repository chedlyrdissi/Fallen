import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Routes from '../../routes';
// import { Link } from 'react-router-dom';

import './search-bar.component.css';

class SearchBar extends Component {

	changeHandler = (e) => {
		console.log(e.target.value);
		this.setState({dest: e.target.value});
	};

	state = {
		dest: ''
	}

	render() {
		return (
			<div className="container search-container border mg-auto">
					<form action={'/search/'+this.state.dest} method="">
						<div className="row">
							<div className="col col-1 text-right">
								<img alt="" className="search-icon" src="https://w7.pngwing.com/pngs/605/56/png-transparent-search-icon-computer-icons-android-desktop-search-button-internet-share-icon-search-button.png" />
							</div>
							<div className="col col-11">
								<input id="searchTitle" onChange={this.changeHandler} className="search-text" type="text" placeholder="Search for games and articles by title" />
							</div>
						</div>
					</form>		
			</div>
		)
	}
}

export default SearchBar;
