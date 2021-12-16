
import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {useEffect, useState} from "react";
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import firebase from 'firebase';

import * as Location from "expo-location";
import {Accuracy} from "expo-location";
import darkStyle from "../styles/darkStyle";




const BarDetailsScreen = ({route,navigation}) => {

    const [hasLocationPermission, setlocationPermission] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(null)
    const windowHeight = Dimensions.get('window').height;


    //Get users current location
    const updateLocation = async () => {
        await Location.getCurrentPositionAsync({accuracy: Accuracy.BestForNavigation}).then((item)=>{
            setCurrentLocation(item.coords)

        } );
    };

    //Update user location
    useEffect (() => {
        updateLocation()
    },[]);


    const [bar,setBar] = useState({});
    useEffect(() => {
        setBar(route.params.bar[1]);
        return () => {
            setBar({})
        }
    });

    //Find all the user's friends
    const [friends,setFriends] = useState()
    //num will be used when loop through our list of friends, then check if they are at this bar or not
    const [num,setNum] = useState()

    useEffect(() => {
        if(!friends) {
            firebase
                .database()
                .ref(`/users/${firebase.auth().currentUser.uid}/friends`)
                .on('value', snapshot => {


                    //Object.values cannot be null
                    if (snapshot.val() != null) {
                        setFriends(Object.values(snapshot.val()))
                        setNum(Object.values(snapshot.val()).length)
                    }

                });
        }
    },[]);







    //Values will store the user's friends who are at this location
    let values = []
    //Loop though our list of friends
    for(let i = 0; i < num; i++){
      //Using the uid, we find that user
        firebase
            .database()
            .ref(`/users/${friends[i]}`)
            .on('value', snapshot => {
                //If that user location, and the bar match, the user will be added to the values array
                if(snapshot.val().location == bar.name){
                   values.push(snapshot.val().firstname +', ')
                }


            });
    }


    //Add current this bar as current location
    const iAmHere = async () => {
        await
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).update(
                {location: bar.name}
            )
    }









    if (!bar) {
        return <Text>No data</Text>;
    }



    return (


                    <View style={styles.barDetails}>
                        <ScrollView>

                        <Text style={styles.barStyle}>{bar.name}</Text>
                            <View style={styles.line}>
                        <Text style={styles.barInfo}>{bar.address}</Text>
                        <Text style={styles.barInfo}>{'$'.repeat(bar.price)}</Text>
                        <Text style={styles.barInfo}>{'★'.repeat(bar.rating)}</Text>
                        <Text style={styles.barInfo}>Friends here:</Text>
                        <Text style={styles.barInfo}>{values}</Text>

                         <TouchableOpacity style={styles.button} onPress={() => iAmHere()} >
                                    <Text style={styles.barText}>
                                        I am here!
                                    </Text>
                         </TouchableOpacity>


                            </View>
                        <MapView
                            region={{
                                latitude: bar.latitude,
                                longitude: bar.longitude,
                                latitudeDelta: 0.001,
                                longitudeDelta: 0.001
                            }}
                            minZoomeLevel={1}
                            maxZoomLevel = {20}
                            style={{ flex: 1, minHeight:200}}
                            customMapStyle={darkStyle}
                            provider={PROVIDER_GOOGLE}
                            showsUserLocation

                        >
                            <Marker coordinate={{ latitude: bar.latitude, longitude: bar.longitude}} pinColor={'#c11c57'} />

                        </MapView>
                        <Text style={styles.description}>{bar.description}</Text>
                        </ScrollView>
                    </View>




    );
}

export default BarDetailsScreen;

const styles = StyleSheet.create({

    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },

    barDetails:{
        flex: 1,
        borderRadius:0,
        padding: 0,
        height: 0,
        justifyContent:'center',
        backgroundColor:'#2a2727',
        borderColor:'white',
        marginBottom: 60
    },
    barStyle:{
        color: 'white',
        fontFamily:'SquadaOne_400Regular',
        fontSize: 40,
        alignSelf: 'center',

    },
    barText:{
        color: 'white',
        fontFamily:'SquadaOne_400Regular',
        fontSize: 30,
        alignSelf: 'center',

    },
    button: {
        flex: 0.1,
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        padding: 10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#c11c57',
        borderColor: 'white'
    },
    barInfo:{
        color: 'white',
        fontFamily:'SquadaOne_400Regular',
        fontSize: 25,
        alignSelf: 'center',
    },
    line: {
        paddingTop:20,
        paddingBottom:20,
        marginTop: 10,
        marginBottom: 20,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderTopColor: 'white',
        borderTopWidth: 1,
    },
    description:{
        marginTop: 20,
        color: 'white',
        fontFamily:'SquadaOne_400Regular',
        fontSize: 25,
        alignSelf: 'center',
    }

});
