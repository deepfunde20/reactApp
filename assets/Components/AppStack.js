import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Tabs from "../Components/Navigation/tabs"
import AddMeeting from "../Components/Screens/AddMeeting";
import AddMember from "../Components/Screens/AddMember";
import Contacts from "../Components/Screens/Contacts";
import DetailsScreen from "../Components/Screens/DetailsScreen";
import MemberScreen from "../Components/Screens/MemberScreen";
import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const UserId = createContext();

export default function AppStack({navigation, route}) {
  const id = route.params.userId
  const [userId, setUserId] = useState();
  AsyncStorage.getItem('userId').then(val => setUserId(val));
  const Stack = createNativeStackNavigator();

  return (

    <UserId.Provider value={id}>
      <Stack.Navigator initialRouteName="Tab" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tab} />
        <Stack.Screen name="Meetings" component={DetailsScreen}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTitleAlign: "center"
          }}
        />
        <Stack.Screen name="AddMeeting" component={AddMeeting}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTitleAlign: "center"
          }}
        />

        <Stack.Screen name="MemberScreen" component={MemberScreen}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTitleAlign: "center"
          }}
        />

        <Stack.Screen name="AddMember" component={AddMember}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTitleAlign: "center"
          }}
        />
        <Stack.Screen name="Contacts" component={Contacts} 
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontSize: 25,
            },
            headerTitleAlign: "center"
          }}
        />
      </Stack.Navigator>
    </UserId.Provider>
  )
};

export { UserId };

function Tab() {
  return (
    <Tabs />
  )
}