import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import {SquadaOne_400Regular, useFonts} from "@expo-google-fonts/squada-one";

const FriendList = ({navigation}) => {

    //Custom font
    let [fontsLoaded, error] = useFonts({
        SquadaOne_400Regular,
    });

    //Saving friends retrieved from the database
    const [friends,setFriends] = useState()

    useEffect(() => {
        if(!friends) {
            firebase
                .database()
                .ref('/users')
                .on('value', snapshot => {
                    setFriends(snapshot.val())
                });
        }
    },[]);

    //If there are no friends, the screen will render "Loading..."
    if (!friends) {
        return <Text>Loading...</Text>;
    }


    console.log(friends)

    //Navigates to the users profile
    const handleSelectUser = (id) => {
        console.log(id)
        const friend = Object.entries(friends).find(friend => friend[0] === id /*id*/)
        console.log(friend)
        navigation.navigate('Friend Details', {friend})

    };




    const friendArray = Object.values(friends);
    const friendKeys = Object.keys(friends);

    return (
        <FlatList
            style={styles.flatlist}
            backgroundColor={'#2a2727'}
            data={friendArray}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectUser(friendKeys[index])}>
                        <Text style={styles.barStyle}>
                            {item.firstname + ' ' + item.lastname}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default FriendList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:0,
        margin: 10,
        padding: 10,
        height: 90,
        justifyContent:'center',
        backgroundColor:'#2a2727',
        borderColor:'white'


    },
    flatlist:{
      marginBottom: 60
    },
    label: { fontWeight: 'bold',

    },
    barStyle:{
        color: 'white',
        fontFamily:'SquadaOne_400Regular',
        fontSize: 40,
        alignSelf: 'center'
    },
    barInfo:{
        color: 'white',
        fontFamily:'SquadaOne_400Regular',
        fontSize: 25,
        alignSelf: 'center',
    }
});