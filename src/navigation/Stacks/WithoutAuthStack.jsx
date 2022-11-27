import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../pages/Login";

const Stack = createNativeStackNavigator()


const WithoutAuthStack = () =>{
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={"Login"} component={Login} />
    </Stack.Navigator>
  )
}

export default WithoutAuthStack
