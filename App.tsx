import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import Home from './src/Home';
import Login from './src/Login'
import Splash from './src/Splash';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

class App extends Component {
  render(){
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash}  options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
export default App

