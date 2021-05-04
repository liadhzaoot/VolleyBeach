import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function sc1({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function sc2({ navigation }) {
    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={sc1} />
                <Drawer.Screen name="Notifications" component={sc2} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


// //const liad = () => { setResult("liad") }

// const BasicURL = "http://10.100.102.18:5000/"

// const TestScreen = () => {
//     return <View>
//         <TouchableOpacity >
//             <Text> test !</Text>
//         </TouchableOpacity>

//     </View >
// };

// const styles = StyleSheet.create({});

// export default TestScreen;