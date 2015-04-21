var urls = require('../configs/urls'),
    hotelsConstants = require('../constants/hotels');

/**
 * Injection function
 * 
 * @param  {EventEmitter} dispatcher
 * @return {Object}
 */
module.exports = dispatcher => {
    return {
        /**
         * Executes a request to the search of hotels by text api endpoint
         * 
         * @param  {string} text
         * @return {Promise}
         */
        search(text) {
            dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_START, text);

            return fetch(urls.forSearch(text))
                .then(response => response.json())
                .then(json => json.content)
                .then(response => {
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_DONE, null, response);
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_SUCCESS, response.hotels);

                    return response.hotels;
                })
                .catch(error => {
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_DONE, error);
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_FAIL, error);

                    throw new Error('We couldn`t find any hotels at this place :(');
                });
        },

        /**
         * Executes a request to the search of hotels by position api endpoint
         * 
         * @param  {array} position
         * @return {Promise}
         */
        searchByPosition(position) {
            dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_START, position);

            return fetch(urls.forSearchByPosition(position))
                .then(response => response.json())
                .then(json => json.content)
                .then(response => {
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_DONE, null, response);
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_SUCCESS, response.hotels);
                })
                .catch(error => {
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_DONE, error);
                    dispatcher.dispatch(hotelsConstants.HOTELS_SEARCH_FAIL, error);

                    throw new Error('We couldn`t find any hotels at this position :(');
                });
        }
    };
};