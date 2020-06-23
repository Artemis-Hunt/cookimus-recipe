import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SwipeRightView = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <MaterialCommunityIcons name="delete" size={27} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default SwipeRightView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 7,
        backgroundColor: "red",
    }
})