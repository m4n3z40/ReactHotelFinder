'use strict';

var Store = require('./Store'),
	hotelsConstants = require('../constants/hotels'),
	handlers = {},
	hotelsRegistry = [],
	HotelsStore;

/**
 * Handler fot the search success event
 * 
 * @param  {array} hotels
 * @return {void}
 */
handlers[hotelsConstants.HOTELS_SEARCH_SUCCESS] = function(hotels) {
	hotelsRegistry = hotels;

	HotelsStore.emitChanges();
};

//Instantiate the store instance with the handlers
HotelsStore = new Store(null, 'HotelsStore', handlers);

/**
 * Adds a method for getting the hotels results
 * 
 * @return {array}
 */
HotelsStore.getHotels = function() {
	return hotelsRegistry;
};

/**
 * Injector wrapper
 * 
 * @param  {EventEmitter} eventEmitter
 * @return {Store}
 */
module.exports = function(eventEmitter) {
	HotelsStore.setEventEmitter(eventEmitter);

	return HotelsStore;
};