import React, { useState, useContext } from 'react'
import { View, 
	Text, 
	TouchableOpacity, 
	TextInput, 
	Button, 
	StyleSheet, 
	TouchableWithoutFeedback,
	 Keyboard } from 'react-native'
import { Link } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../Helper/Context.js'

export default function Signup({ navigation }) {
	const { setisUser } = useContext(AuthContext)
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ error, setError ] = useState("")

	const pressLogin = () => {
		auth().signInWithEmailAndPassword(email, password)
			.then(() => console.log('Successfully Loggedin'))
			.catch(err => {
				if(err.code === "auth/wrong-password") {
					setError("Your email or password must be correct")
				}
			})
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<View style={{flex: 1 , backgroundColor: "#fff"}}>
		 <View style={styles.container}>
			<Text style={styles.header}>Login</Text>
			{
				error.length>0 ? <Text style={{ color: '#fcb1b1', fontFamily: 'OpenSans-SemiBold', fontSize: 16, textAlign: 'center' }}>{error}</Text> : null
			}
				<TextInput 
				placeholder="Enter Email" 
				value={email}
				autoFocus={true}
				onChangeText={val => setEmail(val)}
				style={styles.Input}
				/>

				<TextInput 
				placeholder="Enter Password" 
				onChangeText={val => setPassword(val)}
				style={styles.Input} secureTextEntry
				/>

			<TouchableOpacity style={styles.buttonIn} onPress={pressLogin}>
				<Text style={{color: "#fff", textAlign: 'center', lineHeight:40, fontSize: 16}}>Login</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {
				navigation.push("Signup")
					setEmail("")
				setPassword("")
			}} 
			style={styles.linkToForm}>
				<Text style={{color: "#fff", 
				textDecorationLine: "underline",
    			textDecorationStyle: "solid",
    			textDecorationColor: "#fff"}}>
    			Already have an account?</Text>
			</TouchableOpacity>
		 </View>
		</View>
		</TouchableWithoutFeedback>
	)
}
export const styles = StyleSheet.create({
	container: {
		width: 350,
		height: 350,
		backgroundColor: "#482FF7",
		marginHorizontal: 15,
		marginVertical: 50,
		padding: 5
	},
	header: {
		fontSize: 25,
		color: "#fff",
		fontFamily: "OpenSans-SemiBold",
		textAlign: 'center',
		marginBottom: 30
	},
	Input: {
		backgroundColor: "#fff",
		color: "#333",
		fontFamily: "OpenSans-Regular",
		width: 300,
		marginHorizontal: 25,
		marginVertical: 20,
		borderRadius: 99999,
		paddingHorizontal: 8,
		color: "#333",
		fontSize: 16
	},
	buttonIn: {
		backgroundColor: "#2d6cdf",
		width: 100,
		height: 40,
		marginHorizontal: 120,
		borderRadius: 5
	},
	linkToForm: {
		position: 'absolute',
		bottom: 10,
		left: 10
	}
})
