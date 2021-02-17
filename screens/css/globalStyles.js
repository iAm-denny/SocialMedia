import { StyleSheet  } from 'react-native'

export const globalStyles = StyleSheet.create({
	card: {
		width: 350,
		height: 230,
		backgroundColor:'#fff',
		borderRadius: 10,
		paddingHorizontal: 5,
		paddingVertical: 8,
		marginVertical: 20
	},
	userImage: {
		width: 40,
		height: 40,
		borderRadius: 50
	},
	username: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 15
	},
	timestamp: {
		color: '#8D8D8D',
		fontFamily: 'OpenSans-Regular',
	},
	cardContent: {
		paddingTop: 15,
		paddingHorizontal: 10,
		width: 330,
		height:120,
		fontFamily: 'OpenSans-Regular',
		fontSize: 14,
		lineHeight: 20,
		color: "#333"
	},
	iconBtn: {
		width:100,
		height: 20,
		borderRightWidth: 1,
		borderColor: "grey",
		textAlign: 'center',
		flexDirection: "row"
	},
	moreText: {
		color: "#482ff7",
		fontFamily: 'OpenSans-SemiBold',
	}
})