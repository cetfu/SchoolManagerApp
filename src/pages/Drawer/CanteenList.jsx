import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API_URL, DEFAULT_HEADERS } from "../../constants";
import WarningText from "../../components/WarningText";
import FastImage from "react-native-fast-image";

const CanteenList = () => {

  const authState = useSelector(state => state.auth)
  const {colors} = useTheme()
  const [items, setItems] = useState([])
  const [message, setMessage] = useState("")
  const labels = ["Ürün", "Fiyat", "Resim"]
  useFocusEffect(
    useCallback(() =>{
      (async () =>{
        const req = await fetch(`${API_URL}/v1/getCanteenItems`, {
          method: "POST",
          headers: {
            ...DEFAULT_HEADERS,
            "Authorization": `Bearer ${authState.accessToken}`
          },
          body: JSON.stringify({
            userId: authState.userId
          })
        })
        const data = await req.json()
        switch (data.status){
          case 1:
            setItems(data.data)
            setMessage("")
            break
          default:
            setMessage(data.message)
            break
        }
      })()
    }, [])
  )

  return (
    <View style={styles.container}>
      {message && <WarningText>{message}</WarningText>}
      <>
        <View style={{flexDirection: "row"}}>
          {labels.map((label, i) =>(
            <View style={{flex: 1, backgroundColor: colors.button, borderWidth: 2}} key={i}>
              <Text style={[styles.text, {color: colors.secondary, alignSelf: "center"}]}>{label}</Text>
            </View>
          ))}
        </View>
        <ScrollView>
          {items.map((item, i) =>{
            return (
              <View style={{flexDirection: "row"}} key={i}>
                {item.map((aItem, ai) =>(
                  <View style={{flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 2, borderTopWidth: 0}} key={ai}>
                    {ai === 2 ? (
                      <FastImage
                        source={{uri: aItem}}
                        style={{width: 45, height: 45}}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    ) : (
                      <Text style={[styles.text, {color: colors.primaryText}]}>{aItem}</Text>
                    )}
                  </View>
                ))}
              </View>
            )
          })}
        </ScrollView>
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontFamily: "SecularOne"
  }
})

export default CanteenList
