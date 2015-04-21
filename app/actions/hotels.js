'use strict';

/**
 * Insjector wrapper
 * 
 * @param  {Object} HotelsService
 * @return {Object}
 */
module.exports = HotelsService => {
    return {
        /**
         * Triggers a search action and starts a search request
         * 
         * @param  {string}   text
         * @param  {Function} callback
         * @return {void}
         */
        search(text) {
            return HotelsService.search(text);
        },

        /**
         * Triggers a search action by position and starts a search request
         * 
         * @param  {string}   position
         * @param  {Function} callback
         * @return {void}
         */
        searchByPosition(position) {
            return HotelsService.searchByPosition(position);
        }
    };
};