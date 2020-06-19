import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AdditionalInfo = ({ additional }) => {
    additional.map((item) => {
        //Capitalise all headings
        item.heading = item.heading[0].toUpperCase() + item.heading.substr(1);
    });
    return (
        <View style={styles.box}>
            {/* Need to change the key also */}
            {additional.map((item) => (
                <View style={styles.container}
                    key={item.heading+item.body}>
                    <Text style={[styles.heading, styles.text]}>{item.heading} </Text>
                    <Text style={[styles.body, styles.text]}> {item.body}</Text>
                </View>
            ))}
        </View>
    );
}

export default AdditionalInfo;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 5,
        justifyContent: "center",
    },
    box: {
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    heading: {
        fontFamily: "SourceSansPro-SemiBold",
    },
    body: {
        fontFamily: "SourceSansPro",
    },
    text: {
        fontSize: 17,
        textAlign: "center",
    },
})