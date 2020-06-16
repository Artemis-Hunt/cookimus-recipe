import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FontAwesome5 } from '@expo/vector-icons';

const PrepMethod = ({ instructions }) => {

    return (
        <View style={styles.box}>
            <View style={styles.container}>
                <Text style={[styles.headerText, styles.header]}>Prep Method  </Text>
                <FontAwesome5 name="mortar-pestle" size={16} color="black" />
            </View>
            {instructions.map((item) => (
                <View key={item.step}
                    style={styles.contentBox}
                >
                    <Text style={styles.step}>{item.step}</Text>
                    <Text style={styles.body}>{item.instruction}</Text>
                </View>
            ))}
        </View>
    );
}

export default PrepMethod

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 3,
    },  
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    contentBox: {
        marginVertical: 5,
    },
    headerText: {
        fontWeight: "bold",
    },
    header: {
        fontSize: 23,
        marginVertical: 5,
    },
    step: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#778899"
    },
    body: {
        fontFamily: "SourceSansPro",
        fontSize: 17,
        textAlign: "auto",
    }
});
