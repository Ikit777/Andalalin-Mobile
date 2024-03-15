import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SurveiItem from "./SurveiItem";

const Stack = createNativeStackNavigator();

/* A navigator for the exercises that will take the current exercise and passed it the exercise item */
const SurveiNavigator = ({ index, id, kondisi }) => {
  return (
    <Stack.Navigator
      initialRouteName="SurveiItem"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen
        name="SurveiItem"
        component={SurveiItem}
        initialParams={{
          index,
          id,
          kondisi,
        }}
      />
      <Stack.Screen
        name="Back"
        component={SurveiItem}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          index,
          id,
          kondisi,
        }}
      />
    </Stack.Navigator>
  );
};

export default SurveiNavigator;
