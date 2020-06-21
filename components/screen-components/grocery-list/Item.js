import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
const frac = require('frac');

const Item = ({ title, amounts, units }) => {
  let fracArray = frac(amounts, 9, true);
  let final = 0;
  //Conversion to fractions
  if(fracArray[2] === 1) {
    final = amounts;
  } else {
    if(fracArray[0] === 0) {
      final = fracArray[1].toString() + '/' + fracArray[2].toString();
    }
    else {
      final = fracArray[0].toString() + '"' + fracArray[1].toString() + '/' + fracArray[2].toString();
    }
  }
  return(
  <View style={styles.ingredientEntry}>
    <Text style={[styles.ingredientText, styles.text]}><FontAwesome name="circle-thin" size={17} color="coral" />  {title}</Text>
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
    backgroundColor: "#f8f8f8",
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
