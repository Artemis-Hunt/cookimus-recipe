import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Constants from "expo-constants";
import { Ionicons, Entypo, AntDesign} from '@expo/vector-icons';

const menuBar = ({ buttonClick, togglemenu }) => (
    <View style={styles.menuBar}>
        <TouchableOpacity
            style={styles.addItem}
            onPress={togglemenu}
        >
            <Text style={[styles.addItemText, styles.text]}>
                <AntDesign name="retweet" size={18} color="black" /> Toggle View
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.addItem}
            onPress={buttonClick}
        >
            <Text style={[styles.addItemText, styles.text]}>
                Add Item... <Entypo name="squared-plus" size={18} color="black" />
            </Text>
        </TouchableOpacity>
    </View>
)

//StyleSheets
const styles = StyleSheet.create({
    menuBar: {
        padding: 5,
        backgroundColor: "cyan",
        alignItems:"flex-end",
        flexDirection: "row",
        justifyContent: "center"
    },
    addItem: {
        width: 115,
        flex: 1,
    },
    text: {
        fontFamily: "SourceSansPro"
    },
    addItemText: {
        fontSize: 18,
        padding: 5,
    }
});

export default menuBar