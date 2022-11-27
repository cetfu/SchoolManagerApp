import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../constants";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect, useTheme } from "@react-navigation/native";

const MainAnnouncements = () => {
  const authState = useSelector(state => state.auth);
  const [announcements, setAnnouncements] = useState([]);
  const { colors } = useTheme();

  useFocusEffect(useCallback(() => {
    (async () => {
      try {
        const req = await fetch(`${API_URL}/v1/getAnnouncements`, {
          method: "post",
          body: JSON.stringify({
            userId: authState.userId,
          }),
          headers: {
            ...DEFAULT_HEADERS,
            "Authorization": `Bearer ${authState.accessToken}`,
          },
        });
        const data = await req.json();
        setAnnouncements(data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlashList
        estimatedItemSize={10}
        renderItem={({ item }) => {
          let date = new Date(item.announcementDate);

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
        }
        data={announcements}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default MainAnnouncements;
