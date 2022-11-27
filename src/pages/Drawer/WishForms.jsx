import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Input from "../../components/Input";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../../constants";
import WarningText from "../../components/WarningText";

const WishForms = () => {
  const authState = useSelector(state => state.auth);
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("wish");
  const [items, setItems] = useState([
    { label: "Dilek", value: "wish" },
    { label: "Şikayet", value: "complaint" },
  ]);
  const [myMessage, setMyMessage] = useState("");
  const [message, setMessage] = useState("");
  const titleStyle = [styles.texts, { color: colors.primaryText }];

  const onChangeMessage = (msg) => {
    setMyMessage(msg);
  };

  const onSubmit = async () =>{
    try{
      const req = await fetch(`${API_URL}/v1/createWishOrComplaint`, {
        method: "POST",
        headers: {
          ...DEFAULT_HEADERS,
          "Authorization": `Bearer ${authState.accessToken}`
        },
        body: JSON.stringify({
          userId: authState.userId,
          content: myMessage,
          type: value
        })
      })
      const data = await req.json()
      setMessage(data.message)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      {message && <WarningText>{message}</WarningText>}
      <View style={styles.aBox}>
        <Text style={titleStyle}>Tür</Text>
        <DropDownPicker
          setValue={setValue}
          value={value}
          items={items}
          open={open}
          setOpen={setOpen}
          style={{ borderWidth: 0 }}
        />
      </View>
      <View style={styles.aBox}>
        <Text style={titleStyle}>Mesajınız</Text>
        <Input
          multiline={true}
          value={myMessage}
          onChangeText={onChangeMessage}
          style={[styles.input, { backgroundColor: colors.secondary }]}
          placeholder={"Mesajınızı giriniz..."}
        />
      </View>
      <TouchableOpacity
        style={[styles.submit, {backgroundColor: colors.button}]}
        onPress={onSubmit}
      >
        <Text style={[styles.submit.text, {color: colors.secondary}]}>Formu gönder!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aBox: {
    marginVertical: 10,
  },
  texts: {
    fontSize: 20,
    fontFamily: "SecularOne",
    alignSelf: "center",
  },
  input: {
    width: WIDTH,
    minHeight: 30,
    maxHeight: 120,
    borderRadius: 10,
  },
  submit: {
    width: WIDTH / 1.1,
    height: 75,
    alignSelf: "center",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    text: {
      fontSize: 20,
      fontFamily: "SecularOne"
    }
  },
});

export default WishForms;
