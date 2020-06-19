import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreenList from "../screens/HomeScreenList";
import Recipe from "../screens/Recipe";
import GroceryList from "../screens/GroceryList";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import RecipeList from "../../data/RecipeList"

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
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="Recipe"
        component={Recipe}
        options={({ route }) => ({ title: route.params.name })}
      />
    </SearchStack.Navigator>
  );
};

const GroceryScreen = () => {
  return(
    <GroceryList RecipeList={RecipeList}/>
  )
}

const NavBar = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavBar.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home-variant" : "home-variant-outline";
              break;
            case "Browse":
              iconName = focused ? "book-search" : "book-search-outline";
              break;
            case "Grocery List":
              iconName = focused ? "cart" : "cart-outline";
              break;
            case "Settings":
              iconName = focused ? "settings" : "settings-outline";
              break;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <NavBar.Screen name="Home" component={HomeScreen} />
      <NavBar.Screen name="Browse" component={SearchScreen} />
      <NavBar.Screen name="Grocery List" component={GroceryList} />
      <NavBar.Screen name="Settings" component={Settings} />
    </NavBar.Navigator>
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
