import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import { RadioButton } from "react-native-paper";

export default function AdministrasiPerlalinItem({ navigation, route }) {
  const { administrasi, setAdministrasi } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);
  const [master, setMaster] = useState();

  const cek = "&#10003;";

  useEffect(() => {
    let dokumen = context.dataMaster.persyaratan.PersyaratanPerlalin.map(
      (item) => {
        return item.persyaratan;
      }
    );

    setMaster(dokumen);
    setItem(context.dataMaster.persyaratan.PersyaratanPerlalin.length);
  }, []);

  const check = (persyaratan) => {
    if (administrasi.administrasi != null) {
      let item = administrasi.administrasi.find(
        (item) => item.persyaratan == persyaratan
      );

      return item;
    }
  };

  const update_ada = (persyaratan, ada) => {
    itemIndeks = administrasi.administrasi.findIndex(
      (item) => item.persyaratan == persyaratan
    );
    const updatedItem = {
      ...administrasi.administrasi[itemIndeks],
      ada: ada,
      tidak: "",
    };

    const updatedItems = [...administrasi.administrasi];
    updatedItems[itemIndeks] = updatedItem;

    setAdministrasi({
      administrasi: updatedItems,
    });
  };

  const update_tidak = (persyaratan, tidak) => {
    itemIndeks = administrasi.administrasi.findIndex(
      (item) => item.persyaratan == persyaratan
    );
    const updatedItem = {
      ...administrasi.administrasi[itemIndeks],
      ada: "",
      tidak: tidak,
    };

    const updatedItems = [...administrasi.administrasi];
    updatedItems[itemIndeks] = updatedItem;

    setAdministrasi({
      administrasi: updatedItems,
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
                  check(master[i]).ada === "&#10003;"
                    ? "checked"
                    : "unchecked"
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
