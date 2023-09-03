import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADetailView from "../utility/ADetailView";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import ABottomSheet from "../utility/ABottomSheet";
import { RadioButton, Checkbox } from "react-native-paper";
import {
  andalalinPersyaratanTerpenuhi,
  andalalinPersyaratanTidakSesuai,
  andalalinSimpanPersetujuan,
  andalalinSimpanSK,
} from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import ADialog from "../utility/ADialog";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import * as DocumentPicker from "expo-document-picker";

function DetailNonUser({ permohonan, navigation }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [checked, setChecked] = useState();
  const [syarat, setSyarat] = useState();
  const [lanjut, toggleLanjut] = useStateToggler();
  const [persyaratanModal, setPersyaratanModal] = useStateToggler();

  const [ktp, setKtp] = React.useState(false);
  const [akta, setAkta] = React.useState(false);
  const [surat, setSurat] = React.useState(false);

  const [tidak_sesuai, setTidakSesuai] = useState([]);

  const [persetujuanDokumen, setPersetujuanDokumen] = useState();
  const [setujuLanjut, setSetujuLanjut] = useState();
  const [keteranganPersetujuan, setKeteranganPersetujuan] = useState("");
  const [persetujuanModal, setPersetujuanModal] = useStateToggler();
  const [konfirmasiPersetujuan, toggleKonfirmasiPersetujuan] =
    useStateToggler();

  const [skModal, setSKModal] = useStateToggler();
  const [fileSK, setFileSK] = useState();
  const [namaFileSK, setNamaFileSK] = useState();
  const [konfrimasiSK, toggleKonformasiSK] = useStateToggler();

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

  const tindakan = (onPress, title) => {
    return <AButton title={title} mode="contained" onPress={onPress} />;
  };

  const button = () => {
    switch (context.getUser().role) {
      case "Operator":
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
          case "Survey lapangan":
            return tindakan(() => {
              navigation.push("Pilih Petugas", {
                kondisi: "Ganti",
                permohonan: permohonan,
              });
            }, "Ganti pentugas");
          case "Laporan BAP":
            return permohonan.file_bap == null
              ? tindakan(() => {
                  navigation.push("Laporan BAP", {
                    id: permohonan.id_andalalin,
                  });
                }, "Laporan BAP")
              : "";
          case "Pembuatan SK":
            return tindakan(() => {
              setSKModal();
            }, "Pembuatan SK");
        }
        break;
      case "Petugas":
        switch (permohonan.status_andalalin) {
          case "Survey lapangan":
            return tindakan(() => {
              navigation.push("Survei", { id: permohonan.id_andalalin }),
                context.clearSurvei();
            }, "Survei lapangan");
        }
        break;
      case "Admin":
        switch (permohonan.status_andalalin) {
          case "Laporan BAP":
            return permohonan.file_bap != null
              ? tindakan(() => {
                  setPersetujuanModal();
                }, "Persetujuan dokumen")
              : "";
        }
        break;
    }
  };

  const persyaratan = () => {
    return (
      <View style={{ height: 278 }}>
        {syarat == null || syarat == "Persyaratan terpenuhi"
          ? persyaratan_sesuai()
          : ""}
        {syarat === "Persyaratan tidak sesuai"
          ? persyaratan_tidak_sesuai()
          : ""}

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 24,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setChecked(null);
              setKtp(null);
              setAkta(null);
              setSurat(null);
              setSyarat(null);
              setTidakSesuai([]);
              setPersyaratanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              toggleLanjut();
              setSyarat(checked);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const persyaratan_sesuai = () => {
    return (
      <View>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Apakah persyaratan sudah{"\n"}sesuai?
        </AText>
        <RadioButton.Group onValueChange={(value) => setChecked(value)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              label="Persyaratan terpenuhi"
              value="Persyaratan terpenuhi"
              uncheckedColor={color.neutral.neutral300}
              color={color.primary.primary600}
              status={
                checked === "Persyaratan terpenuhi" ? "checked" : "unchecked"
              }
            />
            <AText
              style={{ paddingLeft: 4 }}
              size={14}
              color={color.neutral.neutral700}
            >
              Persayaratan terpenuhi
            </AText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            <RadioButton
              label="Persyaratan tidak sesuai"
              value="Persyaratan tidak sesuai"
              uncheckedColor={color.neutral.neutral300}
              color={color.primary.primary600}
              status={
                checked === "Persyaratan tidak sesuai" ? "checked" : "unchecked"
              }
            />
            <AText
              style={{ paddingLeft: 4 }}
              size={14}
              color={color.neutral.neutral700}
            >
              Persayaratan tidak sesuai
            </AText>
          </View>
        </RadioButton.Group>
      </View>
    );
  };

  const persyaratan_tidak_sesuai = () => {
    return (
      <View>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Persayaratan apa saja yang{"\n"}tidak sesuai?
        </AText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            uncheckedColor={color.neutral.neutral300}
            color={color.primary.primary600}
            status={ktp ? "checked" : "unchecked"}
            onPress={() => {
              setKtp(!ktp);
              if (!ktp) {
                addItem("Kartu tanda penduduk");
              } else {
                removeItem("Kartu tanda penduduk");
              }
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={14}
            color={color.neutral.neutral700}
          >
            Kartu tanda penduduk
          </AText>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 8 }}
        >
          <Checkbox
            uncheckedColor={color.neutral.neutral300}
            color={color.primary.primary600}
            status={akta ? "checked" : "unchecked"}
            onPress={() => {
              setAkta(!akta);
              if (!akta) {
                addItem("Akta pendirian badan");
              } else {
                removeItem("Akta pendirian badan");
              }
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={14}
            color={color.neutral.neutral700}
          >
            Akta pendirian badan
          </AText>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 8 }}
        >
          <Checkbox
            uncheckedColor={color.neutral.neutral300}
            color={color.primary.primary600}
            status={surat ? "checked" : "unchecked"}
            onPress={() => {
              setSurat(!surat);
              if (!surat) {
                addItem("Surat kuasa");
              } else {
                removeItem("Surat kuasa");
              }
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={14}
            color={color.neutral.neutral700}
          >
            Surat kuasa
          </AText>
        </View>
      </View>
    );
  };

  const addItem = (item) => {
    tidak_sesuai.push(item);
    setTidakSesuai(tidak_sesuai);
  };

  const removeItem = (item) => {
    const index = tidak_sesuai.indexOf(item);
    if (index > -1) {
      tidak_sesuai.splice(index, 1);
    }
  };

  const simpan_persyaratan_terpenuhi = () => {
    andalalinPersyaratanTerpenuhi(
      context.getUser().access_token,
      permohonan.id_andalalin,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Detail", { id: permohonan.id_andalalin });
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
            setChecked(null);
            setKtp(null);
            setAkta(null);
            setSurat(null);
            setSyarat(null);
            setTidakSesuai([]);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const simpan_persyaratan_tidak_sesuai = () => {
    if (tidak_sesuai.length != 0) {
      andalalinPersyaratanTidakSesuai(
        context.getUser().access_token,
        permohonan.id_andalalin,
        tidak_sesuai,
        (response) => {
          switch (response.status) {
            case 200:
              navigation.replace("Detail", { id: permohonan.id_andalalin });
              break;
            case 424:
              authRefreshToken(context, (response) => {
                if (response.status === 200) {
                  simpan_persyaratan_tidak_sesuai();
                } else {
                  context.toggleLoading(false);
                }
              });
              break;
            default:
              setChecked(null);
              setKtp(null);
              setAkta(null);
              setSurat(null);
              setSyarat(null);
              setTidakSesuai([]);
              context.toggleLoading(false);
              toggleGagal();
              break;
          }
        }
      );
    } else {
      setChecked(null);
      setKtp(null);
      setAkta(null);
      setSurat(null);
      setSyarat(null);
      setTidakSesuai([]);
      context.toggleLoading(false);
      toggleGagal();
    }
  };

  useEffect(() => {
    if (syarat == "Persyaratan terpenuhi") {
      toggleKonfirmasi();
      setPersyaratanModal();
    } else if (tidak_sesuai.length != 0) {
      toggleKonfirmasi();
      setPersyaratanModal();
    }
  }, [lanjut]);

  const survei = () => {
    if (
      permohonan.status_andalalin == "Laporan BAP" ||
      permohonan.status_andalalin == "Pembuatan SK" ||
      permohonan.status_andalalin == "Permohonan selesai"
    ) {
      return (
        <ADetailView style={{ marginTop: 20 }} title={"Survei lapangan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Data survei lapangan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Detail Survei", {
                  id: permohonan.id_andalalin,
                  kondisi: "Operator",
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

  const bap = () => {
    if (permohonan.file_bap != null) {
      return (
        <ADetailView style={{ marginTop: 20 }} title={"Laporan BAP"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Laporan BAP
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Laporan BAP",
                  pdf: permohonan.file_bap,
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

  const persetujuan = () => {
    return (
      <View style={{ height: 250 }}>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Apakah permohoman sudah{"\n"}terpenuhi?
        </AText>

        {setujuLanjut == null ? (
          <RadioButton.Group
            onValueChange={(value) => setPersetujuanDokumen(value)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                label="Dokumen disetujui"
                value="Dokumen disetujui"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  persetujuanDokumen === "Dokumen disetujui"
                    ? "checked"
                    : "unchecked"
                }
              />
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Dokumen disetujui
              </AText>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Dokumen tidak disetujui"
                value="Dokumen tidak disetujui"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  persetujuanDokumen === "Dokumen tidak disetujui"
                    ? "checked"
                    : "unchecked"
                }
              />
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Dokumen tidak disetujui
              </AText>
            </View>
          </RadioButton.Group>
        ) : (
          <View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan keterangan"}
              title={"Keterangan"}
              rtype={"done"}
              max={3}
              maxHeight={100}
              multi={true}
              value={keteranganPersetujuan}
              onChangeText={(value) => {
                setKeteranganPersetujuan(value);
              }}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 24,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setPersetujuanDokumen(null);
              setSetujuLanjut(null);
              setKeteranganPersetujuan(null);
              setPersetujuanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (setujuLanjut != null) {
                setPersetujuanModal();
                toggleKonfirmasiPersetujuan();
              }
              setSetujuLanjut(persetujuanDokumen);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const simpan_persetujuan = () => {
    const setuju = {
      dokumen: setujuLanjut,
      keterangan: keteranganPersetujuan,
    };
    andalalinSimpanPersetujuan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      setuju,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Detail", { id: permohonan.id_andalalin });
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
            setFileSK(null);
            setNamaFileSK(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const persetujuan_dokumen = () => {
    if (permohonan.persetujuan != null) {
      return (
        <ADetailView style={{ marginTop: 20 }} title={"Persetujuan dokumen"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Persetujuan dokumen
            </AText>

            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.persetujuan}
            </AText>
          </View>

          {permohonan.keterangan_persetujuan != "" ? (
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
                  Keterangan
                </AText>

                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {permohonan.keterangan_persetujuan}
                </AText>
              </View>
            </View>
          ) : (
            ""
          )}
        </ADetailView>
      );
    }
  };

  const file = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setFileSK(result.assets[0].uri);
      setNamaFileSK(result.assets[0].name);
    }
  };

  const pembuatan_sk = () => {
    return (
      <View style={{ height: 250 }}>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pembuatan SK
        </AText>

        <ATextInputIcon
          bdColor={color.neutral.neutral300}
          hint={"Masukkan berkas SK"}
          title={"Surat keputusan"}
          icon={"file-plus"}
          mult={true}
          value={namaFileSK}
          maxHeight={100}
          onPress={() => {
            file();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 24,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setFileSK(null);
              setNamaFileSK(null);
              setSKModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              {fileSK != null ? (toggleKonformasiSK()) : ("")}
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Simpan
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const simpan_sk = () => {
    andalalinSimpanSK(
      context.getUser().access_token,
      permohonan.id_andalalin,
      fileSK,
      (response) => {
        switch (response.status) {
          case 201:
            navigation.replace("Detail", { id: permohonan.id_andalalin });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_sk();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setPersetujuanDokumen(null);
            setSetujuLanjut(null);
            setKeteranganPersetujuan(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  }

  const sk = () => {
    if (permohonan.file_sk != null) {
      return (
        <ADetailView style={{ marginTop: 20 }} title={"Surat keputusan"}>
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
                navigation.push("PDF", {
                  title: "Laporan BAP",
                  pdf: permohonan.file_sk,
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

      <ADetailView style={{ marginTop: 20 }} title={"Berkas"}>
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
              navigation.push("PDF", {
                title: "Tanda terima",
                pdf: permohonan.tanda_terima_pendaftaran,
              });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
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
            Kartu tanda penduduk
          </AText>

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              navigation.push("PDF", { title: "KTP", pdf: permohonan.ktp });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
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
              navigation.push("PDF", {
                title: "Akta",
                pdf: permohonan.akta_pendirian_badan,
              });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
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
              navigation.push("PDF", {
                title: "Surat kuasa",
                pdf: permohonan.surat_kuasa,
              });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
            </AText>
          </Pressable>
        </View>
      </ADetailView>

      {survei()}
      {bap()}
      {persetujuan_dokumen()}
      {sk()}
      <ADetailView
        style={{ marginTop: 20, marginBottom: 20 }}
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

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              navigation.push("Lanjutan", { permohonan: permohonan });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </Pressable>
        </View>
      </ADetailView>
      <View style={{ marginBottom: 50 }}>{button()}</View>
      <ABottomSheet visible={persyaratanModal}>{persyaratan()}</ABottomSheet>

      <ABottomSheet visible={persetujuanModal}>{persetujuan()}</ABottomSheet>

      <ABottomSheet visible={skModal}>{pembuatan_sk()}</ABottomSheet>

      <ADialog
        title={"Menyimpan gagal"}
        desc={"Tindakan gagal disimpan, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan?"}
        visibleModal={konfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
          setChecked(null);
          setKtp(null);
          setAkta(null);
          setSurat(null);
          setSyarat(null);
          setTidakSesuai([]);
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          context.toggleLoading(true);
          if (syarat === "Persyaratan terpenuhi") {
            simpan_persyaratan_terpenuhi();
          } else {
            simpan_persyaratan_tidak_sesuai();
          }
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan?"}
        visibleModal={konfirmasiPersetujuan}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasiPersetujuan();
          setPersetujuanDokumen(null);
          setSetujuLanjut(null);
          setKeteranganPersetujuan(null);
        }}
        onPressOKButton={() => {
          toggleKonfirmasiPersetujuan();
          context.toggleLoading(true);
          simpan_persetujuan();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan?"}
        visibleModal={konfrimasiSK}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonformasiSK();
          setSKModal();
          setFileSK(null);
          setNamaFileSK(null);
        }}
        onPressOKButton={() => {
          toggleKonformasiSK();
          setSKModal();
          context.toggleLoading(true);
          simpan_sk();
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
