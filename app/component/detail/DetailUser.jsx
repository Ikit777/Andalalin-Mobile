import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADetailView from "../utility/ADetailView";
import { useStateToggler } from "../../hooks/useUtility";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";
import {
  andalalinGetDokumen,
  andalalinUploadDokumen,
} from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import ABottomSheet from "../utility/ABottomSheet";
import ATextInputIcon from "../utility/ATextInputIcon";
import * as DocumentPicker from "expo-document-picker";

function DetailUser({ permohonan, navigation, reload }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [dokumen, setDokumen] = useState();
  const [namaFile, setNamaFile] = useState();
  const [uri, setUri] = useState();

  const [uploadModal, toggleUploadModal] = useStateToggler();
  const [uploadFile, setUploadFile] = useState([]);
  const [uploadNamaFile, setUploadNamaFile] = useState();
  const [uploadNamaFile2, setUploadNamaFile2] = useState();
  const [konfirmasiUpload, toggleKonfirmasiUpload] = useStateToggler();

  const status = () => {
    switch (permohonan.status_andalalin) {
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
    switch (permohonan.status_andalalin) {
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

  const showSnackbar = () => {
    context.setSnackbarVisible(true);
    setTimeout(() => {
      context.setSnackbarVisible(false);
    }, 3000);
  };

  const tindakan = (onPress, title) => {
    return (
      <AButton
        style={{ marginBottom: 32, marginTop: 20 }}
        title={title}
        mode="contained"
        onPress={onPress}
      />
    );
  };

  const buttonAndalalin = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return tindakan(() => {
          navigation.push("Update", { permohonan: permohonan });
        }, "Perbarui persyaratan");
      case "Menunggu surat pernyataan":
        return tindakan(() => {
          setDokumen("Surat pernyataan kesanggupan");
          uploadFile.push({
            nama: "",
            file: "",
            tipe: "",
            dokumen: "Surat pernyataan kesanggupan (pdf)",
          });
          uploadFile.push({
            nama: "",
            file: "",
            tipe: "",
            dokumen: "Surat pernyataan kesanggupan (word)",
          });
          toggleUploadModal();
        }, "Upload surat pernyataan");
      case "Dokumen tidak terpenuhi":
        return tindakan(() => {
          setDokumen("Dokumen andalalin");
          uploadFile.push({
            nama: "",
            file: "",
            tipe: "",
            dokumen: "Dokumen hasil analisis dampak lalu lintas (pdf)",
          });
          uploadFile.push({
            nama: "",
            file: "",
            tipe: "",
            dokumen: "Dokumen hasil analisis dampak lalu lintas (word)",
          });
          toggleUploadModal();
        }, "Perbarui dokumen andalalin");
      case "Menunggu pembayaran":
        return tindakan(() => {
          setDokumen("Bukti pembayaran");
          uploadFile.push({
            nama: "",
            file: "",
            tipe: "",
            dokumen: "Billing PNBP dan bukti pembayaran PNBP",
          });
          toggleUploadModal();
        }, "Upload bukti pembayaran");
      case "Kelengkapan tidak terpenuhi":
        if (permohonan.kelengkapan != null) {
          return tindakan(() => {
            navigation.push("Update Kelengkapan", { permohonan: permohonan });
          }, "Perbarui kelengkapan");
        }
      default:
        return <View style={{ paddingBottom: 32 }} />;
    }
  };

  const buttonPerlalin = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return tindakan(() => {
          navigation.push("Update", { permohonan: permohonan });
        }, "Perbarui persyaratan");
      default:
        return <View style={{ paddingBottom: 32 }} />;
    }
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

        <ADetailView style={{ marginTop: 20 }} title={"Informasi permohonan"}>
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

        <ADetailView style={{ marginTop: 20 }} title={"Informasi pemohon"}>
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
              NIK
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
              Pemohon
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
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Perlengkapan lalu lintas"}
        >
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

        <ADetailView style={{ marginTop: 20 }} title={"Berkas persyaratan"}>
          {permohonan.persyaratan != null
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
                      style={{ maxWidth: "70%" }}
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item}
                    </AText>

                    <TouchableOpacity
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        setNamaFile(item + " " + permohonan.kode_andalalin);
                        setDokumen(item);
                        download();
                      }}
                    >
                      <AText
                        size={14}
                        color={color.neutral.neutral700}
                        weight="semibold"
                      >
                        Download
                      </AText>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            : ""}
        </ADetailView>

        <ADetailView
          style={{
            marginTop: 20,
          }}
          title={"Berkas permohonan"}
        >
          {permohonan.berkas != null
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
                      style={{ maxWidth: "70%" }}
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item}
                    </AText>

                    <TouchableOpacity
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        setNamaFile(item + " " + permohonan.kode_andalalin);
                        setDokumen(item);
                        download();
                      }}
                    >
                      <AText
                        size={14}
                        color={color.neutral.neutral700}
                        weight="semibold"
                      >
                        Download
                      </AText>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            : ""}
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

        {buttonPerlalin()}
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

        <ADetailView style={{ marginTop: 20 }} title={"Informasi permohonan"}>
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
              Status
            </AText>
            <AText
              style={{
                backgroundColor: status(),
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 15,
                maxWidth: "80%",
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
              padding: 16,
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
              padding: 16,
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
              padding: 16,
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
              padding: 16,
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
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                  style={{ maxWidth: "50%" }}
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
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Informasi proyek"}>
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
              Jalan
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

        <ADetailView
          style={{ marginTop: 20 }}
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
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Informasi pemohon"}>
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
              NIK
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
              Nama Pemohon
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

          {permohonan.kategori_pemohon == "Non-perorangan" ? (
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

          {permohonan.kategori_pemohon == "Non-perorangan" ? (
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
                  Perusahaan
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
            </View>
          ) : (
            ""
          )}
        </ADetailView>

        {permohonan.nama_konsultan != "" &&
        permohonan.nama_konsultan != null ? (
          <ADetailView style={{ marginTop: 20 }} title={"Informasi konsultan"}>
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
                Nama Konsultan
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
                Nomor sertifikat penyusun dokumen
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
                Klasifikasi penyusun dokumen
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
        ) : (
          ""
        )}

        <ADetailView style={{ marginTop: 20 }} title={"Aktivitas"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.aktivitas}
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

        <ADetailView style={{ marginTop: 20 }} title={"Berkas persyaratan"}>
          {permohonan.persyaratan != null
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
                      style={{ maxWidth: "70%" }}
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item}
                    </AText>

                    <TouchableOpacity
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        setNamaFile(item + " " + permohonan.kode_andalalin);
                        setDokumen(item);
                        download();
                      }}
                    >
                      <AText
                        size={14}
                        color={color.neutral.neutral700}
                        weight="semibold"
                      >
                        Download
                      </AText>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            : ""}
        </ADetailView>

        <ADetailView
          style={{
            marginTop: 20,
          }}
          title={"Berkas permohonan"}
        >
          {permohonan.berkas != null
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
                      style={{ maxWidth: "70%" }}
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item}
                    </AText>

                    <TouchableOpacity
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        setNamaFile(item + " " + permohonan.kode_andalalin);
                        setDokumen(item);
                        download();
                      }}
                    >
                      <AText
                        size={14}
                        color={color.neutral.neutral700}
                        weight="semibold"
                      >
                        Download
                      </AText>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            : ""}
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

        {buttonAndalalin()}
      </View>
    );
  };

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
      permohonan.id_andalalin,
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
                      context.setMessage("Berkas gagal di download");
                      showSnackbar();
                    })
                    .finally(() => {
                      context.toggleLoading(false);
                      context.setMessage("Berkas berhasil di download");
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
                      context.setMessage("Berkas gagal di download");
                      showSnackbar();
                    })
                    .finally(() => {
                      context.toggleLoading(false);
                      context.setMessage("Berkas berhasil di download");
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
            context.setMessage("Berkas gagal di download");
            showSnackbar();
            break;
        }
      }
    );
  };

  const closeUploadDokumen = () => {
    setUploadFile([]);
    setUploadNamaFile(null);
    setUploadNamaFile2(null);
    toggleUploadModal();
  };

  const conten_upload = () => {
    switch (dokumen) {
      case "Surat pernyataan kesanggupan":
        return (
          <View>
            <View
              style={{
                marginBottom: 16,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Upload berkas {dokumen.toLowerCase()}
              </AText>
            </View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas docx"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file("Surat pernyataan kesanggupan (word)", "Word");
              }}
            />
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              padding={20}
              value={uploadNamaFile2}
              onPress={() => {
                file("Surat pernyataan kesanggupan (pdf)", "Pdf");
              }}
            />
          </View>
        );
      case "Bukti pembayaran":
        return (
          <View>
            <View
              style={{
                marginBottom: 16,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Upload berkas billing PNBP dan bukti pembayaran PNBP
              </AText>
            </View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file("Billing PNBP dan bukti pembayaran PNBP", "Pdf");
              }}
            />
          </View>
        );
      case "Dokumen andalalin":
        return (
          <View>
            <View
              style={{
                marginBottom: 16,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Upload berkas {dokumen.toLowerCase()}
              </AText>
            </View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas docx"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file(
                  "Dokumen hasil analisis dampak lalu lintas (word)",
                  "Word"
                );
              }}
            />
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              padding={20}
              value={uploadNamaFile2}
              onPress={() => {
                file("Dokumen hasil analisis dampak lalu lintas (pdf)", "Pdf");
              }}
            />
          </View>
        );
    }
  };

  const upload_dokumen = () => {
    return (
      <View>
        {uploadFile.length != 0 && uploadFile != null ? conten_upload() : ""}

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginTop: 52,
            marginRight: 16,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              closeUploadDokumen();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              let not_empty = uploadFile.filter((item) => {
                return item.file == "";
              });

              if (not_empty.length == 0) {
                toggleUploadModal();
                toggleKonfirmasiUpload();
              }
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Simpan
            </AText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const simpan_dokumen = () => {
    andalalinUploadDokumen(
      context.getUser().access_token,
      permohonan.id_andalalin,
      uploadFile,
      dokumen,
      (response) => {
        switch (response.status) {
          case 200:
            setUploadFile([]);
            setUploadNamaFile(null);
            setUploadNamaFile2(null);
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_dokumen();
              } else {
                setUploadFile([]);
                setUploadNamaFile(null);
                setUploadNamaFile2(null);
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setUploadFile([]);
            setUploadNamaFile(null);
            setUploadNamaFile2(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const nama_file = (nama, dokumen) => {
    switch (dokumen) {
      case "Surat pernyataan kesanggupan (word)":
        setUploadNamaFile(nama);
        break;
      case "Surat pernyataan kesanggupan (pdf)":
        setUploadNamaFile2(nama);
        break;
      case "Billing PNBP dan bukti pembayaran PNBP":
        setUploadNamaFile(nama);
        break;
      case "Dokumen hasil analisis dampak lalu lintas (word)":
        setUploadNamaFile(nama);
        break;
      case "Dokumen hasil analisis dampak lalu lintas (pdf)":
        setUploadNamaFile2(nama);
        break;
    }
  };

  const file = async (dokumen, type) => {
    switch (type) {
      case "Pdf":
        const resultPdf = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
        if (!resultPdf.canceled) {
          const index = uploadFile.findIndex((item) => item.dokumen == dokumen);
          if (index > -1) {
            uploadFile[index].nama = resultPdf.assets[0].name;
            uploadFile[index].file = resultPdf.assets[0].uri;
            uploadFile[index].tipe = "application/pdf";
            nama_file(resultPdf.assets[0].name, dokumen);
          }
        }
        break;
      case "Word":
        const resultWord = await DocumentPicker.getDocumentAsync({
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        if (!resultWord.canceled) {
          const index = uploadFile.findIndex((item) => item.dokumen == dokumen);
          if (index > -1) {
            uploadFile[index].nama = resultWord.assets[0].name;
            uploadFile[index].file = resultWord.assets[0].uri;
            uploadFile[index].tipe =
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            nama_file(resultWord.assets[0].name, dokumen);
          }
        }
        break;
    }
  };

  return (
    <View>
      {permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas"
        ? andalalin()
        : perlalin()}
      <ABottomSheet visible={uploadModal} close={closeUploadDokumen}>
        {upload_dokumen()}
      </ABottomSheet>
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

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin menyimpan berkas?"}
        visibleModal={konfirmasiUpload}
        toggleVisibleModal={toggleKonfirmasiUpload}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          setUploadFile([]);
          setUploadNamaFile(null);
          setUploadNamaFile2(null);
          toggleKonfirmasiUpload();
        }}
        onPressOKButton={() => {
          toggleKonfirmasiUpload();
          context.toggleLoading(true);
          simpan_dokumen();
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
