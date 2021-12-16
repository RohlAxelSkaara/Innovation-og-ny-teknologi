//Import dependencies
import React, {useEffect, useState} from 'react';
import { SafeAreaProvider,  initialWindowMetrics } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilterScreen2 from "./screens/FilterScreen";
import BarDetailsScreen from "./screens/BarDetailsScreen";
import BarList from "./components/BarList";
import firebase from "firebase";
import { Card } from 'react-native-paper';
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import MapScreen from "./screens/MapScreen";
import { useFonts, SquadaOne_400Regular } from '@expo-google-fonts/squada-one';
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FriendsList from "./screens/FriendsScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import UserDetailScreen from "./screens/UserDetailScreen";






//Create instances tab og stack navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



 function App() {

     //Load the font
     let [fontsLoaded, error] = useFonts({
         SquadaOne_400Regular,
     });


     //Firebase db details for communication with the database
     const firebaseConfig = {
         apiKey: "AIzaSyDWWv1ekhS7nqgu8nV_DgopqwfzL3ux5dU",
         authDomain: "niteout-b525d.firebaseapp.com",
         databaseURL: "https://niteout-b525d-default-rtdb.europe-west1.firebasedatabase.app",
         projectId: "niteout-b525d",
         storageBucket: "niteout-b525d.appspot.com",
         messagingSenderId: "557483758072",
         appId: "1:557483758072:web:6c382adbc0a85b4fc3060d"
     };


     //We make sure we only one instance of the database is used for the app
     if (!firebase.apps.length) {
         //Firebase.initalizeApp is a pre defined function to connect to databases
         //firebaseConfig is passed as argument to connect to the apps database
         firebase.initializeApp(firebaseConfig);
     }


     //State variable for our user
     const [user, setUser] = useState({loggedIn: false});

     const windowHeight = Dimensions.get('window').height;
     console.log(windowHeight)
     let tabHeight = (windowHeight/100)*10
     console.log(tabHeight)
//Predefined function from firebase. Checks if the user is logged in or not
     function onAuthStateChange(callback) {
         return firebase.auth().onAuthStateChanged(user => {
             if (user) {

                 //If the user is logged in, the state variable is changed to true
                 callback({loggedIn: true, user: user});
             } else {
                 //If the user is not logged it is changed to false
                 callback({loggedIn: false});
             }
         });
     }


     //UseEffect to check if user is active
     useEffect(() => {
         const unsubscribe = onAuthStateChange(setUser);
         return () => {
             unsubscribe();
         };
     }, []);



//Guest page, if the user is not logged in, they will be sent here
//The signup and login forms are rendered
     const GuestPage = () => {

         return (
                 <NavigationContainer>

                     {/*Styling the the TabNavigator*/}
                     <Tab.Navigator
                         tabBarOptions={{
                             activeTintColor: 'white',
                             inactiveTintColor: 'white',
                             inactiveBackgroundColor: '#232121',
                             activeBackgroundColor: '#2a2727',

                             style: {
                                 backgroundColor: 'transparent',
                                 borderTopWidth: 0,
                                 position: 'absolute',
                                 left: 0,
                                 right: 0,
                                 bottom: 0,//0
                                 height: 60 //60
                             }

                         }}
                     >
                         {/*Creating the different tabs*/}
                         <Tab.Screen name={'Log in'} component={LoginForm} options={{
                             tabBarIcon: () => (<Ionicons name='log-in-outline' color={'white'} size={20}/>),
                             headerShown: null}}/>
                         <Tab.Screen name={'Sign up'} component={SignUpForm} options={{
                             tabBarIcon: () => (<Ionicons name='add-outline' color={'white'} size={20}/>),
                             headerShown: null}}/>
                     </Tab.Navigator>
                 </NavigationContainer>
         )
     }

     //If the user is logged in they will be sent to the main page
     const MainPage = () => {

         //BarNavigation is a StackNavigator for the list of bars as well as the bar details
         const BarNavigation = () => {
             return (
                 <Stack.Navigator>
                     <Stack.Screen name={'Locations'} component={BarList}
                                   options={{
                                       headerStyle: {
                                           backgroundColor: '#2a2727',
                                       },

                                        headerTintColor: '#fff',
                                         headerTitleStyle: {

                                           fontFamily: 'SquadaOne_400Regular',
                                           fontSize: 40,

                                       },
                                   }}
                     />
                     <Stack.Screen name={'Bar Details'} component={BarDetailsScreen}
                         options={{

                         headerStyle: {
                             backgroundColor: '#2a2727',
                         },

                         headerTintColor: '#fff',
                         headerTitleStyle: {

                             fontFamily: 'SquadaOne_400Regular',
                             fontSize: 40,
                             color: '#2a2727'

                         },
                     }}
                     />
                 </Stack.Navigator>
             )
         }

         //SettingsNavigation is a StackNavigator for the setting options
         //This includes the filter settings, friends and profile settings
         const SettingsNavigation = () => {
             return (
                 <Stack.Navigator>
                     <Stack.Screen name={'Settings'} component={SettingsScreen}
                                   options={{
                                       headerStyle: {
                                           backgroundColor: '#2a2727',
                                       },

                                       headerTintColor: '#fff',
                                       headerTitleStyle: {

                                           fontFamily: 'SquadaOne_400Regular',
                                           fontSize: 40,

                                       },
                                   }}
                     />
                     <Stack.Screen name={'Filter'} component={FilterScreen2}
                                   options={{

                                       headerStyle: {
                                           backgroundColor: '#2a2727',
                                       },

                                       headerTintColor: '#fff',
                                       headerTitleStyle: {

                                           fontFamily: 'SquadaOne_400Regular',
                                           fontSize: 40,
                                           color: '#2a2727'

                                       },
                                   }}
                     />

                     <Stack.Screen name={'Friends'} component={FriendsList}
                                   options={{

                                       headerStyle: {
                                           backgroundColor: '#2a2727',
                                       },

                                       headerTintColor: '#fff',
                                       headerTitleStyle: {

                                           fontFamily: 'SquadaOne_400Regular',
                                           fontSize: 40,
                                           color: '#2a2727'

                                       },
                                   }}
                     />
                     <Stack.Screen name={'Profile'} component={ProfileScreen}
                                   options={{

                                       headerStyle: {
                                           backgroundColor: '#2a2727',
                                       },

                                       headerTintColor: '#fff',
                                       headerTitleStyle: {

                                           fontFamily: 'SquadaOne_400Regular',
                                           fontSize: 40,
                                           color: '#2a2727'

                                       },
                                   }}
                     />
                     <Stack.Screen name={'Friend Details'} component={UserDetailScreen}
                                   options={{

                                       headerStyle: {
                                           backgroundColor: '#2a2727',
                                       },

                                       headerTintColor: '#fff',
                                       headerTitleStyle: {

                                           fontFamily: 'SquadaOne_400Regular',
                                           fontSize: 40,
                                           color: '#2a2727'

                                       },
                                   }}
                     />




                 </Stack.Navigator>
             )
         }


         return (
             <SafeAreaProvider initialMetrics={initialWindowMetrics}>
             <NavigationContainer >

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
                         bottom: 0,//0 -30
                         height: 60 //60 110
                     },
                     safeAreaInsets: {
                         bottom: 0,
                     }

                 }}
                 >
                     {/*Creating the different tabs*/}
                     <Tab.Screen name={'Locations'} component={BarNavigation} options={{
                         tabBarIcon: () => (<Ionicons name='list-outline' color={'white'} size={20}/>),
                         headerShown: null}}/>
                     <Tab.Screen name={'Maps'} component={MapScreen} options={{
                         tabBarIcon: () => (<Ionicons name='location-outline' color={'white'} size={20}/>),
                         headerShown: null}}/>
                     <Tab.Screen name={'Settings'} component={SettingsNavigation} options={{
                         tabBarIcon: () => (<Ionicons name='cog-outline' color={'white'} size={20}/>),
                         headerShown: null}}/>
                 </Tab.Navigator>
             </NavigationContainer>
             </SafeAreaProvider>
         );
     }

     //Checks if the user is logged in or not. If not, then the user will be sent to the login/signup page, else the mainpage
     return user.loggedIn ? <MainPage/> : <GuestPage/>;



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
