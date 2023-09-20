import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PerlalinItem from "./PerlalinItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const PerlalinNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="PerlalinItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="PerlalinItem"
        component={PerlalinItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back"
        component={PerlalinItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default PerlalinNavigator;
