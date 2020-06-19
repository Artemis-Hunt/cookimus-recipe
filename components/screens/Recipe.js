import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Feather } from '@expo/vector-icons';

import IngredientBox from "../screen-components/recipe/IngredientBox.js";
import AdditionalInfo from "../screen-components/recipe/AdditionalInfo.js";
import PrepMethod from "../screen-components/recipe/PrepMethod.js";
import AddItem from "../screen-components/recipe/AddIngredient.js"

//This file will render the individual recipe pages when clicked into from the search page
const Recipe = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const modIngre = route.params.modIngredient;
  const newName = route.params.name;

  //alert(modIngre);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={[styles.image, { height: route.params.Window.height / 3 }]}
          source={{ uri: `${route.params.image}` }}
        />
        <View style={styles.categoryBox}>
          <View style={styles.subBox}>
            <Text style={[styles.text, styles.name]}>{route.params.name}</Text>
          </View>
          <AdditionalInfo additional={route.params.extraInfo} />
        </View>
        <IngredientBox ingredients={route.params.ingredients} />
        <TouchableOpacity
          onPress={() => {AddItem(modIngre, newName)}}
          style={styles.buttonBox}>
          <Text style={styles.addButton}>Add to Grocery List </Text>
          <Entypo name="add-to-list" size={19} color="#1E90FF" />
        </TouchableOpacity>
        <PrepMethod instructions={route.params.prep} />
        <TouchableOpacity
          style={styles.buttonBox}>
          <Text style={styles.addButton}>Save This Recipe </Text>
          <Feather name="save" size={19} color="#1E90FF" />
        </TouchableOpacity>
      </ScrollView>
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
    borderBottomColor: "#FFA07A"
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
    margin: 5,
  }
});
