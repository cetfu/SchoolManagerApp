import React from "react";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import MainAnnouncements from "../../pages/MainAnnouncements";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import School from "../../assets/school.svg"
import ExamResults from "../../pages/Drawer/ExamResults";
import WeeklySubjects from "../../pages/Drawer/WeeklySubjects";
import ClassPrograms from "../../pages/Drawer/ClassPrograms";
import Surveys from "../../pages/Drawer/Surveys";
import PdrAppointment from "../../pages/Drawer/PdrAppointment";
import CanteenList from "../../pages/Drawer/CanteenList";
import ParentAndStudent from "../../pages/Drawer/ParentAndStudent";
import WishForms from "../../pages/Drawer/WishForms";
import PdrStack from "../Stacks/Pdr/PdrStack";

const Drawer = createDrawerNavigator()

const DrawerNav = () =>{

  const {colors} = useTheme()

  return (
     <Drawer.Navigator
       screenOptions={{
         headerShown: false,
         drawerActiveTintColor: colors.button
       }}
      drawerContent={(props) =>(
        <DrawerContentScrollView style={{flex: 1, backgroundColor: colors.secondary}}>
          <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center"}}>
            <School width={45} height={45} fill={colors.primaryText} viewBox={"0 0 50 50"} />
            <Text style={[styles.drawerHeader, {color: colors.primaryText}]}>SchoolManager</Text>
          </View>
          <DrawerItemList {...props} label={"hello"} />
        </DrawerContentScrollView>
      )}
     >
       <Drawer.Screen name={"Announcements"} component={MainAnnouncements} options={{
         drawerLabel: "Duyurular"
       }} />
       <Drawer.Screen name={"ExamResults"} component={ExamResults} options={{
         drawerLabel: "Sınav Sonuçları"
       }} />
       <Drawer.Screen name={"WeeklySubjects"} component={WeeklySubjects} options={{
         drawerLabel: "Haftalık konu başlıkları"
       }} />
       <Drawer.Screen name={"ClassPrograms"} component={ClassPrograms} options={{
         drawerLabel: "Ders Programı"
       }} />
       <Drawer.Screen name={"Surveys"} component={Surveys} options={{
         drawerLabel: "Anketler"
       }} />
       {/*<Drawer.Screen name={"PdrAppointment"} component={PdrStack} options={{*/}
       {/*  drawerLabel: "Rehberlik Servisi"*/}
       {/*}} />*/}
       <Drawer.Screen name={"CanteenList"} component={CanteenList} options={{
         drawerLabel: "Kantin Fiyat Listesi"
       }} />
       <Drawer.Screen name={"ParentAndStudent"} component={ParentAndStudent} options={{
         drawerLabel: "Veli/Öğrenci Bilgilendirme"
       }} />
       <Drawer.Screen name={"WishForms"} component={WishForms} options={{
         drawerLabel: "Şikayet/Dilek Formu"
       }} />
     </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerHeader: {
    fontSize: 16,
    fontFamily: "SecularOne"
  },
  drawerItem: {
    color: "black"
  }
})

export default DrawerNav
