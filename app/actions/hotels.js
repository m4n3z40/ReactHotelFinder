'use strict';

var hotelsService = require('../services/hotels'),
	hotelsConstants = require('../constants/hotels');

// Default error message
var errMsg = 'We couldn`t find any hotels in this area :(';

/**
 * Insjector wrapper
 * 
 * @param  {EventEmitter} eventEmitter
 * @return {Object}
 */
module.exports = function(eventEmitter) {
	return {
		/**
		 * Triggers a search action and starts a search request
		 * 
		 * @param  {string}   text
		 * @param  {Function} callback
		 * @return {void}
		 */
		search: function(text, callback) {
			eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_START, text);

			hotelsService
				.search(text)
				.then(response => {
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_DONE, null, response);
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_SUCCESS, response.hotels);

					if (callback) callback(null, response);
				})
				.catch(error => {
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_DONE, error);
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_FAIL, errMsg);

					if (callback) callback(errMsg);
				});
		},

		/**
		 * Triggers a search action by position and starts a search request
		 * 
		 * @param  {string}   position
		 * @param  {Function} callback
		 * @return {void}
		 */
		searchByPosition: function(position, callback) {
			eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_START, position);

			hotelsService
				.searchByPosition(position)
				.then(response => {
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_DONE, null, response);
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_SUCCESS, response.hotels);

					if (callback) callback(null, response);
				})
				.catch(error => {
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_DONE, error);
					eventEmitter.emit(hotelsConstants.HOTELS_SEARCH_FAIL, errMsg);

					if (callback) callback(errMsg);
				});
		}
	};
};