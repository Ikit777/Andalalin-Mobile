import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import KelengkapanItem from "./KelengkapanItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const KelengkapanNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="KelengkapanItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="KelengkapanItem"
        component={KelengkapanItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Kelengkapan"
        component={KelengkapanItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default KelengkapanNavigator;
