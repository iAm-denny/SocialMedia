import React,{ useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../css/globalStyles.js'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from "moment";
import { AuthContext } from '../../Helper/Context.js'
import firestore from '@react-native-firebase/firestore';

export default function Card({ navigation, scream }) {
	const { isUser } = useContext(AuthContext)
		const [ cmtCount, setCmtCount ] = useState(0)
		const [ likeCount, setLikeCount ] = useState(0)
		const [ likeActive, setLikeActive ] = useState(false)

	useEffect(() => {
		// get comments count
		firestore()
		.collection('screams')
	      .doc(scream.id)
	      .collection("comments")
	      .orderBy("createdAt", "desc")
	      .onSnapshot((snapshot) => {
        	setCmtCount(snapshot.size);
    	})
	    // get likes count
		firestore()
		.collection('screams')
	      .doc(scream.id)
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

	const pressDelete = (id) => {	
		 firestore()
		 .collection('screams')
		 .doc(id)
		 .delete()
		 .then(() => console.log('Deleted'))
		 .catch(err => console.log(err))
	}

	const pressLike = async (id) => {
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
		<View style={globalStyles.card}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
			<View style={{flexDirection: 'row',}}>
				<Image 
					style={globalStyles.userImage}
					source={{
						uri: "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}} 
						/>
					<View style={{ marginLeft: 10 }}>

						<Text style={globalStyles.username}>{scream.name}</Text>
						<Text style={globalStyles.timestamp}>{moment(scream.createdAt).format("DD MMM YYYY hh:mm a")}</Text>
					</View>
			</View>
			
			{
				isUser.uid === scream.userid ?  (
					<TouchableOpacity onPress={() => pressDelete(scream.id)}>
					<FontAwesome5 name="trash" size={18} color="red"/>
					</TouchableOpacity>
				): null
			}
				

				</View>
				<View>
					<Text style={globalStyles.cardContent}>
						{ scream.body.slice(0, 380) }
					</Text>
							<View style={{ marginLeft: 20 }}>
						{ scream.body.length >  300 ? (
							<TouchableOpacity  onPress={() => navigation.navigate("DetailContent", { id: scream.id, body: scream.body,name: scream.name, createdAt: scream.createdAt  })}>
								<Text style={globalStyles.moreText}>See More</Text> 
							</TouchableOpacity>
							)
							
							: null}
							</View>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
					<TouchableOpacity style={globalStyles.iconBtn} onPress={() => pressLike(scream.id)}>
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
	)
}
