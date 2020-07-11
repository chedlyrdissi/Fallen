import {reactLocalStorage} from 'reactjs-localstorage';
import I18NEn from './language/I18N-en';
import I18NDe from './language/I18N-de';
// var fs = require('fs');

const languageMap = {
	en: I18NEn,
	de: I18NDe
}

var Language = (function() {

	var data;

	var getLanguage = function () {
		return reactLocalStorage.get('AppLanguage');
	}

	var setLanguage = function (l) {
		reactLocalStorage.set('AppLanguage', l)
	}

	var getTextByCode = function (code) {
		if ( !data ) {
			data = languageMap[getLanguage()];
		}
		return data[code];
	}

	return {
		getLanguage: getLanguage,
		setLanguage: setLanguage,
		getTextByCode: getTextByCode,
		options: [
	  		{ value: 'de', label: 'Deutsche' },
	  		{ value: 'en', label: 'English' }
		]		
	}

})();

export default Language;