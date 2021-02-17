import React,{ useState } from 'react'
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../css/globalStyles.js'
import moment from "moment";

export default function Comments({ item }) {
	return (
		<View style={{backgroundColor: "#fff", flex: 1, marginTop: 30, marginHorizontal: 10}}>
		<View style={{paddingVertical: 20, paddingHorizontal: 30}}>
			<View style={{ flexDirection: 'row', marginBottom: 10 }}>
				<Image 
					style={globalStyles.userImage}
					source={{
						uri: "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}} 
						/>
					<View style={{ marginLeft: 10 }}>
						<Text style={globalStyles.username}>{item.name}</Text>
						<Text style={globalStyles.timestamp}>
						{moment(item.createdAt).format("DD MMM YYYY hh:mm a")}</Text>
					</View>
				</View>
				<View>
					<Text>{item.comment}</Text>
				</View>
			</View>
		</View>
	)
}
