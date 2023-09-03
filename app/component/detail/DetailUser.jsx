import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADetailView from "../utility/ADetailView";
import { useStateToggler } from "../../hooks/useUtility";
import ASnackBar from "../utility/ASnackBar";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";

function DetailUser({ permohonan, navigation }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();
  const [file, setFile] = useState();
  const [namaFile, setNamaFile] = useState();

  const status = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak sesuai":
        return color.error.error50;
      case "Permohonan selesai":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak sesuai":
        return color.error.error700;
      case "Permohonan selesai":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
  };

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

    await StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      namaFile,
      "application/pdf"
    )
      .then(async (uri) => {
        context.toggleLoading(true);
        await FileSystem.writeAsStringAsync(uri, file, {
          encoding: FileSystem.EncodingType.Base64,
        });
      })
      .catch(() => {
        context.toggleLoading(false);
        setMessage("Berkas gagal di download");
        showSnackbar();
      })
      .finally(() => {
        context.toggleLoading(false);
        setMessage("Berkas berhasil di download");
        showSnackbar();
      });
  };

  return (
    <View>
      <ADetailView title={"Jenis permohonan"}>
        <AText
          style={{ padding: 16 }}
          size={12}
          color={color.neutral.neutral900}
          weight="normal"
        >
          {permohonan.jenis_andalalin}
        </AText>
      </ADetailView>

      <ADetailView style={{ marginTop: 20 }} title={"Jenis kegiatan"}>
        <AText
          style={{ padding: 16 }}
          size={12}
          color={color.neutral.neutral900}
          weight="normal"
        >
          {permohonan.jenis_kegiatan}
        </AText>
      </ADetailView>

      <ADetailView style={{ marginTop: 20 }} title={"Peruntukan"}>
        <AText
          style={{ padding: 16 }}
          size={12}
          color={color.neutral.neutral900}
          weight="normal"
        >
          {permohonan.peruntukan}
        </AText>
      </ADetailView>

      <ADetailView style={{ marginTop: 20 }} title={"Informasi"}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 14,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Status
          </AText>
          <AText
            style={{
              backgroundColor: status(),
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 15,
            }}
            size={12}
            color={statusText()}
            weight="normal"
          >
            {permohonan.status_andalalin}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Tanggal
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.tanggal_andalalin}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Kode Registrasi
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.kode_andalalin}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Lokasi pengambilan
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.lokasi_pengambilan}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Pemohon
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.nama_pemohon}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Perusahaan
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.nama_perusahaan}
          </AText>
        </View>
        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Jenis Rencana Pembangunan
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.jenis_rencana_pembangunan}
          </AText>
        </View>
        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Luas lahan
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.luas_lahan}
          </AText>
        </View>
      </ADetailView>

      <ADetailView
        style={{
          marginTop: 20,
          marginBottom:
            permohonan.status_andalalin == "Persyaratan tidak sesuai" ? 20 : 50,
        }}
        title={"Berkas"}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Tanda terima pendaftaran
          </AText>

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setNamaFile(
                "Tanda terima pendaftaran permohonan " +
                  permohonan.kode_andalalin +
                  ".pdf"
              );
              setFile(permohonan.tanda_terima_pendaftaran);
              toggleKonfirmasi();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Download
            </AText>
          </Pressable>
        </View>
        {permohonan.file_sk != null ? (
          <View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Surat keputusan
              </AText>

              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setNamaFile(
                    "Surat keputusan permohonan " +
                      permohonan.kode_andalalin +
                      ".pdf"
                  );
                  setFile(permohonan.file_sk);
                  toggleKonfirmasi();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Download
                </AText>
              </Pressable>
            </View>
          </View>
        ) : (
          ""
        )}
      </ADetailView>

      {permohonan.status_andalalin == "Persyaratan tidak sesuai" ? (
        <AButton
          style={{ marginBottom: 50 }}
          title={"Update persyaratan"}
          mode="contained"
          onPress={() => {
            navigation.push("Update", { permohonan: permohonan });
          }}
        />
      ) : (
        ""
      )}
      <AConfirmationDialog
        title={"Download"}
        desc={"Berkas akan tersimpan pada folder yang akan anda pilih"}
        visibleModal={konfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          setTimeout(() => {
            download();
          }, 500);
        }}
      />
      <View>
        {isSnackbarVisible ? (
          <ASnackBar visible={isSnackbarVisible} message={message} />
        ) : (
          ""
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default DetailUser;
