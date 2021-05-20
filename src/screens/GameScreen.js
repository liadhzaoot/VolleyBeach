import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import grey_ball from '../../assets/balls/grey_ball.gif';
import { LogBox } from 'react-native';
//const liad = () => { setResult("liad") }
const BasicURL = "https://murmuring-coast-31964.herokuapp.com/"


const GameScreen = ({ navigation }) => {
    useEffect(() => {
        if (Platform.OS != 'web')
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    const game = navigation.getParam("id")
    return <SafeAreaView >
        <ScrollView >
            <View >
                <View >
                    <View style={styles.gameNumberView}>
                        <Text style={styles.gameText}>Game: {game.gameId}</Text>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.MVPText}>MVP: {game.MVP}</Text>

                    </View>
                </View>
                <Text style={styles.summeryStyle}> {game.summary}</Text>
                <View >
                    <View style={styles.view}>
                        <Text style={styles.numberOfPlayersText}> {game.players.length} Players</Text>

                    </View>
                    <FlatList
                        keyExtractor={(player) => { return player["email"] }}
                        data={game.players}
                        renderItem={({ item }) => {
                            return (<View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 2, borderColor: "rgba(0,0,0,0.05)", marginBottom: 10 }}>
                                <Image style={styles.image} source={grey_ball} />
                                <Text style={styles.playerListText}>
                                    {item["username"]}
                                </Text>
                            </View>)
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    image: {
        width: 20,
        height: 20,
        marginStart: 20,
        marginRight: 30
    },
    gameNumberView: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    playerListText: {
        marginTop: 10,
        fontSize: 18,
        fontFamily: 'SourceSansProRegular',
    },
    listView: {

        marginTop: 20
    },
    summeryStyle: {
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 18,
        color: "#000",
        fontFamily: 'SourceSansProRegular',
    },
    numberOfPlayersText: {
        marginTop: 20,
        fontSize: 30,
        color: "#484aa1",
        fontFamily: 'SourceSansProBold',


    },
    MVPText: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: 'SourceSansProBold',


    },
    gameText: {
        marginTop: 10,

        fontSize: 40,
        color: "#484aa1",
        borderRadius: 20,
        fontFamily: 'SourceSansProBold',
    },
    view: {
        alignItems: 'center',
    },
});

export default GameScreen;