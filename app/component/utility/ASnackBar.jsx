import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import color from '../../constants/color';
import AText from './AText';

const ASnackBar = ({ visible, message, style }) => {
    const [animationValue] = useState(new Animated.Value(0));

    useEffect(() => {
      if (visible) {
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
  
        setTimeout(() => {
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }, 3000); // Snackbar duration in milliseconds
      }
    }, [visible, animationValue]);
  
    const opacity = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

  return (
    <Animated.View style={[styles.container, { opacity }, style]}>
      <AText size={14} color={color.neutral.neutral50}>{message}</AText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.neutral.neutral800,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    width: "100%",
  },
});

export default ASnackBar;