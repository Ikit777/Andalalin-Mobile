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
import { RadioButton } from "react-native-paper";
import { useStateToggler } from "../../hooks/useUtility";
import ADialogInputText from "../utility/ADialogInputText";
import { MaterialIcons } from "@expo/vector-icons";

export default function PemeriksaanItem({ navigation, route }) {
  const { pemeriksaan, setPemeriksaan } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);
  const [substansi, setSubstansi] = useState();

  const [tambah, setTambah] = useState("");
  const [poin, setPoin] = useState("");
  const [tambahCatatan, toggleTambahCatatan] = useStateToggler();

  pemeriksaan_bangkitan_sedang = [
    {
      substansi: "Bab I",
      catatan: [],
    },
    {
      substansi: "Bab II",
      catatan: [],
    },
    {
      substansi: "Bab III",
      catatan: [],
    },
    {
      substansi: "Bab IV",
      catatan: [],
    },
    {
      substansi: "BAB V",
      catatan: [],
    },
    {
      substansi: "LAMPIRAN GAMBAR TEKNIS",
      catatan: [],
    },
    {
      substansi: "CATATAN DAN KETERANGAN TAMBAHAN",
      catatan: [],
    },
  ];

  pemeriksaan_bangkitan_tinggi = [
    {
      substansi: "Bab I",
      catatan: [],
    },
    {
      substansi: "Bab II",
      catatan: [],
    },
    {
      substansi: "Bab III",
      catatan: [],
    },
    {
      substansi: "Bab IV",
      catatan: [],
    },
    {
      substansi: "Bab V",
      catatan: [],
    },
    {
      substansi: "Bab VI",
      catatan: [],
    },
    {
      substansi: "Bab VII",
      catatan: [],
    },
    {
      substansi: "LAMPIRAN GAMBAR TEKNIS",
      catatan: [],
    },
    {
      substansi: "CATATAN DAN KETERANGAN TAMBAHAN",
      catatan: [],
    },
  ];

  useEffect(() => {
    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan sedang":
        let substansi_sedang = pemeriksaan_bangkitan_sedang.map((item) => {
          return item.substansi;
        });

        setSubstansi(substansi_sedang);
        setItem(pemeriksaan_bangkitan_sedang.length + 1);
        break;
      case "Bangkitan tinggi":
        let substansi_tinggi = pemeriksaan_bangkitan_tinggi.map((item) => {
          return item.substansi;
        });

        setSubstansi(substansi_tinggi);
        setItem(pemeriksaan_bangkitan_tinggi.length + 1);
        break;
    }
  }, []);

  const update_status = (value) => {
    setPemeriksaan({
      status: value,
    });
  };

  const catatan = (substansi) => {
    if (pemeriksaan.pemeriksaan != null) {
      let item = pemeriksaan.pemeriksaan.find(
        (item) => item.substansi == substansi
      );

      return item.catatan;
    }
  };

  useEffect(() => {
    if (tambah != "") {
      pemeriksaan.pemeriksaan.map((value) => {
        if (value.substansi == poin) {
          value.catatan.push(tambah);
        }
      });

      setTambah("");
      setPoin("");
    }
  }, [tambah]);

  const remove_item = (substansi, item) => {
    const updated = pemeriksaan.pemeriksaan.map((value) => {
      if (value.substansi == substansi) {
        const index = value.catatan.findIndex((sub) => {
          return sub == item;
        });
        if (index > -1) {
          value.catatan.splice(index, 1);
        }
        return { ...value, catatan: value.catatan };
      }
      return value;
    });

    setPemeriksaan({
      pemeriksaan: updated,
    });
  };

  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < item; i++) {
      if (i == 0) {
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
              Tentukan status dokumen analisis dampak lalu lintas
            </AText>

            <RadioButton.Group onValueChange={(value) => update_status(value)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <RadioButton
                  label={"Dokumen terpenuhi"}
                  value={"Dokumen terpenuhi"}
                  uncheckedColor={color.neutral.neutral300}
                  color={color.primary.primary600}
                  status={
                    pemeriksaan.status === "Dokumen terpenuhi"
                      ? "checked"
                      : "unchecked"
                  }
                />
                <Pressable
                  onPress={() => {
                    update_status("Dokumen terpenuhi");
                  }}
                >
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral700}
                  >
                    Dokumen terpenuhi
                  </AText>
                </Pressable>
              </View>
            </RadioButton.Group>

            <RadioButton.Group onValueChange={(value) => update_status(value)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <RadioButton
                  label={"Dokumen tidak terpenuhi"}
                  value={"Dokumen tidak terpenuhi"}
                  uncheckedColor={color.neutral.neutral300}
                  color={color.primary.primary600}
                  status={
                    pemeriksaan.status === "Dokumen tidak terpenuhi"
                      ? "checked"
                      : "unchecked"
                  }
                />
                <Pressable
                  onPress={() => {
                    update_status("Dokumen tidak terpenuhi");
                  }}
                >
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral700}
                  >
                    Dokumen tidak terpenuhi
                  </AText>
                </Pressable>
              </View>
            </RadioButton.Group>
          </View>
        );
      } else {
        elements.push(
          <ScrollView
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
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
              {substansi[i - 1]}
            </AText>

            {catatan(substansi[i - 1]).length != 0
              ? catatan(substansi[i - 1]).map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 14,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "80%",
                          alignItems: "center",
                        }}
                      >
                        <AText
                          style={{ paddingRight: 4 }}
                          size={16}
                          color={color.neutral.neutral700}
                        >
                          &#x2022;
                        </AText>
                        <AText size={16} color={color.neutral.neutral700}>
                          {item}
                        </AText>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          remove_item(substansi[i - 1], item);
                        }}
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={24}
                          color={color.neutral.neutral900}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              : ""}

            <View style={{ paddingTop: 8 }} />
            <TouchableOpacity
              onPress={() => {
                setTambah("");
                setPoin(substansi[i - 1]);
                toggleTambahCatatan();
              }}
            >
              <AText size={16} color={color.primary.main} weight="semibold">
                + Tambah catatan asistensi
              </AText>
            </TouchableOpacity>

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
    }
    return elements;
  };

  return (
    <View style={styles.container}>
      {generateElements()[index - 1]}
      <ADialogInputText
        title={"Tambah catatan asistensi"}
        hint={"Masukan catatan"}
        visibleModal={tambahCatatan}
        setText={setTambah}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahCatatan();
          setTambah("");
          setPoin("");
        }}
        onPressOKButton={() => {
          toggleTambahCatatan();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
