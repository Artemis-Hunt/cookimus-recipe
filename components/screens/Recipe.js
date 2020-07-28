import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";
import LoadingIndicator from "../generic/LoadingIndicator";

import IngredientBox from "../screen-components/recipe/IngredientBox.js";
import AdditionalInfo from "../screen-components/recipe/AdditionalInfo.js";
import PrepMethod from "../screen-components/recipe/PrepMethod.js";
import AddedToGroceryList from "../../data/AddedToGroceryList.js";
import AddedToMyRecipes from "../../data/AddedToMyRecipes";
import SavedRecipes from "../../data/SavedRecipes";
import CombinedList from "../../data/CombinedList";
import TableFullModal from "../screens/TableFullModal"
import { savedRecipesPush } from "../../config/Firebase/firebaseConfig";

import LoadingAdditionalContext from "../context/LoadingAdditionalContext.js";

const ArraySize = 200;
//Check if hashtable is full
const Hashslotcheck = (object) => {
  let recipeCount = 0;
  for (let item of object) {
    recipeCount++;
  }
  let combinedCount = 0;
  for (let item of CombinedList[0].data) {
    combinedCount++;
  }
  alert(combinedCount);
  if ((recipeCount + combinedCount) > ArraySize) {
    return true;
  }
  return false;
}

//Render the individual recipe pages when clicked into from the search page
const Recipe = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const Window = useWindowDimensions();

  const [addedToList, setAddedToList] = useState(false);
  const [existInList, setExistInList] = useState(false);
  const [addedToSaved, setAddedToSaved] = useState(false);
  const [existInSaved, setExistInSaved] = useState(false);

  useEffect(() => {
    setAddedToList(route.params.addedToList);
  }, [route.params.addedToList]);

  //Props from SearchList.js, passed through SearchCard.js
  const name = route.params.name;
  const url = route.params.url;
  const image = route.params.image;
  const index = route.params.index;

  const currentRoutes = navigation.dangerouslyGetState().routes;
  //Get the parent screen which this Recipe screen was called from
  const previousScreenName = currentRoutes[currentRoutes.length - 2].name;

  return (
    //Additional data for the recipe comes from the context
    <LoadingAdditionalContext.Consumer>
      {({ loadingAdditional, additionalData }) => (
        <View style={styles.container}>
          {loadingAdditional ? (
            <LoadingIndicator size={"large"} />
          ) : (
              <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Image
                    style={[styles.image, { height: Window.height / 3 }]}
                    source={{ uri: `${image}` }}
                  />
                  {/* Extra info e.g. servings, preparation time*/}
                  <View style={styles.categoryBox}>
                    <View style={styles.subBox}>
                      <Text style={[styles.headerText, styles.name]}>{name}</Text>
                    </View>
                    <AdditionalInfo
                      additional={additionalData[index].additionalInfo}
                    />
                  </View>

                  <IngredientBox
                    ingredients={additionalData[index].originalIngredient}
                  />

                  {/*Add to grocery list*/}
                  <TouchableOpacity
                    onPress={() => {
                      if (Hashslotcheck(additionalData[index].ingredient)) {
                        alert("Too many ingredients in Grocery List. Please delete items to add more ingredients")
                      } else {
                        if (name in AddedToGroceryList) {
                          setExistInList(true);
                        } else {
                          navigation.navigate("ConfirmIngredients", {
                            originalIngredients:
                              additionalData[index].originalIngredient,
                            modIngredients: additionalData[index].ingredient,
                            recipeURL: url,
                            recipeTitle: name,
                          });
                        }
                      }
                    }}
                    style={styles.buttonBox}
                  >
                    <Text style={[styles.text, styles.addButton]}>
                      Add to Grocery List{" "}
                    </Text>
                    <Entypo name="add-to-list" size={19} color="#1E90FF" />
                  </TouchableOpacity>
                  {existInList ? (
                    <Text style={styles.addedText}>
                      Recipe already in Grocery List!
                    </Text>
                  ) : addedToList ? (
                    <Text style={styles.addedText}>Added to Grocery list!</Text>
                  ) : null}
                  <PrepMethod
                    instructions={additionalData[index].prepInstructions}
                  />
                  {/*Store recipe locally*/}
                  {previousScreenName === "MyRecipes" ? null : (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          if (name in AddedToMyRecipes) {
                            setExistInSaved(true);
                          } else {
                            let recipeToSave = {
                              name: name,
                              recipeURL: url,
                              recipeImageURL: image,
                              originalIngredient:
                                additionalData[index].originalIngredient,
                              ingredient: additionalData[index].ingredient,
                              additionalInfo:
                                additionalData[index].additionalInfo,
                              prepInstructions:
                                additionalData[index].prepInstructions,
                            };
                            SavedRecipes.push(recipeToSave);
                            savedRecipesPush(recipeToSave);
                            AddedToMyRecipes[name] = null;
                            setAddedToSaved(true);
                          }
                        }}
                        style={styles.buttonBox}
                      >
                        <Text style={[styles.text, styles.addButton]}>
                          Save This Recipe{" "}
                        </Text>
                        <Feather name="save" size={19} color="#1E90FF" />
                      </TouchableOpacity>
                      {existInSaved ? (
                        <Text style={styles.addedText}>
                          Already in My Recipes!
                        </Text>
                      ) : addedToSaved ? (
                        <Text style={styles.addedText}>
                          Added to My Recipes!
                        </Text>
                      ) : null}
                    </>
                  )}
                  <View style={{ height: 30 }}></View>
                </ScrollView>
              </View>
            )}
        </View>
      )}
    </LoadingAdditionalContext.Consumer>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
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
  headerText: {
    fontFamily: "SourceSansPro-SemiBold",
  },
  text: {
    fontFamily: "SourceSansPro",
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
    fontSize: 18,
    color: "#1E90FF",
  },
  addedText: {
    color: "green",
    textAlign: "center",
    fontSize: 17,
  },
  buttonBox: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
