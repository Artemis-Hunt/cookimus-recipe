import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreenList from "../screens/HomeScreenList";
import Recipe from "../screens/Recipe";
import GroceryList from "../screens/GroceryList";
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import RecipeList from "../../data/RecipeList";
import LoadingAdditionalContext from "../context/LoadingAdditionalContext";
import ConfirmIngredients from "../screen-components/recipe/ConfirmIngredients";
import MyRecipes from "../screens/MyRecipes";
import ProfileEdit from "../screen-components/settings/ProfileEdit";
import InfoPage from "../screen-components/settings/InfoPage"
import ReportPage from "../screen-components/settings/ReportPage"

const HomeStack = createStackNavigator();

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeLoadingStatus = (boolean) => {
      this.setState({ loadingAdditional: boolean });
    };
    this.changeAdditionalData = (array) => {
      this.setState({ additionalData: array });
    };
    this.state = {
      loadingAdditional: true,
      changeLoadingStatus: this.changeLoadingStatus,
      additionalData: [],
      changeAdditionalData: this.changeAdditionalData,
    };
  }

  render() {
    return (
      <LoadingAdditionalContext.Provider value={this.state}>
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
          <HomeStack.Screen
            name="ConfirmIngredients"
            component={ConfirmIngredients}
            options={{ header: () => null }}
          />
        </HomeStack.Navigator>
      </LoadingAdditionalContext.Provider>
    );
  }
}

const SearchStack = createStackNavigator();

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeLoadingStatus = (boolean) => {
      this.setState({ loadingAdditional: boolean });
    };
    this.changeAdditionalData = (array) => {
      this.setState({ additionalData: array });
    };
    this.state = {
      loadingAdditional: true,
      changeLoadingStatus: this.changeLoadingStatus,
      additionalData: [],
      changeAdditionalData: this.changeAdditionalData,
    };
  }

  render() {
    return (
      <LoadingAdditionalContext.Provider value={this.state}>
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
          <SearchStack.Screen
            name="ConfirmIngredients"
            component={ConfirmIngredients}
            options={{ header: () => null }}
          />
        </SearchStack.Navigator>
      </LoadingAdditionalContext.Provider>
    );
  }
}

const SavedStack = createStackNavigator();

class SavedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.changeLoadingStatus = (boolean) => {
      this.setState({ loadingAdditional: boolean });
    };
    this.changeAdditionalData = (array) => {
      this.setState({ additionalData: array });
    };
    this.state = {
      loadingAdditional: true,
      changeLoadingStatus: this.changeLoadingStatus,
      additionalData: [],
      changeAdditionalData: this.changeAdditionalData,
    };
  }

  render() {
    return (
      <LoadingAdditionalContext.Provider value={this.state}>
        <SavedStack.Navigator
          screenOptions={{
            headerStatusBarHeight: 0,
            headerStyle: { ...styles.headerStyle },
            headerTitleStyle: { ...styles.headerTitle },
          }}
        >
          <SavedStack.Screen
            name="SavedPage"
            component={MyRecipes}
            options={{ header: () => null }}
          />
          <SavedStack.Screen
            name="Recipe"
            component={Recipe}
            options={({ route }) => ({ title: route.params.name })}
          />
          {/* <SavedStack.Screen
            name="ConfirmIngredients"
            component={ConfirmIngredients}
            options={{ header: () => null }}
          /> */}
        </SavedStack.Navigator>
      </LoadingAdditionalContext.Provider>
    );
  }
}

const SettingsStack = createStackNavigator();

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SettingsStack.Navigator
        screenOptions={{
          headerStatusBarHeight: 0,
          header: () => null,
        }}
      >
        <SettingsStack.Screen
          name='Settings'
          component={Settings}
        />
        <SettingsStack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
        />
        <SettingsStack.Screen
          name="InfoPage"
          component={InfoPage}
        />
        <SettingsStack.Screen
          name="ReportPage"
          component={ReportPage}
        />
      </SettingsStack.Navigator>
    );
  }
}

const GroceryScreen = () => {
  return <GroceryList RecipeList={RecipeList} />;
};

const NavBar = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavBar.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        labelStyle: {fontFamily: "SourceSansPro"},
      }}
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
            case "My Recipes":
              iconName = focused ? "notebook" : "notebook-outline";
              break;
            case "Groceries":
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
      <NavBar.Screen name="My Recipes" component={SavedScreen} />
      <NavBar.Screen name="Groceries" component={GroceryList} />
      <NavBar.Screen name="Settings" component={SettingsScreen} />
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
    elevation: 0,
  },
  headerTitle: {
    fontFamily: "SourceSansPro-SemiBold",
  },
});
