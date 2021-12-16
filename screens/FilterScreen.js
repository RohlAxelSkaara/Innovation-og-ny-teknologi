import {StyleSheet, Text, View, Button, Input, Form, TouchableOpacity} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase";
import { Rating, AirbnbRating } from 'react-native-ratings';




function FilterScreen({prop}) {

    const [currentRating, setCurrentRating] = useState()

    //Query the users filter settings, then save it to filter
    const [ratingFilter, setRating] = React.useState(1)

    const updateFilter = () =>{
        firebase
            .database()
            .ref(`/users/${firebase.auth().currentUser.uid}`)
            .update({filter : ratingFilter });

    }

    let ratingCompleted =(rating)=> {
        setRating(rating)
    }




    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => updateFilter()}>
                <Text style={styles.barStyle}>
                    Update
                </Text>
            </TouchableOpacity>

            <Text style={styles.barStyle}>
                Rating
            </Text>

            {/*Source: https://www.npmjs.com/package/react-native-ratings*/}
            <AirbnbRating
                defaultRating ={ratingFilter}
                reviews={[]}
                onFinishRating={ratingCompleted}
                selectedColor={'#c11c57'}
            />




        </View>
    )




}

export default FilterScreen


const styles = StyleSheet.create({
    container: {
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