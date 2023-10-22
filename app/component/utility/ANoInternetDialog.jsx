import React, { useContext } from "react";
import { StyleSheet, View, Modal, Animated, Pressable, Dimensions } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import * as RootNavigation from "../../navigation/RootNavigator.js";

function ANoInternetDialog({ visibleModal = false }) {
  const context = useContext(UserContext);
  const [visible, setVisible] = React.useState(visibleModal);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);
  
  const toggleModal = () => {
    if (visibleModal) {
      if (context.loading == true) {
        context.toggleLoading(false);
      }
      setVisible(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  const ok = () => {
    setTimeout(() => setVisible(false), 200);
    Animated.spring(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (context.getUser() != "user") {
      RootNavigation.replace("Back Home");
    }
  };

  const height = () => {
    if (visibleModal) {
      return 82;
    } else {
      return 24
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
            Anda offline
          </AText>
          <AText
            style={{ paddingTop: 16, paddingBottom: height() }}
            color={color.neutral.neutral500}
            size={14}
          >
            Harap periksa koneksi internet Anda untuk melanjutkan aktivitas
          </AText>
          {visibleModal == false ? (
            <Pressable
              style={{ alignItems: "flex-end", marginBottom: 24 }}
              onPress={() => {
                ok();
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
          ) : (
            ""
          )}
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

export default ANoInternetDialog;
