import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Home.js'
import DetailContent from '../Card/DetailContent.js'


const Stack = createStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator 		
		screenOptions={{
    	headerShown: false
 	 }}>
			<Stack.Screen name="Home" component={Home} />
			 <Stack.Screen name="DetailContent" component={DetailContent} />
		</Stack.Navigator>
	)
}

