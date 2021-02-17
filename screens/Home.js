import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../Helper/Context.js'

import Card from './Card/Card.js'

export default function Home({ navigation }) {
	const { isUser } = useContext(AuthContext)
	const [ modalOpen, setModalOpen ] = useState(false)
	const [ body, setBody ] = useState("")
	const [ screams, setScreams ] = useState([])

	useEffect(() => {
		firestore()
		.collection('screams')
      	.orderBy("createdAt", "desc")
      	.onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => documents.push({ ...doc.data(), id: doc.id }));
        setScreams(documents);
      });
	}, [])

	const postSchema= () => {
		firestore()
  		.collection('screams')
  		.add({
  			userid: isUser.uid,
  			body,
  			name: isUser.displayName,
  			createdAt: new Date().getTime()
  		})
  		.then(() => {
  			setBody("")
  			setModalOpen(false)
  		})
  		.catch(err => console.log(err))
		
	}

	return (
		<View style={styles.container}>
		<TouchableOpacity style={styles.createForm} onPress={() => setModalOpen(true)}>
			<FontAwesome5 name="pen" size={16} color="#fff" style={{ textAlign: 'center', lineHeight: 40 }} />
		</TouchableOpacity>
		<Modal visible={modalOpen}  animationType="slide">
			{/*<FontAwesome5 name="times" size={20} onPress={() => setModalOpen(false)} color="#333" style={{ textAlign: 'left', marginLeft: 15, marginTop: 20 }} />*/}
			<View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 10}}>
			<TouchableOpacity onPress={() => { 
				setModalOpen(false)
				setBody("")
			}}>
				<Text style={styles.cancelBtn} >Cancel</Text>
			</TouchableOpacity>
			{
				body.length > 1 ?  (
			<TouchableOpacity 
			onPress={postSchema}
			style={{backgroundColor: "#482FF7", 
			width: 80, height:30, borderRadius: 5}}>
			<Text style={styles.postBtn}>Post</Text>
				
			</TouchableOpacity>
			) : <View></View>
			}

				
			</View>
			<View style={{marginHorizontal: 10}}>
				
				<TextInput multiline 
				autoFocus={true}
				value={body}
				onChangeText={(val) =>  setBody(val)}
				placeholder="What's happening?" 
				style={styles.inputText}/>
			</View>
		</Modal>
		<FlatList 
		keyextractor= { (item) => item.id }
		data={screams}
		renderItem={({item}) => (
			<Card navigation={navigation} scream={item}/>
			)}
		/>
			
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#F5F5F5',
	},
	createForm: {
		position: 'absolute',
		bottom: 0,
		right: 5,
		backgroundColor: "#482ff7",
		width: 40,
		height: 40,
		zIndex: 1,
		borderRadius: 50
	},
	cancelBtn: {
		color: "#482FF7",
		fontFamily: "OpenSans-SemiBold",
		fontSize: 18
	},
	postBtn: {
		color: "#fff",
		fontFamily: "OpenSans-SemiBold",
		fontSize: 18,
		textAlign: 'center'
	},
	inputText: {
		fontFamily: "OpenSans-SemiBold",
		fontSize: 18,
		marginTop: 20
	}
})

