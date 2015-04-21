'use strict';

var React = require('react-native'),
    styles = require('../styles/search-results-screen'),
    urlUtils = require('../utils/url'),
    HotelPropertyScreen = require('./HotelPropertyScreen');

var {
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
    Component
} = React;

/**
 * Component for the search results screen
 */
class SearchResultsScreen extends Component {
    /**
     * Class constructor
     * 
     * @param  {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource({ 
            rowHasChanged: (currentRow, nextRow) => currentRow.hid != nextRow.hid
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.hotels)
        }
    }

    /**
     * Pushes the hotel property screen to the navigator with the chosen hotel
     * 
     * @param  {Object} hotel
     * @return {void}
     */
    onHotelItemPress(hotel) {
        this.props.navigator.push({
            title: hotel.name,
            component: HotelPropertyScreen,
            passProps: { hotel }
        });
    }

    /**
     * Renders each item of the results list
     * 
     * @param  {Object} hotel
     * @param  {int} sectionID
     * @param  {int} rowID
     * @return {void}
     */
    renderRow(hotel, sectionID, rowID) {
        return (
            <TouchableHighlight 
                onPress={() => this.onHotelItemPress(hotel)} 
                underlayColor="#DDDDDD">
                <View>
                    <View style={styles.rowContainer}>
                        <Image 
                            style={styles.image} 
                            source={{uri: urlUtils.normalizeImageUrl(hotel.imageUrl)}} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{hotel.name}</Text>
                            <Text style={styles.address} numberOfLines={1}>{hotel.address}</Text>
                            <Text style={styles.price}>R$ {Math.round(hotel.price)}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                </View>
            </TouchableHighlight>
        );
    }

    /**
     * Renders the component
     * 
     * @return {XML}
     */
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)} />
        );
    }
}

module.exports = SearchResultsScreen;