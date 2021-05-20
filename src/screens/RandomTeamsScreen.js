import React, { useEffect, useState } from 'react';
import {
    Platform, TextInput, SectionList, View, Text, StyleSheet, Button, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator
} from 'react-native';
import SourceSansProLight from '../../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf';
import blue_ball1 from '../../assets/balls/blue_ball1.gif';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';
//const liad = () => { setResult("liad") }

const BasicURL = "https://murmuring-coast-31964.herokuapp.com/"
const COLORARR = ["rgb(94, 135, 252)", "rgb(94, 135, 252)", "rgb(241, 79, 39)", "rgb(125, 234, 39)"]
const RandomTeamsScreen = ({ navigation }) => {
    const gameInfo = navigation.getParam("id");
    const [teams, setTeams] = useState({})
    const [curGame, setCurGame] = useState({})
    const [result, setResult] = useState({})
    const [teamColor, setTeamColor] = useState("")
    const [colorIndex, setColorIndex] = useState(-1)
    const [playerInTeam, setPlayerInTeam] = useState(100)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (teams["error"])
            alert(teams["error"])
        else {
            //createSections()
        }
    }, [teams])
    useEffect(() => {
        if (Platform.OS != 'web') {
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        }
        getCurGame()
    }, [])
    const getCurGame = () => {
        return fetch(BasicURL + '/players/getGame')
            .then((response) => response.json())
            .then((json) => {
                setCurGame(json);
            })
            .catch((error) => {
                alert(error);
            });

    };
    const createTeamsApi = () => {
        setLoading(false)
        fetch(BasicURL + "/players/createTeams",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: createJsonOfTeams()
            }).then((response) => response.json())
            .then((json) => { console.log(""); setTeams(json); setLoading(true) })
            .catch((error) => {
                alert(error);
            });
    }
    const createJsonOfTeams = () => {
        let createTeams = JSON.stringify({
            "game": curGame,
            "playerInTeam": playerInTeam
        })
        return createTeams;
    }
    const colorTeamManager = () => {
        setColorIndex(colorIndex + 1)
        setTeamColor(COLORARR[colorIndex])
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
    const createSections = () => {
        if (curGame) {
            let sections_obj = {}
            let sections_array = []
            let full_teams_array = teams["teams"];
            if (full_teams_array) {
                for (let index = 0; index < full_teams_array.length; index++) {
                    let teamNO = ("Team " + (index + 1));
                    sections_obj.title = teamNO
                    sections_obj.data = full_teams_array[index]
                    sections_array.push(Object.assign({}, sections_obj))
                }
                sections_obj.title = "OUT"
                sections_obj.data = teams["out"]
                sections_array.push(Object.assign({}, sections_obj))
                //console.log(sections_array)
                return sections_array;
            }
            else {
                return null;
            }
        }
    }

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return <ScrollView >
        <View >
            <View style={styles.viewStyle}>
                <TouchableOpacity
                    onPress={() => {
                        createTeamsApi()
                    }}>
                    <ImageBackground style={styles.joinButton} source={blue_ball1}>
                        <Text style={styles.textInJoinButton}>Create Team</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.countPlayers}>{curGame["players"] ? curGame["players"].length : null} Players</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='Players Per Team'
                    autoCapitalize='none'
                    keyboardType='phone-pad'
                    onChangeText={(playerInTeam) => setPlayerInTeam(playerInTeam)}
                />
            </View>
            {loading ? (
                <SafeAreaView style={styles.container}>
                    <SectionList
                        sections={createSections()}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item["username"]} />}
                        renderSectionHeader={({ section: { title } }) => (
                            < View style={styles.viewStyle}>
                                <Text style={styles.header}>{title}</Text>
                            </View>
                        )}
                    />
                </SafeAreaView>) : <ActivityIndicator size="large" color="#000"></ActivityIndicator>}
        </View >
    </ScrollView>
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
    joinButton: {
        marginTop: 20,
        width: 220,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
    },
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    countPlayers: {
        marginTop: 20,
        fontSize: 40,
        color: "#484aa1",
        fontFamily: 'SourceSansProBold',
    },
    textInJoinButton: {
        fontSize: 30,
        color: '#000',
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 50,
        padding: 10,
        fontFamily: 'SourceSansProRegular'
    },
    input: {
        height: 40,
        flex: 1,
        fontFamily: 'SourceSansProRegular',
        fontSize: 18,
        color: '#333',
        paddingLeft: 20
    },
    inputView: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        marginHorizontal: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        borderBottomWidth: 2,
        borderBottomColor: "#eedc9a",
        // backgroundColor: "#eedc9a",
        paddingLeft: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 25,

    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: "#484aa1",
        borderTopWidth: 2,
        borderTopColor: "#484aa1",
        margin: 5,
        padding: 10,
        fontSize: 32,
        // backgroundColor: '#fff',
        borderRadius: 25,
        fontFamily: 'SourceSansProBold',

    },
    title: {
        fontSize: 20,
        fontFamily: 'SourceSansProRegular',

    }
});

export default RandomTeamsScreen;