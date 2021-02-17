import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Modal, Alert, Button , ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../Helper/Context.js'
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default  function Profile() {
	const { isUser, setisUser } = useContext(AuthContext)
	const [ modalOpen, setModalOpen ] = useState(false)
	const [displayName, setDisplayName] = useState(isUser.displayName)

	const pressResetPwd = () => {
		const email = isUser.email
		auth().sendPasswordResetEmail(email)
			.then(() => {
				Alert.alert(`Hey ${email}`, 'Please check your mail', [{
					text: 'Okk', onPress: () => console.log('alert closed')
				}])
			})
			.catch(err => console.log(err))
	}

	const signout = () => {
		auth().signOut().then(() => {
		setisUser(null)
		navigation.navigate('Login')
		})
		.catch(err => {
			console.log(err)
		})
	}

	return (

			<View>
				<ImageBackground 
				style={styles.bgImg}
				source={require('../../assets/fonts/Background.png')}>
					<View style={{ flexDirection: 'row', marginTop: 50, paddingHorizontal: 20 }}>
						<Image 
							style={styles.userImage}
							source={{
							uri: "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}} 
							/>
					<View style={{ marginLeft: 10, marginTop: 20}}>
						<Text style={styles.username}>{isUser.displayName}</Text>
					<View>

				</View>
					</View>
				</View>
				</ImageBackground>
					<TouchableOpacity style={styles.button} onPress={pressResetPwd}>
						<Text style={styles.buttonText}>Change Password</Text>
					</TouchableOpacity>
				<TouchableOpacity style={styles.buttonLogout} onPress={signout}>
						<Text style={styles.buttonText}>Logout</Text>
					</TouchableOpacity>
			</View> 

	)
}

const styles = StyleSheet.create({
	 bgImg: {
	 width: "100%",
	 height: 100,
	 },
	userImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: "#333"
	},
	username: {
		color: "#fff",
		fontFamily: "OpenSans-SemiBold",
		fontSize:20
	},
	button: {
		backgroundColor: "#482FF7",
		width: 140,
		height: 35,
		borderRadius: 5,
		marginTop: 20,
		marginLeft: 130
	},
	buttonLogout: {
		backgroundColor: "#ff304f",
		width: 140,
		height: 35,
		borderRadius: 5,
		marginTop: 20,
		marginLeft: 130
	},
	buttonText: {
		color: "#fff",
		fontFamily: "OpenSans-SemiBold",
		textAlign: 'center',
		lineHeight: 35,

	}
})