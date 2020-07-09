import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import DropDownPicker from "react-native-dropdown-picker";
const frac = require('frac');

let dropDownHeight = null;

const Item = ({ title, amounts, units, mark, editState, itemKey, handlenameupdate, handlequantityupdate }) => {
  let fracArray = frac(amounts, 20, true);
  let final = '';
  //Conversion to fractions
  if (fracArray[2] === 1) {
    final = amounts;
    if (final === 0) { final = ''; }
  } else {
    if (fracArray[0] === 0) {
      final = fracArray[1].toString() + '/' + fracArray[2].toString();
    }
    else {
      final = fracArray[0].toString() + '"' + fracArray[1].toString() + '/' + fracArray[2].toString();
    }
  }
  let icon =
    (editState) ? <MaterialIcons name="edit" size={24} color="cornflowerblue" /> :
      (mark === undefined || mark === false) ? <FontAwesome name="circle-thin" size={17} color="#ccc" /> : <FontAwesome name="check" size={14} color="green" />;
  let checkStyle = (mark === undefined || mark === false) ? [styles.ingredientText, styles.text] : [styles.ingredientValueText, styles.text];

  if (title === "Add Item...") {
    let addIcon = <Entypo name="plus" size={22} color="mediumseagreen" />;
    return addItemCard(addIcon, title);
  } else {
    return (editState) ? editCard(icon, title, amounts, units, itemKey, handlenameupdate, handlequantityupdate) : itemCard(icon, checkStyle, title, final, units);
  }
};

//Render normal item card
const itemCard = (icon, checkStyle, title, final, units) => {
  if (title === "No Name Found") {
    checkStyle = [styles.ingredientText, styles.text, styles.errorText];
  }
  return (
    < View style={styles.ingredientEntry} >
      <Text style={checkStyle}>{icon}  {title}</Text>
      <Text style={[styles.ingredientValueText, styles.text]}>
        {final} {units}
      </Text>
    </View >
  )
}

//Render edit mode item card
const editCard = (icon, title, amounts, units, itemKey, handlenameupdate, handlequantityupdate) => {
  const [newValue, setNewValue] = useState(amounts);
  const [changed, setChanged] = useState(false);
  return (
    < View style={[styles.editMode, { height: dropDownHeight }]}
      onLayout={(event) => {
      dropDownHeight = event.nativeEvent.layout.height;
    }}
    >
      {icon}
      <TextInput
        style={styles.textInput}
        placeholder={title}
        value={title}
        onChangeText={(text) => handlenameupdate(text, itemKey)}
      />
      <TextInput
        style={styles.textInput}
        keyboardType={"numeric"}
        numeric
        //placeholder={amounts.toString()}
        value={`${newValue}`}
        onChangeText={(text) => {
          setNewValue(text);
          handlequantityupdate(text, itemKey);
        }} 
      />
      <DropDownPicker
          items={[
            { label: units, value: units },
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
          placeholder={units}
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
          //onChangeItem={(item) => handleunits(item.value)}
        />
    </View >
  )
}

//Render card with add item functionality on press
const addItemCard = (icon, title) => {
  return (
    <TouchableOpacity>
      < View style={[styles.ingredientEntry, styles.addItemBackGround]} >
        <Text style={[styles.ingredientText, styles.text, styles.addItemText]}>{icon}  {title}</Text>
      </View >
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  //For each ingredient entry
  ingredientEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  //Ingredient Card Text
  ingredientText: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
  },
  ingredientValueText: {
    fontSize: 18,
    color: "#A9A9A9",
  },
  addItemText: {
    color: "#808080",
  },
  addItemBackGround: {
    backgroundColor: "#E8E8E8",
  },
  textInput: {
    height: 30,
    padding: 5,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },
  editMode: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  }
});

export default Item;
