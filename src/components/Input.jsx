import React from "react";
import { TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";

const Input = ({style, onChangeText, value, placeholder, multiline = false, onBlur, secureTextEntry = false}) =>{
  const {colors} = useTheme()

  return (
    <TextInput
      style={style}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors?.placeholderTextColor}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
    />
  )
}

export default Input
