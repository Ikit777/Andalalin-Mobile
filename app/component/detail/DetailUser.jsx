import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADetailView from "../utility/ADetailView";
import { useStateToggler } from "../../hooks/useUtility";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";
import { andalalinCekSurveiKepuasan } from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";

function DetailUser({ permohonan, navigation }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [file, setFile] = useState();
  const [namaFile, setNamaFile] = useState();
  const [kepuasan, setKepuasan] = useState();
  const [surveiDialog, toggleSurveiDialog] = useStateToggler();
  const [pemasanganDialog, togglePemasanganDialog] = useStateToggler();

  const status = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error50;
      case "Permohonan dibatalkan":
        return color.error.error50;
      case "Permohonan selesai":
        return color.success.success50;
      case "Pemasangan selesai":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error700;
      case "Permohonan dibatalkan":
        return color.error.error700;
      case "Permohonan selesai":
        return color.success.success700;
      case "Pemasangan selesai":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
  };

  const showSnackbar = () => {
    context.setSnackbarVisible(true);
    setTimeout(() => {
      context.setSnackbarVisible(false);
    }, 3000);
  };

  const uriFile = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    context.setUri(permissions.directoryUri);
    toggleSurveiDialog();
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
        context.setMessage("Berkas gagal di download");
        showSnackbar();
      })
      .finally(() => {
        context.toggleLoading(false);
        context.setMessage("Berkas berhasil di download");
        showSnackbar();
      });
  };

  const pemasangan = () => {
    if (permohonan.status_andalalin == "Pemasangan selesai") {
      return (
        <ADetailView
          style={{ marginBottom: 50 }}
          title={"Hasil pemasangan perlalin"}
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
              Data hasil pemasangan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Detail Survei", {
                  id: permohonan.id_andalalin,
                  kondisi: context.getUser().role,
                  jenis: "Pemasangan",
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
        </ADetailView>
      );
    }
  };

  useEffect(() => {
    if (permohonan != "permohonan") {
      cek();
    }
  }, [permohonan]);

  const cek = () => {
    andalalinCekSurveiKepuasan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      (response) => {
        switch (response.status) {
          case 200:
            setKepuasan(true);
            if (
              context.uri != null &&
              permohonan.file_sk != null &&
              permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas"
            ) {
              (async () => {
                await StorageAccessFramework.createFileAsync(
                  context.uri,
                  "Surat keputusan permohonan " +
                    permohonan.kode_andalalin +
                    ".pdf",
                  "application/pdf"
                ).then(async (uri) => {
                  await FileSystem.writeAsStringAsync(uri, permohonan.file_sk, {
                    encoding: FileSystem.EncodingType.Base64,
                  });
                  context.setUri();
                  context.setMessage("Berkas berhasil di download");
                  showSnackbar();
                });
              })();
            }

            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                cek();
              }
            });
            break;
          default:
            setKepuasan(false);
            if (
              permohonan.jenis_andalalin == "Perlengkapan lalu lintas" &&
              permohonan.status_andalalin == "Pemasangan selesai"
            ) {
              togglePemasanganDialog();
            }
            break;
        }
      }
    );
  };

  const perlalin = () => {
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

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Kategori perlengkapan lalu lintas"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.kategori}
          </AText>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Jenis perlengkapan lalu lintas"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_rencana_pembangunan}
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
              permohonan.status_andalalin == "Persyaratan tidak terpenuhi" || kepuasan
                ? 20
                : 50,
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
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Download
              </AText>
            </Pressable>
          </View>
        </ADetailView>

        {kepuasan && kepuasan != null ? pemasangan() : ""}

        {permohonan.status_andalalin == "Persyaratan tidak terpenuhi" ? (
          <AButton
            style={{ marginBottom: 32 }}
            title={"Perbaharui persyaratan"}
            mode="contained"
            onPress={() => {
              navigation.push("Update", { permohonan: permohonan });
            }}
          />
        ) : (
          ""
        )}
      </View>
    );
  };

  const andalalin = () => {
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

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Kategori rencana pembangunan"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.kategori}
          </AText>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Jenis rencana pembangunan"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_rencana_pembangunan}
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
              permohonan.status_andalalin == "Persyaratan tidak terpenuhi"
                ? 20
                : 50,
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
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
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
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Surat keputusan
                </AText>

                <Pressable
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    if (kepuasan && kepuasan != null) {
                      setNamaFile(
                        "Surat keputusan permohonan " +
                          permohonan.kode_andalalin +
                          ".pdf"
                      );
                      setFile(permohonan.file_sk);
                      toggleKonfirmasi();
                    } else {
                      uriFile();
                    }
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

        {permohonan.status_andalalin == "Persyaratan tidak terpenuhi" ? (
          <AButton
            style={{ marginBottom: 32 }}
            title={"Perbaharui persyaratan"}
            mode="contained"
            onPress={() => {
              navigation.push("Update", { permohonan: permohonan });
            }}
          />
        ) : (
          ""
        )}
      </View>
    );
  };

  return (
    <View>
      {permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas"
        ? andalalin()
        : perlalin()}
      <AConfirmationDialog
        title={"Download"}
        desc={"Berkas akan tersimpan pada folder yang anda pilih"}
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

      <AConfirmationDialog
        title={"Download"}
        desc={
          "Sebelum mendownload berkas surat keputusan Anda harus mengisi survei kepuasan terlebih dahulu"
        }
        visibleModal={surveiDialog}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleSurveiDialog();
        }}
        onPressOKButton={() => {
          toggleSurveiDialog();
          context.clearSurveiKepuasan();
          context.setIndexSurvei(1);
          navigation.push("Survei Kepuasan", { id: permohonan.id_andalalin });
        }}
      />

      <AConfirmationDialog
        title={"Pemasangan perlengkapan lalu lintas"}
        desc={
          "Sebelum melihat hasil Pemasangan perlengkapan lalu lintas Anda harus mengisi survei kepuasan terlebih dahulu "
        }
        visibleModal={pemasanganDialog}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          togglePemasanganDialog();
          navigation.replace("Back Daftar", { kondisi: "Diajukan" });
        }}
        onPressOKButton={() => {
          togglePemasanganDialog();
          context.clearSurveiKepuasan();
          context.setIndexSurvei(1);
          navigation.push("Survei Kepuasan", { id: permohonan.id_andalalin });
        }}
      />
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
