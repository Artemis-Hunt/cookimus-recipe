import React, { Component } from "react";
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

const DropMenu = ({
  close,
  name,
  quantity,
  unit,
  handlename,
  handlequantity,
  handleunits,
  verifyinfo,
  incomplete,
}) => (
  <View style={styles.dropMenu}>
    {/* Some styles currently inline as only font size changed */}
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 24 }}>
        {" "}
        <Entypo name="add-to-list" size={24} color="black" /> Add Item{" "}
      </Text>
      <TouchableOpacity onPress={close}>
        <Text style={styles.menuText}>
          {" "}
          Close <FontAwesome name="window-close" size={18} color="black" />{" "}
        </Text>
      </TouchableOpacity>
    </View>
    <TextInput
      style={styles.textInput}
      placeholder=" Enter ingredient name"
      value={name}
      onChangeText={(text) => handlename(text)}
    />
    <Text style={styles.menuText}>
      Quantity <FontAwesome5 name="weight" size={18} color="black" />
    </Text>
    <TextInput
      style={styles.textInput}
      placeholder=" Enter quantity"
      value={quantity}
      onChangeText={(text) => handlequantity(text)}
    />

    <Text style={styles.menuText}>
      Choose Units{" "}
      <FontAwesome5 name="ruler-vertical" size={24} color="black" />
    </Text>
    <DropDownPicker
      items={[
        { label: "No Units", value: "" },
        { label: "Gram", value: "grams" },
        { label: "Kilogram", value: "kg" },
        { label: "Cups", value: "cups" },
        { label: "Tablespoon", value: "tbsp" },
        { label: "Teaspoon", value: "tsp" },
        { label: "Millilitres", value: "ml" },
        { label: "Litres", value: "litres" },
      ]}
      defaultNull
      placeholder="Please select units"
      dropDownStyle={{ marginTop: 2 }}
      containerStyle={{ height: 30}}
      style={{ paddingVertical: 5 }}
      dropDownStyle={{ backgroundColor: "#fafafa" }}
      onChangeItem={item => handleunits(item.value)}
    />

    <Text style={styles.errorText}> {incomplete} </Text>

    <Button
      title="Add New Item +"
      color="#841584"
      onPress={() => verifyinfo(name, quantity, unit)}
    />
  </View>
);

//StyleSheets
const styles = StyleSheet.create({
  //Text on menu
  menuText: {
    fontSize: 18,
    padding: 5,
  },
  //Outermost container
  dropMenu: {
    backgroundColor: "coral",
    padding: 10,
  },
  //Text input box style
  textInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
  },
  errorText: {
    color: "crimson",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
});

export default DropMenu;
