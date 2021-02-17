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
import storage from '@react-native-firebase/storage';
import { AuthContext } from '../../Helper/Context.js'

export default function Signup({ navigation }) {
	const { setisUser } = useContext(AuthContext)
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ displayName, setDisplayName ] = useState("");
	 const [image, setImage] = useState(null)

	const [ error, setError ] = useState("")

	const pressLogin = () => {
		setError("")
		auth()
  			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log(user)
				auth().currentUser.updateProfile({
					displayName
				})
				.then(() => {
					setisUser(user)
			     	navigation.navigate("Home")
				})
			})
			.catch(err =>{
				console.log(err.code)
				if(err.code == "auth/weak-password") {
					setError("Password Must be at least 6 charcters")
				}else if (err.code == "auth/email-already-in-use") {
					setError("Email already in use")
				}else {
					setError("Something went wrong")
				}
			})
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<View style={{flex: 1 , backgroundColor: "#fff"}}>
		 <View style={styles.container}>
			<Text style={styles.header}>Sign up</Text>
			{
				error.length>0 ? <Text style={{ color: '#fcb1b1', fontFamily: 'OpenSans-SemiBold', fontSize: 16, textAlign: 'center' }}>{error}</Text> : null
			}
				<TextInput 
				placeholder="Enter Email" 
				autoFocus={true}
				value={email}
				onChangeText={val => setEmail(val)}
				style={styles.Input}
				/>
				<TextInput 
				placeholder="Enter Display Name" 
				value={displayName}
				onChangeText={val => setDisplayName(val)}
				style={styles.Input}
				/>
				<TextInput 
				placeholder="Enter Password" 
				onChangeText={val => setPassword(val)}
				style={styles.Input} secureTextEntry
				/>
				<TextInput />
			<TouchableOpacity style={styles.buttonIn} onPress={pressLogin}>
				<Text style={{color: "#fff", textAlign: 'center', lineHeight:40, fontSize: 16}}>Sign up</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => {
				navigation.goBack()
				setEmail("")
				setPassword("")
			}} style={styles.linkToForm}>
				<Text style={{color: "#fff", 
				textDecorationLine: "underline",
    			textDecorationStyle: "solid",
    			textDecorationColor: "#fff"}}>
    			Don't have an account?</Text>
			</TouchableOpacity>
		 </View>
		</View>
		</TouchableWithoutFeedback>
	)
}
export const styles = StyleSheet.create({
	container: {
		width: 350,
		height: 450,
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
		marginVertical: 10,
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
