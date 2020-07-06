import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './header.component.css';

class Header extends Component {

	render() {
		if (this.props.loggedIn) {
			return (
				<div className="m-3 header">
					<div className="row">
						<div className="col col-3">
							<Link to="/">
								<img className="logo" alt="" src="https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg"/>
							</Link>
						</div>
						<div className="col col-6">
							<a href="/">
								Fallen
							</a>
						</div>
						<div className="col col-3">
							<div className="row mt-4 text-right">
								<div className="dropdown">
								 	<span className="dropdown-toggle btn" data-toggle="dropdown">
								    	<label className="mt-3">{this.props.loggedIn.name}</label>
										<img alt="" className="user-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png" />
								  	</span>
								  	<div className="dropdown-menu dropdown-menu-right">
								    	<span href="#" className="dropdown-item">1</span>
								  	</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
			);
		} else {
			return (
				<div className="m-4 header">
					<div className="row">
						<div className="col col-3">
							<img className="logo" alt="" src="https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg"/>
						</div>
						<div className="col col-6">
						
						</div>
						<div className="col col-3">
							<div className="row mt-4">
								<div className="col col-6">
									<button className="btn btn-outline-primary">Sign up</button>
								</div>
								<div className="col col-6">
									<button className="btn btn-outline-primary">Log in</button>
								</div>
							</div>
						</div>
					</div>
				</div>	
			);
		}
	}
}

export default Header;