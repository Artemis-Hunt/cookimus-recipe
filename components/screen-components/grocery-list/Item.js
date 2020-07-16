import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import RecipeList from '../../../data/RecipeList'
const frac = require('frac');

//Unused Icons
//(mark === undefined || mark === false) ? <FontAwesome name="circle-thin" size={17} color="#ccc" /> : <FontAwesome name="check" size={14} color="green" />;
//<MaterialCommunityIcons name="checkbox-marked-circle" size={17} color="green" />;
//<MaterialCommunityIcons name="check-circle-outline" size={17} color="green" />;

const Item = ({ title, amounts, units, mark, editState, itemKey, handlenameupdate, handlequantityupdate, selectUnitModal, index, forceRefresh, updateeditarray }) => {
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
      (mark === undefined || mark === false) ? <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={17} color="#ccc" /> : <MaterialCommunityIcons name="checkbox-marked-circle" size={17} color="green" />;;
  let checkStyle = (mark === undefined || mark === false) ? [styles.ingredientText, styles.text] : [styles.ingredientValueText, styles.text];

  if (title === "Add Item...") {
    let addIcon = <Entypo name="plus" size={22} color="mediumseagreen" />;
    return addItemCard(addIcon, title, index, forceRefresh, updateeditarray);
  } else {
    return (editState) ? editCard(icon, title, amounts, units, itemKey, handlenameupdate, handlequantityupdate, selectUnitModal) : itemCard(icon, checkStyle, title, final, units);
  }
};

//Render normal item card
const itemCard = (icon, checkStyle, title, final, units) => {
  if (title === "No Name Found") {
    checkStyle = [styles.ingredientText, styles.text, styles.errorText];
  }
  return (
    < View style={styles.ingredientEntry} >
      <View style={styles.ingredientCard}>
        <View style={{ marginTop: 3 }}>
          {icon}
        </View>
        <Text style={[checkStyle, { marginHorizontal: 15 }]}>{title}</Text>
      </View>
      <Text style={[styles.ingredientValueText, styles.text]}>
        {final} {units}
      </Text>
    </View >
  )
}

//Render edit mode item card
const editCard = (icon, title, amounts, units, itemKey, handlenameupdate, handlequantityupdate, selectUnitModal) => {
  const [newValue, setNewValue] = useState(amounts);
  const [newName, setNewName] = useState(title);
  return (
    < View
      style={styles.editMode}
    >
      {icon}
      <TextInput
        style={[styles.textInput, { flex: 6 }]}
        //width={140}
        placeholder={title}
        value={newName}
        onChangeText={(text) => {
          setNewName(text);
          handlenameupdate(text, itemKey);
        }}
      />
      <TextInput
        style={[styles.textInput, { flex: 1.5 }]}
        //width={50}
        keyboardType={"numeric"}
        numeric
        value={`${newValue}`}
        onChangeText={(text) => {
          setNewValue(text);
          handlequantityupdate(text, itemKey);
        }}
      />
      <TouchableOpacity
        onPress={() => selectUnitModal(itemKey)}
      >
        <View style={[styles.textInput, styles.unitBox]}>
          <Text>{units}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

//Render card with add item functionality on press
const addItemCard = (icon, title, index, forceRefresh, updateeditarray) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handleAddItem(index, updateeditarray);
        forceRefresh();
      }}
    >
      < View style={[styles.ingredientEntry, styles.addItemBackGround]} >
        <Text style={[styles.ingredientText, styles.text, styles.addItemText]}>{icon}  {title}</Text>
      </View >
    </TouchableOpacity>
  )
}

//Adds another row into the recipe list
const handleAddItem = (index, updateeditarray) => {
  //Add item into second last slot of array before add item card
  let slotIndex = RecipeList[index].data.length - 1;
  let newItemObject = { name: "", amount: "", unit: "", unitDetails: { unit: "", class: 0 } };
  newItemObject.key = `${newItemObject.name}.${index}.${slotIndex}`;
  RecipeList[index].data.splice(slotIndex, 0, newItemObject);
  updateeditarray(newItemObject.key);
}

const styles = StyleSheet.create({
  //For each ingredient entry
  ingredientEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    alignItems: "center"
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  //Ingredient Card Text
  ingredientText: {
    fontSize: 18,
  },
  ingredientCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
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
    marginHorizontal: 5,
  },
  editMode: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  },
  unitBox: {
    width: 90,
  },
});

export default Item;
