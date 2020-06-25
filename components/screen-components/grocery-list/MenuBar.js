import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';

const menuBar = ({ buttonClick, togglemenu }) => (
    <View style={styles.outerBorder1}>
        <View style={styles.menuBar}>
            <Text style={[styles.titleText]}>Grocery List  <FontAwesome5 name="shopping-basket" size={24} color="forestgreen" /></Text>
            <View style={styles.iconBar}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={togglemenu}
                >
                    <AntDesign name="retweet" size={25} color="dodgerblue" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.icon}
                    onPress={buttonClick}
                >
                    <Entypo name="squared-plus" size={26} color="dodgerblue" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
)

//StyleSheets
const styles = StyleSheet.create({
    menuBar: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        borderBottomWidth: 5,
        borderBottomColor: "teal",
    },
    text: {
        fontFamily: "SourceSansPro"
    },
    titleText: {
        fontSize: 30,
        color: "black",
        fontWeight: "bold",
    },
    iconBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    icon: {
        paddingHorizontal: 10,
    },
    outerBorder1: {
        borderBottomWidth: 5,
        borderBottomColor: "yellowgreen",
    },
});

export default menuBar