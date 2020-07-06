import React, { Component } from 'react';
import './home-button.component.css';
import { Link } from 'react-router-dom';

class HomeButton extends Component {
	
	redirectToHome = (e) => {
		// return <Redirect to='/home'/>
		// this.props.history.push('/home');
		// console.log(useHistory());
	};

	render() {
		return (
			<Link to="/">
				<button className="btn btn-outline-primary" onClick={this.redirectToHome}>				
					<span className="fa fa-angle-left mr-1"/>
					Home
				</button>
			</Link>
		);
	}
}

export default HomeButton;
					// <img alt="" className="back-btn" src="https://www.inventicons.com/uploads/iconset/1174/wm/512/Arrow-back-direction-forward-left-nextsvg-95.png" />