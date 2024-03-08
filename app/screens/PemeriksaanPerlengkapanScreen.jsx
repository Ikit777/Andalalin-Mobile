import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import { useStateToggler } from "../hooks/useUtility";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import AProgressBar from "../component/utility/AProgressBar";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import PengecekanNavigator from "../component/pengecekan/PengecekanNavigator";
import { andalalinPengecekanPerlengkapan } from "../api/andalalin";

function PemeriksaanPerlengkapanScreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);

  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [item, setItem] = useState(0);

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
    }, [context.indexPemeriksaanPerlengkapan])
  );

  useEffect(() => {
    context.toggleLoading(true);

    setItem(context.detailPermohonan.perlengkapan.length);
    const data = [];

    for (let i = 0; i < context.detailPermohonan.perlengkapan.length; i++) {
      data.push({
        id: context.detailPermohonan.perlengkapan[i].id_perlengkapan,
        perlengkapan: context.detailPermohonan.perlengkapan[i].perlengkapan,
        gambar: context.detailPermohonan.perlengkapan[i].gambar,
        lokasi: context.detailPermohonan.perlengkapan[i].pemasangan,
        setuju: "",
        tidak: "",
        pertimbangan: "",
      });
    }
    context.setPemeriksaanPerlengkapan({
      pemeriksaan: data,
    });

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

  const back = () => {
    if (context.indexPemeriksaanPerlengkapan == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexPemeriksaanPerlengkapan - 1;
      context.setIndexPemeriksaanPerlengkapan(newIndex);

      navigation.replace("Back Pengecekan", {
        index: newIndex,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexPemeriksaanPerlengkapan < item) {
      const newIndex = context.indexPemeriksaanPerlengkapan + 1;
      context.setIndexPemeriksaanPerlengkapan(newIndex);

      navigation.push("PengecekanItem", {
        index: newIndex,
      });
    }
  };

  const pengecekan = () => {
    context.toggleLoading(true);
    andalalinPengecekanPerlengkapan(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      context.pemeriksaanPerlengkapan.pemeriksaan,
      (response) => {
        switch (response.status) {
          case 201:
            navigation.replace("Detail", {
              id: context.detailPermohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                pengecekan();
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
      <View>
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
            Pemeriksaan
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor(
            (context.indexPemeriksaanPerlengkapan * 100) / item
          )}
        />
      </View>
      <View style={styles.content}>
        <PengecekanNavigator index={context.indexPemeriksaanPerlengkapan} />
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
          switch (context.indexPemeriksaanPerlengkapan) {
            case item:
              if (
                context.pemeriksaanPerlengkapan.pemeriksaan[
                  context.indexPemeriksaanPerlengkapan - 1
                ].setuju != "" ||
                context.pemeriksaanPerlengkapan.pemeriksaan[context.indexPemeriksaanPerlengkapan - 1]
                  .tidak != ""
              ) {
                toggleKonfirmasi();
              }
              break;
            default:
              if (
                context.pemeriksaanPerlengkapan.pemeriksaan[
                  context.indexPemeriksaanPerlengkapan - 1
                ].setuju != "" ||
                context.pemeriksaanPerlengkapan.pemeriksaan[context.indexPemeriksaanPerlengkapan - 1]
                  .tidak != ""
              ) {
                onGoToNext();
              }
              break;
          }
        }}
      >
        <Feather
          name={
            context.indexPemeriksaanPerlengkapan != item
              ? "arrow-right"
              : "check"
          }
          size={24}
          color={color.neutral.neutral900}
        />
      </Pressable>

      <AConfirmationDialog
        title={"Peringatan"}
        desc={"Data yang Anda masukkan akan hilang"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.setIndexPemeriksaanPerlengkapan(1);
          context.clearPemeriksaanPerlengkapan();
          navigation.goBack();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Simpan data cek perlengkapan?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          pengecekan();
        }}
      />

      <ADialog
        title={"Simpan gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        toggleModal={toggleGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default PemeriksaanPerlengkapanScreen;
