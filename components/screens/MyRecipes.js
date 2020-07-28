import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import TitleEditModal from "../screen-components/grocery-list/TitleEditModal";
import SavedCard from "../screen-components/saved-recipes/SavedCard";
import SavedRecipes from "../../data/SavedRecipes";
import LoadingAdditionalContext from "../context/LoadingAdditionalContext";

import {
  savedListRecipeUpdate,
  savedListDelete,
} from "../../config/Firebase/firebaseConfig";
import AddedToMyRecipes from "../../data/AddedToMyRecipes";

const RerenderFlatlist = ({ oldLength, updateLength }) => {
  //Check if length of SavedRecipes changed whenever screen is focused
  useFocusEffect(() => {
    if (SavedRecipes.length !== oldLength) {
      updateLength(SavedRecipes.length);
    }
  });
  return null;
};

export default class MyRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      oldLength: 0,
    };
    this.additionalDataArray = [];
  }

  componentDidMount() {
    //Populate context with additional data (for Recipe.js to render)
    this.context.changeLoadingStatus(true);
    SavedRecipes.forEach((item) => {
      this.additionalDataArray.push({
        ingredient: item.ingredient,
        originalIngredient: item.originalIngredient,
        additionalInfo: item.additionalInfo,
        prepInstructions: item.prepInstructions,
      });
    });
    this.context.changeAdditionalData(this.additionalDataArray);
    this.context.changeLoadingStatus(false);
  }

  //If length of SavedRecipes has changed, add additional data of newly added recipes into context
  componentDidUpdate(prevProps, prevState) {
    if (this.state.oldLength > prevState.oldLength) {
      this.context.changeLoadingStatus(true);
      let numAdded = this.state.oldLength - prevState.oldLength;
      let additionalData = this.context.additionalData;
      for (let i = 0; i < numAdded; i++) {
        let item = SavedRecipes[i];
        additionalData.unshift({
          ingredient: item.ingredient,
          originalIngredient: item.originalIngredient,
          additionalInfo: item.additionalInfo,
          prepInstructions: item.prepInstructions,
        });
      }
      this.context.changeAdditionalData(additionalData);
      this.context.changeLoadingStatus(false);
    }
  }

  componentWillUnmount() {}

  forceUpdate() {
    this.setState({ refresh: !this.state.refresh });
  }

  handleChangeTitle(newTitle, originalTitle) {
    for (let recipe of SavedRecipes) {
      if (recipe.name === originalTitle) {
        //Update RecipeList title
        recipe.name = newTitle;
        AddedToMyRecipes[newTitle] = null;
        delete AddedToMyRecipes[originalTitle];
        savedListRecipeUpdate(originalTitle, newTitle, recipe);
        break;
      }
    }
    this.forceUpdate();
  }

  handleDeleteTitle(title) {
    for (let i = 0; i < SavedRecipes.length; i++) {
      let recipe = SavedRecipes[i];
      if (recipe.name === title) {
        delete AddedToMyRecipes[title];
        this.context.changeLoadingStatus(true);
        SavedRecipes.splice(i, 1);
        let additionalData = this.context.additionalData;
        additionalData.splice(i, 1);
        this.context.changeAdditionalData(additionalData);
        this.context.changeLoadingStatus(false);
        savedListDelete(title);
      }
    }
  }

  updateLength(length) {
    this.setState({ oldLength: length });
  }

  render() {
    return (
      <>
        <RerenderFlatlist
          oldLength={this.state.oldLength}
          updateLength={(length) => this.updateLength(length)}
        />
        <View style={styles.container}>
          {this.state.oldLength === 0 ? (
            <View
              style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
            >
              <Text style={styles.noRecipeText}>
                Save some recipes you like!
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={SavedRecipes}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <SavedCard
                  name={item.name}
                  url={item.recipeURL}
                  image={item.recipeImageURL}
                  index={index}
                  rendertitleeditmodal={(name) => {
                    this.refs.titleeditmodal.renderModal(name);
                  }}
                />
              )}
            />
          )}
        </View>
        <TitleEditModal
          ref={"titleeditmodal"}
          saveChangeTitle={(newTitle, originalTitle) => {
            this.handleChangeTitle(newTitle, originalTitle);
          }}
          titleDelete={(title) => {
            this.handleDeleteTitle(title);
          }}
        />
      </>
    );
  }
}
MyRecipes.contextType = LoadingAdditionalContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  noRecipeText: {
    color: "#888888",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "SourceSansPro"
  },
});
