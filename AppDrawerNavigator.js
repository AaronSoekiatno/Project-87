import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import customSideBarMenu  from './customSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import {AppTabNavigator} from './AppTabNavigator';
import MyBarters from '../screens/MyBarters'; 
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
        Home : {
      screen : AppTabNavigator
      },
      Setting:{
        screen:SettingScreen
      },
      Barters:{
          screen:MyBarters
      },
      Notification:{
        screen:NotificationScreen
      }
    },
    {
      contentComponent: customSideBarMenu
    },
    {
      initialRouteName : 'Home'
    })