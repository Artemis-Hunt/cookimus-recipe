import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

let dropDownHeight = null;

const DropMenu = ({
  close,
  name,
  quantity,
  handlename,
  handlequantity,
  verifyinfo,
  incompletefield,
}) => {
  return (
    <View
      style={[styles.dropMenu, { height: dropDownHeight }]}
      onLayout={(event) => {
        dropDownHeight = event.nativeEvent.layout.height;
      }}
    >
      {/* Some styles currently inline as only font size changed */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5, }}>
        <Text style={[styles.text, styles.headerText]}>
          Add New Recipe
        </Text>
        <TouchableOpacity onPress={close}>
        <Ionicons
                style={styles.icon}
                name="ios-close"
                size={30}
                color="rgba(0,0,0,0.5)"
              />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}/>
      <Text style={[styles.text, styles.subHeading]}>
        Recipe name
      </Text>
      <TextInput
        style={[styles.text, styles.textInput]}
        placeholder=" Enter Recipe name"
        value={name}
        onChangeText={(text) => {
          handlename(text);
        }}
      />
      <Text style={[styles.text, styles.subHeading]}>
        Number of ingredients
      </Text>
      <View style={styles.quantityBox}>
        <TextInput
          style={[styles.text, styles.textInput, { width: 125 }]}
          placeholder=" Enter number"
          keyboardType={"numeric"}
          numeric
          value={`${quantity}`}
          onChangeText={(text) => handlequantity(text)}
        />
        <TouchableOpacity onPress={() => verifyinfo(name, quantity)}>
          <Text style={[styles.text, styles.addButton]}>Add Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//StyleSheets
const styles = StyleSheet.create({
  addButton: {
    color: "#1E90FF",
    fontSize: 18,
    margin: 5,
  },
  separator: {
    backgroundColor: "#CCCCCC",
    height: 1,
  }, 
  //Outermost container
  dropMenu: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "forestgreen",
  },
  //Text input box style
  textInput: {
    height: 30,
    padding: 5,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },
  //Close button
  icon: {
    marginHorizontal: 10,
  },
  quantityBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  headerText: {
    fontSize: 25,
  },
  subHeading: {
    fontSize: 20,
    color: "dimgray",
    marginVertical: 10, 
  }
});

export default DropMenu;
