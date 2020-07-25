import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, props.style]}
      onPress={props.onPress}
      disabled={props.loading}
    >
      {props.loading === true ? (
        <ActivityIndicator color={"white"} />
      ) : (
        props.text === undefined ? props.children : <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
  text: {
    fontFamily: "SourceSansPro",
    color: "white",
  }
});
