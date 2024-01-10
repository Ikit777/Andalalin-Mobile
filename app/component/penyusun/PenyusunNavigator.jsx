import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PenyusunItem from "./PenyusunItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const PenyusunNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="PenyusunItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="PenyusunItem"
        component={PenyusunItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Penyusun"
        component={PenyusunItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default PenyusunNavigator;
