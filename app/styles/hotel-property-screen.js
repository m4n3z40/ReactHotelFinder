var { StyleSheet } = require('react-native');

var primaryOrange = '#F9A11B',
    lateralGutter = 5,
    rowsGutter = 5,
    normalFontSize = 18;

module.exports = StyleSheet.create({
    mainContainer: {
        marginTop: 65
    },
    image: {
        width: 400,
        height: 300
    },
    headerContainer: {
        backgroundColor: '#F8F8F8',
        padding: lateralGutter,
        marginBottom: rowsGutter
    },
    headerTitle: {
        fontSize: normalFontSize,
        fontWeight: 'bold',
        marginBottom: rowsGutter
    },
    headerSubtitle: {
        color: primaryOrange
    },
    address: {
        marginBottom: rowsGutter,
        paddingLeft: lateralGutter,
        paddingRight: lateralGutter
    },
    price: {
        color: primaryOrange,
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingLeft: lateralGutter,
        paddingRight: lateralGutter,
        marginBottom: 10
    },
    bookButton: {
        height: 36,
        backgroundColor: primaryOrange,
        borderColor: primaryOrange,
        borderWidth: 1,
        borderRadius: 8,
        marginRight: lateralGutter,
        marginLeft: lateralGutter,
        justifyContent: 'center'
    },
    bookButtonText: {
        fontSize: normalFontSize,
        color: 'white',
        textAlign: 'center'
    },
});