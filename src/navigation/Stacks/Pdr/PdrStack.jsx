import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PdrAppointment from "../../../pages/Drawer/PdrAppointment";
import Appointment from "../../../pages/Stack/Pdr/Appointment";

const Stack = createNativeStackNavigator()

const PdrStack = () =>{
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={"PdrScreen"} component={PdrAppointment} />
      <Stack.Screen name={"NewPdrAppointment"} component={Appointment} />
    </Stack.Navigator>
  )
}

export default PdrStack
