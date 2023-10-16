import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import ExitApp from "react-native-exit-app";

function AServer({ visibleModal = false }) {
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
      deviceHeight={Dimensions.get("screen").height}
    >
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <AText color={color.neutral.neutral900} size={18} weight="semibold">
            Perbaikan
          </AText>
          <AText
            style={{ paddingTop: 16 }}
            color={color.neutral.neutral500}
            size={14}
          >
            Layanan kami sedang dalam perbaikan, silahkan mencoba kembali nanti
          </AText>
          <Pressable
            style={{ alignItems: "flex-end", marginVertical: 24 }}
            onPress={() => {
              context.setServer(false);
              setVisible(false);
              ExitApp.exitApp();
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

export default AServer;