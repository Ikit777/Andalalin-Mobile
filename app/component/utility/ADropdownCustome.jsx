import React, { useState } from "react";
import {
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

export default function ADropdownCustome({ child, title }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View>
      <TouchableWithoutFeedback title={title} onPress={toggleDropdown} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        {child}
      </Modal>
    </View>
  );
}
