
import React ,{useEffect} from 'react';
import {  StatusBar} from 'react-native';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import {Home} from './screens'
import { COLORS } from './constants';

const Stack = createStackNavigator();
const App =  ()=>  {


    return (
      
      <SafeAreaProvider>
        <StatusBar backgroundColor={COLORS.primary} />
        <SafeAreaView style={{ backgroundColor: COLORS.primary}}/>
        <NavigationContainer >
            <Stack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName={'Home'}>
                <Stack.Screen name="Home" component={Home} />
 
            </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider> 
       
     
  );
};



export default App;
