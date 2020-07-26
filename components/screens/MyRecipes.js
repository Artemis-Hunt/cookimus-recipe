import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import SavedCard from "../screen-components/saved-recipes/SavedCard";
import SavedRecipes from "../../data/SavedRecipes";
import LoadingAdditionalContext from "../context/LoadingAdditionalContext";

export default class MyRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  componentDidMount() {
    //Populate context with additional data (for Recipe.js to render)
    this.context.changeLoadingStatus(true);
    let additionalDataArray = [];
    SavedRecipes.forEach((item) => {
      additionalDataArray.push({
        ingredient: item.ingredient,
        originalIngredient: item.originalIngredient,
        additionalInfo: item.additionalInfo,
        prepInstructions: item.prepInstructions,
      });
    });
    this.context.changeAdditionalData(additionalDataArray);
    this.context.changeLoadingStatus(false);
  }

  componentWillUnmount() {
  }

  forceUpdate() {
    this.setState({ refresh: !this.state.refresh });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={SavedRecipes}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SavedCard
              name={item.name}
              url={item.recipeURL}
              image={item.recipeImageURL}
              index={index}
            />
          )}
        />
      </View>
    );
  }
}
MyRecipes.contextType = LoadingAdditionalContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
