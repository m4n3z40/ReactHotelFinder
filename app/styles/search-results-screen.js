var { StyleSheet } = require('react-native');

var textGutter = 5,
    primaryOrange = '#F9A11B',
    gray = '#DDDDDD';

module.exports = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    separator: {
        height: 1,
        backgroundColor: gray
    },
    textContainer: {
        flex: 1
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        marginBottom: textGutter
    },
    stars: {
        fontSize: 14,
        fontWeight: '300',
        marginBottom: textGutter
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: primaryOrange
    }
});