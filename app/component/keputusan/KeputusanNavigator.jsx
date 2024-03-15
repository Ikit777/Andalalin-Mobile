import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import KeputusanItem from "./KeputusanItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const KeputusanNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="KeputusanItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="KeputusanItem"
        component={KeputusanItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Keputusan"
        component={KeputusanItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default KeputusanNavigator;
