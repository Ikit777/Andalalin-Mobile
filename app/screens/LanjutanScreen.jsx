import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  Pressable,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ADetailView from "../component/utility/ADetailView";
import { useStateToggler } from "../hooks/useUtility";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import ASnackBar from "../component/utility/ASnackBar";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UserContext } from "../context/UserContext";

function LanjutanScreen({ navigation, route }) {
  const data = route.params.permohonan;
  const context = useContext(UserContext);

  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();
  const [file, setFile] = useState();
  const [namaFile, setNamaFile] = useState();

  const status = () => {
    switch (data.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error50;
      case "Permohonan dibatalkan":
        return color.error.error50;
      case "Permohonan selesai":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (data.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error700;
      case "Permohonan dibatalkan":
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

  function Permohonan({ route }) {
    const permohonan = route.params.permohonan;
    if (permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas") {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Status permohonan"}>
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
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Jenis permohonan"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.jenis_andalalin}
            </AText>
          </ADetailView>

          <ADetailView
            style={{ marginTop: 20 }}
            title={"Kategori jenis rencana pembangunan"}
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

          <ADetailView
            style={{
              marginTop: 20,
              marginBottom: permohonan.persetujuan != null ? 0 : 100,
            }}
            title={"Lokasi pengambilan"}
          >
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.lokasi_pengambilan}
            </AText>
          </ADetailView>
          {permohonan.persetujuan != null ? (
            <View>
              <ADetailView
                style={{ marginTop: 20, marginBottom: 100 }}
                title={"Persetujuan dokumen"}
              >
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
                    Persetujuan dokumen
                  </AText>

                  <AText
                    size={12}
                    color={color.neutral.neutral500}
                    weight="normal"
                  >
                    {permohonan.persetujuan}
                  </AText>
                </View>
              </ADetailView>
              {permohonan.keterangan_persetujuan != "" ? (
                <ADetailView
                  style={{ marginTop: 20 }}
                  title={"Keterangan persetujuan dokumen"}
                >
                  <AText
                    style={{ padding: 16 }}
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    {permohonan.keterangan_persetujuan}
                  </AText>
                </ADetailView>
              ) : (
                ""
              )}
            </View>
          ) : (
            ""
          )}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Status permohonan"}>
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
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Jenis permohonan"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.jenis_andalalin}
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

          <ADetailView
            style={{ marginTop: 20, marginBottom: 100 }}
            title={"Lokasi pengambilan"}
          >
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.lokasi_pengambilan}
            </AText>
          </ADetailView>
        </ScrollView>
      );
    }
  }

  function Pemohon({ route }) {
    const permohonan = route.params.permohonan;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          width: "100%",
          height: "100%",
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: color.primary.primary25,
        }}
      >
        <ADetailView title={"Identitas pemohon"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Nik
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nik_pemohon}
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
              Nama
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
              Email
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.email_pemohon}
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
              Tempat lahir
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.tempat_lahir_pemohon}
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
              Tanggal lahir
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.tanggal_lahir_pemohon}
            </AText>
          </View>
          {permohonan.jenis_andalalin ==
          "Dokumen analisa dampak lalu lintas" ? (
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
                  Jabatan
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {permohonan.jabatan_pemohon}
                </AText>
              </View>
            </View>
          ) : (
            ""
          )}
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20, marginBottom: 100 }}
          title={"Nomor"}
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
              Nomor Telepon
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nomer_pemohon}
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
              Nomor Telepon Seluler
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nomer_seluler_pemohon}
            </AText>
          </View>
        </ADetailView>
      </ScrollView>
    );
  }

  function Perusahaan({ route }) {
    const permohonan = route.params.permohonan;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          width: "100%",
          height: "100%",
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: color.primary.primary25,
        }}
      >
        <ADetailView title={"Informasi perusahaan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Nama perusahaan
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
              Nomor perusahaan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nomer_perusahaan}
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
              Email perusahaan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.email_perusahaan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Alamat"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.alamat_perusahaan}
          </AText>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Detail lokasi"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Provinsi
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.perovinsi_perusahaan}
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
              Kabupaten
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.kabupaten_perusahaan}
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
              Kecamatan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.kecamatan_perusahaan}
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
              Kelurahan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.kelurahan_perusahaan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20, marginBottom: 100 }}
          title={"Informasi pimpinan"}
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
              Nama pimpinan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nama_pimpinan}
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
              Jabatan pimpinan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.jabatan_pimpinan}
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
              Jenis kelamin pimpinan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.jenis_kelamin}
            </AText>
          </View>
        </ADetailView>
      </ScrollView>
    );
  }

  function Kegiatan({ route }) {
    const permohonan = route.params.permohonan;
    if (permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas") {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Jenis kegiatan"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.jenis_kegiatan}
            </AText>
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Peruntukan"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.peruntukan}
            </AText>
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Alamat persil"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.alamat_persil}
            </AText>
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Kelurahan persil"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.kelurahan_persil}
            </AText>
          </ADetailView>

          <ADetailView
            style={{ paddingTop: 20, marginBottom: 100 }}
            title={"Informasi kegiatan"}
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
                Luas lahan
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.luas_lahan}
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
                Nomor SKRK
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.nomer_skrk}
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
                Tanggal SKRK
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.tanggal_skrk}
              </AText>
            </View>
          </ADetailView>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Jenis kegiatan"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.jenis_kegiatan}
            </AText>
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Peruntukan"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.peruntukan}
            </AText>
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Alamat persil"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.alamat_persil}
            </AText>
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Kelurahan persil"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.kelurahan_persil}
            </AText>
          </ADetailView>

          <ADetailView
            style={{ paddingTop: 20, marginBottom: 100 }}
            title={"Informasi kegiatan"}
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
                Luas lahan
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.luas_lahan}
              </AText>
            </View>
          </ADetailView>
        </ScrollView>
      );
    }
  }

  function Berkas({ route }) {
    const permohonan = route.params.permohonan;
    if (permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas") {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Tanda terima pendaftaran"}>
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
          <ADetailView style={{ paddingTop: 20 }} title={"Persyaratan"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Kartu tanda penduduk
              </AText>
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setNamaFile(
                    "Kartu tanda penduduk permohonan " +
                      permohonan.kode_andalalin +
                      ".pdf"
                  );
                  setFile(permohonan.ktp);
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
                Akta pendirian badan
              </AText>
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setNamaFile(
                    "Akta pendirian badan permohonan " +
                      permohonan.kode_andalalin +
                      ".pdf"
                  );
                  setFile(permohonan.akta_pendirian_badan);
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
                Surat kuasa
              </AText>
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setNamaFile(
                    "Surat kuasa permohonan " +
                      permohonan.kode_andalalin +
                      ".pdf"
                  );
                  setFile(permohonan.surat_kuasa);
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

            {permohonan != "permohonan"
              ? permohonan.persyaratan_tambahan != null
                ? permohonan.persyaratan_tambahan.map((item, index) => (
                    <View key={index}>
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
                          {item.Persyaratan}
                        </AText>

                        <Pressable
                          style={{ flexDirection: "row", paddingLeft: 4 }}
                          onPress={() => {
                            setNamaFile(
                              item.Persyaratan +
                                " " +
                                permohonan.kode_andalalin +
                                ".pdf"
                            );
                            setFile(item.Berkas);
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
                  ))
                : ""
              : ""}
          </ADetailView>

          {permohonan.file_bap != null ? (
            <ADetailView
              style={{ paddingTop: 20 }}
              title={"Berita acara pemeriksaan"}
            >
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
                  Nomer bap dasar
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {permohonan.nomer_bap_dasar}
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
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Nomer bap pelaksanaan
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {permohonan.nomer_bap_pelaksanaan}
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
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Tanggal bap
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {permohonan.tanggal_bap}
                </AText>
              </View>
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
                  Berita acara pemeriksaan
                </AText>
                <Pressable
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setNamaFile(
                      "Berita acara pemeriksaan permohonan " +
                        permohonan.kode_andalalin +
                        ".pdf"
                    );
                    setFile(permohonan.file_bap);
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
          ) : (
            ""
          )}

          {permohonan.file_sk != null ? (
            <ADetailView style={{ paddingTop: 20 }} title={"Surat keputusan"}>
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
                  Surat Keputusan
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
            </ADetailView>
          ) : (
            ""
          )}
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            width: "100%",
            height: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Tanda terima pendaftaran"}>
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
          <ADetailView style={{ paddingTop: 20 }} title={"Persyaratan"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Kartu tanda penduduk
              </AText>
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setNamaFile(
                    "Kartu tanda penduduk permohonan " +
                      permohonan.kode_andalalin +
                      ".pdf"
                  );
                  setFile(permohonan.ktp);
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
                Surat permohonan
              </AText>
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setNamaFile(
                    "Surat permohonan " + permohonan.kode_andalalin + ".pdf"
                  );
                  setFile(permohonan.surat_kuasa);
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

            {permohonan != "permohonan"
              ? permohonan.persyaratan_tambahan != null
                ? permohonan.persyaratan_tambahan.map((item, index) => (
                    <View key={index}>
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
                          {item.Persyaratan}
                        </AText>

                        <Pressable
                          style={{ flexDirection: "row", paddingLeft: 4 }}
                          onPress={() => {
                            setNamaFile(
                              item.Persyaratan +
                                " " +
                                permohonan.kode_andalalin +
                                ".pdf"
                            );
                            setFile(item.Berkas);
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
                  ))
                : ""
              : ""}
          </ADetailView>

          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      );
    }
  }

  function Petugas({ route }) {
    const permohonan = route.params.permohonan;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          width: "100%",
          height: "100%",
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: color.primary.primary25,
        }}
      >
        {permohonan.nama_petugas != null ? (
          <ADetailView title={"Informasi petugas"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Status
              </AText>
              <AText
                style={{
                  backgroundColor: color.success.success50,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 15,
                }}
                color={color.success.success700}
                size={12}
                weight="normal"
              >
                Dipilih
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
                Nama petugas
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.nama_petugas}
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
                Email petugas
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.email_petugas}
              </AText>
            </View>
          </ADetailView>
        ) : (
          <ADetailView title={"Informasi petugas"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Status
              </AText>
              <AText
                style={{
                  backgroundColor: color.secondary.secondary50,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 15,
                }}
                color={color.secondary.secondary700}
                size={12}
                weight="normal"
              >
                Belum dipilih
              </AText>
            </View>
          </ADetailView>
        )}
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    );
  }

  const Tab = createMaterialTopTabNavigator();

  function Andalalin() {
    return (
      <Tab.Navigator
        initialRouteName="Permohonan"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: color.neutral.neutral900,
          tabBarInactiveTintColor: color.neutral.neutral500,
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: {
            backgroundColor: "transparent",
            borderColor: color.neutral.neutral100,
            borderBottomWidth: 1,
            elevation: 0,
          },
          tabBarItemStyle: {
            width: "auto",
            paddingHorizontal: 16,
            paddingVertical: 14,
          },
          tabBarIndicatorStyle: {
            backgroundColor: color.primary.primary500,
          },
          tabBarPressColor: color.primary.primary25,
        }}
      >
        <Tab.Screen
          name="Permohonan"
          component={Permohonan}
          options={{ tabBarLabel: "Permohonan" }}
          initialParams={{ permohonan: data }}
        />
        <Tab.Screen
          name="Pemohon"
          component={Pemohon}
          options={{ tabBarLabel: "Pemohon" }}
          initialParams={{ permohonan: data }}
        />
        <Tab.Screen
          name="Perusahaan"
          component={Perusahaan}
          options={{ tabBarLabel: "Perusahaan" }}
          initialParams={{ permohonan: data }}
        />

        <Tab.Screen
          name="Kegiatan"
          component={Kegiatan}
          options={{ tabBarLabel: "Kegiatan" }}
          initialParams={{ permohonan: data }}
        />

        <Tab.Screen
          name="Berkas"
          component={Berkas}
          options={{ tabBarLabel: "Berkas" }}
          initialParams={{ permohonan: data }}
        />
      </Tab.Navigator>
    );
  }

  function Perlalin() {
    return (
      <Tab.Navigator
        initialRouteName="Permohonan"
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: color.neutral.neutral900,
          tabBarInactiveTintColor: color.neutral.neutral500,
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: {
            backgroundColor: "transparent",
            borderColor: color.neutral.neutral100,
            borderBottomWidth: 1,
            elevation: 0,
          },
          tabBarItemStyle: {
            width: "auto",
            paddingHorizontal: 16,
            paddingVertical: 14,
          },
          tabBarIndicatorStyle: {
            backgroundColor: color.primary.primary500,
          },
          tabBarPressColor: color.primary.primary25,
        }}
      >
        <Tab.Screen
          name="Permohonan"
          component={Permohonan}
          options={{ tabBarLabel: "Permohonan" }}
          initialParams={{ permohonan: data }}
        />
        <Tab.Screen
          name="Pemohon"
          component={Pemohon}
          options={{ tabBarLabel: "Pemohon" }}
          initialParams={{ permohonan: data }}
        />

        <Tab.Screen
          name="Kegiatan"
          component={Kegiatan}
          options={{ tabBarLabel: "Kegiatan" }}
          initialParams={{ permohonan: data }}
        />

        <Tab.Screen
          name="Berkas"
          component={Berkas}
          options={{ tabBarLabel: "Berkas" }}
          initialParams={{ permohonan: data }}
        />

        <Tab.Screen
          name="Petugas"
          component={Petugas}
          options={{ tabBarLabel: "Petugas" }}
          initialParams={{ permohonan: data }}
        />
      </Tab.Navigator>
    );
  }

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
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Lanjutan
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        <NavigationContainer independent={true}>
          {data.jenis_andalalin == "Dokumen analisa dampak lalu lintas" ? (
            <Andalalin />
          ) : (
            <Perlalin />
          )}
        </NavigationContainer>
      </View>
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
      <View style={{ paddingHorizontal: 16 }}>
        {isSnackbarVisible ? (
          <ASnackBar
            style={{ bottom: 102 }}
            visible={isSnackbarVisible}
            message={message}
          />
        ) : (
          ""
        )}
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: -10 },
  content: {
    height: "100%",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default LanjutanScreen;
