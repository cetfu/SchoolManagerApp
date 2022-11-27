import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

const Announcement = ({item}) =>{
  let date = new Date(item.announcementDate);
  const {colors} = useTheme()
  return (
    <View style={[styles.announcement, { backgroundColor: colors.secondary }]}>
      <View style={styles.announcementTop}>
        <Text style={[styles.announcementTop.text, { color: colors.primaryText }]}>
          {item.announcementAuthor}
        </Text>
        <Text style={[styles.announcementTop.text, { color: colors.secondaryText }]}>
          {date.toLocaleString("tr-TR")}
        </Text>
      </View>
      <View style={styles.announcementContent}>
        <Text style={[styles.announcementContent.text, { color: colors.primaryText }]}>
          {item.announcementContent}
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
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

export default Announcement
