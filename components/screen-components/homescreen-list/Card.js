import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';

const roundedRadius = 15;

const Card = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={1}
        delayPressIn={5}
        delayPressOut={5}
        delayLongPress={5}
        onPress={() => navigation.navigate("Recipe", { ...props })}
      >
        <Image
          style={[styles.image, { height: props.Window.height / 4, width: props.Window.width / 1.8 }]}
          source={{
            uri: `${props.image}`,
          }}
        />
        <LinearGradient
          colors={["transparent", "#00000088"]}
          style={styles.overlay}
          start={[0, 0.6]}
        />
        <View style={[styles.overlay, styles.details]}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: roundedRadius,
    backgroundColor: "white",
    marginHorizontal: 10,
    //Android shadow
    elevation: 5,
    //iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    //flex: 1,
    //width: null,
    borderRadius: roundedRadius,
    //width: props.Window.width - 20,
  },
  name: {
    fontFamily: "SourceSansPro",
    fontSize: 20,
    margin: 10,
    color: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    textShadowColor: "black",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: roundedRadius,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
