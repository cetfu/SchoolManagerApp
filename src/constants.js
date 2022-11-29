import { Dimensions } from "react-native";

export const API_URL = __DEV__ ? "http://192.168.0.23:5000" : "http://159.223.30.133:6000"
export const {width: WIDTH, height: HEIGHT} = Dimensions.get("window")
export const DEFAULT_HEADERS = {'Accept': 'application/json', 'Content-Type': 'application/json'}
