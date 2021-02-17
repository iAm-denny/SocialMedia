import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext } from 'react';
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { AuthContext }  from './Helper/Context.js'
import Header from './screens/Navigation/Header.js'
import LoginStack from './screens/Navigation/LoginStack.js'

const Tab = createBottomTabNavigator();

const App =  () => {
  const [ isAuth, setisAuth ] = useState(false);
  const [ isUser, setisUser ] = useState(null)

      useEffect(() => {
      	auth().onAuthStateChanged((user => {
      		if(user) {
      			setisAuth(true)
      			setisUser(user)
      		}else {
      			setisAuth(false)
      		}
      	}))
      }, [isUser])

  return (
      <NavigationContainer>
      {
        isAuth ? (
        	<AuthContext.Provider value={{ isUser, setisUser }}>
        	<Header/>
        	</AuthContext.Provider>
        	) :(
        	<AuthContext.Provider value={{  setisUser }}>
        		<LoginStack />  
        	</AuthContext.Provider>
        	)   
      }
     </NavigationContainer>
  );
};


export default App;
