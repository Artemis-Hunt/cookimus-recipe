import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
  } else if (hours >= 11 && hours <= 14) {
    greeting = Greetings.lunch + name + ".";
  } else if (hours >= 15 && hours <= 17) {
    greeting = Greetings.tea;
  }

  return greeting;
};

const FlavorText = ({ name }) => {
  const greeting = timeGreeting(name);
  return (
    <View>
      <Text style={styles.heading}>{greeting}</Text>
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
});
