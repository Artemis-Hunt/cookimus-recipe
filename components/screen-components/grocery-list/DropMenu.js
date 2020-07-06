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
  unit,
  handlename,
  handlequantity,
  handleunits,
  verifyinfo,
  incomplete,
}) => {
  const [changed, setChanged] = useState(false);
  return (
    <View
      style={[styles.dropMenu, { height: dropDownHeight }]}
      onLayout={(event) => {
        dropDownHeight = event.nativeEvent.layout.height;
      }}
    >
      {/* Some styles currently inline as only font size changed */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 24 }}>
          {" "}
          <Entypo name="add-to-list" size={24} color="black" /> Add Item{" "}
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
        placeholder=" Enter ingredient name"
        value={name}
        onChangeText={(text) => handlename(text)}
      />
      <Text style={styles.menuText}>
        Quantity <FontAwesome5 name="weight" size={18} color="#2F4F4F" />
      </Text>
      <View style={styles.quantityBox}>
        <TextInput
          style={[styles.textInput, { width: 150 }]}
          placeholder=" Enter quantity"
          value={quantity}
          onChangeText={(text) => handlequantity(text)}
        />
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
          placeholder="No units"
          containerStyle={{ height: 30, width: 100 }}
          style={{ paddingVertical: 5 }}
          dropDownStyle={{ backgroundColor: "#fafafa", position: "absolute" }}
          onOpen={() => {
            dropDownHeight += 130;
            setChanged(!changed);
          }}
          onClose={() => {
            dropDownHeight -= 130;
            setChanged(!changed);
          }}
          onChangeItem={(item) => handleunits(item.value)}
        />
        <TouchableOpacity onPress={() => verifyinfo(name, quantity, unit)}>
          <Text style={styles.addButton}>Add +</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.errorText}> {incomplete} </Text>
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
    color: "black",
  },
  //Outermost container
  dropMenu: {
    //backgroundColor: "mediumaquamarine",
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  errorText: {
    color: "crimson",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
});

export default DropMenu;
