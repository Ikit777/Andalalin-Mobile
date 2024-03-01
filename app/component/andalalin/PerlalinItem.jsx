import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import Konfirmasi from "./Konfirmasi";
import Informasi from "./Informasi";
import PermohonanPerlalin from "./PermohonanPerlalin";
import PemohonPerlalin from "./PemohonPerlalin";
import PersyaratanPerlalin from "./PersyaratanPerlalin";

export default function PerlalinItem({ navigation, route }) {
  const context = useContext(UserContext);
  const index = route.params.index;
  const kondisi = route.params.kondisi;

  const onGoToNext = () => {
    if (index < 5) {
      const newIndex = index + 1;

      context.setIndex(newIndex);

      navigation.push("PerlalinItem", {
        index: newIndex,
      });
    }
  };

  const renderItem = () => {
    switch (index) {
      case 1:
        return (
          <Informasi
            onPress={onGoToNext}
            navigation={navigation}
            kondisi={kondisi}
          />
        );
      case 2:
        return <PermohonanPerlalin onPress={onGoToNext} navigation={navigation} />;
      case 3:
        return <PemohonPerlalin onPress={onGoToNext} />;
      case 4:
        return (
          <PersyaratanPerlalin onPress={onGoToNext} navigation={navigation} />
        );
      case 5:
        return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
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
