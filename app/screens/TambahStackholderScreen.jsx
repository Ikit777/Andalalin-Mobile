import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import AButton from "../component/utility/AButton";
import { useStateToggler } from "../hooks/useUtility";
import ATextInput from "../component/utility/ATextInput";

function TambahStackholderScreen({ navigation, route }) {
  const {
    pembahasan: { stackholder },
    setPembahasan,
  } = useContext(UserContext);

  const stackholderRef = React.createRef();
  const namaRef = React.createRef();
  const identitasRef = React.createRef();

  const [stack, setStackholder] = useState("");
  const [nama, setNama] = useState("");
  const [identitas, setIdentitas] = useState("");

  const [formError, toggleFormError] = useStateToggler();

  const [stackholderError, toggleStackholderError] = useStateToggler();
  const [namaError, toggleNamaError] = useStateToggler();
  const [identitasError, toggleIdentitasError] = useStateToggler();

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

  const press = () => {
    if (stack != "" && nama != "" && identitas != "") {
      formError ? toggleFormError() : "";
      const data = {
        stackholder: stack,
        nama: nama,
        identitas: identitas,
      };
      const updated = stackholder;
      updated.push(data);

      setPembahasan({ stackholder: updated });
      navigation.goBack();
    } else {
      stack == ""
        ? toggleStackholderError
          ? ""
          : toggleKategoriUtamaError()
        : "";
      nama == "" ? (namaError ? "" : toggleNamaError()) : "";
      identitas == "" ? (identitasError ? "" : toggleIdentitasError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  const clear_error = () => {
    stack != "" ? (stackholderError ? toggleStackholderError() : "") : "";
    nama != "" ? (namaError ? toggleNamaError() : "") : "";
    identitas != "" ? (identitasError ? toggleIdentitasError() : "") : "";

    stack != "" && nama != "" && identitas != ""
      ? formError
        ? toggleFormError()
        : ""
      : "";
  };

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
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Stackholder
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        nestedScrollEnabled={true}
      >
        <ATextInput
          bdColor={
            stackholderError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan stackholder"}
          title={"Stackholder"}
          wajib={"*"}
          multi={true}
          value={stack}
          ref={stackholderRef}
          onChangeText={(value) => {
            setStackholder(value);
            clear_error();
          }}
        />

        <ATextInput
          bdColor={namaError ? color.error.error500 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama"}
          title={"Nama"}
          wajib={"*"}
          multi={false}
          blur={false}
          padding={20}
          value={nama}
          ref={namaRef}
          onChangeText={(value) => {
            setNama(value);
            clear_error();
          }}
          submit={() => {
            identitasRef.current.focus();
          }}
        />

        <ATextInput
          bdColor={
            identitasError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan identitas"}
          title={"Identitas"}
          rtype={"done"}
          multi={false}
          padding={20}
          wajib={"*"}
          blur={true}
          value={identitas}
          ref={identitasRef}
          onChangeText={(value) => {
            setIdentitas(value);
            clear_error();
          }}
        />

        <AText
          style={{ paddingTop: 8 }}
          color={color.neutral.neutral300}
          size={14}
          weight="normal"
        >
          Keterangan: Identitas dapat terdiri dari NIP, NRP, atau yang lainnya
          seperti NIP. **** **** *****
        </AText>

        {formError ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Lengkapi formulir atau kolom yang tersedia dengan benar
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={{ marginTop: 32, marginBottom: 50 }}
          title={"Tambah"}
          mode="contained"
          onPress={() => {
            press();
          }}
        />
      </ScrollView>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default TambahStackholderScreen;
