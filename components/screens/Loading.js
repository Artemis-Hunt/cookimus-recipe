import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: "center"}}>
            <ActivityIndicator size={"large"}/>
        </View>
    )
}

export default LoadingScreen;