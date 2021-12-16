import React, {useState} from 'react';
import {
    Button, Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';


function SignUpForm() {
    //Instantiering af state-variabler, der skal benyttes i SignUpForm
    //Initiating state-variables to be used in the signupform
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)



    /*
   * The predefined method createUserWithEmailAndPassword creates a user based on email and password
   *   firebase.database().ref('users/' + res.user.uid).set sets the name of the user, and inital filter
   *   if error is catched, error message is set to the errorMessage state variable, then rendered
   */
    const handleSubmit = async() => {
        try {
           await firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
               firebase.database().ref('users/' + res.user.uid).set({
                   firstname: firstname,
                   lastname: lastname,
                   filter: 1,
                   friends:[]
               })
           })

        } catch (error){
           setErrorMessage(error.message)
        }

    }


//Input fields for signupform
    return (
        <View style={styles.container}>
            <Text style={styles.header}>NITEOUT</Text>
            <TextInput
                autoCapitalize='none'
                placeholderTextColor="#FFF"
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
                keyboardAppearance='dark'
            />
            <TextInput
                placeholderTextColor="#FFF"
                placeholder="firstname"
                value={firstname}
                onChangeText={(firstname) => setFirstname(firstname) }
                style={styles.inputField}
                keyboardAppearance='dark'
            />
            <TextInput
                placeholderTextColor="#FFF"
                placeholder="lastname"
                value={lastname}
                onChangeText={(lastname) => setLastname(lastname) }
                style={styles.inputField}
                keyboardAppearance='dark'
            />
            <TextInput
                autoCapitalize='none'
                placeholderTextColor="#FFF"
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
                keyboardAppearance='dark'
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.barStyle}>
                    Sign up
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2a2727',

    },
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderColor: 'white',
        fontFamily: 'SquadaOne_400Regular',
        color: 'white',
        height: 50,
        fontSize: 30


    },
    header: {
        paddingTop: 70,
        fontSize: 80,
        fontFamily: 'SquadaOne_400Regular',
        alignSelf: "center",
        color: 'white'
    },
    button: {
        flex: 0.2,
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        padding: 10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#c11c57',
        borderColor: 'white'
    },
    barStyle: {
        color: 'white',
        fontFamily: 'SquadaOne_400Regular',
        fontSize: 30,
        alignSelf: 'center'
    }
});

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default SignUpForm
