import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import School from "../assets/school.svg";
import { useTheme } from "@react-navigation/native";
import Input from "../components/Input";
import { Formik } from "formik";
import { API_URL, DEFAULT_HEADERS, WIDTH } from "../constants";
import md5 from "md5"
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

const Login = () => {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const { colors } = useTheme();
  const initialFormValues = {
    username: "",
    password: "",
  };

  const formOnSubmit = async (data) => {
    try{
      const req = await fetch(`${API_URL}/v1/login`, {
        method: "post",
        body: JSON.stringify({
          username: data.username,
          password: md5(data.password)
        }),
        headers: {
          ...DEFAULT_HEADERS
        }
      })
      const reqData = await req.json()
      switch (reqData.status) {
        case 1:
          let token = reqData.accessToken
          await EncryptedStorage.setItem("accessToken", token)
          dispatch(login({token: token, userId: reqData.userId, studentNumber: reqData.studentNumber, name: reqData.name}))
          break
        default:
          setMessage(reqData.message)
          break
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <School width={100} height={100} fill={colors.primaryText} viewBox={"0 0 50 50"} />
        <Text style={[styles.headerText, { color: colors.primaryText }]}>
          SchoolManager
        </Text>
      </View>
      <View style={styles.bottom}>
        <Formik initialValues={initialFormValues} onSubmit={formOnSubmit}>
          {({ handleChange, values, handleSubmit, handleBlur }) => (
            <>
              <Input
                value={values.username}
                onChangeText={handleChange("username")}
                placeholder={"Kullanıcı adı"}
                onBlur={handleBlur("username")}
                style={[styles.inputStyle, { backgroundColor: colors.secondary, color: colors.primaryText }]}
              />
              <Input
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={[styles.inputStyle, { backgroundColor: colors.secondary, color: colors.primaryText }]}
                placeholder={"Şifre"}
                secureTextEntry={true}
              />
              <Text style={[styles.warning, {color: colors.warning}]}>{message}</Text>
              <TouchableOpacity
                underlayColor={colors.primary}
                style={[styles.submitButton, { backgroundColor: colors.button }]}
                activeOpacity={0.9}
                onPress={handleSubmit}
              >
                <Text style={[styles.submitText, { color: colors.secondary}]}>Giriş Yap!</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    width: WIDTH / 1.1,
    height: 60,
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 3,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "SecularOne",
    //fontFamily: "RubikMark",
    fontSize: 36,
    fontWeight: "600",
  },
  submitButton: {
    width: WIDTH / 1.1,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 20,
    fontFamily: "SecularOne",
  },
  warning: {
    fontSize: 16,
    fontFamily: "SecularOne"
  }
});

export default Login;
