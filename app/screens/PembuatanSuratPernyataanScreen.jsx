import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import AButton from "../component/utility/AButton";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import { andalalinPembuatanSuratPernyataan } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import ADialogInputText from "../component/utility/ADialogInputText";
import { MaterialIcons } from "@expo/vector-icons";

function PembuatanSuratPernyataanScreen({ navigation }) {
  const [Kewajiban, setKewajiban] = useState([]);
  const [baru, setBaru] = useState("");

  const context = useContext(UserContext);

  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [baruModal, toggleBaruModal] = useStateToggler();

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

  useEffect(() => {
    if (baru != "") {
      Kewajiban.push(baru);
      setBaru("");
    }
  }, [baru]);

  const pembuatan = () => {
    context.toggleLoading(true);
    andalalinPembuatanSuratPernyataan(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      Kewajiban,
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
                pembuatan();
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

  const removeItem = (itemToRemove) => {
    const updatedData = Kewajiban.filter((item) => item !== itemToRemove);
    setKewajiban(updatedData);
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
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Surat pernyataan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <AText size={16} color={color.neutral.neutral900} weight="normal">
          Kewajiban yang harus dilakukan oleh pemohon:
        </AText>
        <View style={{ paddingTop: 8 }} />
        {Kewajiban.length != 0
          ? Kewajiban.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  paddingTop: 14,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", width: "80%" }}>
                  <AText
                    style={{ paddingRight: 4 }}
                    size={16}
                    color={color.neutral.neutral700}
                  >
                    {index + 1}.
                  </AText>
                  <AText size={16} color={color.neutral.neutral700}>
                    {item}
                  </AText>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    removeItem(item);
                  }}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color={color.neutral.neutral900}
                  />
                </TouchableOpacity>
              </View>
            ))
          : ""}
        <View style={{ paddingTop: 16 }} />
        <TouchableOpacity
          onPress={() => {
            toggleBaruModal();
          }}
        >
          <AText size={16} color={color.primary.main} weight="semibold">
            + Tambah kewajiban pemohon
          </AText>
        </TouchableOpacity>

        {Kewajiban.length != 0 ? (
          <AButton
            style={{ marginBottom: 32, marginTop: 32 }}
            title={"Simpan"}
            mode="contained"
            onPress={() => {
              if (Kewajiban.length != 0) {
                toggleKonfirmasi();
              }
            }}
          />
        ) : (
          ""
        )}
      </ScrollView>

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Simpan data kewajiban?"}
        visibleModal={konfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          pembuatan();
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

      <ADialogInputText
        title={"Tambah kewajiban"}
        hint={"Masukan kewajiban"}
        visibleModal={baruModal}
        setText={setBaru}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleBaruModal();
        }}
        onPressOKButton={() => {
          toggleBaruModal();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default PembuatanSuratPernyataanScreen;
