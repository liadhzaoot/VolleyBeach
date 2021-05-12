import LoginScreen from './src/screens/LoginScreen'
import TestScreen from './src/screens/TestScreen'
import HomeScreen from './src/screens/HomeScreen'
import SighupScreen from './src/screens/SighupScreen'
import GameViewScreen from './src/screens/GameViewScreen'
import GameScreen from './src/screens/GameScreen'
import RandomTeamsScreen from './src/screens/RandomTeamsScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DrawerScreen from './src/components/drawer'

const navigation = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Sighup: SighupScreen,
  Test: TestScreen,
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  GamesView: GameViewScreen,
  Game: {
    screen: GameScreen,
  },
  Random: RandomTeamsScreen,
  // Drawer: {
  //   screen: DrawerScreen,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // }
}, {

  initialRouteName: 'Login',
  defaultNavigationOptions: {
    title: 'VolleyBeach',

  }
});

export default createAppContainer(navigation);