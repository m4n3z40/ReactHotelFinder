'use strict';

var Store = require('./Store'),
    hotelsConstants = require('../constants/hotels'),
    handlers = {},
    hotelsRegistry = [],
    HotelsStore;


//Instantiate the store instance with the handlers
HotelsStore = new Store(null, 'HotelsStore', {
    /**
     * Handler fot the search success event
     * 
     * @param  {array} hotels
     * @return {void}
     */
    [hotelsConstants.HOTELS_SEARCH_SUCCESS](hotels) {
        hotelsRegistry = hotels;

        HotelsStore.emitChanges();
    }
});

/**
 * Adds a method for getting the hotels results
 * 
 * @return {array}
 */
HotelsStore.getHotels = () => hotelsRegistry;

/**
 * Injector wrapper
 * 
 * @param  {EventEmitter} dispatcher
 * @return {Store}
 */
module.exports = dispatcher => {
    HotelsStore.setDispatcher(dispatcher);

    return HotelsStore;
};