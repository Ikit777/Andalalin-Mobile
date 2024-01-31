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
import { andalalinPemeriksaanDokumenAndalalin } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";

function PemeriksaanDokumenScreen({ navigation }) {
  const context = useContext(UserContext);

  const [confirm, toggleComfirm] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [item, setItem] = useState(0);

  pemeriksaan_bangkitan_sedang = [
    {
      substansi: "BAB 1",
      catatan: [],
    },
    {
      substansi: "BAB 2",
      catatan: [],
    },
    {
      substansi: "BAB 3",
      catatan: [],
    },
    {
      substansi: "BAB 4",
      catatan: [],
    },
    {
      substansi: "BAB 5",
      catatan: [],
    },
    {
      substansi: "LAMPIRAN GAMBAR TEKNIS",
      catatan: [],
    },
    {
      substansi: "CATATAN DAN KETERANGAN TAMBAHAN",
      catatan: [],
    },
  ];

  useEffect(() => {
    context.toggleLoading(true);

    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan sedang":
        const status =
          context.detailPermohonan.hasil_asistensi == null
            ? ""
            : context.detailPermohonan.hasil_asistensi;

        const deepCopiedObject = JSON.parse(
          JSON.stringify(context.detailPermohonan.catatan_asistensi)
        );

        let pemeriksaan =
          context.detailPermohonan.catatan_asistensi == null
            ? pemeriksaan_bangkitan_sedang
            : deepCopiedObject;

        setItem(pemeriksaan.length + 1);

        context.setPemeriksaan({
          status: status,
          pemeriksaan: pemeriksaan,
        });

        break;
    }

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

  const pemeriksaan_dokumen = () => {
    context.toggleLoading(true);
    andalalinPemeriksaanDokumenAndalalin(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      context.pemeriksaan.status,
      context.pemeriksaan.pemeriksaan,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Detail", {
              id: context.detailPermohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                pemeriksaan_dokumen();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
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
        onPress={() => {
          switch (context.indexPemeriksaan) {
            case 1:
              if (context.pemeriksaan.status != "") {
                onGoToNext();
              }
              break;
            case item:
              toggleKonfirmasi();
              break;
            default:
              onGoToNext();
              break;
          }
        }}
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
          pemeriksaan_dokumen();
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
