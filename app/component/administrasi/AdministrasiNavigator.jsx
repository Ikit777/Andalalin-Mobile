import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdministrasiItem from "./AdministrasiItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const AdministrasiNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="AdministrasiItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="AdministrasiItem"
        component={AdministrasiItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Administrasi"
        component={AdministrasiItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default AdministrasiNavigator;
