import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { WIDTH } from "../constants";

const Button = ({
                  children,
                  width = WIDTH,
                  height = 100,
                  backgroundColor = "pink",
                  borderRadius = 10,
                  textColor = "black",
                  fontSize = 16,
                  onPress,
                  activeOpacity = 0.9,
                  center,
                  style,
                }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={{
        ...style,
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: center ? "center" : "auto",
      }}>
      <Text style={{
        fontSize: fontSize,
        color: textColor,
        fontFamily: "SecularOne",
      }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
