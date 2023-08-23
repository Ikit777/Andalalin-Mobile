import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import color from "../../constants/color";

function AProgressBar({
  progress = 0,
  margin = 0,
}) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (progress !== 0) {
      Animated.timing(animation, {
        toValue: progress,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [progress]);

  return (
    <View
      style={[
        styles.progressbar,
        {
          marginHorizontal: margin,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.on,
          {
            backgroundColor: color.primary.primary600,
            width: animation.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      ></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressbar: {
    height: 6,
    backgroundColor: color.primary.primary100,
    overflow: "hidden",
  },
  on: {
    flex: 1,
  },
});

export default AProgressBar;
