import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AProgressBar from "../component/utility/AProgressBar";
import PembahasanNavigator from "../component/pembahasan/PembahasanNavigator";
import * as DocumentPicker from "expo-document-picker";
import ADialogInputText from "../component/utility/ADialogInputText";

function PembuatanPembahasanScreen({ navigation }) {
  const {
    pembahasan: { foto, instansi },
    setPembahasan,
  } = useContext(UserContext);

  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);

  const [tambah, setTambah] = useState("");
  const [tambahInstansi, toggleTambahInstansi] = useStateToggler();

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
    }, [context.indexPembahasan])
  );

  useEffect(() => {
    context.toggleLoading(true);
    setItem(7);

    setPembahasan({
      nomor_berita_acara: "",
      nama_perwakilan: "",
      jenis_perwakilan: "",
      jabatan_perwakilan: "",
      nomor_surat_kuasa: "",
      nama_ketua: "",
      nip_ketua: "",
      nama_sekertaris: "",
      nip_sekertaris: "",
      nama_anggota: "",
      nip_anggota: "",
      instansi: [],
      foto: [],
      stackholder: [],
      pembahasan: [],
    });

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

  const back = () => {
    if (context.indexPembahasan == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexPembahasan - 1;
      context.setIndexPembahasan(newIndex);

      navigation.replace("Back Pembahasan", {
        index: newIndex,
      });
    }
  };

  const judul = () => {
    switch (context.indexPembahasan) {
      case 1:
        return "Berita Acara";
      case 2:
        return "Tim Evaluasi";
      case 3:
        return "Instansi terkait";
      case 4:
        return "Stackholder";
      case 5:
        return "Pembahasan";
      case 6:
        return "Foto";
      case 7:
        return "Konfirmasi";
    }
  };

  const tambah_foto = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/jpeg",
    });
    if (!result.canceled) {
      let fotoData = {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
      };
      const updated = foto;
      updated.push(fotoData);
      setPembahasan({ foto: updated });
    }
  };

  useEffect(() => {
    if (tambah != "") {
      const updated = instansi;
      updated.push(tambah);
      setPembahasan({ instansi: updated });
    }
  }, [tambah]);

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
            {judul()}
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor((context.indexPembahasan * 100) / item)}
        />
      </View>

      <View style={styles.content}>
        <PembahasanNavigator index={context.indexPembahasan} />
      </View>

      {context.indexPembahasan == 3 ? (
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
            toggleTambahInstansi();
          }}
        >
          <Feather name={"plus"} size={24} color={color.neutral.neutral900} />
        </Pressable>
      ) : (
        ""
      )}

      {context.indexPembahasan == 4 ? (
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
            navigation.push("Tambah stackholder");
          }}
        >
          <Feather name={"plus"} size={24} color={color.neutral.neutral900} />
        </Pressable>
      ) : (
        ""
      )}

      {context.indexPembahasan == 6 ? (
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
            tambah_foto();
          }}
        >
          <Feather name={"plus"} size={24} color={color.neutral.neutral900} />
        </Pressable>
      ) : (
        ""
      )}

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
          context.setIndexPembahasan(1);
          context.clearPembahasan();
          navigation.goBack();
        }}
      />

      <ADialogInputText
        title={"Tambah instansi terkait"}
        hint={"Masukan instansi"}
        visibleModal={tambahInstansi}
        setText={setTambah}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahInstansi();
          setTambah("");
        }}
        onPressOKButton={() => {
          toggleTambahInstansi();
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

export default PembuatanPembahasanScreen;
