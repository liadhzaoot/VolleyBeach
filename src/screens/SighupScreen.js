import React, { useEffect, useState } from 'react';
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
} from 'react-native';

// You can use your custom background image
import BackgroundImage from '../../assets/uiscreens/register.jpg';

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
import { set } from 'react-native-reanimated';



const BasicURL = "https://murmuring-coast-31964.herokuapp.com/"

///user/signup
const sighupScreen4 = (props) => {
    const [result, setResult] = useState({})
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [resultError, setResultError] = useState(false)
    const [counterFirst, setCounterFirst] = useState(0)
    useEffect(() => {
        if (result["error"])
            setResultError(true)
        else {
            setResultError(false)
            if (counterFirst != 0)
                props.navigation.navigate('Home', { "id": result })
            setCounterFirst(counterFirst + 1)
        }
    }, [result])
    const postUserFromApi = () => {
        fetch(BasicURL + "user/signup",
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
        let userJson = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "email": email,
            "password": password
        })
        return userJson;
    }
    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });

    if (!loaded || !BackgroundImage) {
        return <Text>Loading...</Text>;
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
                <View style={styles.bottomView}>
                    <Text style={styles.sighText}>SignUp</Text>
                    {
                        resultError ?
                            <Text style={{ color: "red" }}>{result["error"]}</Text>
                            :
                            null
                    }
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='person'
                            type='ionicons'
                            color='#5352ed'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='First Name'
                            autoCapitalize='sentences'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={(firstName) => setFirstName(firstName)}
                        />

                    </View>
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='person'
                            type='ionicons'
                            color='#5352ed'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Last Name'
                            autoCapitalize='sentences'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            onChangeText={(lastName) => setLastName(lastName)}
                        />

                    </View>
                    <View style={styles.inputView}>
                        <Icon
                            style={styles.inputIcon}
                            name='phone'
                            type='ionicons'
                            color='#5352ed'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Phone'
                            autoCapitalize='none'
                            keyboardType='phone-pad'
                            textContentType='emailAddress'
                            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                        />

                    </View>
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
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.sighupButton}
                        onPress={() => {
                            postUserFromApi()
                        }
                        }

                    >
                        <Text style={styles.sighupButtonText}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback >
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
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    sighText: {
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
    sighupButton: {
        backgroundColor: '#5352ed',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    sighupButtonText: {
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
export default sighupScreen4;