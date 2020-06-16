import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const IngredientBox = ({ ingredients }) => {
  return (
    <View style={styles.ingredientBox}>
      <View style={styles.container}>
        <Text style={[styles.headerText, styles.header]}>Ingredients  </Text>
        <MaterialCommunityIcons name="food-variant" size={20} color="black" />
      </View>
      {/* Have to change the key */}
      {ingredients.map((item) => (
        <View style={styles.ingredientEntry} key={item}>
          <Text style={[styles.text, styles.ingredient]}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default IngredientBox;

const styles = StyleSheet.create({
  ingredientBox: {
    paddingHorizontal: 5,
  },
  ingredientEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  headerText: {
    fontWeight: "bold",
  },
  header: {
    fontSize: 23,
    marginVertical: 5,
  },
  ingredient: {
    fontSize: 17,
    marginBottom: 5,
    color: "#484848",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});
