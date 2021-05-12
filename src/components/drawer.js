// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from "./../screens/HomeScreen"
// import TestScreen from "./../screens/TestScreen"
// import GameViewScreen from "./../screens/GameViewScreen"
// import RandomTeamsScreen from "./../screens/RandomTeamsScreen"

// // const Homestack = createStackNavigator()
// const Drawer = createDrawerNavigator();
// const HomeScreen1 = ({ navigation }) => {

// }
// export default function DrawerScreen({ route, navigation }) {
//     const liad = navigation.getParam("id")
//     return (
//         <NavigationContainer>
//             <Drawer.Navigator initialRouteName="Home">
//                 <Drawer.Screen name="Join Home" initialParams={{ params: liad }} component={HomeScreen} />
//                 <Drawer.Screen name="Game View" component={GameViewScreen} />
//                 <Drawer.Screen name="Create Teams" component={RandomTeamsScreen} />
//             </Drawer.Navigator>
//         </NavigationContainer>


//     );
// }