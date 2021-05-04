import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// expo install expo-font
import { useFonts } from 'expo-font';

// https://fonts.google.com/specimen/Source+Sans+Pro
import SourceSansProLight from '../../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf';

//userName: string
const BasicURL = "http://10.100.102.18:5000"
const HomeScreen = ({ navigation }) => {
    const userInfo = navigation.getParam("id");
    const userName = userInfo["firstName"] + " " + userInfo["lastName"]
    const [players, setPlayers] = useState([]);
    const [playerCounter, setPlayerCounter] = useState(1);
    const [result, setResult] = useState({});
    const [isJoinedToGame, setIsJoinedToGame] = useState(true)
    //const [isPlayerExistInGame, setIsPlayerExistInGame] = useState(true)
    useEffect(() => {
        getPlayersInCurrentCircle()
        checkIfPlayerExistsApi()
    }, [])
    useEffect(() => {
        console.log(result)
        if (result["add"]) {
            setPlayerCounter(playerCounter + 1)
            addUserToList(userName)
            setIsJoinedToGame(true)
        }
        else if (result["remove"]) {
            setPlayerCounter(playerCounter - 1)
            deleteItemById(userName)
            setIsJoinedToGame(false)

            //TODO: removeUserFromList()
        }
    }, [result])

    const getPlayersInCurrentCircle = () => {
        return fetch(BasicURL + '/players/getPlayersInCurrentCircle')
            .then((response) => response.json())
            .then((json) => {
                setPlayerCounter(json.length)
                setPlayers(json);
            })
            .catch((error) => {
                alert(error);
            });
    };


    const joinApi = () => {
        fetch(BasicURL + "/players/addPlayerToGame",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: createUserJson()
            }).then((response) => response.json())
            .then((json) => { console.log(""); setResult(json) })
            .catch((error) => {
                alert(error);
            });
    }
    const checkIfPlayerExistsApi = () => {
        fetch(BasicURL + "/players/checkIfPlayerExist",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: createUserJson()
            }).then((response) => response.json())
            .then((json) => {
                console.log("");
                console.log(json)
                if (json["error"])
                    setIsJoinedToGame(false)
                else if (json["exist"])
                    setIsJoinedToGame(true)
            })
            .catch((error) => {
                alert(error);
            });
    }
    const createUserJson = () => {

        let userJson = JSON.stringify({
            "firstName": userInfo["firstName"],
            "lastName": userInfo["lastName"],
            "email": userInfo["email"],
        })
        return userJson;
    }
    const addUserToList = (userName) => {
        var newPlayers = [...players, userName]
        setPlayers(newPlayers);
        //setIsJoinedToGame(true)
    }
    const deleteItemById = id => {
        const index = players.indexOf(id)
        players.splice(index, 1);
        setPlayers(players);
    }
    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });

    if (!loaded) {
        return <Text>Loading...</Text>;
    }
    return (
        <View >
            <View style={styles.viewStyle}>
                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => {
                        joinApi()
                    }}>
                    {!isJoinedToGame ? <Text style={styles.textInJoinButton}>  Join Team !</Text> :
                        <Text style={styles.textInJoinButton}>  Exit Team !</Text>}
                </TouchableOpacity>
            </View>
            {/* number of players */}
            <View style={styles.viewStyle}>
                <Text style={styles.countPlayers}>{playerCounter} Players</Text>
            </View>
            {/* players list */}
            <View style={styles.listView}>
                <FlatList
                    keyExtractor={(player) => { return player }}
                    data={players}
                    renderItem={({ item }) => {
                        return <Text style={styles.playerListText}>{item}</Text>
                    }}
                />
            </View>
            <Button title="Circle view" onPress={() => { navigation.navigate('CirclesView', { "id": result }) }}></Button>
        </View >)
};

const styles = StyleSheet.create({
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    countPlayers: {
        marginTop: 20,
        fontSize: 40,
        fontFamily: 'SourceSansProBold',
    },
    playerListText: {
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'SourceSansProRegular'
    },
    joinButton: {
        marginTop: 20,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#000',
    },
    textInJoinButton: {
        fontSize: 30,
        color: '#fff',
        fontFamily: 'SourceSansProRegular'
    },
});


export default HomeScreen;