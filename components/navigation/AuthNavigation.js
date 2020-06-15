import React, { useEffect, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationBar from "./NavigationBar";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Loading from "../screens/Loading"
import firebase from "../../config/Firebase/firebaseConfig";
import UserContext from "../context/UserContext"

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    const subscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const firestoreDoc = await usersRef.doc(user.uid).get();
          const userData = firestoreDoc.data();
          setUser(userData);
        }
        else {
          setUser(null);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    });
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
            header: () => null,
            headerStatusBarHeight: 0,
          }}
        >
          {user ? (
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
