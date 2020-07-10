import React, { Component } from 'react';
import Language from '../common/language';

class NotFound extends Component {
	
	render() {
		return (
			<h3>{Language.getTextByCode('PAGE_NOT_FOUND')}</h3>
		);
	}
}

export default NotFound;