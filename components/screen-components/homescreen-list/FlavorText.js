import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Row } from "native-base";

const Greetings = {
  early: "Fancy some late-night supper, ",
  morning: "Good morning",
  lunch: "It's lunchtime",
  tea: "Afternoon tea, perhaps?",
  evening: "Good evening",
};

const timeGreeting = (name, time) => {
  let newName = name === "" ? "" : ", " + name;
  let icon, greeting;
  if (time === "morning") {
    greeting = Greetings.morning + newName + "!";
    icon = <Feather name="sun" size={29} color="gold" />;
  } else if (time === "noon") {
    greeting = Greetings.lunch + newName + ".";
    icon = <MaterialCommunityIcons name="food" size={29} color="crimson" />;
  } else if (time === "afternoon") {
    greeting = Greetings.tea;
    icon = <MaterialCommunityIcons name="tea" size={29} color="indianred" />;
  } else if (time === "evening") {
    greeting = Greetings.evening + newName + ".";
    icon = <Ionicons name="md-moon" size={29} color="gold" />;
  }

  return { greeting, icon };
};

const FlavorText = ({ name, time }) => {
  const { greeting, icon } = timeGreeting(name, time);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{greeting} </Text>
      <View style={styles.icon}>{icon}</View>
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
  },
});
