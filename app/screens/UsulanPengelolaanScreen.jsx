import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import { useStateToggler } from "../hooks/useUtility";
import ATextInput from "../component/utility/ATextInput";
import ADropDown from "../component/utility/ADropDown";
import AButton from "../component/utility/AButton";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { andalalinUsulanTindakan } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";

function TentangScreen({ navigation, route }) {
  const id = route.params.id;
  const context = useContext(UserContext);

  const [pertimbangan, setPertimbangan] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const [pertimbanganError, togglePertimbanganError] = useStateToggler();

  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();
  const [exist, toggleExist] = useStateToggler();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

  const simpan = () => {
    if (pertimbangan != "") {
      pertimbanganError ? togglePertimbanganError() : "";
      context.toggleLoading(true);
      simpan_tindakan();
    } else {
      pertimbangan == ""
        ? pertimbanganError
          ? ""
          : togglePertimbanganError()
        : "";
    }
  };

  const simpan_tindakan = () => {
    const tindakan = {
      pertimbangan: pertimbangan,
      keterangan: keterangan,
    };
    andalalinUsulanTindakan(
      context.getUser().access_token,
      id,
      tindakan,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Back Detail", { id: id });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_tindakan();
              } else {
                context.toggleLoading(false);
                toggleKirimGagal();
              }
            });
            break;
          case 409:
            context.toggleLoading(false);
            toggleExist();
            break;
          default:
            context.toggleLoading(false);
            toggleKirimGagal();
        }
      }
    );
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Usulan tindakan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <ATextInput
          bdColor={
            pertimbanganError ? color.error.error300 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan pertimbangan"}
          title={"Pertimbangan tindakan"}
          multi={true}
          value={pertimbangan}
          onChangeText={(value) => {
            setPertimbangan(value);
          }}
        />

        {pertimbanganError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Pertimbangan kosong
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan keterangan"}
          title={"Keterangan tindakan"}
          multi={true}
          padding={20}
          value={keterangan}
          onChangeText={(value) => {
            setKeterangan(value);
          }}
        />

        <AButton
          style={{ marginTop: 32, marginBottom: 50 }}
          title={"Simpan"}
          mode="contained"
          onPress={() => {
            toggleComfirm();
          }}
        />
      </ScrollView>

      <AConfirmationDialog
        title={"Apakah Anda yakin?"}
        desc={"Usulan tindakan akan dikirim"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          simpan();
        }}
      />

      <ADialog
        title={"Usulan gagal dikirim"}
        desc={"Usulan tindakan sudah ada untuk permohonan ini"}
        visibleModal={exist}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleExist();
        }}
      />

      <ADialog
        title={"Usulan gagal dikirim"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={kirimGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleKirimGagal();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    padding: 16,
  },
});

export default TentangScreen;
