import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable, TouchableOpacity } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADetailView from "../utility/ADetailView";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import ABottomSheet from "../utility/ABottomSheet";
import { RadioButton } from "react-native-paper";
import {
  andalalinBatalkanPermohonan,
  andalalinLanjutkanPemasangan,
  andalalinLanjutkanPermohonan,
  andalalinSimpanPemeriksaan,
  andalalinTolakPermohonan,
  andalalinTundaPemasangan,
  andalalinTundaPermohonan,
  andalalinUploadDokumen,
} from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import ADialog from "../utility/ADialog";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import * as DocumentPicker from "expo-document-picker";

function DetailNonUser({ permohonan, navigation, reload }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [checked, setChecked] = useState();
  const [syarat, setSyarat] = useState();
  const [persyaratanModal, setPersyaratanModal] = useStateToggler();

  const [dokumen, setDokumen] = useState("");

  const [pemeriksaanDokumen, setPemeriksaanDokumen] = useState();
  const [lanjutanPemeriksaan, setLanjutanPemeriksaan] = useState();
  const [catatanPemeriksaan, setCatatanPemeriksaan] = useState("");
  const [pemeriksaanModal, setPemeriksaanModal] = useStateToggler();
  const [konfiermasiPemeriksaan, toggleKonfirmasiPemeriksaan] =
    useStateToggler();

  const [pertimbanganPenolakan, setPertimbanganPenolakan] = useState("");

  const [lanjutkanPermohonan, toggleLanjutkanPermohonan] = useStateToggler();

  const [uploadModal, toggleUploadModal] = useStateToggler();
  const [uploadFile, setUploadFile] = useState([]);
  const [uploadNamaFile, setUploadNamaFile] = useState();
  const [konfirmasiUpload, toggleKonfirmasiUpload] = useStateToggler();

  const [surveiModal, toggleSurveiModal] = useStateToggler();

  const [confirm, toggleComfirm] = useStateToggler();
  const [lanjutkanGagal, toggleLanjutkanGagal] = useStateToggler();

  const [tindakanModal, toggleTindakanModal] = useStateToggler();
  const [tindakanPilihan, setTindakanPilihan] = useState();
  const [simpanTindakan, toggleSimpanTindakan] = useStateToggler();
  const [lanjutkanPemasangan, toggleLanjutkanPemasangan] = useStateToggler();

  const [pilih, setPilih] = useState("");
  const [pertimbangan, setPertimbangan] = useState("");

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

  const tindakan = (onPress, title) => {
    return (
      <AButton
        style={{ marginBottom: 32 }}
        title={title}
        mode="contained"
        onPress={onPress}
      />
    );
  };

  const buttonAndalalin = () => {
    switch (context.getUser().role) {
      case "Operator":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Pilih tindakan");
          case "Permohonan ditunda":
            return tindakan(() => {
              toggleLanjutkanPermohonan();
            }, "Lanjutkan permohonan");
          case "Persetujuan administrasi":
            return tindakan(() => {
              setDokumen("Checklist administrasi");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Checklist administrasi",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Persyaratan terpenuhi":
            switch (permohonan.kategori_bangkitan) {
              case "Bangkitan rendah":
                return tindakan(() => {
                  navigation.push("Pernyataan");
                }, "Pembuatan surat pernyataan");
              case "Bangkitan sedang":
                return tindakan(() => {
                  context.setIndexPenyusun(1);
                  context.clearPenyusun();
                  navigation.push("Penyusun");
                }, "Pembuatan penyusun dokumen");
              case "Bangkitan tinggi":
                break;
            }
          case "Persetujuan penyusun dokumen":
            return tindakan(() => {
              setDokumen("Penyusun dokumen");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Penyusun dokumen",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Pemeriksaan dokumen andalalin":
            return tindakan(() => {
              context.setIndexPemeriksaan(1);
              context.clearPemeriksaan();
              navigation.push("Pemeriksaan dokumen");
            }, "Periksa dokumen andalalin");
          case "Persetujuan asistensi dokumen":
            return tindakan(() => {
              setDokumen("Catatan asistensi dokumen");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Catatan asistensi dokumen",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Dokumen terpenuhi":
            return tindakan(() => {}, "Periksa substansi teknis");
          case "Dokumen andalalin terpenuhi":
            return tindakan(() => {
              navigation.push("Pernyataan");
            }, "Pembuatan surat pernyataan");
          case "Pembuatan surat keputusan":
            return tindakan(() => {
              navigation.push("Keputusan");
            }, "Pembuatan surat keputusan");
          case "Persetujuan surat keputusan":
            return tindakan(() => {
              setDokumen("Surat keputusan persetujuan teknis andalalin");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Surat keputusan persetujuan teknis andalalin",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Cek kelengkapan akhir":
            return tindakan(() => {
              context.setIndexKelengkapan(1);
              context.clearKelengkapan();
              navigation.push("Kelengkapan");
            }, "Cek kelengkapan akhir");
          case "Persetujuan kelengkapan akhir":
            return tindakan(() => {
              setDokumen("Checklist kelengkapan akhir");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Checklist kelengkapan akhir",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Kelengkapan tidak terpenuhi":
            if (permohonan.kelengkapan != null) {
              return tindakan(() => {
                navigation.push("Update Kelengkapan", {
                  permohonan: permohonan,
                });
              }, "Perbarui kelengkapan");
            }
        }
        break;
      case "Admin":
        switch (permohonan.status_andalalin) {
          case "Pemeriksaan surat keputusan":
            return tindakan(() => {
              setPemeriksaanModal();
            }, "Berikan hasil pemeriksaan");
        }
        break;
      case "Super Admin":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Pilih tindakan");
          case "Permohonan ditunda":
            return tindakan(() => {
              toggleLanjutkanPermohonan();
            }, "Lanjutkan permohonan");
          case "Persetujuan administrasi":
            return tindakan(() => {
              setDokumen("Checklist administrasi");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Checklist administrasi",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Persyaratan terpenuhi":
            switch (permohonan.kategori_bangkitan) {
              case "Bangkitan rendah":
                return tindakan(() => {
                  navigation.push("Pernyataan");
                }, "Pembuatan surat pernyataan");
              case "Bangkitan sedang":
                return tindakan(() => {
                  context.setIndexPenyusun(1);
                  context.clearPenyusun();
                  navigation.push("Penyusun");
                }, "Pembuatan penyusun dokumen");
              case "Bangkitan tinggi":
                break;
            }
          case "Persetujuan penyusun dokumen":
            setDokumen("Penyusun dokumen");
            uploadFile.push({
              nama: "",
              file: "",
              tipe: "",
              dokumen: "Penyusun dokumen",
            });
            toggleUploadModal();
          case "Pemeriksaan dokumen andalalin":
            return tindakan(() => {}, "Pilih tindakan");
          case "Dokumen andalalin terpenuhi":
            return tindakan(() => {
              navigation.push("Pernyataan");
            }, "Pembuatan surat pernyataan");
          case "Pembuatan surat keputusan":
            return tindakan(() => {
              navigation.push("Keputusan");
            }, "Pembuatan surat keputusan");
          case "Pemeriksaan surat keputusan":
            return tindakan(() => {
              setPemeriksaanModal();
            }, "Berikan hasil pemeriksaan");
          case "Persetujuan surat keputusan":
            return tindakan(() => {
              setDokumen("Surat keputusan persetujuan teknis andalalin");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Surat keputusan persetujuan teknis andalalin",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Cek kelengkapan akhir":
            return tindakan(() => {
              context.setIndexKelengkapan(1);
              context.clearKelengkapan();
              navigation.push("Kelengkapan");
            }, "Cek kelengkapan akhir");
          case "Persetujuan kelengkapan akhir":
            return tindakan(() => {
              setDokumen("Checklist kelengkapan akhir");
              uploadFile.push({
                nama: "",
                file: "",
                tipe: "",
                dokumen: "Checklist kelengkapan akhir",
              });
              toggleUploadModal();
            }, "Upload berkas");
          case "Kelengkapan tidak terpenuhi":
            if (permohonan.kelengkapan != null) {
              return tindakan(() => {
                navigation.push("Update Kelengkapan", {
                  permohonan: permohonan,
                });
              }, "Perbarui kelengkapan");
            }
        }

        break;
    }
  };

  const buttonPerlalin = () => {
    switch (context.getUser().role) {
      case "Operator":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Pilih tindakan");
          case "Persyaratan terpenuhi":
            return tindakan(() => {
              navigation.push("Pilih Petugas", {
                kondisi: "Pilih",
                permohonan: permohonan,
              });
            }, "Pilih petugas");
          case "Permohonan ditunda":
            return tindakan(() => {
              toggleLanjutkanPermohonan();
            }, "Lanjutkan permohonan");
          case "Survei lapangan":
            return tindakan(() => {
              navigation.push("Pilih Petugas", {
                kondisi: "Ganti",
                permohonan: permohonan,
              });
            }, "Ganti pentugas");
          case "Pengecekan perlengkapan":
            return tindakan(() => {
              context.clearPemeriksaanPerlengkapan();
              navigation.push("Pemeriksaan perlengkapan");
            }, "Cek perlengkapan");
          case "Pemasangan perlengkapan":
            return tindakan(() => {
              setPilih("");
              setPertimbangan("");
              toggleTindakanModal();
            }, "Pilih tindakan");
          case "Pemasangan ditunda":
            return tindakan(() => {
              toggleLanjutkanPemasangan();
            }, "Lanjutkan pemasangan");
        }
        break;
      case "Petugas":
        switch (permohonan.status_andalalin) {
          case "Survei lapangan":
            switch (permohonan.status_tiket) {
              case "Buka":
                return tindakan(() => {
                  navigation.push("Survei", {
                    id: permohonan.id_andalalin,
                    kondisi: "Permohonan",
                  }),
                    context.clearSurvei();
                }, "Survei lapangan");
            }
            break;
          case "Pemasangan perlengkapan":
            return tindakan(() => {
              navigation.push("Survei", {
                id: permohonan.id_andalalin,
                kondisi: "Pemasangan",
              }),
                context.clearSurvei();
            }, "Pemasangan perlengkapan");
        }
        break;
      case "Super Admin":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Cek persyaratan");
          case "Persyaratan terpenuhi":
            return tindakan(() => {
              navigation.push("Pilih Petugas", {
                kondisi: "Pilih",
                permohonan: permohonan,
              });
            }, "Pilih petugas");
          case "Permohonan ditunda":
            return tindakan(() => {
              toggleLanjutkanPermohonan();
            }, "Lanjutkan permohonan");
          case "Survei lapangan":
            switch (permohonan.status_tiket) {
              case "Buka":
                return tindakan(() => {
                  toggleSurveiModal();
                }, "Pilih tindakan");
            }
            break;
          case "Pengecekan perlengkapan":
            return tindakan(() => {
              context.clearPemeriksaanPerlengkapan();
              navigation.push("Pemeriksaan perlengkapan");
            }, "Cek perlengkapan");
          case "Pemasangan perlengkapan":
            return tindakan(() => {
              setPilih("");
              setPertimbangan("");
              toggleTindakanModal();
            }, "Pilih tindakan");
          case "Pemasangan ditunda":
            return tindakan(() => {
              toggleLanjutkanPemasangan();
            }, "Lanjutkan pemasangan");
        }
        break;
    }
  };

  const closeCekPersyaratan = () => {
    setChecked(null);
    setSyarat(null);
    setPertimbanganPenolakan("");
    if (konfirmasi != true) {
      setPersyaratanModal();
    }
  };

  const persyaratan = () => {
    return (
      <View>
        {syarat == null
          ? permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas"
            ? tindakan_andalalin()
            : tindakan_perlalin()
          : ""}

        {syarat === "Tolak permohonan" ? tolak_permohonan() : ""}

        {syarat === "Tunda permohonan" ? tunda_permohonan() : ""}

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
              closeCekPersyaratan();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (checked == "Cek persyaratan") {
                setPersyaratanModal();
                setChecked(null);

                context.setIndexAdministrasi(1);
                context.clearAdministrasi();
                if (
                  permohonan.jenis_andalalin ==
                  "Dokumen analisis dampak lalu lintas"
                ) {
                  navigation.push("Administrasi");
                } else {
                  navigation.push("Administrasi Perlalin");
                }
              } else if (syarat == "Tolak permohonan") {
                if (pertimbanganPenolakan != "") {
                  setPersyaratanModal();
                  toggleKonfirmasi();
                }
              } else if (syarat == "Tunda permohonan") {
                if (pertimbanganPenolakan != "") {
                  setPersyaratanModal();
                  toggleKonfirmasi();
                }
              } else {
                setSyarat(checked);
              }
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const tindakan_andalalin = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pilih tindakan permohonan
        </AText>
        <View>
          <RadioButton.Group onValueChange={(value) => setChecked(value)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Cek persyaratan"
                value="Cek persyaratan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={checked === "Cek persyaratan" ? "checked" : "unchecked"}
              />
              <Pressable
                onPress={() => {
                  setChecked("Cek persyaratan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Cek persyaratan
                </AText>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Tunda permohonan"
                value="Tunda permohonan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  checked === "Tunda permohonan" ? "checked" : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setChecked("Tunda permohonan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Tunda permohonan
                </AText>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Tolak permohonan"
                value="Tolak permohonan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  checked === "Tolak permohonan" ? "checked" : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setChecked("Tolak permohonan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Tolak permohonan
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    );
  };

  const tindakan_perlalin = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pilih tindakan permohonan
        </AText>
        <View>
          <RadioButton.Group onValueChange={(value) => setChecked(value)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Cek persyaratan"
                value="Cek persyaratan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={checked === "Cek persyaratan" ? "checked" : "unchecked"}
              />
              <Pressable
                onPress={() => {
                  setChecked("Cek persyaratan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Cek persyaratan
                </AText>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Tunda permohonan"
                value="Tunda permohonan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  checked === "Tunda permohonan" ? "checked" : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setChecked("Tunda permohonan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Tunda permohonan
                </AText>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Tolak permohonan"
                value="Tolak permohonan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  checked === "Tolak permohonan" ? "checked" : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setChecked("Tolak permohonan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Tolak permohonan
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    );
  };

  const tolak_permohonan = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pertimbangan penolakan permohonan
        </AText>
        <View>
          <ATextInput
            bdColor={color.neutral.neutral300}
            ktype={"default"}
            hint={"Masukkan pertimbangan"}
            rtype={"done"}
            max={4}
            maxHeight={90}
            multi={true}
            value={pertimbanganPenolakan}
            onChangeText={(value) => {
              setPertimbanganPenolakan(value);
            }}
          />
        </View>
      </View>
    );
  };

  const tunda_permohonan = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pertimbangan penundaan permohonan
        </AText>
        <View>
          <ATextInput
            bdColor={color.neutral.neutral300}
            ktype={"default"}
            hint={"Masukkan pertimbangan"}
            rtype={"done"}
            max={4}
            maxHeight={90}
            multi={true}
            value={pertimbanganPenolakan}
            onChangeText={(value) => {
              setPertimbanganPenolakan(value);
            }}
          />
        </View>
      </View>
    );
  };

  const simpan_tolak_permohonan = () => {
    andalalinTolakPermohonan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      pertimbanganPenolakan,
      (response) => {
        switch (response.status) {
          case 200:
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_persyaratan_terpenuhi();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            closeCekPersyaratan();
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const simpan_tunda_permohonan = () => {
    andalalinTundaPermohonan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      pertimbanganPenolakan,
      (response) => {
        switch (response.status) {
          case 200:
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_tunda_permohonan();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            closeCekPersyaratan();
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const lanjutkan_permohonan = () => {
    andalalinLanjutkanPermohonan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      (response) => {
        switch (response.status) {
          case 200:
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                lanjutkan_permohonan();
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

  const closeUploadDokumen = () => {
    setUploadFile([]);
    setUploadNamaFile(null);
    toggleUploadModal();
  };

  const conten_upload = () => {
    switch (dokumen) {
      case "Checklist administrasi":
        return (
          <View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file("Checklist administrasi", "Pdf");
              }}
            />
          </View>
        );
      case "Surat keputusan persetujuan teknis andalalin":
        return (
          <View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file("Surat keputusan persetujuan teknis andalalin", "Pdf");
              }}
            />
          </View>
        );
      case "Checklist kelengkapan akhir":
        return (
          <View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file("Checklist kelengkapan akhir", "Pdf");
              }}
            />
          </View>
        );
      case "Penyusun dokumen":
        return (
          <View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file("Penyusun dokumen", "Pdf");
              }}
            />
          </View>
        );
      case "Catatan asistensi dokumen":
        return (
          <View>
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan berkas pdf"}
              icon={"file-plus"}
              mult={true}
              width={true}
              value={uploadNamaFile}
              onPress={() => {
                file("Catatan asistensi dokumen", "Pdf");
              }}
            />
          </View>
        );
    }
  };

  const upload_dokumen = () => {
    return (
      <View>
        <View
          style={{
            marginBottom: 16,
          }}
        >
          <AText size={18} color={color.neutral.neutral700} weight="semibold">
            Upload berkas {dokumen.toLowerCase()}
          </AText>
        </View>

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
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_dokumen();
              } else {
                setUploadFile([]);
                setUploadNamaFile(null);
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setUploadFile([]);
            setUploadNamaFile(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const nama_file = (nama, dokumen) => {
    switch (dokumen) {
      case "Checklist administrasi":
        setUploadNamaFile(nama);
        break;
      case "Surat keputusan persetujuan teknis andalalin":
        setUploadNamaFile(nama);
        break;
      case "Checklist kelengkapan akhir":
        setUploadNamaFile(nama);
        break;
      case "Penyusun dokumen":
        setUploadNamaFile(nama);
      case "Catatan asistensi dokumen":
        setUploadNamaFile(nama);
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

  const closePemeriksaan = () => {
    setPemeriksaanDokumen(null);
    setLanjutanPemeriksaan(null);
    setCatatanPemeriksaan("");
    setPemeriksaanModal();
  };

  const pemeriksaan = () => {
    return (
      <View>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Apakah surat keputusan sudah{"\n"}terpenuhi?
        </AText>

        {lanjutanPemeriksaan == null ? (
          <RadioButton.Group
            onValueChange={(value) => setPemeriksaanDokumen(value)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                label="Surat keputusan terpenuhi"
                value="Surat keputusan terpenuhi"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  pemeriksaanDokumen === "Surat keputusan terpenuhi"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setPemeriksaanDokumen("Surat keputusan terpenuhi");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Surat keputusan terpenuhi
                </AText>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Surat keputusan tidak terpenuhi"
                value="Surat keputusan tidak terpenuhi"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  pemeriksaanDokumen === "Surat keputusan tidak terpenuhi"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setPemeriksaanDokumen("Surat keputusan tidak terpenuhi");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Surat keputusan tidak terpenuhi
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
        ) : (
          <View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan catatan"}
              rtype={"done"}
              max={4}
              maxHeight={90}
              multi={true}
              value={catatanPemeriksaan}
              onChangeText={(value) => {
                setCatatanPemeriksaan(value);
              }}
            />
          </View>
        )}

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
              closePemeriksaan();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (lanjutanPemeriksaan != null) {
                setPemeriksaanModal();
                toggleKonfirmasiPemeriksaan();
              }
              setLanjutanPemeriksaan(pemeriksaanDokumen);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const simpan_pemeriksaan = () => {
    andalalinSimpanPemeriksaan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      pemeriksaanDokumen,
      catatanPemeriksaan,
      (response) => {
        switch (response.status) {
          case 200:
            reload();
            setPemeriksaanDokumen(null);
            setLanjutanPemeriksaan(null);
            setCatatanPemeriksaan("");
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_persetujuan();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setPemeriksaanDokumen(null);
            setLanjutanPemeriksaan(null);
            setCatatanPemeriksaan("");
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const closeSurveiModal = () => {
    setChecked(null);
    toggleSurveiModal();
  };

  const survei_tindakan = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pilih tindakan permohonan
        </AText>
        <View>
          <RadioButton.Group onValueChange={(value) => setChecked(value)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Survei lapangan"
                value="Survei lapangan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={checked === "Survei lapangan" ? "checked" : "unchecked"}
              />
              <Pressable
                onPress={() => {
                  setChecked("Survei lapangan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Survei lapangan
                </AText>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Ganti petugas"
                value="Ganti petugas"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={checked === "Ganti petugas" ? "checked" : "unchecked"}
              />
              <Pressable
                onPress={() => {
                  setChecked("Ganti petugas");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Ganti petugas
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
        </View>

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
              closeSurveiModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (checked != null) {
                if (checked == "Survei lapangan") {
                  closeSurveiModal();
                  navigation.push("Survei", {
                    id: permohonan.id_andalalin,
                    kondisi: "Permohonan",
                  }),
                    context.clearSurvei();
                } else {
                  closeSurveiModal();
                  navigation.push("Pilih Petugas", {
                    kondisi: "Ganti",
                    permohonan: permohonan,
                  });
                }
              }
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const close_tindakan_modal = () => {
    toggleTindakanModal();
    setTindakanPilihan();
  };

  const tunda_pemasangan = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pertimbangan penundaan pemasangan
        </AText>
        <View>
          <ATextInput
            bdColor={color.neutral.neutral300}
            ktype={"default"}
            hint={"Masukkan pertimbangan"}
            rtype={"done"}
            max={4}
            maxHeight={90}
            multi={true}
            value={pertimbangan}
            onChangeText={(value) => {
              setPertimbangan(value);
            }}
          />
        </View>
      </View>
    );
  };

  const batalkan_perhomonan = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pertimbangan pembatalan permohonan
        </AText>
        <View>
          <ATextInput
            bdColor={color.neutral.neutral300}
            ktype={"default"}
            hint={"Masukkan pertimbangan"}
            rtype={"done"}
            max={4}
            maxHeight={90}
            multi={true}
            value={pertimbangan}
            onChangeText={(value) => {
              setPertimbangan(value);
            }}
          />
        </View>
      </View>
    );
  };

  const simpan_tunda_pemasangan = () => {
    andalalinTundaPemasangan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      pertimbangan,
      (response) => {
        switch (response.status) {
          case 200:
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_tunda_pemasangan();
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

  const simpan_pembatalan_permohonan = () => {
    andalalinBatalkanPermohonan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      pertimbangan,
      (response) => {
        switch (response.status) {
          case 200:
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_pembatalan_permohonan();
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

  const lanjutkan_pemasangan = () => {
    andalalinLanjutkanPemasangan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      (response) => {
        switch (response.status) {
          case 200:
            reload();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                lanjutkan_pemasangan();
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

  const tindakan_pilihan = () => {
    return (
      <View>
        {pilih == "" ? (
          <View>
            <AText
              style={{ paddingBottom: 16 }}
              size={18}
              color={color.neutral.neutral700}
              weight="semibold"
            >
              Pilih tindakan permohonan
            </AText>
            <RadioButton.Group
              onValueChange={(value) => setTindakanPilihan(value)}
            >
              {context.getUser().role == "Super Admin" ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    label="Pemasangan"
                    value="Pemasangan"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={
                      tindakanPilihan === "Pemasangan" ? "checked" : "unchecked"
                    }
                  />
                  <Pressable
                    onPress={() => {
                      setTindakanPilihan("Pemasangan");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Pemasangan
                    </AText>
                  </Pressable>
                </View>
              ) : (
                ""
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <RadioButton
                  label="Ganti petugas"
                  value="Ganti petugas"
                  uncheckedColor={color.neutral.neutral300}
                  color={color.primary.primary600}
                  status={
                    tindakanPilihan === "Ganti petugas"
                      ? "checked"
                      : "unchecked"
                  }
                />
                <Pressable
                  onPress={() => {
                    setTindakanPilihan("Ganti petugas");
                  }}
                >
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral700}
                  >
                    Ganti petugas
                  </AText>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <RadioButton
                  label="Tunda"
                  value="Tunda"
                  uncheckedColor={color.neutral.neutral300}
                  color={color.primary.primary600}
                  status={tindakanPilihan === "Tunda" ? "checked" : "unchecked"}
                />
                <Pressable
                  onPress={() => {
                    setTindakanPilihan("Tunda");
                  }}
                >
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral700}
                  >
                    Tunda pemasangan
                  </AText>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <RadioButton
                  label="Batal"
                  value="Batal"
                  uncheckedColor={color.neutral.neutral300}
                  color={color.primary.primary600}
                  status={tindakanPilihan === "Batal" ? "checked" : "unchecked"}
                />
                <Pressable
                  onPress={() => {
                    setTindakanPilihan("Batal");
                  }}
                >
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral700}
                  >
                    Batalkan permohonan
                  </AText>
                </Pressable>
              </View>
            </RadioButton.Group>
          </View>
        ) : (
          ""
        )}

        {pilih === "Batal" ? batalkan_perhomonan() : ""}

        {pilih === "Tunda" ? tunda_pemasangan() : ""}

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
              close_tindakan_modal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              switch (tindakanPilihan) {
                case "Pemasangan":
                  navigation.push("Survei", {
                    id: permohonan.id_andalalin,
                    kondisi: "Pemasangan",
                  }),
                    context.clearSurvei();
                  break;
                case "Tunda":
                  if (pilih != "" && pertimbangan != "") {
                    close_tindakan_modal();
                    toggleSimpanTindakan();
                  } else {
                    setPilih(tindakanPilihan);
                  }
                  break;
                case "Batal":
                  if (pilih != "" && pertimbangan != "") {
                    close_tindakan_modal();
                    toggleSimpanTindakan();
                  } else {
                    setPilih(tindakanPilihan);
                  }
                  break;
                case "Ganti petugas":
                  navigation.push("Pilih Petugas", {
                    kondisi: "Ganti",
                    permohonan: permohonan,
                  });
                  break;
              }
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </TouchableOpacity>
        </View>
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

          {permohonan.jabatan_pemohon != "" &&
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

          {permohonan.nama_perusahaan != "" &&
          permohonan.nama_perusahaan != null ? (
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

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Informasi pengembang atau pembangun"}
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
              Nama pengembang atau pembangun
            </AText>
            <AText
              style={{ maxWidth: "50%" }}
              size={12}
              color={color.neutral.neutral500}
              weight="normal"
            >
              {permohonan.nama_pengembang}
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
              {permohonan.nomer_pengembang}
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
              {permohonan.email_pengembang}
            </AText>
          </View>
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
                        navigation.push("PDF", {
                          id: permohonan.id_andalalin,
                          dokumen: item,
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
              ))
            : ""}
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Berkas permohonan"}>
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
                        navigation.push("PDF", {
                          id: permohonan.id_andalalin,
                          dokumen: item,
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
      </View>
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
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item}
                    </AText>

                    <TouchableOpacity
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        navigation.push("PDF", {
                          id: permohonan.id_andalalin,
                          dokumen: item,
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
              ))
            : ""}
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Berkas permohonan"}>
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
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item}
                    </AText>

                    <TouchableOpacity
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        navigation.push("PDF", {
                          id: permohonan.id_andalalin,
                          dokumen: item,
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
      </View>
    );
  };

  return (
    <View>
      {permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas"
        ? andalalin()
        : perlalin()}
      <ADetailView
        style={{ marginTop: 20, marginBottom: 32 }}
        title={"Lanjutan"}
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
            Informasi lengkap
          </AText>

          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              navigation.push("Lanjutan", {
                permohonan: permohonan,
                kondisi: "Detail",
              });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
            </AText>
          </TouchableOpacity>
        </View>
      </ADetailView>
      {permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas"
        ? buttonAndalalin()
        : buttonPerlalin()}

      <ABottomSheet visible={persyaratanModal} close={closeCekPersyaratan}>
        {persyaratan()}
      </ABottomSheet>

      <ABottomSheet visible={uploadModal} close={closeUploadDokumen}>
        {upload_dokumen()}
      </ABottomSheet>

      <ABottomSheet visible={pemeriksaanModal} close={closePemeriksaan}>
        {pemeriksaan()}
      </ABottomSheet>

      <ABottomSheet visible={surveiModal} close={closeSurveiModal}>
        {survei_tindakan()}
      </ABottomSheet>

      <ABottomSheet visible={tindakanModal} close={close_tindakan_modal}>
        {tindakan_pilihan()}
      </ABottomSheet>

      <ADialog
        title={"Peringatan"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        toggleModal={toggleGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin menyimpan tindakan?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          closeCekPersyaratan();
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          context.toggleLoading(true);
          switch (syarat) {
            case "Tolak permohonan":
              simpan_tolak_permohonan();
              break;
            case "Tunda permohonan":
              simpan_tunda_permohonan();
              break;
          }
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin menyimpan tindakan?"}
        visibleModal={simpanTindakan}
        toggleVisibleModal={toggleSimpanTindakan}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleSimpanTindakan();
        }}
        onPressOKButton={() => {
          toggleSimpanTindakan();
          context.toggleLoading(true);
          switch (pilih) {
            case "Batal":
              simpan_pembatalan_permohonan();
              break;
            case "Tunda":
              simpan_tunda_pemasangan();
              break;
          }
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
          toggleKonfirmasiUpload();
        }}
        onPressOKButton={() => {
          toggleKonfirmasiUpload();
          context.toggleLoading(true);
          simpan_dokumen();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan hasil pemeriksaan?"}
        visibleModal={konfiermasiPemeriksaan}
        toggleVisibleModal={toggleKonfirmasiPemeriksaan}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasiPemeriksaan();
          setPemeriksaanDokumen(null);
          setLanjutanPemeriksaan(null);
          setCatatanPemeriksaan("");
        }}
        onPressOKButton={() => {
          toggleKonfirmasiPemeriksaan();
          context.toggleLoading(true);
          simpan_pemeriksaan();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin lanjutkan permohonan ini?"}
        visibleModal={lanjutkanPermohonan}
        toggleVisibleModal={toggleLanjutkanPermohonan}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleLanjutkanPermohonan();
        }}
        onPressOKButton={() => {
          toggleLanjutkanPermohonan();
          context.toggleLoading(true);
          lanjutkan_permohonan();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin lanjutkan pemasangan ini?"}
        visibleModal={lanjutkanPemasangan}
        toggleVisibleModal={toggleLanjutkanPemasangan}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleLanjutkanPemasangan();
        }}
        onPressOKButton={() => {
          toggleLanjutkanPemasangan();
          context.toggleLoading(true);
          lanjutkan_pemasangan();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Tindakan akan disimpan"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
          setLanjutanCheck(null);
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.toggleLoading(true);
          tindakan_pelaksanaan();
        }}
      />

      <ADialog
        title={"Tindakan gagal disimpan"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={lanjutkanGagal}
        toggleModal={toggleLanjutkanGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleLanjutkanGagal();
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

export default DetailNonUser;
