import React from "react";
import { StyleSheet, View, Modal, Pressable, Animated, Dimensions } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";

function AUpdateDialog({ visibleModal = false, onPressOKButton }) {
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
      deviceHeight={Dimensions.get('screen').height}
    >
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <AText color={color.neutral.neutral900} size={18} weight="semibold">
            Update
          </AText>
          <AText
            style={{ paddingTop: 16 }}
            color={color.neutral.neutral500}
            size={14}
          >
            Pembaharuan aplikasi tersedia, silahkan update aplikasi Andalalin Anda
          </AText>
          <Pressable
            style={{ alignItems: "flex-end", marginVertical: 24 }}
            onPress={
              onPressOKButton
            }
          >
            <AText
              style={{ paddingHorizontal: 20, paddingVertical: 5 }}
              size={14}
              color={color.primary.primary700}
              weight="semibold"
            >
              Update
            </AText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 31,
  },
  horizontal: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: color.primary.primary50,
  },
  btn: {
    width: 80,
    alignItems: "flex-end",
  },
});

export default AUpdateDialog;
