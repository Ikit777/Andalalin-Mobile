import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import { RadioButton } from "react-native-paper";
import ADatePicker from "../utility/ADatePicker";
import { useStateToggler } from "../../hooks/useUtility";

export default function AdministrasiItem({ navigation, route }) {
  const { administrasi, setAdministrasi } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);
  const [master, setMaster] = useState();

  const [dateModal, toggleDateModal] = useStateToggler();

  const cek = "&#10003;";

  const onChange = (date) => {
    setAdministrasi({
      tanggal_surat: date,
    });
  };

  useEffect(() => {
    const andalalin =
      context.dataMaster.persyaratan.PersyaratanAndalalin.filter((item) => {
        return item.bangkitan == context.detailPermohonan.kategori_bangkitan;
      });

    if (andalalin != null) {
      let dokumen = andalalin.map((item) => {
        return item.persyaratan;
      });

      setMaster(dokumen);
      setItem(andalalin.length + 1);
    }
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

  const update_keterangan = (persyaratan, keterangan) => {
    itemIndeks = administrasi.administrasi.findIndex(
      (item) => item.persyaratan == persyaratan
    );
    const updatedItem = {
      ...administrasi.administrasi[itemIndeks],
      keterangan: keterangan,
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
      if (i == 0) {
        elements.push(
          <View
            style={{
              flex: 1,
              backgroundColor: color.primary.primary25,
            }}
          >
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan nomor surat"}
              title={"Nomor surat permohonan"}
              rtype={"done"}
              padding={20}
              multi={false}
              blur={true}
              value={administrasi.nomor_surat}
              onChangeText={(value) => {
                setAdministrasi({
                  nomor_surat: value,
                });
              }}
            />

            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan tanggal surat"}
              title={"Tanggal surat permohonan"}
              padding={20}
              icon={"calendar"}
              value={administrasi.tanggal_surat}
              onPress={() => {
                toggleDateModal();
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

            <ADatePicker
              visibleModal={dateModal}
              onPressOKButton={() => {
                toggleDateModal();
              }}
              onPressBATALButton={() => {
                toggleDateModal();
              }}
              pilih={onChange}
            />
          </View>
        );
      } else {
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
              {master[i - 1]}
            </AText>
            <RadioButton.Group
              onValueChange={(value) => update_ada(master[i - 1], value)}
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
                    check(master[i - 1]).ada === "&#10003;"
                      ? "checked"
                      : "unchecked"
                  }
                />
                <Pressable
                  onPress={() => {
                    update_ada(master[i - 1], "&#10003;");
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
              onValueChange={(value) => update_tidak(master[i - 1], value)}
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
                    check(master[i - 1]).tidak === "&#10003;"
                      ? "checked"
                      : "unchecked"
                  }
                />
                <Pressable
                  onPress={() => {
                    update_tidak(master[i - 1], "&#10003;");
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
              value={check(master[i - 1]).keterangan}
              onChangeText={(value) => {
                update_keterangan(master[i - 1], value);
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
