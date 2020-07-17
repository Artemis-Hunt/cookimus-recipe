import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';

//Grocery List top bar with buttons
const menuBar = ({ buttonClick, togglemenu, toggleedit, editState }) => {
    //Swap style when edit mode is selected
    let iconStyle = (editState) ? [styles.iconSelected] : [styles.icon];
    let iconColor = (editState) ? "white" : "dodgerblue";
    let toggleColor = (editState) ? "#CCC" : "dodgerblue";
    return (
        <View style={styles.outerBorder1}>
            <View style={styles.menuBar}>
                <Text style={[styles.titleText]}>Groceries  <FontAwesome5 name="shopping-basket" size={24} color="forestgreen" /></Text>
                <View style={styles.iconBar}>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={togglemenu}
                        disabled={editState}
                    >
                        <AntDesign name="retweet" size={24} color={toggleColor} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={iconStyle}
                        onPress={toggleedit}
                    >
                        <AntDesign name="edit" size={25} color={iconColor} />
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
}

//StyleSheets
const styles = StyleSheet.create({
    menuBar: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        paddingHorizontal: 5,
    },
    iconSelected: {
        paddingHorizontal: 5,
        paddingTop: 2,
        backgroundColor: "dodgerblue",
        borderRadius: 5,
    },
    outerBorder1: {
        borderBottomWidth: 5,
        borderBottomColor: "yellowgreen",
    },
});

export default menuBar