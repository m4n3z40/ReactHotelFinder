var searchUrl = 'https://simple-hotel-finder.herokuapp.com/search?texto=:text',
	searchByPositionUrl = 'https://simple-hotel-finder.herokuapp.com/search/by_position/:position',
	bookingHotelsUrl = 'https://m.hotelurbano.com/#hoteis/:hid';

module.exports = {
	/**
	 * Returns the url for the search hotels by text
	 * 
	 * @param  {string} text
	 * @return {string}
	 */
	forSearch: function(text) {
		return searchUrl.replace(':text', encodeURIComponent(text));
	},

	/**
	 * Returns the url for the search hotels by position
	 * 
	 * @param  {array} position
	 * @return {string}
	 */
	forSearchByPosition: function(position) {
		return searchByPositionUrl.replace(':position', encodeURIComponent(position.join(',')));
	},

	/**
	 * Returns the url for the booking of hotels
	 * 
	 * @param  {string} hid
	 * @return {string}
	 */
	forBookingHotels: function(hid) {
		return bookingHotelsUrl.replace(':hid', encodeURIComponent(hid));
	}
};