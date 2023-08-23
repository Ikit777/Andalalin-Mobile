import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import Colors from "../../constants/color";

function AScreen({
  children,
  statusbar = "dark",
  full = false,
  padding = 0,
  onLayout,
  style,
}) {
  return (
    <>
      <StatusBar style={statusbar} />
      <SafeAreaView
        style={[
          {
            flex: 1,
            paddingTop: full ? padding : Constants.statusBarHeight + padding,
            paddingHorizontal: padding,
            paddingBottom: padding,
            backgroundColor: Colors.primary.primary25,
          },
          style,
        ]}
        onLayout={onLayout}
      >
        {children}
      </SafeAreaView>
    </>
  );
}

export default AScreen;
