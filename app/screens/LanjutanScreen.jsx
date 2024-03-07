import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
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
import Modal from "react-native-modal";
import { StorageAccessFramework } from "expo-file-system";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UserContext } from "../context/UserContext";
import { andalalinGetDokumen } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";

import * as Clipboard from "expo-clipboard";

const Tab = createMaterialTopTabNavigator();

function LanjutanScreen({ navigation, route }) {
  const data = route.params.permohonan;
  const kondisi = route.params.kondisi;
  const context = useContext(UserContext);

  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();

  const [image, toggleImage] = useStateToggler();
  const [imageUri, setImageUri] = useState();

  const status = () => {
    switch (data.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error50;
      case "Kelengkapan tidak terpenuhi":
        return color.error.error50;
      case "Dokumen tidak terpenuhi":
        return color.error.error50;
      case "Permohonan dibatalkan":
        return color.error.error50;
      case "Permohonan ditolak":
        return color.error.error50;
      case "Permohonan ditunda":
        return color.error.error50;
      case "Pemasangan ditunda":
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
    switch (data.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error700;
      case "Kelengkapan tidak terpenuhi":
        return color.error.error700;
      case "Dokumen tidak terpenuhi":
        return color.error.error700;
      case "Permohonan dibatalkan":
        return color.error.error700;
      case "Permohonan ditolak":
        return color.error.error700;
      case "Permohonan ditunda":
        return color.error.error700;
      case "Pemasangan ditunda":
        return color.error.error700;
      case "Permohonan selesai":
        return color.success.success700;
      case "Pemasangan selesai":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      setMessage("Berhasil di salin");
      showSnackbar();
    } catch (error) {
      console.error(error);
    }
  };

  const showSnackbar = () => {
    setSnackbarVisible();
    setTimeout(() => {
      setSnackbarVisible();
    }, 3000);
  };

  function Permohonan({ route }) {
    const permohonan = route.params.permohonan;
    if (permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas") {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
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

          <ADetailView style={{ marginTop: 20 }} title={"Informasi permohonan"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 14,
              }}
            >
              <AText
                style={{ maxWidth: "20%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Status
              </AText>
              <AText
                style={{
                  maxWidth: "80%",
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
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Waktu
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.waktu_andalalin}
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
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Tanggal
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
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
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Kode Registrasi
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
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
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Lokasi pengambilan
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.lokasi_pengambilan}
              </AText>
            </View>

            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 14,
              }}
            >
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Kategori bangkitan
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.kategori_bangkitan}
              </AText>
            </View>

            <View style={styles.separator} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 14,
              }}
            >
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Kategori pemohon
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.kategori_pemohon}
              </AText>
            </View>

            <View style={styles.separator} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 14,
              }}
            >
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Kategori rencana{"\n"}pembangunan
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.kategori}
              </AText>
            </View>

            <View style={styles.separator} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 14,
              }}
            >
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Jenis rencana{"\n"}pembangunan
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.jenis_rencana_pembangunan}
              </AText>
            </View>
          </ADetailView>

          {permohonan.pertimbangan_penolakan != "" &&
          permohonan.pertimbangan_penolakan != null ? (
            <ADetailView
              style={{
                marginTop: 20,
              }}
              title={"Pertimbangan penolakan permohonan"}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {permohonan.pertimbangan_penolakan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          {permohonan.pertimbangan_penundaan != "" &&
          permohonan.pertimbangan_penundaan != null ? (
            <ADetailView
              style={{
                marginTop: 20,
              }}
              title={"Pertimbangan penundaan permohonan"}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {permohonan.pertimbangan_penundaan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          {permohonan.hasil_pemeriksaan != "" &&
          permohonan.hasil_pemeriksaan != null ? (
            <ADetailView
              style={{ marginTop: 20 }}
              title={"Hasil pemeriksaan surat keputusan"}
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
                  style={{ maxWidth: "20%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Hasil
                </AText>
                <AText
                  style={{ maxWidth: "80%" }}
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {permohonan.hasil_pemeriksaan}
                </AText>
              </View>

              {permohonan.catatan_pemeriksaan != "" &&
              permohonan.catatan_pemeriksaan != null ? (
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
                      style={{ maxWidth: "20%" }}
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      Catatan
                    </AText>
                    <AText
                      style={{ maxWidth: "80%" }}
                      size={12}
                      color={color.neutral.neutral500}
                      weight="normal"
                    >
                      {permohonan.catatan_pemeriksaan}
                    </AText>
                  </View>
                </View>
              ) : (
                ""
              )}
            </ADetailView>
          ) : (
            ""
          )}

          <View style={{ paddingBottom: 36 }} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
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

          <ADetailView
            style={{ paddingTop: 20 }}
            title={"Informasi permohonan"}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 14,
              }}
            >
              <AText
                style={{ maxWidth: "20%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Status
              </AText>
              <AText
                style={{
                  maxWidth: "80%",
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
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Waktu
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.waktu_andalalin}
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
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Tanggal
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
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
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Kode Registrasi
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.kode_andalalin}
              </AText>
            </View>
          </ADetailView>

          {permohonan.pertimbangan_penolakan != "" &&
          permohonan.pertimbangan_penolakan != null ? (
            <ADetailView
              style={{
                marginTop: 20,
              }}
              title={"Pertimbangan penolakan permohonan"}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {permohonan.pertimbangan_penolakan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          {permohonan.pertimbangan_penundaan != "" &&
          permohonan.pertimbangan_penundaan != null ? (
            <ADetailView
              style={{
                marginTop: 20,
              }}
              title={
                permohonan.status_andalalin == "Permohonan ditunda"
                  ? "Pertimbangan penundaan permohonan"
                  : "Pertimbangan penundaan pemasangan"
              }
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {permohonan.pertimbangan_penundaan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          {permohonan.pertimbangan_pembatalan != "" &&
          permohonan.pertimbangan_pembatalan != null ? (
            <ADetailView
              style={{
                marginTop: 20,
              }}
              title={"Pertimbangan pembatalan permohonan"}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {permohonan.pertimbangan_pembatalan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          <View style={{ paddingBottom: 36 }} />
        </ScrollView>
      );
    }
  }

  function Proyek({ route }) {
    const permohonan = route.params.permohonan;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: color.primary.primary25,
        }}
      >
        <ADetailView title={"Informasi proyek"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nama proyek
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nama_proyek}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Jenis proyek
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.jenis_proyek}
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ paddingTop: 20 }} title={"Alamat proyek"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Negara
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.negara_proyek}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Provinsi
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.provinsi_proyek}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kabupaten
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kabupaten_proyek}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kecamatan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kecamatan_proyek}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kelurahan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kelurahan_proyek}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Alamat
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.alamat_proyek}
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ paddingTop: 20 }} title={"Informasi jalan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kode jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kode_jalan_merge}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nama jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nama_jalan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Pengkal jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.pangkal_jalan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Ujung jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.ujung_jalan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Panjang jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.panjang_jalan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Lebar jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.lebar_jalan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Permukaan jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.permukaan_jalan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Fungsi jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.fungsi_jalan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Status jalan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.status_jalan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView
          style={{ paddingTop: 20 }}
          title={"Lokasi proyek berdasarkan koordinat"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.alamat_persil}
          </AText>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText
              style={{ maxWidth: "30%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Latitude
            </AText>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard(permohonan.latitude.toString());
              }}
            >
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.latitude}
              </AText>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText
              style={{ maxWidth: "30%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Longitude
            </AText>
            <TouchableOpacity
              onPress={() => {
                copyToClipboard(permohonan.longitude.toString());
              }}
            >
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {permohonan.longitude}
              </AText>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Lokasi proyek dimap
            </AText>
            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                const koordinat = {
                  latitude: permohonan.latitude,
                  longitude: permohonan.longitude,
                };
                navigation.push("Map", { koordinat: koordinat });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Perbarui lokasi
            </AText>
            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Pilih Lokasi", { kondisi: "Perbarui lokasi" });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Perbarui
              </AText>
            </TouchableOpacity>
          </View>
        </ADetailView>

        <View style={{ paddingBottom: 36 }} />
      </ScrollView>
    );
  }

  function Perlengkapan({ route }) {
    const permohonan = route.params.permohonan;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: color.primary.primary25,
        }}
      >
        <ADetailView title={"Perlengkapan lalu lintas"}>
          {permohonan.perlengkapan.map((item, index) => (
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
                  style={{ maxWidth: "70%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  {"Perlengkapan " + (index + 1)}
                </AText>

                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    navigation.push("Detail perlengkapan", {
                      id: item.id_perlengkapan,
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
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ADetailView>

        <View style={{ paddingBottom: 36 }} />
      </ScrollView>
    );
  }

  function Pemohon({ route }) {
    const permohonan = route.params.permohonan;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          flex: 1,
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nik
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nama
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Tempat lahir
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Tanggal lahir
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.tanggal_lahir_pemohon}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Jenis kelamin
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.jenis_kelamin_pemohon}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Email
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nomor telepon/WA
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nomer_pemohon}
            </AText>
          </View>

          {permohonan.jenis_andalalin ==
            "Dokumen analisis dampak lalu lintas" &&
          permohonan.jabatan_pemohon != "" &&
          permohonan.jabatan_pemohon != null ? (
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
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Jabatan
                </AText>
                <AText
                  style={{ maxWidth: "50%" }}
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

        <ADetailView style={{ paddingTop: 20 }} title={"Alamat pemohon"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Negara
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.negara_pemohon}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Provinsi
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.provinsi_pemohon}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kabupaten
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kabupaten_pemohon}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kecamatan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kecamatan_pemohon}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kelurahan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kelurahan_pemohon}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Alamat
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.alamat_pemohon}
            </AText>
          </View>
        </ADetailView>

        <View style={{ paddingBottom: 36 }} />
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
          flex: 1,
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nama perusahaan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nomor telepon/WA
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Email
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.email_perusahaan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ paddingTop: 20 }} title={"Alamat perusahaan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Negara
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.negara_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Provinsi
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.provinsi_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kabupaten
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kecamatan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kelurahan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kelurahan_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Alamat
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.alamat_perusahaan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Informasi pimpinan perusahaan"}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nama pimpinan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Jabatan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
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
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Jenis kelamin
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.jenis_kelamin}
            </AText>
          </View>
        </ADetailView>

        <ADetailView
          style={{ paddingTop: 20 }}
          title={"Alamat pimpinan perusahaan"}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Negara
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.negara_pimpinan_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Provinsi
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.provinsi_pimpinan_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kabupaten
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kabupaten_pimpinan_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kecamatan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kecamatan_pimpinan_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kelurahan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kelurahan_pimpinan_perusahaan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Alamat
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.alamat_pimpinan_perusahaan}
            </AText>
          </View>
        </ADetailView>

        <View style={{ paddingBottom: 36 }} />
      </ScrollView>
    );
  }

  function Konsultan({ route }) {
    const permohonan = route.params.permohonan;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: color.primary.primary25,
        }}
      >
        <ADetailView title={"Informasi konsultan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nama konsultan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nama_konsultan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nomor telepon/WA
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nomer_konsultan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Email
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.email_konsultan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ paddingTop: 20 }} title={"Alamat konsultan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Negara
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.negara_konsultan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Provinsi
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.provinsi_konsultan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kabupaten
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kabupaten_konsultan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kecamatan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kecamatan_konsultan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kelurahan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kelurahan_konsultan}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Alamat
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.alamat_konsultan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Informasi penyusun dokumen"}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nama penyusun dokumen
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nama_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Jenis kelamin
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.jenis_kelamin_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Nomor sertifikat
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nomer_sertifikat_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Klasifikasi
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.klasifikasi_penyusun_dokumen}
            </AText>
          </View>
        </ADetailView>

        <ADetailView
          style={{ paddingTop: 20 }}
          title={"Alamat penyusun dokumen"}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Negara
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.negara_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Provinsi
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.provinsi_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kabupaten
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kabupaten_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kecamatan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kecamatan_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Kelurahan
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.kelurahan_penyusun_dokumen}
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
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Alamat
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.alamat_penyusun_dokumen}
            </AText>
          </View>
        </ADetailView>

        <View style={{ paddingBottom: 36 }} />
      </ScrollView>
    );
  }

  function Kegiatan({ route }) {
    const permohonan = route.params.permohonan;
    if (permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas") {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Aktifitas"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.aktivitas}
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

          <ADetailView style={{ paddingTop: 20 }}  title={"Informasi kegiatan"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Total luas lahan
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.total_luas}
              </AText>
            </View>

            {permohonan.kriteria_khusus != "" &&
            permohonan.kriteria_khusus != null ? (
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
                    style={{ maxWidth: "50%" }}
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    {permohonan.kriteria_khusus}
                  </AText>
                  <AText
                    style={{ maxWidth: "50%" }}
                    size={12}
                    color={color.neutral.neutral500}
                    weight="normal"
                  >
                    {permohonan.nilai_kriteria}
                  </AText>
                </View>
              </View>
            ) : (
              ""
            )}

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
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Nomor SKRK
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
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
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Tanggal SKRK
              </AText>
              <AText
                style={{ maxWidth: "50%" }}
                size={12}
                color={color.neutral.neutral500}
                weight="normal"
              >
                {permohonan.tanggal_skrk}
              </AText>
            </View>
          </ADetailView>

          {permohonan.catatan != "" && permohonan.catatan != null ? (
            <View>
              <ADetailView style={{ marginTop: 20 }} title={"Catatan"}>
                <AText
                  style={{ padding: 16 }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  {permohonan.catatan}
                </AText>
              </ADetailView>
            </View>
          ) : (
            ""
          )}

          <View style={{ paddingBottom: 36 }} />
        </ScrollView>
      );
    }
  }

  function Berkas({ route }) {
    const permohonan = route.params.permohonan;

    const [konfirmasi, toggleKonfirmasi] = useStateToggler();
    const [dokumen, setDokumen] = useState();
    const [namaFile, setNamaFile] = useState();
    const [uri, setUri] = useState();

    const download = async () => {
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      setUri(permissions.directoryUri);
      toggleKonfirmasi();
    };

    const getDokumen = async () => {
      context.toggleLoading(true);
      andalalinGetDokumen(
        data.id_andalalin,
        context.getUser().access_token,
        dokumen,
        (response) => {
          switch (response.status) {
            case 200:
              (async () => {
                const result = await response.data;

                switch (result.tipe) {
                  case "Pdf":
                    await StorageAccessFramework.createFileAsync(
                      uri,
                      namaFile + ".pdf",
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
                        setMessage("Berkas gagal di download");
                        showSnackbar();
                      })
                      .finally(() => {
                        context.toggleLoading(false);
                        setMessage("Berkas berhasil di download");
                        showSnackbar();
                      });
                    break;
                  case "Word":
                    await StorageAccessFramework.createFileAsync(
                      uri,
                      namaFile + ".docx",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    )
                      .then(async (uri) => {
                        context.toggleLoading(true);
                        await FileSystem.writeAsStringAsync(uri, result.data, {
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
                    break;
                }
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
              setMessage("Berkas gagal di download");
              showSnackbar();
              break;
          }
        }
      );
    };

    if (permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas") {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Berkas persyaratan"}>
            {permohonan != "permohonan"
              ? permohonan.persyaratan != null
                ? permohonan.persyaratan.map((item, index) => (
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
                          style={{ width: "70%" }}
                          size={12}
                          color={color.neutral.neutral900}
                          weight="normal"
                        >
                          {item}
                        </AText>

                        <TouchableOpacity
                          style={{ flexDirection: "row", paddingLeft: 4 }}
                          onPress={() => {
                            if (kondisi == "Detail") {
                              setNamaFile(
                                item + " " + permohonan.kode_andalalin
                              );
                              setDokumen(item);
                              download();
                            } else {
                              navigation.push("PDF", {
                                id: permohonan.id_andalalin,
                                dokumen: item,
                              });
                            }
                          }}
                        >
                          <AText
                            size={14}
                            color={color.neutral.neutral700}
                            weight="semibold"
                          >
                            {kondisi == "Detail" ? "Download" : "Lihat"}
                          </AText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                : ""
              : ""}
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Berkas permohonan"}>
            {permohonan != "permohonan"
              ? permohonan.berkas != null
                ? permohonan.berkas.map((item, index) => (
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
                          style={{ width: "70%" }}
                          size={12}
                          color={color.neutral.neutral900}
                          weight="normal"
                        >
                          {item}
                        </AText>

                        <TouchableOpacity
                          style={{ flexDirection: "row", paddingLeft: 4 }}
                          onPress={() => {
                            if (kondisi == "Detail") {
                              setNamaFile(
                                item + " " + permohonan.kode_andalalin
                              );
                              setDokumen(item);
                              download();
                            } else {
                              navigation.push("PDF", {
                                id: permohonan.id_andalalin,
                                dokumen: item,
                              });
                            }
                          }}
                        >
                          <AText
                            size={14}
                            color={color.neutral.neutral700}
                            weight="semibold"
                          >
                            {kondisi == "Detail" ? "Download" : "Lihat"}
                          </AText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                : ""
              : ""}
          </ADetailView>

          <View style={{ paddingBottom: 36 }} />
          <AConfirmationDialog
            title={"Download"}
            desc={"Berkas akan tersimpan pada folder yang Anda pilih"}
            visibleModal={konfirmasi}
            toggleVisibleModal={toggleKonfirmasi}
            btnOK={"OK"}
            btnBATAL={"Batal"}
            onPressBATALButton={() => {
              toggleKonfirmasi();
            }}
            onPressOKButton={() => {
              toggleKonfirmasi();
              getDokumen();
            }}
          />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: color.primary.primary25,
          }}
        >
          <ADetailView title={"Berkas persyaratan"}>
            {permohonan != "permohonan"
              ? permohonan.persyaratan != null
                ? permohonan.persyaratan.map((item, index) => (
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
                          style={{ width: "70%" }}
                          size={12}
                          color={color.neutral.neutral900}
                          weight="normal"
                        >
                          {item}
                        </AText>

                        <TouchableOpacity
                          style={{ flexDirection: "row", paddingLeft: 4 }}
                          onPress={() => {
                            if (kondisi == "Detail") {
                              setNamaFile(
                                item + " " + permohonan.kode_andalalin
                              );
                              setDokumen(item);
                              download();
                            } else {
                              navigation.push("PDF", {
                                id: permohonan.id_andalalin,
                                dokumen: item,
                              });
                            }
                          }}
                        >
                          <AText
                            size={14}
                            color={color.neutral.neutral700}
                            weight="semibold"
                          >
                            {kondisi == "Detail" ? "Download" : "Lihat"}
                          </AText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                : ""
              : ""}
          </ADetailView>

          <ADetailView style={{ paddingTop: 20 }} title={"Berkas permohonan"}>
            {permohonan != "permohonan"
              ? permohonan.berkas != null
                ? permohonan.berkas.map((item, index) => (
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
                          style={{ width: "70%" }}
                          size={12}
                          color={color.neutral.neutral900}
                          weight="normal"
                        >
                          {item}
                        </AText>

                        <TouchableOpacity
                          style={{ flexDirection: "row", paddingLeft: 4 }}
                          onPress={() => {
                            if (kondisi == "Detail") {
                              setNamaFile(
                                item + " " + permohonan.kode_andalalin
                              );
                              setDokumen(item);
                              download();
                            } else {
                              navigation.push("PDF", {
                                id: permohonan.id_andalalin,
                                dokumen: item,
                              });
                            }
                          }}
                        >
                          <AText
                            size={14}
                            color={color.neutral.neutral700}
                            weight="semibold"
                          >
                            {kondisi == "Detail" ? "Download" : "Lihat"}
                          </AText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                : ""
              : ""}
          </ADetailView>

          <View style={{ paddingBottom: 36 }} />

          <AConfirmationDialog
            title={"Download"}
            desc={"Berkas akan tersimpan pada folder yang Anda pilih"}
            visibleModal={konfirmasi}
            toggleVisibleModal={toggleKonfirmasi}
            btnOK={"OK"}
            btnBATAL={"Batal"}
            onPressBATALButton={() => {
              toggleKonfirmasi();
            }}
            onPressOKButton={() => {
              toggleKonfirmasi();
              getDokumen();
            }}
          />
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
          flex: 1,
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
                Petugas telah dipilih
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
                Petugas belum dipilih
              </AText>
            </View>
          </ADetailView>
        )}
        <View style={{ paddingBottom: 36 }} />
      </ScrollView>
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
          <AText size={20} color={color.neutral.neutral900} weight="normal">
            Detail permohonan
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        <NavigationContainer independent={true}>
          {data.jenis_andalalin == "Dokumen analisis dampak lalu lintas" ? (
            data.kategori_pemohon == "Perorangan" ? (
              <Tab.Navigator
                initialRouteName="Permohonan"
                screenOptions={{
                  lazy: true,
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
                  name="Proyek"
                  component={Proyek}
                  options={{ tabBarLabel: "Proyek" }}
                  initialParams={{ permohonan: data }}
                />

                <Tab.Screen
                  name="Pemohon"
                  component={Pemohon}
                  options={{ tabBarLabel: "Pemohon" }}
                  initialParams={{ permohonan: data }}
                />

                {data.nama_konsultan != "" && data.nama_konsultan != null ? (
                  <Tab.Screen
                    name="Konsultan"
                    component={Konsultan}
                    options={{ tabBarLabel: "Konsultan" }}
                    initialParams={{ permohonan: data }}
                  />
                ) : (
                  null
                )}

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
            ) : (
              <Tab.Navigator
                initialRouteName="Permohonan"
                screenOptions={{
                  lazy: true,
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
                  name="Proyek"
                  component={Proyek}
                  options={{ tabBarLabel: "Proyek" }}
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


                {data.nama_konsultan != "" && data.nama_konsultan != null ? (
                  <Tab.Screen
                    name="Konsultan"
                    component={Konsultan}
                    options={{ tabBarLabel: "Konsultan" }}
                    initialParams={{ permohonan: data }}
                  />
                ) : (
                  null
                )}

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
            )
          ) : (
            <Tab.Navigator
              initialRouteName="Permohonan"
              screenOptions={{
                lazy: true,
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
                name="Perlengkapan"
                component={Perlengkapan}
                options={{ tabBarLabel: "Perlengkapan" }}
                initialParams={{ permohonan: data }}
              />
              <Tab.Screen
                name="Pemohon"
                component={Pemohon}
                options={{ tabBarLabel: "Pemohon" }}
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
          )}
        </NavigationContainer>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        {isSnackbarVisible ? (
          <ASnackBar
            style={{ bottom: 32 }}
            visible={isSnackbarVisible}
            message={message}
          />
        ) : (
          ""
        )}
      </View>

      {imageUri != null && imageUri != "" ? (
        <Modal
          isVisible={image}
          backdropOpacity={0.5}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={300}
          statusBarTranslucent
          coverScreen={true}
          deviceHeight={Dimensions.get("screen").height}
          backdropTransitionOutTiming={0}
          onBackButtonPress={() => {
            setImageUri();
            toggleImage();
          }}
          onBackdropPress={() => {
            setImageUri();
            toggleImage();
          }}
        >
          <View
            style={{
              overflow: "hidden",
              width: 250,
              height: 250,
              borderRadius: 8,
              alignSelf: "center",
              backgroundColor: color.text.white,
            }}
          >
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
              source={{
                uri: imageUri,
              }}
            />
          </View>
        </Modal>
      ) : (
        ""
      )}
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: -10 },
  content: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default LanjutanScreen;
