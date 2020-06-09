import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IngredientBox from "../screen-components/recipe/IngredientBox.js";

const Ingredients = [
  {
    name: "Flour",
    quantity: 2,
    unit: "cups",
  },
  {
    name: "Water",
    quantity: 150,
    unit: "ml",
  },
  {
    name: "Salt",
    quantity: 1,
    unit: "pinch",
  },
];

const Recipe = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={[styles.image, { height: route.params.Window.height / 3 }]}
          source={{ uri: `${route.params.image}` }}
        />
        <Text style={[styles.text, styles.name]}>{route.params.name}</Text>
        <IngredientBox ingredients={Ingredients} />
      </View>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  image: {
    borderRadius: 5,
    marginTop: 10,
    width: null,
  },
  text: {
    fontFamily: "SourceSansPro",
  },
  name: {
    fontSize: 30,
    marginVertical: 15,
  },
});
