import React from "react";
import { StyleSheet, Text, View } from "react-native";

const additionalInfo = ({ additional }) => {
    additional.map((item) => {
        //Capitalise all headings
        item.heading = item.heading[0].toUpperCase() + item.heading.substr(1);
    });
    return (
        <View>
            {/* Need to change the key also */}
            {additional.map((item) => (
                <View key={item.heading+item.body}>
                    <Text>{item.heading}</Text>
                    <Text>{item.body}</Text>
                </View>
            ))}
        </View>
    );
}

export default additionalInfo;