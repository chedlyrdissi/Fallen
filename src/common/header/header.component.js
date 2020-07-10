import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Dropdown } from 'react-bootstrap';

import SignUp from '../sign-up/sign-up.component';
import LogIn from '../log-in/log-in.component';
import LogOut from '../log-out/log-out.component';

import UserProfile from '../user-profile';
import Language from '../language';
import './header.component.css';

class Header extends Component {

	reload = () => {
		console.log('reloading');
		this.forceUpdate();
	};

	render() {
		return (
			<div className="header container-fluid header-container">
				<div className="row">
					<div className="col-7">
						<Link to="/">
							<div className="row">
								<div className="col-2">
									<img className="logo" alt="" src="https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg"/>
								</div>
								<div className="col-10 website-title">
									{Language.getTextByCode('FALLEN')}
								</div>
							</div>
						</Link>
					</div>
					<div className="col col-5">
						<div className="row mt-4 text-right w-100">
							{ UserProfile.isLoggedIn()?
								<Dropdown>
								  	<Dropdown.Toggle variant="" id="dropdown-basic">
								    	<label className="mt-3">{reactLocalStorage.getObject('userProfile').username}</label>
										<img alt="" className="user-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png" />
								  	</Dropdown.Toggle>
								  	<Dropdown.Menu alignRight>
							  			<LogOut reload={this.reload}/>
								  	</Dropdown.Menu>
								</Dropdown>
							:
								<div className="row w-100">
									<div className="col">
										<select>
											<option>eng</option>
											<option>alm</option>
										</select>
									</div>
									<div className="col">
										<SignUp reload={this.reload}/>
									</div>
									<div className="col">
										<LogIn reload={this.reload}/>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			</div>	
		);
	}
}

export default Header;