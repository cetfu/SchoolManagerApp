import React  from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

const WarningText = ({children}) =>{
  const {colors} = useTheme()
  return <Text style={[{
    fontFamily: "SecularOne",
    fontSize: 20,
    alignSelf: "center"
  }, {color: colors.warning}]}>{children}</Text>
}
export default WarningText
