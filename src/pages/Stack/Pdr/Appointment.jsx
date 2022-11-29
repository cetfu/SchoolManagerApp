import React, { useState } from "react";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import Button from "../../../components/Button";
import { WIDTH } from "../../../constants";

const Appointment = () => {

  const authState = useSelector(state => state.auth);
  const { colors } = useTheme();
  const [message, setMessage] = useState("");

  Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let myd = new Date();

  let a = myd.addDays(5);


  return (
    <View style={styles.container}>
      <Button
        width={WIDTH / 1.1}
        center={true}
        style={{ ...styles.button }}
        backgroundColor={colors.button}
        onPress={() => {
          DateTimePickerAndroid.open({
            value: new Date(),
            mode: "date",
            display: "calendar",
            maximumDate: new Date(date.getFullYear(), date.getMonth(), date.getDay() + 5),
          });
        }}
      >
        Tarih seçici
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginVertical: 20,
  },
});


export default Appointment;
