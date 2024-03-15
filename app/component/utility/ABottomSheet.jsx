import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import color from "../../constants/color";
import Modal from "react-native-modal";

function ABottomSheet({ visible, close, children }) {
  return (
    <Modal
      isVisible={visible}
      style={styles.view}
      backdropOpacity={0.5}
      statusBarTranslucent    
      coverScreen={true}
      deviceHeight={Dimensions.get('screen').height}
      backdropTransitionOutTiming={0}
      onRequestClose={() => {close()}}
      onBackdropPress={() => {close()}}
    >
      <KeyboardAvoidingView behavior={"padding"}>
        <View style={styles.inside}>{children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
