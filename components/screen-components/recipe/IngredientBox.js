import React from "react";
import { StyleSheet, Text, View } from "react-native";

const IngredientBox = ({ ingredients }) => {
  return (
    <View style={styles.ingredientBox}>
      <Text style={[styles.text, styles.header]}>Ingredients:</Text>
      {ingredients.map((item) => (
        <View style={styles.ingredientEntry} key={item.name}>
          <Text style={[styles.text, styles.ingredient]}>{item.name}</Text>
          <Text style={[styles.text, styles.ingredient]}>
            {item.quantity + " " + item.unit}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default IngredientBox;

const styles = StyleSheet.create({
  ingredientBox: {
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  ingredientEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  header: {
    fontSize: 23,
    marginVertical: 5,
  },
  ingredient: {
    fontSize: 19,
  },
});
