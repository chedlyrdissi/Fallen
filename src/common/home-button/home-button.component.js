import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Language from '../language';

import './home-button.component.css';

class HomeButton extends Component {

	render() {
		return (
			<Link to="/">
				<button className="btn btn-outline-primary">				
					<span className="fa fa-angle-left mr-1"/>
					{Language.getTextByCode('HOME')}
				</button>
			</Link>
		);
	}
}

export default HomeButton;
					// <img alt="" className="back-btn" src="https://www.inventicons.com/uploads/iconset/1174/wm/512/Arrow-back-direction-forward-left-nextsvg-95.png" />