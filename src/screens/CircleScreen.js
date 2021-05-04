import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


//const liad = () => { setResult("liad") }

const BasicURL = "http://10.100.102.18:5000/"

const CircleScreen = ({ navigation }) => {
    const circle = navigation.getParam("id");

    return <View>
        <View style={styles.view}>
            <Text style={styles.circleText}>Circle: {circle.circleId}</Text>
            <Text style={styles.MVPText}>MVP: {circle.MVP}</Text>
            <Text style={styles.numberOfPlayersText}> {circle.players.length} Players</Text>
            <Text style={styles.numberOfPlayersText}> {circle.summary}</Text>
            <View style={styles.listView}>
                <FlatList
                    keyExtractor={(circle) => { return circle._id }}
                    data={circle.players}
                    renderItem={({ item }) => {
                        return <Text style={styles.playerListText}>{item["username"]}</Text>
                    }}
                />
            </View>
        </View>
    </View >
};

const styles = StyleSheet.create({
    playerListText: {
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'SourceSansProRegular'
    },
    listView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
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
    view: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
});

export default CircleScreen;