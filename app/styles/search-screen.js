var { StyleSheet } = require('react-native'),
	primaryOrange = '#F9A11B',
	normalFontSize = 18,
	rowHeight = 36,
	rowGutter = 10;

module.exports = StyleSheet.create({
	mainContainer: {
		marginTop: 65,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 30,
		paddingRight: 30,
		alignItems: 'center'
	},
	description: {
		marginTop: 10,
		marginBottom: 20,
		fontSize: normalFontSize,
		textAlign: 'center',
		color: '#656565'
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		marginBottom: rowGutter
	},
	searchInput: {
		height: rowHeight,
		padding: 4,
		flex: 5,
		fontSize: normalFontSize,
		borderWidth: 1,
		borderColor: primaryOrange,
		borderRadius: 8,
		color: primaryOrange
	},
	locationButton: {
		height: rowHeight,
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'stretch',
	  	justifyContent: 'center'
	},
	locationButtonImg: {
		height: 28,
		width: 28,
		alignSelf: 'center'
	},
	button: {
		height: rowHeight,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: primaryOrange,
		borderColor: primaryOrange,
	  	borderWidth: 1,
	  	borderRadius: 8,
	  	alignSelf: 'stretch',
	  	justifyContent: 'center'
	},
	buttonText: {
		fontSize: normalFontSize,
		color: 'white',
		alignSelf: 'center'
	},
	hotelImg: {
		width: 200,
		height: 303,
		marginTop: rowGutter
	}
});