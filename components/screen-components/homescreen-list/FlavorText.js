import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather
} from "@expo/vector-icons";
import { Row } from "native-base";

//Track timing
let time = <Ionicons name="md-moon" size={29} color="gold" />;

const Greetings = {
  early: "Fancy some late-night supper, ",
  morning: "Good morning, ",
  lunch: "It's lunchtime, ",
  tea: "Afternoon tea, perhaps?",
  evening: "Good evening, ",
};

const timeGreeting = (name) => {
  let hours = new Date().getHours();
  let greeting = Greetings.evening + name + ".";
  if (hours >= 22 || hours <= 4) {
    greeting = Greetings.early + name + "?";
  } else if (hours >= 5 && hours <= 10) {
    greeting = Greetings.morning + name + "!";
    time = <Feather name="sun" size={29} color="gold" />;
  } else if (hours >= 11 && hours <= 14) {
    greeting = Greetings.lunch + name + ".";
    time = <MaterialCommunityIcons name="food" size={29} color="crimson" />;
  } else if (hours >= 15 && hours <= 17) {
    greeting = Greetings.tea;
    time = <MaterialCommunityIcons name="tea" size={29} color="indianred" />;
  }

  return greeting;
};

const FlavorText = ({ name }) => {
  const greeting = timeGreeting(name);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{greeting} </Text>
      <View style={styles.icon}>
        {time}
      </View>
    </View>
  );
};

export default FlavorText;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Pattaya",
    fontSize: 29,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
  },
  icon: {
    marginTop: 15,
    marginLeft: 5,
  }
});
