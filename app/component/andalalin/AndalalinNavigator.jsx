import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AndalalinItem from "./AndalalinItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const AndalalinNavigator = ({ index, kondisi }) => {
  return (
    <Stack.Navigator
      initialRouteName="AndalalinItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="AndalalinItem"
        component={AndalalinItem}
        initialParams={{
          index,
          kondisi,
        }}
      />
      <Stack.Screen
        name="Back"
        component={AndalalinItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
          kondisi,
        }}
      />
    </Stack.Navigator>
  );
};

export default AndalalinNavigator;
