import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";

import IngredientBox from "../screen-components/recipe/IngredientBox.js";
import AdditionalInfo from "../screen-components/recipe/AdditionalInfo.js";
import PrepMethod from "../screen-components/recipe/PrepMethod.js";
import AddRecipe from "../screen-components/recipe/AddRecipe.js";
import SaveRecipe from "../screen-components/recipe/SaveRecipe.js";

//Render the individual recipe pages when clicked into from the search page
const Recipe = () => {
  const route = useRoute();
  const navigation = useNavigation();

  //Props from SearchList.js, passed through SearchCard.js
  const Window = route.params.Window;
  const name = route.params.name;
  const url = route.params.url;
  const image = route.params.image;
  const originalIngredient = route.params.originalIngredient;
  const ingredient = route.params.ingredient;
  const additionalInfo = route.params.additionalInfo;
  const prepInstructions = route.params.prepInstructions;
  let value = route.params.value;

  return (
    <View style={styles.container}>
      {value ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={[styles.image, { height: Window.height / 3 }]}
            source={{ uri: `${image}` }}
          />
          {/* Extra info e.g. servings, preparation time*/}
          <View style={styles.categoryBox}>
            <View style={styles.subBox}>
              <Text style={[styles.text, styles.name]}>{name}</Text>
            </View>
            <AdditionalInfo additional={additionalInfo} />
          </View>

          <IngredientBox ingredients={originalIngredient} />

          {/*Add to grocery list*/}
          <TouchableOpacity
            onPress={() => {
              AddRecipe(ingredient, name, url);
            }}
            style={styles.buttonBox}
          >
            <Text style={styles.addButton}>Add to Grocery List </Text>
            <Entypo name="add-to-list" size={19} color="#1E90FF" />
          </TouchableOpacity>

          <PrepMethod instructions={prepInstructions} />

          {/*Store recipe locally*/}
          <TouchableOpacity
            onPress={() => {
              SaveRecipe(
                name,
                url,
                image,
                originalIngredient,
                ingredient,
                additionalInfo,
                prepInstructions
              );
            }}
            style={styles.buttonBox}
          >
            <Text style={styles.addButton}>Save This Recipe </Text>
            <Feather name="save" size={19} color="#1E90FF" />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    //backgroundColor: "#f9f9f9"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 5,
    width: null,
  },
  text: {
    fontFamily: "SourceSansPro-SemiBold",
  },
  name: {
    fontSize: 33,
    marginVertical: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  categoryBox: {
    borderBottomWidth: 3,
    borderBottomColor: "#FFA07A",
  },
  subBox: {
    borderBottomWidth: 3,
    marginBottom: 10,
    borderBottomColor: "#F08080",
  },
  addButton: {
    fontSize: 17,
    color: "#1E90FF",
  },
  buttonBox: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: 8,
  },
});
