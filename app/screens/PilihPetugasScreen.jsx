import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  Image,
  TextInput,
  useWindowDimensions,
  RefreshControl
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { authRefreshToken } from "../api/auth";
import { userPetugas } from "../api/user";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import { Feather } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import AButton from "../component/utility/AButton";
import { poppins } from "../constants/font";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { andalalinGantiPetugas, andalalinPilihPetugas } from "../api/andalalin";

function PilihPetugasScreen({ navigation, route }) {
  const context = useContext(UserContext);

  const kondisi = route.params.kondisi;
  const permohonan = route.params.permohonan;

  const [petugas, setPetugas] = useState("petugas");
  const [petugasDefault, setPetugasDefault] = useState("petugas");
  const [gagal, toggleGagal] = useStateToggler();
  const [simpanGagal, toggleSimpanGagal] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [dataOn, setDataOn] = useState(false);

  const [pilih, setPilih] = useState();
  const [pencarian, setPencarian] = useState();
  const windowHeight = useWindowDimensions().height;

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);

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

  useEffect(() => {
    context.toggleLoading(true);
    load_petugas();
    if (kondisi == "Ganti") {
      ganti_petugas = {
        id: permohonan.id_petugas,
        name: permohonan.nama_petugas,
        email: permohonan.email_petugas,
      };
      setPilih(ganti_petugas);
    }
  }, []);

  const load_petugas = () => {
    userPetugas(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            if (result.results == 0) {
              setDataOn(true);
              context.toggleLoading(false);
            } else {
              setPetugas(result.data);
              setPetugasDefault(result.data);
              setDataOn(false);
              context.toggleLoading(false);
            }
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              load_petugas();
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
    });
  };

  const search = (nama) => {
    if (nama) {
      const newData = petugasDefault.filter(function (item) {
        return item.name.indexOf(nama) > -1;
      });
      setPetugas(newData);
      setPencarian(nama);
    } else {
      setPetugas(petugasDefault);
      setPencarian(nama);
    }
  };

  const doPilih = () => {
    switch (kondisi) {
      case "Pilih":
        andalalinPilihPetugas(
          permohonan.id_andalalin,
          pilih,
          context.getUser().access_token,
          (response) => {
            switch (response.status) {
              case 200:
                navigation.replace("Detail", { id: permohonan.id_andalalin });
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    doPilih();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                toggleSimpanGagal();
                break;
            }
          }
        );
        break;
      case "Ganti":
        andalalinGantiPetugas(
          permohonan.id_andalalin,
          pilih,
          context.getUser().access_token,
          (response) => {
            switch (response.status) {
              case 200:
                navigation.replace("Detail", { id: permohonan.id_andalalin });
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    doPilih();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                toggleSimpanGagal();
                break;
            }
          }
        );
        break;
    }
  };

  const judul = () => {
    switch (kondisi) {
      case "Pilih":
        return "Pilih petugas";
      case "Ganti":
        return "Ganti petugas";
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      load_petugas();
    }, 50);
  }, []);


  return (
    <AScreen style={{ minHeight: Math.round(windowHeight) }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        {petugas != "petugas" ? (
          <View style={styles.searchInput}>
            <Feather
              style={{ paddingLeft: 14 }}
              name="search"
              size={20}
              color={color.primary.main}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={color.neutral.neutral500}
              allowFontScaling={false}
              placeholder="Pencarian nama"
              selectionColor={color.neutral.neutral400}
              autoComplete="off"
              returnKeyType="search"
              value={pencarian}
              onChangeText={(value) => {
                search(value);
              }}
              onSubmitEditing={() => search(pencarian)}
            />
          </View>
        ) : (
          ""
        )}

        {petugas != "petugas" ? (
          <FlatList
            data={petugas}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[color.primary.primary500]} progressViewOffset={progressViewOffset}/>
            }
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 24 }}>
                <RadioButton.Group onValueChange={(value) => setPilih(value)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      label={item}
                      value={item}
                      uncheckedColor={color.neutral.neutral300}
                      color={color.primary.primary600}
                      status={
                        pilih != null
                          ? pilih.id === item.id
                            ? "checked"
                            : "unchecked"
                          : pilih === item
                          ? "checked"
                          : "unchecked"
                      }
                    />
                    <Image
                      style={{
                        marginLeft: 16,
                        width: 40,
                        height: 40,
                        borderRadius: 150 / 2,
                        overflow: "hidden",
                      }} // Set your desired dimensions
                      source={{ uri: `data:image/png;base64,${item.photo}` }}
                    />

                    <View style={{ flexDirection: "column" }}>
                      <AText
                        style={{ paddingLeft: 20 }}
                        size={14}
                        color={color.neutral.neutral900}
                      >
                        {item.name}
                      </AText>
                      <AText
                        style={{ paddingLeft: 20 }}
                        size={12}
                        color={color.neutral.neutral500}
                      >
                        {item.email}
                      </AText>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            )}
          />
        ) : (
          ""
        )}

        {dataOn ? (
          <View
            style={{
              alignItems: "center",
              height: "80%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderColor: color.primary.primary50,
                borderWidth: 8,
                borderRadius: 40,
                backgroundColor: color.primary.primary100,
              }}
            >
              <Feather
                style={{ padding: 14 }}
                name="frown"
                size={28}
                color={color.primary.main}
              />
            </View>
            <AText
              style={{ paddingTop: 16 }}
              size={20}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Petugas
            </AText>
            <AText size={20} color={color.neutral.neutral900} weight="normal">
              Belum ada
            </AText>
          </View>
        ) : (
          ""
        )}
      </View>
      {petugas != "petugas" ? (
        <View
          style={{
            position: "absolute",
            bottom: 32,
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <AButton
            title={judul()}
            mode="contained"
            onPress={() => {
              toggleKonfirmasi();
            }}
          />
        </View>
      ) : (
        ""
      )}

      <ADialog
        title={"Memuat petugas gagal"}
        desc={"Petugas gagal dimuat, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.goBack();
        }}
      />

      <ADialog
        title={
          kondisi == "Pilih" ? "Pilih petugas gagal" : "Ganti petugas gagal"
        }
        desc={
          kondisi == "Pilih"
            ? "Petugas gagal dipilih, silahkan coba lagi"
            : "Petugas gagal diganti, silahkan coba lagi"
        }
        visibleModal={simpanGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSimpanGagal();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan petugas?"}
        visibleModal={konfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          context.toggleLoading(true);
          doPilih();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    padding: 16,
    maxHeight: "81%",
    flex: 1,
  },
  searchInput: {
    backgroundColor: color.text.white,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    boderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 6,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: poppins.normal,
    fontSize: 16,
    color: color.neutral.neutral700,
    width: "100%",
  },
});

export default PilihPetugasScreen;
