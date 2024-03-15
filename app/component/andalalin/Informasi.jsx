import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";
import ASnackBar from "../utility/ASnackBar";
import { StorageAccessFramework } from "expo-file-system";
import { masterGetPanduan } from "../../api/master";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import { useStateToggler } from "../../hooks/useUtility";
import * as FileSystem from "expo-file-system";

function Informasi({ navigation, onPress, kondisi }) {
  const {
    permohonan: { bangkitan },
  } = useContext(UserContext);

  const context = useContext(UserContext);

  const [downloadConfirm, toggleDownloadConfirm] = useStateToggler();
  const [uri, setUri] = useState();

  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();

  const showSnackbar = () => {
    setSnackbarVisible();
    setTimeout(() => {
      setSnackbarVisible();
    }, 3000);
  };

  const download = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    setUri(permissions.directoryUri);
    toggleDownloadConfirm();
  };

  const getDokumen = async () => {
    context.toggleLoading(true);
    masterGetPanduan(
      context.getUser().access_token,
      "Panduan " + bangkitan.toLowerCase(),
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;

              await StorageAccessFramework.createFileAsync(
                uri,
                "Panduan "+bangkitan.toLowerCase()+" .pdf",
                "application/pdf"
              )
                .then(async (uri) => {
                  context.toggleLoading(true);
                  await FileSystem.writeAsStringAsync(uri, result.data, {
                    encoding: FileSystem.EncodingType.Base64,
                  });
                })
                .catch(() => {
                  context.toggleLoading(false);
                  setMessage("Panduan gagal di download atau belum tersedia");
                  showSnackbar();
                })
                .finally(() => {
                  context.toggleLoading(false);
                  setMessage("Panduan berhasil di download");
                  showSnackbar();
                });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                getDokumen();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            setMessage("Panduan gagal di download atau belum tersedia");
            showSnackbar();
            break;
        }
      }
    );
  };

  return (
    <View style={styles.content}>
      <AText size={24} weight="semibold" color={color.neutral.neutral900}>
        Perhatian
      </AText>
      <AText
        style={{ paddingTop: 8 }}
        size={16}
        color={color.neutral.neutral500}
      >
        Sebelum melakukan Pengisian data, pastikan koneksi pada perangkat Anda
        berjalan dengan baik.
      </AText>
      <AText
        style={{ paddingTop: 8 }}
        size={16}
        color={color.neutral.neutral500}
      >
        Pastikan juga Anda telah melengkapi dokumen persyaratan yang bisa di
        lihat di bawah ini agar pengisian berjalan lancar.
      </AText>

      {kondisi == "Andalalin" ? (
        <AButton
          style={{
            marginTop: 32,
            borderWidth: 1,
            paddingVertical: 10,
            borderColor: color.neutral.neutral300,
          }}
          title={"Panduan " + bangkitan.toLowerCase()}
          mode="text"
          onPress={() => {
            download();
          }}
        />
      ) : (
        ""
      )}

      <AButton
        style={{
          marginTop: 16,
          borderWidth: 1,
          paddingVertical: 10,
          borderColor: color.neutral.neutral300,
        }}
        title={"Lihat persyaratan"}
        mode="text"
        onPress={() => {
          if (kondisi == "Andalalin") {
            navigation.push("Ketentuan", { kondisi: "Pengajuan andalalin" });
          } else {
            navigation.push("Ketentuan", { kondisi: "Pengajuan perlalin" });
          }
        }}
      />

      <AButton
        style={{ marginTop: 16 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          onPress();
        }}
      />

      <AConfirmationDialog
        title={"Download"}
        desc={"Panduan akan tersimpan pada folder yang Anda pilih"}
        visibleModal={downloadConfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleDownloadConfirm();
        }}
        onPressOKButton={() => {
          toggleDownloadConfirm();
          getDokumen();
        }}
      />

      
      {isSnackbarVisible ? (
        <ASnackBar visible={isSnackbarVisible} message={message} />
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
  },
});

export default Informasi;
