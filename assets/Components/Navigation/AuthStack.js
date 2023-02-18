import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useContext, useState } from "react";
import AppStack from "../AppStack";
import LoginScreen from "../Screens/LoginScreen";
import OnboardingScreen from "../Screens/OnboardingScreen";
import RegisterScreen from "../Screens/RegisterScreen";

const Stack = createNativeStackNavigator();



const AuthStack = ()=>{
    
    return(
      
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name= "Onboarding" component= {OnboardingScreen}/>
            <Stack.Screen name= "Login" component= {LoginScreen}/>
            <Stack.Screen name= "Register" component= {RegisterScreen}/>
            
            <Stack.Screen name= "AppStack" component= {AppStack}/>
          
        </Stack.Navigator>
     
    )
}

export default AuthStack;
