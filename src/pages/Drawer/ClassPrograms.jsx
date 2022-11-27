import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { API_URL, DEFAULT_HEADERS, HEIGHT, WIDTH } from "../../constants";
import WarningText from "../../components/WarningText";
import FastImage from "react-native-fast-image";
import { useFocusEffect, useTheme } from "@react-navigation/native";

const ClassPrograms = () => {
  const authState = useSelector(state => state.auth)
  const [datas, setDatas] = useState({})
  const [message, setMessage] = useState("")
  const {colors} = useTheme()

  useFocusEffect(useCallback(() =>{
    (async () =>{
      try {
        const req = await fetch(`${API_URL}/v1/getClassProgram`,{
          method: "POST",
          body: JSON.stringify({
            userId: authState.userId,
            studentNumber: authState.studentNumber
          }),
          headers: {
            ...DEFAULT_HEADERS,
            "Authorization": `Bearer ${authState.accessToken}`
          }
        })
        const data = await req.json()
        switch (data.status){
          case 1:
            setDatas(data.data)
            setMessage("")
            break
          default:
            setMessage(data.message)
            break
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, []))

  return (
    <View style={styles.container}>
      {message ? <WarningText>{message}</WarningText> : (
        <>
          <Text style={[styles.title, {color: colors.primaryText}]}>{datas.class} Ders programı</Text>
          <FastImage
            source={{uri: datas.program}}
            style={styles.program}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  program: {
    width: WIDTH,
    height: HEIGHT / 1.1,
  },
  title: {
    fontSize: 20,
    fontFamily: "SecularOne"
  }
})

export default ClassPrograms
