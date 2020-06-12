import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreenList from "../screens/HomeScreenList.js";
import Recipe from "../screens/Recipe.js";
import GroceryList from "../screens/GroceryList.js";
import Search from "../screens/Search.js";

const HomeStack = createStackNavigator();

const HomeScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: { ...styles.headerStyle },
        headerTitleStyle: { ...styles.headerTitle },
      }}
    >
      <HomeStack.Screen
        name="HomePage"
        component={HomeScreenList}
        options={{ header: () => null }}
      />
      <HomeStack.Screen
        name="Recipe"
        component={Recipe}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchScreen = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0,
        headerStyle: { ...styles.headerStyle },
        headerTitleStyle: { ...styles.headerTitle },
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ header: () => null }}
      />
      <SearchStack.Screen
        name="Recipe"
        component={Recipe}
        options={({ route }) => ({ title: route.params.name })}
      />
    </SearchStack.Navigator>
  );
};
const NavBar = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <NavBar.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home-variant" : "home-variant-outline";
                break;
              case "Search":
                iconName = focused ? "book-search" : "book-search-outline";
                break;
              case "Grocery List":
                iconName = focused ? "cart" : "cart-outline";
                break;
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <NavBar.Screen name="Home" component={HomeScreen} />
        <NavBar.Screen name="Search" component={SearchScreen} />
        <NavBar.Screen name="Grocery List" component={GroceryList} />
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
  headerStyle: {
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 0,
  },
  headerTitle: {
    fontFamily: "SourceSansPro-SemiBold",
  },
});
