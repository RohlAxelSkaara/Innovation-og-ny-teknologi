import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import {useFonts, SquadaOne_400Regular} from '@expo-google-fonts/squada-one';


///
const BarList = ({navigation}) => {
    let [fontsLoaded, error] = useFonts({
        SquadaOne_400Regular,
    });


    const [bars, setBars] = useState({})
    const [filter, setFilter] = useState()

    //Useffect to get the user´s information, it is used for filtering the list of bars later
    useEffect(() => {
        if (!filter) {
            firebase
                .database()
                .ref(`/users/${firebase.auth().currentUser.uid}`)
                .on('value', snapshot => {
                    setFilter(Object.values(snapshot.val()))
                });
        }
    }, []);




    //Useffect to get all the locations (bars)
    useEffect(() => {
        if (Object.keys(bars).length === 0) {
            firebase
                .database()
                .ref('/locations')
                .on('value', snapshot => {

                    setBars(snapshot.val())
                });
        }
    });

    //If no bars are found
    if (!bars) {
        return <Text>Loading...</Text>;
    }

    //When a bar is selected, this function will navigate to the bar detail screen
    const handleSelectBar = id => {
        const bar = Object.entries(bars).find(bar => bar[0] === id /*id*/)
        console.log(bar + 'hello')
        navigation.navigate('Bar Details', {bar})

    };



    const barArray = Object.values(bars);
    const barKeys = Object.keys(bars);


    return (

            <FlatList
                style={styles.flatlist}
                backgroundColor={'#2a2727'}
                data={barArray}

                keyExtractor={(item, index) => barKeys[index]}

                renderItem={({item, index}) => {

                    if (item.rating+1 >= filter) {

                        return (
                            <TouchableOpacity style={styles.container} onPress={() => handleSelectBar(barKeys[index])}>
                                <Text style={styles.barStyle}>
                                    {item.name}
                                </Text>
                                <Text style={styles.barInfo}>{'★'.repeat(item.rating)}</Text>
                                <Text style={styles.barInfo}>{'$'.repeat(item.price)}</Text>
                            </TouchableOpacity>
                        )
                    }
                }}
            />


    );

}

export default BarList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        padding: 10,
        height: 90,
        justifyContent: 'center',
        backgroundColor: '#2a2727',
        borderColor: 'white'

    },
    flatlist:{
        marginBottom: 60
    },
    label: {
        fontWeight: 'bold',

    },
    barStyle: {
        color: 'white',
        fontFamily: 'SquadaOne_400Regular',
        fontSize: 40,
        alignSelf: 'center'
    },
    barInfo:{
        color: 'white',
        fontFamily: 'SquadaOne_400Regular',
        fontSize: 20,
        alignSelf: 'center'

    }
});