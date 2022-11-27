import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../constants";
import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import PdrAnnouncements from "./Tab/PdrAnnouncements";
import Announcement from "../components/Announcement";

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
        renderItem={(props) => (
          <Announcement {...props} />
        )
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
});

export default MainAnnouncements;
