import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Routes from '../../routes';
import './search-bar.component.css';

class SearchBar extends Component {

	componentDidMount() {
		$(document).ready(function(){
			$("form").on('submit', function(){
				this.props.history.push('/' + $('searchTitle').value);
			});
		});
	}

	render() {
		return (
			<div className="container search-container border mg-auto">
					<form action="" method="">
						<div className="row">
							<div className="col col-1">
								<img alt="" className="search-icon" src="https://w7.pngwing.com/pngs/605/56/png-transparent-search-icon-computer-icons-android-desktop-search-button-internet-share-icon-search-button.png" />
							</div>
							<div className="col col-11">
								<input id="searchTitle" className="search-text" name="searchQuery" type="text" placeholder="Search for games and articles by title" />
							</div>
						</div>
					</form>		
			</div>
		)
	}
}

export default SearchBar;
