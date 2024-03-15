import React, {  } from "react";
import { StyleSheet, View } from "react-native";
import Permohonan from "./Permohonan";
import Pemohon from "./Pemohon";
import Perusahaan from "./Perusahaan";
import color from "../../constants/color";
import Kegiatan from "./Kegiatan";
import Konfirmasi from "./Konfirmasi";
import Informasi from "./Informasi";
import Persyaratan from "./Persyaratan";
import Proyek from "./Proyek";
import Konsultan from "./Konsultan";
import { useRecoilState, useSetRecoilState } from "recoil";
import PermohonanAtom from "../../atom/PermohonanAtom";

export default function AndalalinItem({ navigation, route }) {
  const index = route.params.index;
  const kondisi = route.params.kondisi;

  const { andalalinState, indexPermohonan } = PermohonanAtom;
  const [andalalin, setAndalalin] = useRecoilState(andalalinState);
  const setIndex = useSetRecoilState(indexPermohonan);

  const onGoToNext = () => {
    const newIndex = index + 1;

    setIndex(newIndex);

    navigation.push("AndalalinItem", {
      index: newIndex,
    });
  };

  const render_content = () => {
    switch (andalalin.bangkitan) {
      case "Bangkitan rendah":
        if (andalalin.pemohon == "Perorangan") {
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
              return <Proyek onPress={onGoToNext} navigation={navigation} />;
            case 4:
              return <Pemohon onPress={onGoToNext} />;
            case 5:
              return <Kegiatan onPress={onGoToNext} />;
            case 6:
              return (
                <Persyaratan onPress={onGoToNext} navigation={navigation} />
              );
            case 7:
              return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
          }
        } else {
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
              return <Proyek onPress={onGoToNext} navigation={navigation} />;
            case 4:
              return <Pemohon onPress={onGoToNext} />;
            case 5:
              return <Perusahaan onPress={onGoToNext} />;
            case 6:
              return <Kegiatan onPress={onGoToNext} />;
            case 7:
              return (
                <Persyaratan onPress={onGoToNext} navigation={navigation} />
              );
            case 8:
              return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
          }
        }
        break;
      case "Bangkitan sedang":
        if (andalalin.pemohon == "Perorangan") {
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
              return <Proyek onPress={onGoToNext} navigation={navigation} />;
            case 4:
              return <Pemohon onPress={onGoToNext} />;
            case 5:
              return <Konsultan onPress={onGoToNext} />;
            case 6:
              return <Kegiatan onPress={onGoToNext} />;
            case 7:
              return (
                <Persyaratan onPress={onGoToNext} navigation={navigation} />
              );
            case 8:
              return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
          }
        } else {
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
              return <Proyek onPress={onGoToNext} navigation={navigation} />;
            case 4:
              return <Pemohon onPress={onGoToNext} />;
            case 5:
              return <Perusahaan onPress={onGoToNext} />;
            case 6:
              return <Konsultan onPress={onGoToNext} />;
            case 7:
              return <Kegiatan onPress={onGoToNext} />;
            case 8:
              return (
                <Persyaratan onPress={onGoToNext} navigation={navigation} />
              );
            case 9:
              return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
          }
        }
        break;
      case "Bangkitan tinggi":
        if (andalalin.pemohon == "Perorangan") {
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
              return <Proyek onPress={onGoToNext} navigation={navigation} />;
            case 4:
              return <Pemohon onPress={onGoToNext} />;
            case 5:
              return <Konsultan onPress={onGoToNext} />;
            case 6:
              return <Kegiatan onPress={onGoToNext} />;
            case 7:
              return (
                <Persyaratan onPress={onGoToNext} navigation={navigation} />
              );
            case 8:
              return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
          }
        } else {
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
              return <Proyek onPress={onGoToNext} navigation={navigation} />;
            case 4:
              return <Pemohon onPress={onGoToNext} />;
            case 5:
              return <Perusahaan onPress={onGoToNext} />;
            case 6:
              return <Konsultan onPress={onGoToNext} />;
            case 7:
              return <Kegiatan onPress={onGoToNext} />;
            case 8:
              return (
                <Persyaratan onPress={onGoToNext} navigation={navigation} />
              );
            case 9:
              return <Konfirmasi navigation={navigation} kondisi={kondisi} />;
          }
        }
        break;
    }
  };

  return <View style={styles.container}>{render_content()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
