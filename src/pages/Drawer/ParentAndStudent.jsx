import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../../constants";
import WarningText from "../../components/WarningText";


const Announcement = ({item}) =>{
  let date = new Date(item.date);
  const {colors} = useTheme()
  return (
    <View style={[styles.announcement, { backgroundColor: colors.secondary }]}>
      <View style={styles.announcementTop}>
        <Text style={[styles.announcementTop.text, { color: colors.primaryText }]}>
          {item.sender}
        </Text>
        <Text style={[styles.announcementTop.text, { color: colors.secondaryText }]}>
          {date.toLocaleString("tr-TR")}
        </Text>
      </View>
      <View style={styles.announcementContent}>
        <Text style={[styles.announcementContent.text, { color: colors.primaryText }]}>
          {item.information}
        </Text>
      </View>
    </View>
  );
}


const ParentAndStudent = () => {

  const authState = useSelector(state => state.auth)
  const [informations, setInformations] = useState([])
  const [message, setMessage] = useState("")

  useFocusEffect(
    useCallback(() =>{
      (async () =>{
        const req = await fetch(`${API_URL}/v1/getInformation`, {
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
            setInformations(data.data)
            setMessage("")
            break
          default:
            setMessage(data.message)
        }
      })()
    }, [])
  )


  return (
    <View style={styles.container}>
      {message && <WarningText>{message}</WarningText>}
      <FlashList
        renderItem={(props) => (<Announcement {...props} />)}
        data={informations}
        estimatedItemSize={10}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  information: {
    width: WIDTH,
    minHeight: 100,
    marginVertical: 10,
    borderRadius: 15
  },
  announcement: {
    width: "90%",
    minHeight: 100,
    alignSelf: "center",
    marginVertical: 5,
    borderRadius: 10,
  },
  announcementTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    text: {
      fontSize: 14,
      fontFamily: "SecularOne",
    },
  },
  announcementContent: {
    paddingHorizontal: 10,
    text: {
      fontSize: 16,
      fontFamily: "SecularOne",
    },
  },
})


export default ParentAndStudent
