'use strict';

var React = require('react-native'),
	config = require('../configs/urls');

var { WebView, Component } = React;

/**
 * Book hotel component
 */
class BookHotelScreen extends Component {
	/**
	 * Renders the component
	 * 
	 * @return {XML}
	 */
	render() {
		return (
			<WebView 
				startInLoadingState={true}
				url={config.forBookingHotels(this.props.hotel.hid)} />
		);
	}
}

module.exports = BookHotelScreen;