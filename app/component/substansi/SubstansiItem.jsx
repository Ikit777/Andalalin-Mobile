import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import ATextInput from "../utility/ATextInput";
import { RadioButton } from "react-native-paper";
import ATidakPilihan from "../utility/ATidakPilihan";
import { useStateToggler } from "../../hooks/useUtility";

export default function SubstansiItem({ navigation, route }) {
  const { substansi, setSubstansi } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);

  const alphabetArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );

  const cek = "&#10003;";

  const substansi_bangkitan_sedang = [
    {
      uraian: "Analisis Kondisi Lalu Lintas dan Angkutan Jalan Saat Ini",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi Prasaran Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Lalu Lintas Eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Angkutan Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian:
        "Analisis Bangkitan / Tarikan Lalu Lintas dan Angkutan Jalan akibat Pembangunan / Pengembangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Distribusi Perjalanan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pemilihan Moda",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pembebanan Perjalanan ",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Simulasi Kinerja Lalu Lintas",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi pada masa eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi pada masa konstruksi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan tanpa adanya rekomendasi (Operasional - Do Nothing) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan dengan diterapkannya rekomendasi (Operasional - Do Something) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Rekomendasi dan Rencana Implementasi Penganganan Dampak",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Tanggung Jawab Pemerintah dan Pengembang / Pembangun (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Pemantauan Evaluasi Pemerintah dan Pembangun / Pengembang (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Gambaran umum",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kesesuaian terhadap RT/RW",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Peta lokasi memuat jenis bangunan, rencana pembangunan baru/pengembangan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi fisik sarana dan prasarana",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi sosial ekonomi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi lalu lintas dan pelayanan angkutan jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Keterangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
  ];

  const substansi_bangkitan_tinggi = [
    {
      uraian:
        "Perencanaan Metodologi Analisis Dampak Lalu Lintas",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Kondisi Lalu Lintas dan Angkutan Jalan Saat Ini",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi Prasaran Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Lalu Lintas Eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Angkutan Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian:
        "Analisis Bangkitan / Tarikan Lalu Lintas dan Angkutan Jalan akibat Pembangunan / Pengembangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Distribusi Perjalanan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pemilihan Moda",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pembebanan Perjalanan ",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Simulasi Kinerja Lalu Lintas",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi pada masa eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi pada masa konstruksi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan tanpa adanya rekomendasi (Operasional - Do Nothing) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan dengan diterapkannya rekomendasi (Operasional - Do Something) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Rekomendasi dan Rencana Implementasi Penganganan Dampak",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Tanggung Jawab Pemerintah dan Pengembang / Pembangun (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Pemantauan Evaluasi Pemerintah dan Pembangun / Pengembang (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Gambaran umum",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kesesuaian terhadap RT/RW",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Peta lokasi memuat jenis bangunan, rencana pembangunan baru/pengembangan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi fisik sarana dan prasarana",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi sosial ekonomi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi lalu lintas dan pelayanan angkutan jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Keterangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
  ];

  useEffect(() => {
    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan sedang":
        setItem(substansi_bangkitan_sedang.length);
        break;
      case "Bangkitan tinggi":
        setItem(substansi_bangkitan_tinggi.length);
        break;
    }
  }, []);

  const check = (uraian) => {
    if (substansi.substansi != null) {
      let item = substansi.substansi.find((item) => item.uraian == uraian);

      return item;
    }
  };

  const update_ada = (uraian, ada) => {
    itemIndeks = substansi.substansi.findIndex((item) => item.uraian == uraian);
    const updatedItem = {
      ...substansi.substansi[itemIndeks],
      ada: ada,
      tidak: "",
    };

    const updatedItems = [...substansi.substansi];
    updatedItems[itemIndeks] = updatedItem;

    setSubstansi({
      substansi: updatedItems,
    });
  };

  const update_tidak = (uraian, tidak) => {
    itemIndeks = substansi.substansi.findIndex((item) => item.uraian == uraian);

    const updatedItem = {
      ...substansi.substansi[itemIndeks],
      ada: "",
      tidak: tidak,
    };

    const updatedItems = [...substansi.substansi];
    updatedItems[itemIndeks] = updatedItem;

    setSubstansi({
      substansi: updatedItems,
    });
  };

  const update_keterangan = (uraian, keterangan) => {
    itemIndeks = substansi.substansi.findIndex((item) => item.uraian == uraian);
    const updatedItem = {
      ...substansi.substansi[itemIndeks],
      keterangan: keterangan,
    };

    const updatedItems = [...substansi.substansi];
    updatedItems[itemIndeks] = updatedItem;

    setSubstansi({
      substansi: updatedItems,
    });
  };

  const check_child = (uraian, uraian_child) => {
    if (substansi.substansi != null) {
      let item = substansi.substansi.find((item) => item.uraian == uraian);
      let item_child = item.child.find((item) => item.uraian == uraian_child);
      return item_child;
    }
  };

  const update_ada_child = (uraian, uraian_child, ada) => {
    const updated = substansi.substansi.map((item) => {
      if (item.uraian == uraian) {
        const index = item.child.findIndex((value) => {
          return value.uraian == uraian_child;
        });
        if (index > -1) {
          const updatedItem = {
            ...item.child[index],
            ada: ada,
            tidak: "",
          };

          item.child[index] = updatedItem;
        }
        return { ...item, child: item.child };
      }
      return item;
    });

    setSubstansi({
      substansi: updated,
    });
  };

  const update_tidak_child = (uraian, uraian_child, tidak) => {
    const updated = substansi.substansi.map((item) => {
      if (item.uraian == uraian) {
        const index = item.child.findIndex((value) => {
          return value.uraian == uraian_child;
        });
        if (index > -1) {
          const updatedItem = {
            ...item.child[index],
            ada: "",
            tidak: tidak,
          };

          item.child[index] = updatedItem;
        }
        return { ...item, child: item.child };
      }
      return item;
    });

    setSubstansi({
      substansi: updated,
    });
  };

  const update_keterangan_child = (uraian, uraian_child, keterangan) => {
    const updated = substansi.substansi.map((item) => {
      if (item.uraian == uraian) {
        const index = item.child.findIndex((value) => {
          return value.uraian == uraian_child;
        });
        if (index > -1) {
          const updatedItem = {
            ...item.child[index],
            keterangan: keterangan,
          };

          item.child[index] = updatedItem;
        }
        return { ...item, child: item.child };
      }
      return item;
    });

    setSubstansi({
      substansi: updated,
    });
  };

  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < item; i++) {
      elements.push(
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
          style={{
            flex: 1,
            backgroundColor: color.primary.primary25,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <AText
              style={{ paddingTop: 16, paddingRight: 8 }}
              size={16}
              color={color.neutral.neutral900}
              weight="semibold"
            >
              {alphabetArray[i].toUpperCase()}.
            </AText>

            <AText
              style={{ paddingTop: 16, width: "90%" }}
              size={16}
              color={color.neutral.neutral900}
              weight="semibold"
            >
              {substansi.substansi[i].uraian}
            </AText>
          </View>

          <RadioButton.Group
            onValueChange={(value) =>
              update_ada(substansi.substansi[i].uraian, value)
            }
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
                  check(substansi.substansi[i].uraian).ada === "&#10003;"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  update_ada(substansi.substansi[i].uraian, "&#10003;");
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
            onValueChange={(value) =>
              update_tidak(substansi.substansi[i].uraian, value)
            }
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
                  check(substansi.substansi[i].uraian).tidak === "&#10003;"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  update_tidak(substansi.substansi[i].uraian, "&#10003;");
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
            value={check(substansi.substansi[i].uraian).keterangan}
            onChangeText={(value) => {
              update_keterangan(substansi.substansi[i].uraian, value);
            }}
          />

          {substansi.substansi[i].child != null
            ? substansi.substansi[i].child.map((item, index) => (
                <View key={index}>
                  <View style={{ flexDirection: "row" }}>
                    <AText
                      style={{ paddingTop: 16, paddingRight: 8 }}
                      size={16}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {index + 1}.
                    </AText>

                    <AText
                      style={{ paddingTop: 16, width: "90%" }}
                      size={16}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item.uraian}
                    </AText>
                  </View>

                  <RadioButton.Group
                    onValueChange={(value) =>
                      update_ada_child(
                        substansi.substansi[i].uraian,
                        item.uraian,
                        value
                      )
                    }
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
                          check_child(
                            substansi.substansi[i].uraian,
                            item.uraian
                          ).ada === "&#10003;"
                            ? "checked"
                            : "unchecked"
                        }
                      />
                      <Pressable
                        onPress={() => {
                          update_ada_child(
                            substansi.substansi[i].uraian,
                            item.uraian,
                            "&#10003;"
                          );
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
                    onValueChange={(value) =>
                      update_tidak_child(
                        substansi.substansi[i].uraian,
                        item.uraian,
                        value
                      )
                    }
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
                          check_child(
                            substansi.substansi[i].uraian,
                            item.uraian
                          ).tidak === "&#10003;"
                            ? "checked"
                            : "unchecked"
                        }
                      />
                      <Pressable
                        onPress={() => {
                          update_tidak_child(
                            substansi.substansi[i].uraian,
                            item.uraian,
                            "&#10003;"
                          );
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
                    value={
                      check_child(substansi.substansi[i].uraian, item.uraian)
                        .keterangan
                    }
                    onChangeText={(value) => {
                      update_keterangan_child(
                        substansi.substansi[i].uraian,
                        item.uraian,
                        value
                      );
                    }}
                  />
                </View>
              ))
            : ""}

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
        </ScrollView>
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
