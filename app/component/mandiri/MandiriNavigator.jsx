import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MandiriItem from "./MandiriItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const MandiriNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="MandiriItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="MandiriItem"
        component={MandiriItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back"
        component={MandiriItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default MandiriNavigator;
