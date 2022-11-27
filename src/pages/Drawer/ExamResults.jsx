import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../../constants";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import WarningText from "../../components/WarningText";

const ExamResults = () => {
  const authState = useSelector(state => state.auth)
  const [results, setResults] = useState([])
  const [message, setMessage] = useState("")
  const {colors} = useTheme()

  useFocusEffect(useCallback(() =>{
    (async () =>{
      try{
        if(authState.studentNumber || authState.userId){
          const req = await fetch(`${API_URL}/v1/getExamResults`, {
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
          switch (data.status) {
            case 1:
              setResults(data.data)
              setMessage("")
              break
            default:
              setMessage(data.message)
              break
          }
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, []))

  return (
    <View style={styles.container}>
      {message && <WarningText>{message}</WarningText>}
      <FlashList
        estimatedItemSize={10}
        data={results}
        renderItem={({item}) =>(
          <View style={[styles.result, {backgroundColor: colors.secondary}]}>
            <View style={styles.resultTop}>
              <FastImage
                source={{uri: item.classImage}}
                style={styles.classImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.resultContent}>
              <Text style={[styles.resultContent.text, {color: colors.primaryText, fontSize: 14}]}>
                {item.className}
              </Text>
              <Text style={[styles.resultContent.text, {color: colors.primaryText}]}>
                {item.studentName}
              </Text>
              <View style={styles.resultBottom}>
                <Text style={[styles.resultBottom.text, {color: colors.primaryText}]}>
                  Puan: {item.studentPoint}
                </Text>
                <Text style={[styles.resultBottom.text, {color: colors.secondaryText, fontSize: 14}]}>
                  {item.examName}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  result: {
    width: WIDTH / 1.1,
    minHeight: 100,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignSelf: "center"
  },
  resultTop: {
    justifyContent: "center",
    text: {
      fontSize: 16,
      fontFamily: "SecularOne"
    }
  },
  resultContent: {
    flex: 1,
    justifyContent: "center",
    text: {
      fontSize: 15,
      fontFamily: "SecularOne"
    }
  },
  resultBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    text: {
      fontSize: 16,
      fontFamily: "SecularOne"
    }
  },
  classImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5
  }
})

export default ExamResults
