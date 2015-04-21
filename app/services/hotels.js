var urls = require('../configs/urls');

module.exports = {
	/**
	 * Executes a request to the search of hotels by text api endpoint
	 * 
	 * @param  {string} text
	 * @return {Promise}
	 */
	search: function(text) {
		return fetch(urls.forSearch(text))
			.then(response => response.json())
			.then(json => json.content);
	},

	/**
	 * Executes a request to the search of hotels by position api endpoint
	 * 
	 * @param  {array} position
	 * @return {Promise}
	 */
	searchByPosition: function(position) {
		return fetch(urls.forSearchByPosition(position))
			.then(response => response.json())
			.then(json => json.content);
	}
};