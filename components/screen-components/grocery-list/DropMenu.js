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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.headerText}>
          {" "}
          Add New Recipe{" "} <Entypo name="add-to-list" size={24} color="gray" /> 
        </Text>
        <TouchableOpacity onPress={close}>
          <Text style={styles.menuText}>
            {" "}
            Close <FontAwesome
              name="window-close"
              size={18}
              color="crimson"
            />{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder=" Enter Recipe name"
        value={name}
        onChangeText={(text) => handlename(text)}
      />
      <Text style={[styles.menuText, styles.subHeading]}>
        Ingredient Quantity
      </Text>
      <View style={styles.quantityBox}>
        <TextInput
          style={[styles.textInput, { width: 150 }]}
          placeholder=" Enter quantity"
          keyboardType={"numeric"}
          numeric
          value={`${quantity}`}
          onChangeText={(text) => handlequantity(text)}
        />
        <TouchableOpacity onPress={() => verifyinfo(name, quantity)}>
          <Text style={styles.addButton}>Add New Recipe +</Text>
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
  //Text on menu
  menuText: {
    fontSize: 18,
    padding: 5,
    color: "dimgray",
  },
  //Outermost container
  dropMenu: {
    backgroundColor: "white",
    padding: 10,
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
  quantityBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  headerText: {
    color: "dimgray",
    fontSize: 24,
  },
  subHeading: {
    fontSize: 20,
  }
});

export default DropMenu;
