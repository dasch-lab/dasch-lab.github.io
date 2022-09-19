const moment = require('moment');

const generateDate = function(string, format) {

	return moment(string).format(format);
}

module.exports = {
	'date': generateDate
};