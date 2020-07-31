import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { AntDesign } from "@expo/vector-icons";

//Page to display the info of our app
export default class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.titleText}>About Cookimus </Text>
          <View style={styles.infoIcon}>
            <AntDesign name="infocirlce" size={22} color="black" />
          </View>
        </View>
        <View style={styles.logoBar}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/Logo.png")}
            resizeMode={"contain"}
          />
          <Image
            style={styles.logoText}
            source={require("../../../assets/images/Cookimus.png")}
            resizeMode={"contain"}
          />
        </View>
        <Text style={styles.bodyText}>
          Cookimus is an app created by two NUS Computer Engineering students
          during the summer break as a project for NUS Orbital 2020.
        </Text>
        <Text></Text>
        <Text style={styles.bodyText}>
          Our team aims to create an app that targets these problems as
          mentioned, by streamlining the searching and saving process into a
          single app, allowing users to search, sort and save recipes found on
          the web. Grocery lists are also made much easier with features that
          allow users to add all ingredients into a compiled grocery list.
        </Text>
        <Text></Text>
        <Text style={styles.bodyText}>
          All recipes found in the app were obtained from AllRecipes and Epicurious
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 10,
  },
  headerBar: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: "mediumturquoise",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 27,
    fontWeight: "bold",
  },
  infoIcon: {
    justifyContent: "center",
    paddingTop: 3,
  },
  logoBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    marginVertical: 20,
    marginRight: 10,
    width: 70,
    height: 70,
    alignSelf: "center",
  },
  logoText: {
    width: 170,
    height: 170,
    alignSelf: "center",
  },
  bodyText: {
    textAlign: "center",
    color: "dimgray",
  },
});
