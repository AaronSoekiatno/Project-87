import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import SignupLoginScreen from './screens/SignupLoginScreen';


export default class App extends React.Component {
  render(){
    return( 
      <SafeAreaProvider>
        <AppContainer/>
      </SafeAreaProvider>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  SignupLoginScreen:{screen:SignupLoginScreen},
  Drawer:{screen:AppDrawerNavigator}
})

const AppContainer=createAppContainer(SwitchNavigator)


