import React, { useCallback, useState } from "react";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../../constants";
import { useSelector } from "react-redux";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

const PdrAppointment = ({navigation}) => {

  const authState = useSelector(state => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const { colors } = useTheme();


  useFocusEffect(
    useCallback(() => {
      (async () => {
        const req = await fetch(`${API_URL}/v1/getPdrService`, {
          method: "POST",
          headers: {
            ...DEFAULT_HEADERS,
            "Authorization": `Bearer ${authState.accessToken}`,
          },
          body: JSON.stringify({
            userId: authState.userId,
          }),
        });
        const data = await req.json();
        switch (data.status) {
          case 1:
            setAppointments(data.data);
            setMessage("");
            break;
          default:
            setMessage(data.message);
            break;
        }
      })();
    }, []),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("NewPdrAppointment")
        }}
        activeOpacity={0.9} style={[styles.button, { backgroundColor: colors.button }]}>
        <Text style={[styles.button.text, { color: colors.secondary }]}>
          Yeni randevu
        </Text>
      </TouchableOpacity>
      <FlashList
        estimatedItemSize={5}
        renderItem={({item}) =>(
          <View style={[styles.appointment, {backgroundColor: colors.secondary}]}>
            <Text style={[styles.appointment.text, {color: colors.primaryText, fontSize: 17}]}>Kim için: {item.name}</Text>
            <Text style={[styles.appointment.text, {color: colors.primaryText, fontSize: 17}]}>Ne hakkında: {item.about}</Text>
            <Text style={[styles.appointment.text, { fontSize: 17}]}>Tarih: {item.time}</Text>
          </View>
        )}
        data={appointments}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: WIDTH / 1.1,
    height: 75,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    text: {
      fontSize: 20,
      fontFamily: "SecularOne",
    },
  },
  appointment: {
    width: WIDTH / 1.1,
    height: 125,
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "center",
    text: {
      fontFamily: "SecularOne"
    }
  }
});

export default PdrAppointment;
