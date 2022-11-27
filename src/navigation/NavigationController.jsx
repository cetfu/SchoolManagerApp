import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthStack from "./Stacks/AuthStack";
import WithoutAuthStack from "./Stacks/WithoutAuthStack";
import EncryptedStorage from "react-native-encrypted-storage";
import { login } from "../redux/slices/authSlice";
import { API_URL } from "../constants";
import { useFocusEffect } from "@react-navigation/native";

const NavigationController = () =>{
  const authState = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useFocusEffect(useCallback(() =>{
    (async () =>{
      try{
        const accessToken = await EncryptedStorage.getItem("accessToken")
        if(accessToken?.length > 0){
          const req = await fetch(`${API_URL}/v1/getCredentials`, {
            method: "POST",
            body: null,
            headers: {
              "Authorization": `Bearer ${accessToken}`
            }
          })
          const reqData = await req.json()
          dispatch(login({token: accessToken, userId: reqData?.data?.userId, studentNumber: reqData?.data.studentNumber}))
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, []))

  if(authState.accessToken){
    return (
      <AuthStack />
    )
  } else{
    return (
      <WithoutAuthStack />
    )
  }
}

export default NavigationController
