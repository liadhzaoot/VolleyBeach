import LoginScreen from './src/screens/LoginScreen'
import TestScreen from './src/screens/TestScreen'
import HomeScreen from './src/screens/HomeScreen'
import SighupScreen from './src/screens/SighupScreen'
import CircleViewScreen from './src/screens/CircleViewScreen'
import CircleScreen from './src/screens/CircleScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const navigation = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Sighup: SighupScreen,
  Test: TestScreen,
  Home: HomeScreen,
  CirclesView: CircleViewScreen,
  Circle: CircleScreen,

}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    title: 'VolleyBeach'
  }
});

export default createAppContainer(navigation);