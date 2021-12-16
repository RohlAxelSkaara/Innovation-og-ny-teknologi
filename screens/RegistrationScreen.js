//Import dependencies
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignupScreen from "./SignupScreen";
import LoginScreen from "./LoginScreen";

import { useFonts, SquadaOne_400Regular } from '@expo-google-fonts/squada-one';






//Create instances tab og stack navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function App() {

    //Load the font
    let [fontsLoaded, error] = useFonts({
        SquadaOne_400Regular,
    });

        return (

            <NavigationContainer>

                {/*Styling the the TabNavigator*/}
    <Tab.Navigator
    tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#232121',
        inactiveBackgroundColor: '#2a2727',

        style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,//0
            height: 110 //60
        }

    }}
>
    {/*Creating the different tabs*/}
    <Tab.Screen name={'Log in'} component={LoginScreen} options={{
        tabBarIcon: () => (<Ionicons name='log-in-outline' color={'white'} size={20}/>),
        headerShown: null}}/>
    <Tab.Screen name={'Sign out'} component={SignupScreen} options={{
        tabBarIcon: () => (<Ionicons name='log-out-outline' color={'white'} size={20}/>),
        headerShown: null}}/>
</Tab.Navigator>
</NavigationContainer>
);
}



export default App


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: 'transparent',
        padding: 20,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    navigationStyle:{
        borderColor: 'white'
    }

});


