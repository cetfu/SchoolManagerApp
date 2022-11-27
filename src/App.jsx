import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/store";
import { MyTheme } from "./themes/themes";
import NavigationController from "./navigation/NavigationController";

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <NavigationController />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
