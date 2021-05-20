import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Keyboard,
    ActivityIndicator
} from 'react-native';

// You can use your custom background image
import BackgroundImage from '../../assets/uiscreens/startPic.jpg';

// expo install expo-font
import { useFonts } from 'expo-font';

// https://fonts.google.com/specimen/Source+Sans+Pro
import SourceSansProLight from '../../assets/fonts/SourceSansPro/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../../assets/fonts/SourceSansPro/SourceSansPro-Bold.ttf';

// npm install react-native-elements
import { Icon } from 'react-native-elements';

// npm install react-native-animatable
import * as Animatable from 'react-native-animatable';


const BasicURL = "https://murmuring-coast-31964.herokuapp.com/"

export default function LoginScreen4(props) {

    const [result, setResult] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErrorShow, setEmailErrorShow] = useState(false)
    const [counterFirst, setCounterFirst] = useState(0)
    useEffect(() => {
        if (result["error"])
            setEmailErrorShow(true)
        else {
            setEmailErrorShow(false)
            if (counterFirst != 0)
                props.navigation.navigate('Home', { "id": result })
            setCounterFirst(counterFirst + 1)
        }

    }, [result])

    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });

    if (!loaded || !BackgroundImage) {
        return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#000"></ActivityIndicator>
        </View>)
    }

    // const loginPost = () => {
    //     fetch(BasicURL + "user/login",
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: createUserJson()
    //         }).then((response) => response.json())
    //         .then((json) => { console.log(""); setResult(json) })
    //         .catch((error) => {
    //             alert(error);
    //         });
    // }
    const loginPost = () => {
        fetch(BasicURL + "user/login",
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
    const createUserJson = () => {
        let userLoginJson = JSON.stringify({
            "email": email,
            "password": password
        })
        return userLoginJson;
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ flex: 1, width: null, marginTop: -200 }}
                        source={BackgroundImage}
                    />
                </View>
                <Animatable.Text
                    style={styles.titleText}
                    animation='fadeInUp'
                    delay={1200}
                >
                    Volley Beach
        </Animatable.Text>
                <View style={styles.bottomView}>
                    <Text style={styles.loginText}>Login</Text>
                    {
                        emailErrorShow ?
                            <Text style={{ color: "red" }}>{result["error"]}</Text>
                            :
                            null
                    }
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='email'
                            type='ionicons'
                            color='#5352ed'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='lock'
                            type='ionicons'
                            color='#5352ed'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize='none'
                            onChangeText={(password) => setPassword(password)}>
                        </TextInput>
                    </View>
                    <TouchableOpacity onPress={() => alert("Tip: Improve your memory :)")}>
                        <Text style={styles.fpText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => {
                            loginPost()
                        }
                        }

                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerText}>
                        Don't have an account?
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Sighup', { "id": "liad" }) }}>
                            <Text style={{ color: '#5352ed', fontFamily: 'SourceSansProBold' }}>
                                {' Register'}

                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.1,
        alignSelf: 'center',
        color: '#000',
        fontFamily: 'SourceSansProBold',
        fontSize: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    bottomView: {
        backgroundColor: '#fff',
        opacity: 0.95,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    loginText: {
        fontFamily: 'SourceSansProBold',
        fontSize: 24,
        marginTop: 12,
        marginBottom: 4,
    },
    inputView: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        flex: 1,
        fontFamily: 'SourceSansProRegular',
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#5352ed',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontFamily: 'SourceSansProBold',
        alignSelf: 'center',
        fontSize: 18,
    },
    registerText: {
        alignSelf: 'center',
        marginTop: 12,
        fontFamily: 'SourceSansProRegular',
        fontSize: 16,
    },
    fpText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontFamily: 'SourceSansProBold',
        fontSize: 16,
        color: '#5352ed',
    },
});