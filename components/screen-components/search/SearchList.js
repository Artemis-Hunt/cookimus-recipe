import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import faker from "faker";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import SearchCard from "./SearchCard";

const Window = Dimensions.get("window");

export default class SearchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(props.data),
    };
    this.layoutProvider = new LayoutProvider(
      (index) => "NORMAL",
      (type, dim) => {
        dim.width = Window.width;
        dim.height = props.height;
      }
    );
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  rowRenderer(type, item) {
    return (
      <View>
        <SearchCard
          name={item.name}
          image={item.recipeImageURL}
          rating={Number(item.ratings)}
          review={item.reviewCount}
          ingredients={item.originalIngredient}
          extraInfo={item.additionalInfo}
          prep={item.prepInstructions}
          height={this.props.height}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RecyclerListView
          rowRenderer={this.rowRenderer}
          dataProvider={this.state.list}
          layoutProvider={this.layoutProvider}
        />
      </View>
    );
  }
}
