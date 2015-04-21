'use strict';

var React = require('react-native'),
    styles = require('../styles/search-screen'),
    SearchResultsScreen = require('./SearchResultsScreen');

var { 
    View, 
    Text, 
    Component,
    TextInput, 
    TouchableHighlight, 
    Image,
    ActivityIndicatorIOS
} = React;

/**
 * Component for the search screen
 */
class SearchScreen extends Component {
    /**
     * Class constructor
     * 
     * @param  {Object} props
     * @return {void}
     */
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            isWaiting: false,
            message: ''
        };

        //A wrapper for the change listener, need this for correctly registering and removing the handlers
        this._changeHandlerWrapper = store => this.onHotelsReceived(store.getHotels());
    }

    /**
     * Register the listener wrapper in the hotels store when the component mounts
     * 
     * @return {void}
     */
    componentDidMount() {
        this.props.store.registerListener(this._changeHandlerWrapper);
    }

    /**
     * Removes the listener the listener wrapper in the hotels store when the component unmounts
     * 
     * @return {void}
     */
    componentWillUnmount() {
        this.props.store.removeListener(this._changeHandlerWrapper);
    }

    /**
     * If an error has occurred during the request we show it here, just after the request ended
     * 
     * @param  {string} error
     * @return {void}
     */
    onSearchError(error) {
        this.setState({ message: error.message, isWaiting: false });
    }

    /**
     * Handler for the change event on the hotel store
     * 
     * @param  {array} hotels
     * @return {void}
     */
    onHotelsReceived(hotels) {
        this.setState({ isWaiting: false, message: '' });

        this.props.navigator.push({
            title: hotels.length + ' hotels found',
            component: SearchResultsScreen,
            passProps: { hotels }
        });
    }

    /**
     * Sets the state of searchQuery on every key press
     * 
     * @param  {stringq} text
     * @return {void}
     */
    onSearchTextChange(text) {
        this.setState({ searchQuery: text });
    }

    /**
     * Tries to catch the user's position and execute an search by position action
     * 
     * @return {void}
     */
    onLocationPress() {
        this.setState({ isWaiting: true });

        navigator.geolocation.getCurrentPosition(
            position => {
                var currentPosition = [position.coords.latitude, position.coords.longitude];

                this.props
                    .actions
                    .searchByPosition(currentPosition)
                    .catch(this.onSearchError.bind(this));
            },
            error => {
                this.setState({
                    message: 'There was a problem while obtaining your location: ' + error.message,
                    isWaiting: false
                });
            }
        );
    }

    /**
     * Executes the search by text action
     * 
     * @return {void}
     */
    onSearchPress() {
        this.setState({ isWaiting: true });

        this.props
            .actions
            .search(this.state.searchQuery)
            .catch(this.onSearchError.bind(this));
    }

    /**
     * Renders the component
     * 
     * @return {XML}
     */
    render() {
        //if the is a message, show it.
        var message = this.state.message ? 
                (<Text style={styles.description}>{this.state.message}</Text>) : 
                null;

        //if is at a waiting state shows a loader, shows the search button otherwise
        var loaderOrSearchButton = this.state.isWaiting ? 
                (<View style={styles.button}>
                    <ActivityIndicatorIOS color="#FFFFFF" size="large" />
                 </View>) :
                (<TouchableHighlight 
                    style={styles.button} 
                    underlayColor="#F78522"
                    onPress={this.onSearchPress.bind(this)}>
                    <Text style={styles.buttonText}>Go</Text>
                </TouchableHighlight>);

        return (
            <View style={styles.mainContainer}>
                <Text style={styles.description}>
                    Search for availables hotels
                </Text>
                <Text style={styles.description}>
                    Search by provincy, city, state, country our by your current location
                </Text>
                <View style={styles.rowContainer}>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Provincy, city, state or country"
                        value={this.state.searchQuery}
                        onChangeText={this.onSearchTextChange.bind(this)}
                        onSubmitEditing={this.onSearchPress.bind(this)}
                        returnKeyType="search"
                        editable={!this.state.isWaiting} />
                    <TouchableHighlight 
                        style={styles.locationButton} 
                        underlayColor="#FFFFFF"
                        onPress={this.onLocationPress.bind(this)}>
                        <Image style={styles.locationButtonImg} source={require('image!local')} />
                    </TouchableHighlight>
                </View>
                {loaderOrSearchButton}
                {message}
                <Image style={styles.hotelImg} source={require('image!hotel')} />
            </View>
        );
    }
}

module.exports = SearchScreen;