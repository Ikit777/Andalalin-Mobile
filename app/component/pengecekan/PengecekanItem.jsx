import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import { RadioButton } from "react-native-paper";
import { useStateToggler } from "../../hooks/useUtility";
import ATextInput from "../utility/ATextInput";

export default function PengecekanItem({ navigation, route }) {
  const { pemeriksaanPerlengkapan, setPemeriksaanPerlengkapan } =
    useContext(UserContext);

  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);

  const cek = "&#10003;";

  useEffect(() => {
    setItem(context.detailPermohonan.perlengkapan.length);
  }, []);

  const check = (id) => {
    if (pemeriksaanPerlengkapan.pemeriksaan != null) {
      let item = pemeriksaanPerlengkapan.pemeriksaan.find(
        (item) => item.id == id
      );

      return item;
    }
  };

  const update_terima = (id, setuju) => {
    itemIndeks = pemeriksaanPerlengkapan.pemeriksaan.findIndex(
      (item) => item.id == id
    );
    const updatedItem = {
      ...pemeriksaanPerlengkapan.pemeriksaan[itemIndeks],
      setuju: setuju,
      tidak: "",
    };

    const updatedItems = [...pemeriksaanPerlengkapan.pemeriksaan];
    updatedItems[itemIndeks] = updatedItem;

    setPemeriksaanPerlengkapan({
      pemeriksaan: updatedItems,
    });
  };

  const update_tidak = (id, tidak) => {
    itemIndeks = pemeriksaanPerlengkapan.pemeriksaan.findIndex(
      (item) => item.id == id
    );
    const updatedItem = {
      ...pemeriksaanPerlengkapan.pemeriksaan[itemIndeks],
      setuju: "",
      tidak: tidak,
    };

    const updatedItems = [...pemeriksaanPerlengkapan.pemeriksaan];
    updatedItems[itemIndeks] = updatedItem;

    setPemeriksaanPerlengkapan({
      pemeriksaan: updatedItems,
    });
  };

  const update_keterangan = (id, pertimbangan) => {
    itemIndeks = pemeriksaanPerlengkapan.pemeriksaan.findIndex(
      (item) => item.id == id
    );
    const updatedItem = {
      ...pemeriksaanPerlengkapan.pemeriksaan[itemIndeks],
      pertimbangan: pertimbangan,
    };

    const updatedItems = [...pemeriksaanPerlengkapan.pemeriksaan];
    updatedItems[itemIndeks] = updatedItem;

    setPemeriksaanPerlengkapan({
      pemeriksaan: updatedItems,
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              paddingHorizontal: 8,
            }}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
              }}
              source={{
                uri: `data:image/png;base64,${context.detailPermohonan.perlengkapan[i].gambar}`,
              }}
            />
            <View style={{ paddingLeft: 16 }}>
              <AText
                style={{ width: "35%" }}
                size={16}
                color={color.neutral.neutral800}
                weight="semibold"
              >
                {context.detailPermohonan.perlengkapan[i].perlengkapan}
              </AText>
              <AText
                style={{ width: "30%" }}
                size={14}
                color={color.neutral.neutral400}
                weight="normal"
              >
                {context.detailPermohonan.perlengkapan[i].pemasangan}
              </AText>
            </View>
          </View>

          <RadioButton.Group
            onValueChange={(value) =>
              update_terima(
                context.detailPermohonan.perlengkapan[i].id_perlengkapan,
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
                  check(
                    context.detailPermohonan.perlengkapan[i].id_perlengkapan
                  ).setuju === "&#10003;"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  update_terima(
                    context.detailPermohonan.perlengkapan[i].id_perlengkapan,
                    "&#10003;"
                  );
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Setuju
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
          <RadioButton.Group
            onValueChange={(value) =>
              update_tidak(
                context.detailPermohonan.perlengkapan[i].id_perlengkapan,
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
                  check(
                    context.detailPermohonan.perlengkapan[i].id_perlengkapan
                  ).tidak === "&#10003;"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  update_tidak(
                    context.detailPermohonan.perlengkapan[i].id_perlengkapan,
                    "&#10003;"
                  );
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Tidak Setuju
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>

          <ATextInput
            bdColor={color.neutral.neutral300}
            ktype={"default"}
            hint={"Masukkan pertimbangan"}
            title={"Pertimbangan"}
            padding={20}
            multi={true}
            value={
              check(context.detailPermohonan.perlengkapan[i].id_perlengkapan)
                .pertimbangan
            }
            onChangeText={(value) => {
              update_keterangan(
                context.detailPermohonan.perlengkapan[i].id_perlengkapan,
                value
              );
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
              Tinjau perlengkapan!
            </AText>

            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Detail perlengkapan", {
                  id: context.detailPermohonan.perlengkapan[i].id_perlengkapan,
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
