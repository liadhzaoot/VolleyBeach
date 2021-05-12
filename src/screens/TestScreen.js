// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import LoginScreen from "./LoginScreen"
// function sc1({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button
//                 onPress={() => navigation.navigate('Notifications')}
//                 title="Go to notifications"
//             />
//         </View>
//     );
// }

// function sc2({ navigation }) {
//     return (

//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button onPress={() => navigation.goBack()} title="Go back home" />
//         </View>
//     );
// }

// const Drawer = createDrawerNavigator();

// export default function TestScreen() {
//     return (
//         <NavigationContainer>
//             <Drawer.Navigator initialRouteName="LoginScreen">
//                 <Drawer.Screen name="LoginScreen" component={LoginScreen} />
//                 <Drawer.Screen name="Notifications" component={sc2} />
//             </Drawer.Navigator>
//         </NavigationContainer>


//     );
// }


import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import home_page from '../../assets/uiscreens/home_page.png'

//const liad = () => { setResult("liad") }

const BasicURL = "http://10.100.102.18:5000/"
const players = [{ name: "liad1" },
{ name: "liad10" },
{ name: "liad11" },
{ name: "liad12" },
{ name: "liad13" },
{ name: "liad14" },
{ name: "liad15" },
{ name: "liad16" }]

const TestScreen = ({ route, navigation }) => {
    return (
        <View>

            <Text>liad</Text>
            <FlatList
                keyExtractor={(player) => { return player["name"] }}
                data={players}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 2, borderColor: "rgba(0,0,0,0.05)", marginBottom: 10 }}>
                            <Text style={{ marginVertical: 40 }}>
                                {item["name"]}
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default TestScreen;

// import React from "react";
// import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";
// import Navigator from "../components/drawer"

// const DATA = [
//     {
//         title: "Main dishes",
//         data: ["Pizza", "Burger", "Risotto"]
//     },
//     {
//         title: "Sides",
//         data: ["French Fries", "Onion Rings", "Fried Shrimps"]
//     },
//     {
//         title: "Drinks",
//         data: ["Water", "Coke", "Beer"]
//     },
//     {
//         title: "Desserts",
//         data: ["Cheese Cake", "Ice Cream"]
//     }
// ];

// const Item = ({ title }) => (
//     <View style={styles.item}>
//         <Text style={styles.title}>{title}</Text>
//     </View>
// );

// const App = () => (
//     <SafeAreaView style={styles.container}>
//         <SectionList
//             sections={DATA}
//             keyExtractor={(item, index) => item + index}
//             renderItem={({ item }) => <Item title={item} />}
//             renderSectionHeader={({ section: { title } }) => (
//                 <Text style={styles.header}>{title}</Text>
//             )}
//         />
//     </SafeAreaView>
// );

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: StatusBar.currentHeight,
//         marginHorizontal: 16
//     },
//     item: {
//         backgroundColor: "#f9c2ff",
//         padding: 20,
//         marginVertical: 8
//     },
//     header: {
//         fontSize: 32,
//         backgroundColor: "#fff"
//     },
//     title: {
//         fontSize: 24
//     }
// });

// export default App;