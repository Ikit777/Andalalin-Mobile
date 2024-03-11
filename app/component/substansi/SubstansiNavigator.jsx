import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SubstansiItem from "./SubstansiItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const SubstansiNavigator = ({ index }) => {
  return (
    <Stack.Navigator
      initialRouteName="SubstansiItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="SubstansiItem"
        component={SubstansiItem}
        initialParams={{
          index,
        }}
      />
      <Stack.Screen
        name="Back Substansi"
        component={SubstansiItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
        }}
      />
    </Stack.Navigator>
  );
};

export default SubstansiNavigator;
