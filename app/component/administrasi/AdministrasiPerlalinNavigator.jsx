import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdministrasiPerlalinItem from "./AdministrasiPerlalinItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const AdministrasiPerlalinNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="AdministrasiPerlalinItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="AdministrasiPerlalinItem"
        component={AdministrasiPerlalinItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back AdministrasiPerlalin"
        component={AdministrasiPerlalinItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default AdministrasiPerlalinNavigator;
