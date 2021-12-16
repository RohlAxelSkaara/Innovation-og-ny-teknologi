


import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";


const ProfileScreen = ({navigation,route}) => {

    const user =  firebase.auth().currentUser;


    //useState for the current user
    const [userDetails,setUserDetails] = useState('')
    useEffect(() => {
              firebase
                .database()
                .ref(`/users/${firebase.auth().currentUser.uid}`)
                .on('value', snapshot => {
                    setUserDetails(snapshot.val())

                });

    },[]);


    //User log out function
    const handleLogOut = async () => {
        await firebase.auth().signOut();
    };



    return(
        <View style={styles.container}>

            <Text style={styles.barStyle}>{userDetails.firstname  + ' ' + userDetails.lastname }</Text>
            <Text style={styles.barStyle}>{user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleLogOut()}>
                <Text style={styles.barStyle}>
                    Sign out

                </Text>
            </TouchableOpacity>

        </View>
    )




}

export default ProfileScreen

//Lokal styling til brug i MapScreen
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        borderRadius:0,
        padding: 0,
        height: 0,
        backgroundColor:'#2a2727',
        borderColor:'white'


    },
    button: {
        flex: 0.1,
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        padding: 10,
        height: 90,
        justifyContent: 'center',
        backgroundColor: '#c11c57',
        borderColor: 'white'
    },
    label: {fontWeight: 'bold',

    },
    barStyle: {
        color: 'white',
        fontFamily: 'SquadaOne_400Regular',
        fontSize: 40,
        alignSelf: 'center'
    }
});