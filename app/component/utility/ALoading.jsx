import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";

function ALoading({ visibleModal = false }) {
  const [visible, setVisible] = React.useState(visibleModal);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);
  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setVisible(false), 200);
      Animated.spring(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
    >
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          size="large"
          color={color.primary.primary500}
          style={{
            padding: 12,
            backgroundColor: color.neutral.neutral50,
            borderRadius: 12,
          }}
        />
        <AText color={color.neutral.neutral50} size={16}>
          Loading
        </AText>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  horizontal: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ALoading;
