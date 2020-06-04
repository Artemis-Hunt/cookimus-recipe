import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenList from "../screens/HomeScreenList.js";
import Recipe from "../screens/Recipe.js";
import GroceryList from "../screens/GroceryList.js"

const HomeStack = createStackNavigator();

const HomeScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerStatusBarHeight: 0 }}
    >
      <HomeStack.Screen
        name="HomePage"
        component={HomeScreenList}
        options={{ header: () => null }}
      />
      <HomeStack.Screen name="Recipe" component={Recipe} />
    </HomeStack.Navigator>
  );
};
const NavBar = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <NavBar.Navigator initialRouteName="Home">
        <NavBar.Screen name="Home" component={HomeScreen} />
        <NavBar.Screen name="GroceryList" component={GroceryList}/>
      </NavBar.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "SourceSansPro-SemiBold",
    fontSize: 25,
    letterSpacing: 0,
    marginVertical: 15,
    marginHorizontal: 10,
  },
});
