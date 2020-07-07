import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
const frac = require('frac');

const Item = ({ title, amounts, units, mark, editState }) => {
  let fracArray = frac(amounts, 20, true);
  let final = '';
  //Conversion to fractions
  if(fracArray[2] === 1) {
    final = amounts;
    if(final === 0) {final = '';}
  } else {
    if(fracArray[0] === 0) {
      final = fracArray[1].toString() + '/' + fracArray[2].toString();
    }
    else {
      final = fracArray[0].toString() + '"' + fracArray[1].toString() + '/' + fracArray[2].toString();
    }
  }
  let icon = (editState) ? <MaterialIcons name="edit" size={14} color="lightcoral" /> : (mark === undefined || mark === false) ? <FontAwesome name="circle-thin" size={17} color="#ccc" /> : <FontAwesome name="check" size={14} color="green" />;
  let checkStyle = (mark === undefined || mark === false) ? [styles.ingredientText, styles.text] : [styles.ingredientValueText, styles.text];
  return(
  <View style={styles.ingredientEntry}>
    <Text style={checkStyle}>{icon}  {title}</Text>
    <Text style={[styles.ingredientValueText, styles.text]}>
      {final} {units}
    </Text>
  </View>
)};

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
  ingredientValueText: {
    fontSize: 18,
    color: "#A9A9A9",
  },
});

export default Item;
