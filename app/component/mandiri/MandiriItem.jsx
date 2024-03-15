import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import Foto from "./Foto";
import Lokasi from "./Lokasi";
import Keterangan from "./Keterangan";

export default function MandiriItem({ navigation, route }) {
  const context = useContext(UserContext);
  const index = route.params.index;

  const onGoToNext = () => {
    if (index < 3) {
      const newIndex = index + 1;
      context.setSurveiMandiriIndex(newIndex);

      navigation.push("MandiriItem", {
        index: newIndex,
      });
    }
  };

  const renderItem = () => {
    switch (index) {
      case 1:
        return <Foto onPress={onGoToNext} navigation={navigation} />;
      case 2:
        return <Lokasi onPress={onGoToNext} />;
      case 3:
        return (
          <Keterangan
            onPress={onGoToNext}
            navigation={navigation}
          />
        );
    }
  };

  return <View style={styles.container}>{renderItem()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
