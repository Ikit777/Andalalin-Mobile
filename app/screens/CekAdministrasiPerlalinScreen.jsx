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
import { andalalinCheckAdministrasiPerlalin } from "../api/andalalin";
import ADialog from "../component/utility/ADialog";
import AdministrasiPerlalinNavigator from "../component/administrasi/AdministrasiPerlalinNavigator";

function CekAdministrasiPerlalinScreen({ navigation }) {
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
    }, [context.indexAdministrasi])
  );

  useEffect(() => {
    context.toggleLoading(true);
    setItem(context.dataMaster.persyaratan.PersyaratanPerlalin.length);
    const data = [];

    context.dataMaster.persyaratan.PersyaratanPerlalin.map((item) => {
      data.push({
        persyaratan: item.persyaratan,
        kebutuhan: item.kebutuhan,
        tipe: item.tipe,
        ada: "",
        tidak: "",
      });
    });

    context.setAdministrasi({
      administrasi: data,
    });

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

  const back = () => {
    if (context.indexAdministrasi == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexAdministrasi - 1;
      context.setIndexAdministrasi(newIndex);

      navigation.replace("Back AdministrasiPerlalin", {
        index: newIndex,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexAdministrasi < item) {
      const newIndex = context.indexAdministrasi + 1;
      context.setIndexAdministrasi(newIndex);

      navigation.push("AdministrasiPerlalinItem", {
        index: newIndex,
      });
    }
  };

  const check_administrasi = () => {
    context.toggleLoading(true);
    andalalinCheckAdministrasiPerlalin(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      context.administrasi.administrasi,
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
                check_administrasi();
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
            Cek persyaratan
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor((context.indexAdministrasi * 100) / item)}
        />
      </View>
      <View style={styles.content}>
        <AdministrasiPerlalinNavigator index={context.indexAdministrasi} />
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
          switch (context.indexAdministrasi) {
            case item:
              if (
                context.administrasi.administrasi[context.indexAdministrasi - 1]
                  .ada != "" ||
                context.administrasi.administrasi[context.indexAdministrasi - 1]
                  .tidak != ""
              ) {
                toggleKonfirmasi();
              }
              break;
            default:
              if (
                context.administrasi.administrasi[context.indexAdministrasi - 1]
                  .ada != "" ||
                context.administrasi.administrasi[context.indexAdministrasi - 1]
                  .tidak != ""
              ) {
                onGoToNext();
              }
              break;
          }
        }}
      >
        <Feather
          name={context.indexAdministrasi != item ? "arrow-right" : "check"}
          size={24}
          color={color.neutral.neutral900}
        />
      </Pressable>

      <AConfirmationDialog
        title={"Peringatan"}
        desc={"Data yang Anda masukkan akan hilang"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.setIndexAdministrasi(1);
          context.clearAdministrasi();
          navigation.goBack();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Simpan data cek persyaratan?"}
        visibleModal={konfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          check_administrasi();
        }}
      />

      <ADialog
        title={"Simpan gagal"}
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
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default CekAdministrasiPerlalinScreen;
