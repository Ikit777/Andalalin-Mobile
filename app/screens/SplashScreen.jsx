import React, { useRef } from "react";
import { StyleSheet, View, Image, Animated, Easing } from "react-native";
import AScreen from "../component/utility/AScreen";

function SplashScreenOn({ isLoading, timing = Easing.ease }) {
  // const fadeAnim = useRef(new Animated.Value(isLoading ? 1 : 0)).current;

  // const toggleVisibility = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: isLoading ? 0 : 1,
  //     duration: 300,
  //     useNativeDriver: true,
  //     easing: timing,
  //   }).start();
  // };

  const slide = useRef(new Animated.Value(1)).current;
  const slider = Animated.timing(slide, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
    easing: timing,
  });

  const slideout = useRef(new Animated.Value(0)).current;
  const sliderout = Animated.timing(slideout, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
    easing: timing,
  });

  const toggleModal = () => {
    if (isLoading) {
      slider.start();
    } else {
      sliderout.start();
    }
  };

  React.useEffect(() => {
    toggleModal();
  }, [isLoading]);

  return (
    <AScreen>
      <Animated.View
        style={[styles.container, { opacity: isLoading ? slide : slideout }]}
      >
        <Image
          source={require("../assets/image/icon_app.png")}
          style={styles.stretch}
        />
        <View
          style={{
            position: "absolute",
            bottom: 24,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <Image
            source={require("../assets/image/banjarmasin.png")}
            style={styles.oleh1}
          /> */}
          <Image
            source={require("../assets/image/dishub.png")}
            style={styles.oleh2}
          />
        </View>
      </Animated.View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {
    width: 205,
    height: 175,
    resizeMode: "contain",
  },
  oleh1: {
    width: 155,
    height: 125,
    resizeMode: "contain",
  },
  oleh2: {
    width: 155,
    height: 125,
    resizeMode: "contain",
  },
});

export default SplashScreenOn;
