import React from "react";

import { View, Dimensions } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import SearchCard from "./SearchCard";
import { TouchableOpacity } from "react-native-gesture-handler";

const Window = Dimensions.get("window");
const dataProvider = new DataProvider((r1, r2) => r1 !== r2);

export default class SearchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: dataProvider.cloneWithRows(props.data),
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

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: dataProvider.cloneWithRows(this.props.data) });
    }
  }

  rowRenderer(type, item, index) {
    return (
      <SearchCard
        name={item.name}
        url={item.recipeURL}
        image={item.recipeImageURL}
        rating={Number(item.ratings)}
        review={item.reviewCount}
        index={index}
        height={this.props.height}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RecyclerListView
          rowRenderer={this.rowRenderer}
          dataProvider={this.state.data}
          layoutProvider={this.layoutProvider}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
        />
      </View>
    );
  }
}
