import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingIndicator = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={props.size}/>
    </View>
  );
};
 export default LoadingIndicator;