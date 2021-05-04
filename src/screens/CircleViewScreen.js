import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { useFonts } from 'expo-font';
import SourceSansProLight from '../../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf';


const BasicURL = "http://10.100.102.18:5000"
const CircleViewScreen = ({ navigation }) => {
    const [circle, setCircle] = useState([])
    useEffect(() => {
        getCircles()
    }, [])
    const getCircles = () => {
        return fetch(BasicURL + '/players/getCircles')
            .then((response) => response.json())
            .then((json) => {
                setCircle(json);
            })
            .catch((error) => {
                alert(error);
            });
    };
    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });
    if (!loaded) {
        return <Text>Loading...</Text>;
    }
    return <View>
        <View style={styles.listView}>
            <FlatList
                keyExtractor={(circle) => { return circle._id }}
                data={circle}
                renderItem={({ item }) => {
                    return <View style={styles.playerListText}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Circle', { "id": item })
                        }}>
                            <Card style={styles.card}>
                                <Text style={styles.circleText}>Circle: {item["circleId"]}</Text>
                                <Text style={styles.MVPText}> MVP: {item["MVP"]}</Text>
                                <Text style={styles.numberOfPlayersText}>{item["players"].length} Players</Text>
                            </Card>
                        </TouchableOpacity>
                    </View>
                }}
            />
        </View>
    </View >
};

const styles = StyleSheet.create({
    circleText: {
        fontSize: 25,
        fontFamily: 'SourceSansProBold'
    },
    MVPText: {
        fontSize: 20,
        fontFamily: 'SourceSansProRegular'
    },
    numberOfPlayersText: {
        fontSize: 16,
        fontFamily: 'SourceSansProRegular'
    },
    card: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    listView: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    playerListText: {
        marginTop: 5,

    },
});

export default CircleViewScreen;