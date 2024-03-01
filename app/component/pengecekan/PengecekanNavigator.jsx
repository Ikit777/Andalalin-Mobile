import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PengecekanItem from "./PengecekanItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const PengecekanNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="PengecekanItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="PengecekanItem"
        component={PengecekanItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Pengecekan"
        component={PengecekanItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default PengecekanNavigator;
