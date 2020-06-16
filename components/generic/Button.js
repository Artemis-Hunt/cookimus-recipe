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
      style={[styles.button,props.style]}
      onPress={props.onPressHandle}
      disabled={props.loading}
    >
      {props.loading ? (
        <ActivityIndicator color={"white"} />
      ) : (
        <Text style={styles.text}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "SourceSansPro-SemiBold",
    color: "white",
  }
});
