import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import ATextInput from "../utility/ATextInput";
import { RadioButton } from "react-native-paper";
import ATidakPilihan from "../utility/ATidakPilihan";
import { useStateToggler } from "../../hooks/useUtility";

export default function KelengkapanItem({ navigation, route }) {
  const { kelengkapan, setKelengkapan } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);
  const [master, setMaster] = useState();

  const cek = "&#10003;";

  kelengkapan_bangkitan_rendah = [
    {
      Uraian: "Scan Surat Permohonan",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan Lampiran Legal Administrasi (Surat/sertifikat kepemilikan lahan, Sertifikat guna lahan, foto lokasi, foto kegiatan, dll)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Surat Pernyataan Kesanggupan (pdf yang telah di tanda tangani dan File Ms. Word final, yang telah diperbaiki)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Softfile Billing PNBP dan Bukti Pembayaran PNBP yang telah terbayar",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan SK Persetujuan Andalalin yang telah terbit",
      Role: "Dishub",
      Dokumen: [],
    },
  ];

  surat_pernyataan = [
    {dokumen: "Surat pernyataan kesanggupan (word)", tipe: "Word"},
    {dokumen: "Surat pernyataan kesanggupan (pdf)", tipe: "Pdf"},
  ];

  useEffect(() => {
    const kelengkapan = [];

    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan rendah":
        kelengkapan.push(...kelengkapan_bangkitan_rendah);
        break;
    }

    let uraian = kelengkapan.map((item) => {
      return item.Uraian;
    });

    setMaster(uraian);
    setItem(kelengkapan.length);
  }, []);

  const check = (uraian) => {
    if (kelengkapan.kelengkapan != null) {
      let item = kelengkapan.kelengkapan.find((item) => item.uraian == uraian);

      return item;
    }
  };

  const update_ada = (uraian, ada) => {
    itemIndeks = kelengkapan.kelengkapan.findIndex(
      (item) => item.uraian == uraian
    );
    const updatedItem = {
      ...kelengkapan.kelengkapan[itemIndeks],
      ada: ada,
      tidak: "",
    };

    const updatedItems = [...kelengkapan.kelengkapan];
    updatedItems[itemIndeks] = updatedItem;

    setKelengkapan({
      kelengkapan: updatedItems,
    });

    if (context.kelengkapan.kelengkapan[itemIndeks].dokumen.length != 0) {
      context.kelengkapan.kelengkapan[itemIndeks].dokumen.splice(
        0,
        context.kelengkapan.kelengkapan[itemIndeks].dokumen.length
      );
    }
  };

  const update_tidak = (uraian, tidak) => {
    itemIndeks = kelengkapan.kelengkapan.findIndex(
      (item) => item.uraian == uraian
    );
    const updatedItem = {
      ...kelengkapan.kelengkapan[itemIndeks],
      ada: "",
      tidak: tidak,
    };

    const updatedItems = [...kelengkapan.kelengkapan];
    updatedItems[itemIndeks] = updatedItem;

    setKelengkapan({
      kelengkapan: updatedItems,
    });

    const data = [];

    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan rendah":
        switch (uraian) {
          case "Scan Surat Permohonan":
            context.kelengkapan.kelengkapan[itemIndeks].dokumen.push(
              {dokumen: "Surat permohonan persetujuan andalalin", tipe: "Pdf"}
            );
            break;
          case "Scan/Foto Surat Pernyataan Kesanggupan (pdf yang telah di tanda tangani dan File Ms. Word final, yang telah diperbaiki)":
            surat_pernyataan.map((item) => {
              itemIndeks = kelengkapan.kelengkapan.findIndex(
                (item) => item.uraian == uraian
              );
              const index =
                context.kelengkapan.kelengkapan[itemIndeks].dokumen.findIndex(
                  (dokumen) => dokumen.dokumen == item.dokumen
                );
              if (index > -1) {
                data.push({
                  dokumen: item.dokumen,
                  tipe: item.tipe,
                  state: true,
                });
              } else {
                data.push({
                  dokumen: item.dokumen,
                  tipe: item.tipe,
                  state: false,
                });
              }
            });
            context.setUraian(uraian);
            context.setDataDokumen(data);
            context.togglePilihModal(true);
            break;
          case "Scan Lampiran Legal Administrasi (Surat/sertifikat kepemilikan lahan, Sertifikat guna lahan, foto lokasi, foto kegiatan, dll)":
            const dokumen =
              context.dataMaster.persyaratan.PersyaratanAndalalin.filter(
                (item) => {
                  return (
                    item.bangkitan ==
                      context.detailPermohonan.kategori_bangkitan &&
                    item.persyaratan != "Surat permohonan persetujuan andalalin"
                  );
                }
              );
            dokumen.map((item) => {
              itemIndeks = kelengkapan.kelengkapan.findIndex(
                (item) => item.uraian == uraian
              );
              const index =
                context.kelengkapan.kelengkapan[itemIndeks].dokumen.findIndex(
                  (dokumen) => dokumen.dokumen == item.persyaratan
                );
              if (index > -1) {
                data.push({
                  dokumen: item.persyaratan,
                  tipe: "Pdf",
                  state: true,
                });
              } else {
                data.push({
                  dokumen: item.persyaratan,
                  tipe: "Pdf",
                  state: false,
                });
              }
            });
            context.setUraian(uraian);
            context.setDataDokumen(data);
            context.togglePilihModal(true);
            break;
          case "Scan/Foto Softfile Billing PNBP dan Bukti Pembayaran PNBP yang telah terbayar":
            context.kelengkapan.kelengkapan[itemIndeks].dokumen.push(
              {dokumen: "Billing PNBP dan bukti pembayaran PNBP", tipe: "Pdf"}
            );
            break;
          case "Scan SK Persetujuan Andalalin yang telah terbit":
            context.kelengkapan.kelengkapan[itemIndeks].dokumen.push(
              {dokumen: "Surat keputusan persetujuan teknis andalalin", tipe: "Pdf"}
            );
            break;
        }
        break;
    }
  };

  const update_keterangan = (uraian, keterangan) => {
    itemIndeks = kelengkapan.kelengkapan.findIndex(
      (item) => item.uraian == uraian
    );
    const updatedItem = {
      ...kelengkapan.kelengkapan[itemIndeks],
      keterangan: keterangan,
    };

    const updatedItems = [...kelengkapan.kelengkapan];
    updatedItems[itemIndeks] = updatedItem;

    setKelengkapan({
      kelengkapan: updatedItems,
    });
  };

  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < item; i++) {
      elements.push(
        <View
          style={{
            flex: 1,
            backgroundColor: color.primary.primary25,
          }}
        >
          <AText
            style={{ paddingTop: 16 }}
            size={16}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {master[i]}
          </AText>
          <RadioButton.Group
            onValueChange={(value) => update_ada(master[i], value)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label={cek}
                value={cek}
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  check(master[i]).ada === "&#10003;" ? "checked" : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  update_ada(master[i], "&#10003;");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Ada
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
          <RadioButton.Group
            onValueChange={(value) => update_tidak(master[i], value)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label={cek}
                value={cek}
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  check(master[i]).tidak === "&#10003;"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  update_tidak(master[i], "&#10003;");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Tidak Ada
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>

          <ATextInput
            bdColor={color.neutral.neutral300}
            ktype={"default"}
            hint={"Masukkan keterangan"}
            title={"keterangan"}
            padding={20}
            multi={true}
            value={check(master[i]).keterangan}
            onChangeText={(value) => {
              update_keterangan(master[i], value);
            }}
          />

          <View
            style={{
              flexDirection: "row",
              paddingTop: 32,
              paddingBottom: 32,
              alignSelf: "center",
            }}
          >
            <AText color={color.neutral.neutral500} size={14} weight="normal">
              Tinjau detail permohonan!
            </AText>

            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Lanjutan", {
                  permohonan: context.detailPermohonan,
                  kondisi: "Tinjau",
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tinjau
              </AText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return elements;
  };

  return <View style={styles.container}>{generateElements()[index - 1]}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
