import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { UserContext } from "../../context/UserContext";
import Permohonan from "./Permohonan";
import Pemohon from "./Pemohon";
import Perusahaan from "./Perusahaan";
import color from "../../constants/color";
import LokasiPerusahaan from "./LokasiPerusahaan";
import Kegiatan from "./Kegiatan";
import Konfirmasi from "./Konfirmasi";
import Informasi from "./Informasi";
import Persyaratan from "./Persyaratan";

export default function AndalalinItem({ navigation, route }) {
  const context = useContext(UserContext);
  const index = route.params.index;

  const onGoToNext = () => {
    if (index < 8) {
      const newIndex = index + 1;
      
      context.setIndex(newIndex);

      navigation.push("AndalalinItem", {
        index: newIndex,
      });
    }
  };

  const renderItem = () => {
    switch (index) {
      case 1:
        return <Informasi onPress={onGoToNext} navigation={navigation} />;
      case 2:
        return <Permohonan onPress={onGoToNext} />;
      case 3:
        return <Pemohon onPress={onGoToNext} />;
      case 4:
        return <Perusahaan onPress={onGoToNext} />;
      case 5:
        return <LokasiPerusahaan onPress={onGoToNext} />;
      case 6:
        return <Kegiatan onPress={onGoToNext} />;
      case 7:
        return <Persyaratan onPress={onGoToNext} navigation={navigation} />;
      case 8:
        return <Konfirmasi navigation={navigation} />;
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
