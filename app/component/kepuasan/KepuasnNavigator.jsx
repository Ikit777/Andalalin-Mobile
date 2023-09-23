import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import KepuasanItem from "./KepuasanItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const KepuasanNavigator = ({ index, id, kondisi }) => {
  return (
    <Stack.Navigator
      initialRouteName="KepuasanItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="KepuasanItem"
        component={KepuasanItem}
        initialParams={{
          index,
          id,
        }}
      />
      <Stack.Screen
        name="Back Kepuasan"
        component={KepuasanItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
          id,
        }}
      />
    </Stack.Navigator>
  );
};

export default KepuasanNavigator;
