import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../../constants";
import { useSelector } from "react-redux";
import WarningText from "../../components/WarningText";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

const WeeklySubjects = () => {
  const authState = useSelector(state => state.auth)
  const [subjects, setSubjects] = useState([])
  const [message, setMessage] = useState("")
  const {colors} = useTheme()

    useFocusEffect(useCallback(() =>{
      (async () =>{
        const req = await fetch(`${API_URL}/v1/getWeeklySubjects`, {
          method: "POST",
          body: JSON.stringify({
            userId: authState.userId
          }),
          headers: {
            ...DEFAULT_HEADERS,
            "Authorization": `Bearer ${authState.accessToken}`
          }
        })
        const data = await req.json()
        switch (data.status){
          case 1:
            setSubjects(data.data)
            setMessage("")
            break
          default:
            setMessage(data.message)
            break
        }
      })()
    }, []))

  return (
    <View style={styles.container}>
      {message && <WarningText>{message}</WarningText>}
      <FlashList
        estimatedItemSize={10}
        renderItem={({item}) =>(
          <View style={[styles.subject, {backgroundColor: colors.secondary}]}>
            <View style={styles.subjectsLeft}>
              <FastImage
                source={{uri: item.classImage}}
                style={styles.classImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.subjectsRight}>
              <Text style={[styles.subject.text, {color: colors.primaryText}]}>Gönderen: {item.sender}</Text>
              <Text style={[styles.subject.text, {color: colors.primaryText}]}>Ders: {item.className}</Text>
              <Text style={[styles.subject.subject, {color: colors.primaryText}]}>Detaylar: {item.subject}</Text>
            </View>
          </View>
        )}
        data={subjects}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subject: {
    width: WIDTH / 1.1,
    minHeight: 100,
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    text: {
      fontSize: 14,
      fontFamily: "SecularOne"
    },
    subject: {
      fontSize: 16,
      fontFamily: "SecularOne"
    }
  },
  classImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
  },
  subjectsLeft: {
    justifyContent: "center",
    marginHorizontal: 10
  },
})

export default WeeklySubjects
