import {reactLocalStorage} from 'reactjs-localstorage';
import I18N from './language/I18N';
// var fs = require('fs');

const languageMap = {
	eng: 'I10N'

}

var Language = (function() {

	var language = 'eng';
	var data;

	var getLanguage = function () {
		return language;
	}

	var setLanguage = function (l) {
		language = l;
	}

	var getTextByCode = function (code) {
		if ( !data ) {
			// data = JSON.parse(fs.readFileSync('./language/'+languageMap[language]+'.json'));
			data = I18N;
		}
		return data[code];
	}

	return {
		getLanguage: getLanguage,
		setLanguage: setLanguage,
		getTextByCode: getTextByCode		
	}

})();

export default Language;