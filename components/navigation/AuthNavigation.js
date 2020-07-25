import React, { useEffect, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationBar from "./NavigationBar";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Loading from "../screens/Loading"
import {firestoreDb, auth, fetchGroceryList, fetchSavedRecipes} from "../../config/Firebase/firebaseConfig";
import UserContext from "../context/UserContext"

import RecipeList from "../../data/RecipeList";
import AddedToGroceryList from "../../data/AddedToGroceryList";
import SavedRecipes from "../../data/SavedRecipes";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(emptyUser);
  const emptyUser = {
    id: null,
    email: "",
    firstName: "",
    lastName: "",
  }

  //Fetch grocery list from Firebase
  const getFirebaseList = async () => {
    //Clear RecipeList and AddedToGroceryList
    RecipeList.splice(0, RecipeList.length)
    for(let property in AddedToGroceryList) {
      delete AddedToGroceryList[property]
    }

    const groceryList = await fetchGroceryList();
    const savedList = await fetchSavedRecipes();
    //Populate local cache with results from Firebase
    groceryList.forEach((item) => {
      //Get the list of ingredients in each recipe
      let itemData = item.data();

      //Remove the extra information that is not supposed to be rendered in the list of ingredients
      let { portion, portionText, url } = itemData;
      delete itemData.portion;
      delete itemData.portionText;
      delete itemData.url;

      RecipeList.push({
        title: item.id,
        data: Object.values(itemData),
        portion: portion,
        portionText: portionText,
      });
      AddedToGroceryList[url] = null;
    });
    savedList.forEach((item => {
      SavedRecipes.push(item)
    }))

  }

  const setUserData = (firstName, lastName, email) => {
    let id = user.id
    setUser({
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName
    })
  }

  //Equivalent to componentDidMount, due to empty array supplied as dependency
  useEffect(() => {
    const usersRef = firestoreDb.collection("users");
    //Listen to any changes in authorization state
    const subscriber = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const firestoreDoc = await usersRef.doc(user.uid).get();
          const userData = firestoreDoc.data();
          setUser(userData);
          await getFirebaseList();
        }
        else {
          setUser(emptyUser);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    });

    //Unsubscribe on unmount
    return subscriber;
  }, []);

  //Loading screen after login, while awaiting for user data retrieval
  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{...user, setUserData}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStatusBarHeight: 0,
          }}
        >
          {user.id ? (
            <Stack.Screen name="Main" component={NavigationBar} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default AuthNavigation;
