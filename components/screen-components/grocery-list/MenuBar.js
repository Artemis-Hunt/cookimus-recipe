import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';

const menuBar = ({ buttonClick, togglemenu }) => (
    <View style={styles.menuBar}>
        <Text style={[styles.titleText, styles.text]}>Grocery List  <FontAwesome5 name="shopping-basket" size={24} color="white" /></Text>
        <View style={styles.iconBar}>
            <TouchableOpacity
                style={styles.icon}
                onPress={togglemenu}
            >
                <AntDesign name="retweet" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.icon}
                onPress={buttonClick}
            >
                <Entypo name="squared-plus" size={26} color="white" />
            </TouchableOpacity>
        </View>
    </View>
)

//StyleSheets
const styles = StyleSheet.create({
    menuBar: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "forestgreen",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
    },
    text: {
        fontFamily: "SourceSansPro"
    },
    titleText: {
        fontSize: 30,
        color: "white",
    },
    iconBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    icon: {
        paddingHorizontal: 10,
    }
});

export default menuBar