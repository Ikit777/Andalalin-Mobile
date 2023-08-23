import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { UserContext } from "../../context/UserContext";
import Permohonan from "./Permohonan";
import Pemohon from "./Pemohon";
import Perusahaan from "./Perusahaan";
import color from "../../constants/color";
import ALoading from "../utility/ALoading";
import LokasiPerusahaan from "./LokasiPerusahaan";
import Kegiatan from "./Kegiatan";
import PersyaratanKTP from "./Persyaratan_ktp";
import PersyaratanAKTA from "./Persyaratan_akta";
import PersyaratanSURAT from "./Persyaratan_surat";
import Konfirmasi from "./Konfirmasi";
import { useStateToggler } from "../../hooks/useUtility";

export default function AndalalinItem({ navigation, route }) {
  const context = useContext(UserContext);
  const index = route.params.index;
  const [loading, toggleLoading] = useState(true);

  const onGoToNext = () => {
    if (index < 9) {
      const newIndex = index + 1;
      context.setIndex(newIndex);

      navigation.push("AndalalinItem", {
        index: newIndex,
      });
    }
  };

  
  useEffect(() => {
    setTimeout(() => {
      toggleLoading(false);
    }, 1000);
  }, [navigation]);

  const renderItem = () => {
    switch (index) {
      case 1:
        return <Permohonan onPress={onGoToNext} />;
      case 2:
        return <Pemohon onPress={onGoToNext} />;
      case 3:
        return <Perusahaan onPress={onGoToNext}/>;
      case 4:
        return <LokasiPerusahaan onPress={onGoToNext}/>;
      case 5:
        return <Kegiatan onPress={onGoToNext}/>;
      case 6:
        return <PersyaratanKTP onPress={onGoToNext}/>;
      case 7:
        return <PersyaratanAKTA onPress={onGoToNext}/>;
      case 8:
        return <PersyaratanSURAT onPress={onGoToNext}/>;
      case 9:
        return <Konfirmasi navigation={navigation}/>;
    }
  };

  return <View style={styles.container}>{renderItem()}<ALoading visibleModal={loading} /></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
