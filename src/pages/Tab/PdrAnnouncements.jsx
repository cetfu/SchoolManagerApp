import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, DEFAULT_HEADERS } from "../../constants";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Announcement from "../../components/Announcement";
import WarningText from "../../components/WarningText";

const PdrAnnouncements = () =>{

  const authState = useSelector(state => state.auth)
  const [announcements, setAnnouncements] = useState([])
  const [message, setMessage] = useState("")
  const {colors} = useTheme()

  useFocusEffect(useCallback(() =>{
    (async () =>{
      const req = await fetch(`${API_URL}/v1/getPdrAnnouncements`, {
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
          setAnnouncements(data.data)
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
        renderItem={(props) => (
          <Announcement {...props} />
        )
        }
        data={announcements}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})


export default PdrAnnouncements
