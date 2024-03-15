import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PembahasanItem from "./PembahasanItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const PembahasanNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="PembahasanItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="PembahasanItem"
        component={PembahasanItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Pembahasan"
        component={PembahasanItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default PembahasanNavigator;
