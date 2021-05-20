import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import { Card } from 'react-native-shadow-cards';
import Card from '../components/card'
import { useFonts } from 'expo-font';
import SourceSansProLight from '../../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf';

const BasicURL = "https://murmuring-coast-31964.herokuapp.com/"

const GameViewScreen = ({ navigation }) => {
    const [game, setGame] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getGames()
    }, [])
    const getGames = () => {
        setLoading(false)
        return fetch(BasicURL + '/players/getGames')
            .then((response) => response.json())
            .then((json) => {
                setGame(json);
                setLoading(true)
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
    return <View style={styles.MainContainer}>
        {loading ? (
            <View style={styles.listView}>
                <FlatList
                    keyExtractor={(game) => { return game._id }}
                    data={game}
                    renderItem={({ item }) => {
                        return <View style={styles.playerListText}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Game', { "id": item })
                            }}>
                                <Card style={styles.card}>
                                    <Text style={styles.gameText}>Game: {item["gameId"]}</Text>
                                    <Text style={styles.MVPText}> MVP: {item["MVP"]}</Text>
                                    <Text style={styles.numberOfPlayersText}>{item["players"].length} Players</Text>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    }}
                />
            </View>) : <ActivityIndicator size="large" color="#000"></ActivityIndicator>}
    </View >
};

const styles = StyleSheet.create({
    MainContainer:
    {

        flex: 1,

        // Set content's vertical alignment.
        justifyContent: 'center',

        // Set content's horizontal alignment.
        alignItems: 'center',

        // Set hex color code here.
        backgroundColor: '#eedc9a',

    },
    gameText: {
        fontSize: 25,
        color: "#484aa1",
        fontFamily: 'SourceSansProBold',
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

export default GameViewScreen;