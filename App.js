import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import AppStack from "./assets/Components/AppStack";
import AuthStack from "./assets/Components/Navigation/AuthStack";


export default function App() {
 
  return (
    <NavigationContainer>
      {/* <AppStack/> */}
      <AuthStack/>
    </NavigationContainer>
  );
 
}



