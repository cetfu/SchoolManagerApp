import React, { useCallback } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HEIGHT, WIDTH } from "../../constants";
import ProfileImage from "../../assets/person.svg"
import Button from "../../components/Button";
import EncryptedStorage from "react-native-encrypted-storage";
import { logout } from "../../redux/slices/authSlice";


const Profile = ({navigation}) =>{

  const authState = useSelector(state => state.auth)
  const {colors} = useTheme()
  const dispatch = useDispatch()
  useFocusEffect(
    useCallback(() =>{

    }, [])
  )

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: colors.secondary}]}>
        <View style={[styles.profileImage, {backgroundColor: colors.button}]}>
          <ProfileImage
            width={100}
            height={100}
            fill={colors.primaryText}
            viewBox={"0 0 50 50"}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={[styles.credentialTexts, {color: colors.primaryText}]}>Ad Soyad: {authState.name}</Text>
          {authState.studentNumber ? <Text style={[styles.credentialTexts, {color: colors.primaryText}]}>Okul numarası: {authState.studentNumber}</Text> : null}
        </View>
      </View>
      <Button
        width={WIDTH / 1.1}
        height={75}
        textColor={colors.secondary}
        center={true}
        backgroundColor={colors.button}
        onPress={async () =>{
         // navigation.navigate("Absenteeism")
          await EncryptedStorage.removeItem("accessToken")
          dispatch(logout())
        }}
      >{/**DEVAMSIZLIK TAKİP**/}ÇIKIŞ YAP</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: WIDTH,
    height: HEIGHT / 3,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  credentialTexts: {
    fontFamily: "SecularOne",
    fontSize: 16
  }
})

export default Profile
