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
  const kondisi = route.params.kondisi;

  const onGoToNext = () => {
    if (index < 7) {
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
        return (
          <Informasi
            onPress={onGoToNext}
            navigation={navigation}
            kondisi={kondisi}
          />
        );
      case 2:
        return <Permohonan onPress={onGoToNext} />;
      case 3:
        return <Pemohon onPress={onGoToNext} />;
      case 4:
        return <Perusahaan onPress={onGoToNext} />;
      case 5:
        return <Kegiatan onPress={onGoToNext} />;
      case 6:
        return <Persyaratan onPress={onGoToNext} navigation={navigation} />;
      case 7:
        return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
    }
  };

  const renderItemPerorangan = () => {
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
        return <Permohonan onPress={onGoToNext} />;
      case 3:
        return <Pemohon onPress={onGoToNext} />;
      case 4:
        return <Kegiatan onPress={onGoToNext} />;
      case 5:
        return <Persyaratan onPress={onGoToNext} navigation={navigation} />;
      case 6:
        return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
    }
  };

  return (
    <View style={styles.container}>
      {context.permohonan.pemohon == "Perorangan"
        ? renderItemPerorangan()
        : renderItem()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
