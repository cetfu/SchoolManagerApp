import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTab from "../Tabs/MainTab";

const Stack = createNativeStackNavigator()

const AuthStack = () =>{
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={"MainTab"} component={MainTab} />
    </Stack.Navigator>
  )
}

export default AuthStack
