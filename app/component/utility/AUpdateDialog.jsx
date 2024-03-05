import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ExitApp from "react-native-exit-app";
import { UserContext } from "../../context/UserContext";
import { remove } from "../../utils/local-storage";

function AUpdateDialog({ visibleModal = false }) {
  const [visible, setVisible] = React.useState(visibleModal);

  const context = useContext(UserContext);

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      if (context.loading == true) {
        context.toggleLoading(false);
      }
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 200);
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
            Update
          </AText>
          <AText
            style={{ paddingTop: 16 }}
            color={color.neutral.neutral500}
            size={14}
          >
            Pembaharuan aplikasi tersedia, silahkan update aplikasi Andalalin
            Anda
          </AText>
          <TouchableOpacity
            style={{ alignItems: "flex-end", marginVertical: 24 }}
            onPress={() => {
              remove("authState");
              Linking.openURL("market://details?id=com.andalalin");
              ExitApp.exitApp();
            }}
          >
            <AText
              style={{ paddingHorizontal: 20, paddingVertical: 5 }}
              size={14}
              color={color.primary.primary700}
              weight="semibold"
            >
              Update
            </AText>
          </TouchableOpacity>
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
