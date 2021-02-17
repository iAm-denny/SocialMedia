import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Login/Login.js'
import Signup from '../Login/Signup.js'

const Stack = createStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator   
		screenOptions={{
    	headerShown: false
 	 }}>
			 <Stack.Screen name="Login" component={Login} />
			 <Stack.Screen name="Signup" component={Signup} />
		</Stack.Navigator>
	)
}

