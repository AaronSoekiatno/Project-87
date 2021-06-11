import {createStackNavigator} from 'react-navigation-stack';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';
import UserDetailsScreen from '../screen/UserDetailsScreen';

export const AppStackNavigator = createStackNavigator({
    AppDrawerNavigator:{components:AppDrawerNavigator,
    navigationOptions:{headerShown:false}
    },
    UserDetailsScreen:{screen:UserDetailsScreen,
    navigationOptions:{headerShown:false}
    }
})