import {StyleSheet, View,} from "react-native";
import * as React from "react";
import SignUpForm from "../components/SignUpForm";




function SignupScreen({prop}) {


    return(
        <View style={styles.container}>
            <SignUpForm/>
        </View>
    )




}

export default SignupScreen

ç
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