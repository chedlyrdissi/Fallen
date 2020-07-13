import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Dropdown } from 'react-bootstrap';
import Select from 'react-select'

import SignUp from '../sign-up/sign-up.component';
import LogIn from '../log-in/log-in.component';
import LogOut from '../log-out/log-out.component';

import UserProfile from '../user-profile';
import Language from '../language';
import './header.component.css';

class Header extends Component {

	reload = () => {
		// console.log('reloading');
		this.forceUpdate();
	};

	changeLanguage = (e) => {
		// console.log(e.value);
		Language.setLanguage(e.value);
		window.location.reload(false);
	};

	getLanguage() {
		const lang = Language.getLanguage();
		for(let op of Language.options) {
			if(op.value === lang) {
				return op;
			}
		}
	}

	render() {
		return (
			<div className="header container-fluid header-container">
				<div className="row">
					<div className="col-7">
						<Link className="row" to="/">
								<div className="col-3">
									<img className="logo" alt="" src="https://cutewallpaper.org/21/gaming-logo-background/Download-for-free-10-PNG-Gamer-logo-transparent-background-.jpg"/>
								</div>
								<div className="col-9 website-title pl-3">
									Fallen
								</div>
						</Link>
					</div>
					<div className="col col-5">
						<div className="row mt-4 text-right w-100">
							<div className="col">
								<Select id="langSelect" defaultValue={this.getLanguage()} onChange={this.changeLanguage} options={Language.options}/>
							</div>
							<div className="col">								
								{ UserProfile.isLoggedIn()?
									<Dropdown>
									  	<Dropdown.Toggle variant="" id="dropdown-basic">
									    	<label className="mt-3">{reactLocalStorage.getObject('userProfile').username}</label>
											<img alt="" className="user-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png" />
									  	</Dropdown.Toggle>
									  	<Dropdown.Menu alignRight>
								  			<div className="text-center">
								  				<Link to="/edit/article/">
								  					<button className="btn btn-outline-primary">{Language.getTextByCode('CREATE_ARTICLE')}</button>
								  				</Link>
									  		</div>
								  			<LogOut reload={this.reload}/>
									  	</Dropdown.Menu>
									</Dropdown>
								:
									<div className="row">
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
			</div>	
		);
	}
}

export default Header;