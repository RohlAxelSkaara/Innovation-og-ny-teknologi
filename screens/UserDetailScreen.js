
import * as React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import {AirbnbRating} from "react-native-ratings";

const UserDetailScreen = ({navigation,route}) => {

    //Finds the user currently visited to render information
    const [user,setUser] = useState({});
    useEffect(() => {

        setUser(route.params.friend[1]);

        return () => {
            setUser({})
        }
    });

   //Adds the visited users uid under friends in the current users database
    const addFriend = async () => {
        await
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/friends`).push(
                route.params.friend[0]
            )
        }



    return(
        <View style={styles.container}>

            <Text style={styles.barStyle}>{user.firstname + ' ' + user.lastname }</Text>
            <TouchableOpacity style={styles.button} onPress={() => addFriend()}>
                <Text style={styles.barStyle}>
                     Add friend
                </Text>
            </TouchableOpacity>

        </View>
    )




}

export default UserDetailScreen

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