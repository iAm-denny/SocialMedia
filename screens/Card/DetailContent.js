import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { globalStyles } from '../css/globalStyles.js'
import firestore from '@react-native-firebase/firestore';
import moment from "moment";

import Comments from './Comments.js'
import { AuthContext } from '../../Helper/Context.js'

export default function DetailContent({ route }) {
	const { id, body, name, createdAt } = route.params;
	const { isUser } = useContext(AuthContext)
	const [ comments, setComments ] = useState([])
	const [ addComment, setAddComment ] = useState("")
	const [ cmtCount, setCmtCount ] = useState(0)
	const [ likeCount, setLikeCount ] = useState(0)
	const [ likeActive, setLikeActive ] = useState(false)

	useEffect(() => {
		firestore()
		.collection('screams')
		.doc(id)
		.collection('comments')
      	.orderBy("createdAt", "desc")
      	.onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => 
        documents.push({ ...doc.data(), id: doc.id }));
        setComments(documents);
      });
     		// get comments count
		firestore()
		.collection('screams')
	      .doc(id)
	      .collection("comments")
	      .orderBy("createdAt", "desc")
	      .onSnapshot((snapshot) => {
        	setCmtCount(snapshot.size);
    	})
	    // get likes count
		firestore()
		.collection('screams')
	      .doc(id)
	      .collection("likes")
	      .orderBy("createdAt", "desc")
	      .onSnapshot((snapshot) => {
	    let documents = [];
        snapshot.forEach((doc) => documents.push({ ...doc.data(), id: doc.id }));
      	const arr = documents.filter((doc) => doc.userid === isUser.uid);
      	console.log(documents)
      		if(arr.length === 0) {
      			setLikeActive(false)
      		}else {
      			setLikeActive(true)
      		}
        	setLikeCount(snapshot.size);
    	})
	}, [])

	const postComment = () => {
		firestore()
  		.collection('screams')
  		.doc(id)
  		.collection('comments')
  		.add({
  			userid: isUser.uid,
  			name: isUser.displayName,
  			comment: addComment,
  			createdAt: new Date().getTime()
  		})
  		.then(() => {
  			Keyboard.dismiss()
  			setAddComment("")
  		})
  		.catch(err => console.log(err))
	}
	const pressDelete = (id) => {	
		 firestore()
		 .collection('screams')
		 .doc(id)
		 .delete()
		 .then(() => console.log('Deleted'))
		 .catch(err => console.log(err))
	}

	const pressLike = async () => {
		  let documents = [];
		const docs = await firestore()
		 .collection('screams')
		  .doc(id)
		  .collection('likes')
		  .get();
		  docs.forEach((doc) => documents.push({ ...doc.data(), id: doc.id }));
		  const arr = documents.filter((doc) => doc.userid === isUser.uid);
		  if (arr.length === 0) {
			  firestore()
			 .collection('screams')
			  .doc(id)
			  .collection('likes')
			  .doc(isUser.uid)
			  .set({ 
			  	userid:  isUser.uid,
			  	createdAt: new Date().getTime()
			  })
			  .then(() => console.log('added Like'))
			  .catch(err => console.log(err))
		  }else {
		  firestore()
		 .collection('screams')
		  .doc(id)
		  .collection('likes')
		  .doc(isUser.uid)
		  .delete()
		  .then(() => console.log('Deleted Like'))
		  .catch(err => console.log(err))
		  }
	}
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<ScrollView>
				<View style={styles.card}>
			<View style={{ flexDirection: 'row' }}>
				<Image 
					style={globalStyles.userImage}
					source={{
						uri: "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}} 
						/>
					<View style={{ marginLeft: 10 }}>
						<Text style={globalStyles.username}>{name}</Text>


						
						<Text style={globalStyles.timestamp}>
						{moment(createdAt).format("DD MMM YYYY hh:mm a")}</Text>
					</View>
				</View>
				<View>
					<Text style={styles.cardContent}>
						{ body }
					</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
					<TouchableOpacity style={globalStyles.iconBtn} onPress={ pressLike}>
					<Text style={{marginRight: 10}}>{likeCount}</Text>
						<Text><FontAwesome5 name="thumbs-up"  size={18} color={likeActive ? 'blue': 'grey'} solid/> Like</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ flexDirection: 'row' }}
					 onPress={() => navigation.navigate("DetailContent", { id: scream.id, body: scream.body, name: scream.name, createdAt: scream.createdAt  })}>
						<Text style={{marginRight: 10}}>{cmtCount}</Text>
						<Text>
						<FontAwesome5 name="comment" size={18} />Comment</Text>
					</TouchableOpacity>
					
				</View>
			</View>
			<View style={{marginHorizontal: 20, marginVertical: 10}}>
				<TextInput 
				placeholder="Enter your comment" 
				value={addComment}
				onChangeText={val => setAddComment(val)}
				style={styles.inputField}/>
				<Button title="Post" onPress={postComment}/>
			</View>
				{
					comments.length > 0 ? (
				<FlatList 
				keyextractor= { (item) => item.id }
				data={comments}
				renderItem={({item}) => (
					<Comments item={item}/>
					)}
				/>
					) : comments.length === 0 ? <Text>Not comments yet!</Text> : <Text>Loading</Text>
				}

						
		</ScrollView>
		</TouchableWithoutFeedback>
	)
}
const styles = StyleSheet.create({
	card: {
		minWidth: 350,
		minHeight: 100,
		backgroundColor:'#fff',
		borderRadius: 10,
		padding: 20,
	},
	cardContent: {
		paddingTop: 15,
		minWidth: 330,
		minHeight:100,
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
		textAlign: 'center'
	},
	inputField: {
		borderBottomWidth: 1,
		borderColor: "#333",
		fontSize: 16,
		marginBottom: 10,
		padding: 5
	}
})