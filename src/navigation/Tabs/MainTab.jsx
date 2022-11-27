import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomAnnouncements from "../../pages/CustomAnnouncements";
import MainAnnouncements from "../../pages/MainAnnouncements";
import { WIDTH } from "../../constants";
import { useTheme } from "@react-navigation/native";
import Profile from "../../assets/person.svg"
import Microphone from "../../assets/microphone.svg"
import Main from "../../assets/home.svg"
import DrawerNav from "../Drawer/Drawer";

const Tab = createBottomTabNavigator()

const MainTab = () =>{
  const {colors} = useTheme()
  return (
     <Tab.Navigator
       screenOptions={{
         headerShown: false,
         tabBarShowLabel: false,
         tabBarStyle: {
           width: WIDTH,
           height: 60,
           backgroundColor: colors.primary,
           borderColor: colors.primary
         }
     }}
     >
       <Tab.Screen
         name={"MainDrawer"}
         component={DrawerNav}
         options={{
           tabBarIcon: ({focused}) =>(
             <>
               <Main
                width={30}
                height={30}
                viewBox={"0 0 50 50"}
                fill={focused ? colors.button : colors.buttonOffline}
               />
             </>
           )
         }}
       />
       <Tab.Screen
         name={"CustomAnnouncements"}
         component={CustomAnnouncements}
         options={{
           tabBarIcon: ({focused}) =>(
             <>
                <Microphone
                  width={30}
                  height={30}
                  viewBox={"0 0 50 50"}
                  fill={focused ? colors.button : colors.buttonOffline}
                />
             </>
           )
         }}
       />
       <Tab.Screen
         name={"Profile"}
         component={CustomAnnouncements}
         options={{
           tabBarIcon: ({focused}) =>(
             <>
               <Profile
                 width={30}
                 height={30}
                 viewBox={"0 0 50 50"}
                 fill={focused ? colors.button : colors.buttonOffline}
               />
             </>
           )
         }}
       />
     </Tab.Navigator>
  )
}

export default MainTab
