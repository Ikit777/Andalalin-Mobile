import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import AProgressBar from "../component/utility/AProgressBar";
import { Feather } from "@expo/vector-icons";
import PemeriksaanNavigator from "../component/pemeriksaan/PemeriksaanNavigator";

function PemeriksaanDokumenScreen({ navigation }) {
  const context = useContext(UserContext);

  const [confirm, toggleComfirm] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [item, setItem] = useState(0);

  pemeriksaan_bangkitan_rendah = [
    {
      Substansi: "BAB 1",
      Catatan: [],
    },
    {
      Substansi: "BAB 2",
      Catatan: [],
    },
    {
      Substansi: "BAB 3",
      Catatan: [],
    },
    {
      Substansi: "BAB 4",
      Catatan: [],
    },

    {
      Substansi: "BAB 5",
      Catatan: [],
    },
    {
      Substansi: "LAMPIRAN GAMBAR TEKNIS",
      Catatan: [],
    },
    {
      Substansi: "CATATAN DAN KETERANGAN TAMBAHAN",
      Catatan: [],
    },
  ];

  useEffect(() => {
    context.toggleLoading(true);
    const pemeriksaan = [];

    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan rendah":
        pemeriksaan.push(...pemeriksaan_bangkitan_rendah);
        break;
    }

    setItem(pemeriksaan.length);

    context.setPemeriksaan({
      pemeriksaan: pemeriksaan,
    });

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        back();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        back();
        return true;
      });
    }, [context.indexPemeriksaan])
  );

  const back = () => {
    if (context.indexPemeriksaan == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexPemeriksaan - 1;
      context.setIndexPemeriksaan(newIndex);

      navigation.replace("Back Pemeriksaan", {
        index: newIndex,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexPemeriksaan < item) {
      const newIndex = context.indexPemeriksaan + 1;
      context.setIndexPemeriksaan(newIndex);

      navigation.push("PemeriksaanItem", {
        index: newIndex,
      });
    }
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <ABackButton
            onPress={() => {
              back();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Pemeriksaan dokumen
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor((context.indexPemeriksaan * 100) / item)}
        />
      </View>
      <View style={styles.content}>
        <PemeriksaanNavigator index={context.indexPemeriksaan} />
      </View>

      <Pressable
        android_ripple={{
          color: "rgba(0, 0, 0, 0.1)",
          borderless: false,
          radius: 32,
        }}
        style={{
          shadowColor: "rgba(0, 0, 0, 0.30)",
          elevation: 8,
          borderRadius: 16,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color.primary.primary100,
          position: "absolute",
          bottom: 64,
          right: 32,
          padding: 16,
        }}
        onPress={() => {}}
      >
        <Feather
          name={context.indexPemeriksaan != item ? "arrow-right" : "check"}
          size={24}
          color={color.neutral.neutral900}
        />
      </Pressable>

      <AConfirmationDialog
        title={"Peringatan!"}
        desc={"Hasil pemeriksaan akan hilang jika anda kembali"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.setIndexPemeriksaan(1);
          context.clearPemeriksaan();
          navigation.goBack();
        }}
      />

      <AConfirmationDialog
        title={"Kirim"}
        desc={"Kirim hasil pemeriksaan dokumen andalalin?"}
        visibleModal={konfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
        }}
      />

      <ADialog
        title={"Kirim gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default PemeriksaanDokumenScreen;
