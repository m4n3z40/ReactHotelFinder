'use strict';

var React = require('react-native'),
    styles = require('../styles/hotel-property-screen'),
    urlUtils = require('../utils/url'),
    BookHotelScreen = require('./BookHotelScreen');

var {
    Component,
    Image,
    Text,
    View,
    TouchableHighlight
} = React;

/**
 * Hotel property screen component
 */
class HotelPropertyScreen extends Component {
    /**
     * Pushes the book hotel screen to the navigator
     * 
     * @return {void}
     */
    onBookPress() {
        var hotel = this.props.hotel;

        this.props.navigator.push({
            title: 'Booking ' + hotel.name,
            component: BookHotelScreen,
            passProps: { hotel }
        });
    }

    /**
     * Renders the component
     * 
     * @return {XML}
     */
    render() {
        var hotel = this.props.hotel;

        return (
            <View style={styles.mainContainer}>
                <Image 
                    style={styles.image}
                    source={{ uri: urlUtils.normalizeImageUrl(hotel.imageUrl) }} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{ hotel.name }</Text>
                    <Text style={styles.headerSubtitle}>
                        { hotel.stars } { hotel.stars > 1 ? 'stars' : 'star' }
                    </Text>
                </View>
                <Text style={styles.address}>{ hotel.address }</Text>
                <Text style={styles.price}>R$ { hotel.price }</Text>
                <TouchableHighlight 
                    style={styles.bookButton}
                    underlayColor="#F78522"
                    onPress={this.onBookPress.bind(this)}>
                    <Text style={styles.bookButtonText}>Book now</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = HotelPropertyScreen;