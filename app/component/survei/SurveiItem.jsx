import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import Foto from "./Foto";
import Lokasi from "./Lokasi";
import Keterangan from "./Keterangan";

export default function SurveiItem({ navigation, route }) {
  const context = useContext(UserContext);
  const index = route.params.index;
  const id = route.params.id;
  const kondisi = route.params.kondisi;

  const onGoToNext = () => {
    if (index < 3) {
      const newIndex = index + 1;
      context.setIndexSurvei(newIndex);

      navigation.push("SurveiItem", {
        index: newIndex,
        id: id,
        kondisi,
      });
    }
  };

  const renderItem = () => {
    switch (index) {
      case 1:
        return <Foto onPress={onGoToNext} navigation={navigation} kondisi={kondisi} id={id} />;
      case 2:
        return <Lokasi onPress={onGoToNext} id={id} />;
      case 3:
        return (
          <Keterangan
            onPress={onGoToNext}
            id={id}
            navigation={navigation}
            kondisi={kondisi}
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
