import React, { useEffect, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationBar from "./NavigationBar";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Loading from "../screens/Loading"
import {firestoreDb, auth, fetchGroceryList} from "../../config/Firebase/firebaseConfig";
import UserContext from "../context/UserContext"

import RecipeList from "../../data/RecipeList";
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
    RecipeList.splice(0, RecipeList.length)
    SavedRecipes.splice(0, SavedRecipes.length)
    const list = await fetchGroceryList();
    list.forEach((item) => {
      let itemData = item.data();
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
      SavedRecipes.push({ title: item.id, link: url });
    });
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

    //Unsubscribe on dismount
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={user}>
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
