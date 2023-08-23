import React, { useContext } from "react";
import { StyleSheet, View, Modal, Pressable, Animated } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import { remove } from "../../utils/local-storage";
import * as RootNavigation from '../../navigation/RootNavigator.js';

function ASessionEnd({ visibleModal = false }) {
  const [visible, setVisible] = React.useState(visibleModal);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const context = useContext(UserContext);
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
    >
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <AText color={color.neutral.neutral900} size={18} weight="semibold">
            Session berakhir
          </AText>
          <AText
            style={{ paddingTop: 16 }}
            color={color.neutral.neutral500}
            size={14}
          >
            Session anda telah berakhir, silahkan login kembali
          </AText>
          <Pressable
            style={{ alignItems: "flex-end", marginVertical: 24 }}
            onPress={() => {
              context.setSession(false);
              setVisible(false);
              remove("authState");
              RootNavigation.push("Login")
            }}
          >
            <AText
              style={{ paddingHorizontal: 20, paddingVertical: 5 }}
              size={14}
              color={color.primary.primary700}
              weight="semibold"
            >
              OK
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

export default ASessionEnd;
