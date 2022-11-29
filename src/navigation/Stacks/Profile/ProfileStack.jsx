import React, { useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import Profile from "../../../pages/Tab/Profile";
import Absenteeism from "../../../pages/Stack/Profile/Absenteeism";
const Stack = createNativeStackNavigator()


const ProfileStack = () =>{

  useFocusEffect(
    useCallback(() =>{

    }, [

    ])
  )

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={"Profile"} component={Profile} />
      <Stack.Screen name={"Absenteeism"} component={Absenteeism} />
    </Stack.Navigator>
  )
}

export default ProfileStack
