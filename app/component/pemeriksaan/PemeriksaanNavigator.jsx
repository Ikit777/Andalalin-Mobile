import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PemeriksaanItem from "./PemeriksaanItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const PemeriksaanNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="PemeriksaanItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="PemeriksaanItem"
        component={PemeriksaanItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Pemeriksaan"
        component={PemeriksaanItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default PemeriksaanNavigator;
