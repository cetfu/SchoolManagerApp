import React, { useCallback } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { HEIGHT, WIDTH } from "../../constants";
import ProfileImage from "../../assets/person.svg"

const Profile = () =>{

  const authState = useSelector(state => state.auth)
  const {colors} = useTheme()

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
