import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import grey_ball from '../../assets/balls/grey_ball.gif';
export default function Player(props) {
    console.log("liad###############################")
    console.log(props.player)
    return (
        <View style={styles.listView}>
            <Text style={styles.playerListText}>
                <Image style={styles.image} source={grey_ball} />{props.player}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listView: {
        borderBottomWidth: 5,
        borderBottomColor: "#484aa1",
    },
    playerListText: {
        marginTop: 20,
        fontSize: 18,
        fontFamily: 'SourceSansProRegular',
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});