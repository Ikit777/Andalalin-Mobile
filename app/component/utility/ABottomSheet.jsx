import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import color from "../../constants/color";
import Modal from "react-native-modal";

function ABottomSheet({ visible, children }) {
  return (
    <Modal
      isVisible={visible}
      style={styles.view}
      statusBarTranslucent
      backdropOpacity={0.5}
      backdropTransitionOutTiming={0}
    >
      <KeyboardAvoidingView behavior={"padding"}>
        <View style={styles.inside}>{children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  inside: {
    backgroundColor: color.text.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
});

export default ABottomSheet;
