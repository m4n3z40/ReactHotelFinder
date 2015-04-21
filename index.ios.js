/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    Component,
    NavigatorIOS,
    StyleSheet,
    AppRegistry
} = React;

//Instatiate the 'global' event emitter object
var EventEmitter = require('./app/utils/EventEmitter');
var eventEmitter = new EventEmitter();

//requiring the hotel store passing the event emitter object
var HotelsStore = require('./app/stores/HotelsStore')(eventEmitter);

//requiring the hotel actions passing the event emitter object
var HotelsActions = require('./app/actions/hotels')(eventEmitter);

//requiring the initial component
var SearchScreen = require('./app/components/SearchScreen');

/**
 * App's main component
 */
class ReactHotelFinder extends Component {
    /**
     * Renders the component
     * 
     * @return {XML}
     */
    render() {
        return (
            <NavigatorIOS
                style={styles.mainContainer}
                tintColor="#F9A11B"
                initialRoute={{
                    title: 'React Hotel Finder',
                    component: SearchScreen,
                    passProps:  {
                        store: HotelsStore,
                        actions: HotelsActions
                    }
                }} />
        );
    }
}

//Default styles
var styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});

//Registering the main component, if we don`t nothing works
AppRegistry.registerComponent('ReactHotelFinder', () => ReactHotelFinder);
