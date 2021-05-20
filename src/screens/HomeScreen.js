import React, { useEffect, useState } from 'react';
import { Platform, ActivityIndicator, ImageBackground, View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// expo install expo-font
import { useFonts } from 'expo-font';
import { SearchBar } from 'react-native-elements';

// https://fonts.google.com/specimen/Source+Sans+Pro
import SourceSansProLight from '../../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf';
import blue_ball1 from '../../assets/balls/blue_ball1.gif';
import grey_ball from '../../assets/balls/grey_ball.gif';
import Card from '../components/card'
import home_page from '../../assets/uiscreens/home_page.png';
import { LogBox } from 'react-native';
//userName: string
const BasicURL = "https://murmuring-coast-31964.herokuapp.com/"

const HomeScreen = ({ route, navigation }) => {
    //const userInfo = route.params.params;
    const userInfo = navigation.getParam("id");
    const userName = userInfo["firstName"] + " " + userInfo["lastName"]
    const [players, setPlayers] = useState([]);
    const [playerCounter, setPlayerCounter] = useState(1);
    const [result, setResult] = useState({});
    const [isJoinedToGame, setIsJoinedToGame] = useState(true)
    const [curGame, setCurGame] = useState({})
    const [startLoading, setStartLoading] = useState(false)
    const [loading, setLoading] = useState(true)

    //const [isPlayerExistInGame, setIsPlayerExistInGame] = useState(true)
    useEffect(() => {
        if (Platform.OS != 'web')
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        getPlayersInCurrentGame()
        checkIfPlayerExistsApi()
        getCurGame()
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
    const getCurGame = () => {
        return fetch(BasicURL + '/players/getGame')
            .then((response) => response.json())
            .then((json) => {
                setCurGame(json);
                setStartLoading(true);
            })
            .catch((error) => {
                alert(error);
            });

    };
    const getPlayersInCurrentGame = () => {
        return fetch(BasicURL + '/players/getPlayersInCurrentGame')
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
        setLoading(false)
        fetch(BasicURL + "/players/addPlayerToGame",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: createUserJson()
            }).then((response) => response.json())
            .then((json) => { console.log(""); setResult(json); setLoading(true); })
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
        return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#000"></ActivityIndicator>
        </View>)
    }
    return (
        <ScrollView>
            <View >
                {/* <View style={{ flexDirection: 'row' }}> */}
                <View style={styles.gameNumberView}>


                    <Text style={styles.gameNumber}>Game {curGame["gameId"]}</Text>
                </View>
                {/* </View> */}
                <View style={styles.viewStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            if (startLoading && loading)
                                joinApi()
                        }}>
                        <ImageBackground style={styles.joinButton} source={blue_ball1}>
                            {!isJoinedToGame ? <Text style={styles.textInJoinButton}>  Join Team !</Text> :
                                <Text style={styles.textInJoinButton}>  Exit Team !</Text>}
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <TouchableOpacity style={styles.roundedButton} onPress={() => { navigation.navigate('GamesView', { "id": result }) }}>
                        <Text
                            style={styles.buttonText} >Game view</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundedButton} onPress={() => { navigation.navigate('Random', { "id": curGame }) }}>
                        <Text style={styles.buttonText}  >Create Teams</Text>
                    </TouchableOpacity>
                </View>
                {/* <View >
                <SearchBar
                    inputStyle={{ backgroundColor: 'white' }}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
                    placeholderTextColor={'#g5g5g5'}
                    placeholder="Type Here..."
                    onChangeText={(s) => setSearch(s)}
                    value={search}
                />
            </View> */}
                {/* number of players */}
                <View style={styles.viewStyle}>
                    <Text style={styles.countPlayers}>{playerCounter} Players</Text>
                </View>
                {/* players list */}
                {(startLoading && loading) ? (
                    <FlatList
                        keyExtractor={(player) => { return player }}
                        data={players}
                        renderItem={({ item }) => {
                            return (

                                <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 2, borderColor: "rgba(0,0,0,0.05)", marginBottom: 10 }}>
                                    <Image style={styles.image} source={grey_ball} />
                                    <Text style={styles.playerListText}>
                                        {item}
                                    </Text>
                                </View>
                            )
                        }}
                    />) : (<ActivityIndicator size='large' color="#000"></ActivityIndicator>)}
            </View >
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    roundedButton: {
        margin: 10,
        display: "flex",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 1000,
        elevation: 2,
        shadowColor: "#000",
        backgroundColor: "rgb(228,188,4)",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
        // margin: 10,
        // backgroundColor: "#484aa1"
    },
    gameNumberView: {
        marginTop: 30,
        justifyContent: 'center',

        flexDirection: 'row',
        color: '#000',
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    gameNumber: {
        margin: 10,
        fontSize: 40,
        color: "#484aa1",
        borderRadius: 20,
        fontFamily: 'SourceSansProBold',
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    cardView: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    image: {
        width: 20,
        height: 20,
        marginStart: 20,
        marginRight: 30
    },
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
        color: "#484aa1",
        fontFamily: 'SourceSansProBold',
    },
    playerListText: {
        marginTop: 10,
        fontSize: 18,
        fontFamily: 'SourceSansProRegular',
    },
    joinButton: {
        marginTop: 20,
        width: 220,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
    },
    textInJoinButton: {
        fontSize: 30,
        color: '#000',
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 50,
        padding: 10,
        fontFamily: 'SourceSansProRegular'
    },
});


export default HomeScreen;