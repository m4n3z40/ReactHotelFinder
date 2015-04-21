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
var Dispatcher = require('./app/utils/Dispatcher');
var dispatcher = new Dispatcher();

//requiring the hotel store passing the dispatcher object
var HotelsStore = require('./app/stores/hotels')(dispatcher);

//requiring the hotel service passing the dispatcher object
var HotelsService = require('./app/services/hotels')(dispatcher);

//requiring the hotel actions passing the service object
var HotelsActions = require('./app/actions/hotels')(HotelsService);

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
