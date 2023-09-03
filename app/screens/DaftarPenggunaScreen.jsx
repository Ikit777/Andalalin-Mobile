import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  Image,
  TextInput,
  useWindowDimensions,
  Pressable,
  RefreshControl,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { poppins } from "../constants/font";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { userAll, userDelete } from "../api/user";
import ABottomSheet from "../component/utility/ABottomSheet";
import ASnackBar from "../component/utility/ASnackBar";

function DaftarPenggunaScreen({ navigation }) {
  const context = useContext(UserContext);

  const [pengguna, setPengguna] = useState();
  const [penggunaDefault, setPenggunaDefault] = useState();
  const [gagal, toggleGagal] = useStateToggler();
  const [hapusGagal, toggleHapusGagal] = useStateToggler();
  const [hapusBerhasil, toggleHapusBerhasil] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [dataOn, setDataOn] = useState(false);
  const [message, setMessage] = useState();
  const [pencarian, setPencarian] = useState();
  const windowHeight = useWindowDimensions().height;
  const [pilih, setPilih] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);

  const [hapusModal, toggleHapusModal] = useStateToggler();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-1000);
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-1000);
      navigation.goBack();
      return true;
    });
  }, []);

  useEffect(() => {
    context.toggleLoading(true);
    load_pengguna();
  }, []);

  const load_pengguna = () => {
    userAll(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            if (result.results == 0) {
              setDataOn(true);
              context.toggleLoading(false);
            } else {
              setPengguna(result.data);
              setPenggunaDefault(result.data);
              setDataOn(false);
              context.toggleLoading(false);
            }
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              load_pengguna();
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
      const newData = penggunaDefault.filter(function (item) {
        return item.name.indexOf(nama) > -1 || item.role.indexOf(nama) > -1;
      });
      setPengguna(newData);
      setPencarian(nama);
    } else {
      setPengguna(penggunaDefault);
      setPencarian(nama);
    }
  };

  const showSnackbar = () => {
    toggleHapusBerhasil();
    setPilih("");
    setPencarian("");
    setTimeout(() => {
      toggleHapusBerhasil();
    }, 3000);
  };

  const removeItem = (item) => {
    const index = pengguna.indexOf(item);
    if (index > -1) {
      pengguna.splice(index, 1);
    }
  };

  const hapus = () => {
    userDelete(context.getUser().access_token, pilih, (response) => {
      switch (response.status) {
        case 201:
          context.toggleLoading(false);
          removeItem(pilih);
          setMessage("Hapus pengguna berhasil");
          showSnackbar();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              hapus();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleHapusGagal();
          break;
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      load_pengguna();
    }, 50);
  }, []);

  return (
    <AScreen style={{ minHeight: Math.round(windowHeight) }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              setProgressViewOffset(-1000);
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Daftar pengguna
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        {pengguna != null ? (
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
              placeholder="Pencarian nama atau peran"
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

        {pengguna != null ? (
          <FlatList
            data={pengguna}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[color.primary.primary500]}
                progressViewOffset={progressViewOffset}
              />
            }
            renderItem={({ item }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{
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
                    <AText
                      style={{ paddingLeft: 20 }}
                      size={12}
                      color={color.neutral.neutral500}
                    >
                      {item.role}
                    </AText>
                  </View>
                </View>
                <Pressable
                  style={{ flexDirection: "row", padding: 8 }}
                  onPress={() => {
                    toggleHapusModal();
                    setPilih(item);
                  }}
                >
                  <Feather
                    name="more-vertical"
                    size={20}
                    color={color.neutral.neutral900}
                  />
                </Pressable>
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
              pengguna
            </AText>
            <AText size={20} color={color.neutral.neutral900} weight="normal">
              Belum ada
            </AText>
          </View>
        ) : (
          ""
        )}
      </View>

      <ABottomSheet visible={hapusModal}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AText size={18} color={color.neutral.neutral700} weight="semibold">
              Pilihan
            </AText>
            <Pressable
              style={{ flexDirection: "row", padding: 8 }}
              onPress={() => {
                toggleHapusModal();
                setPilih("");
              }}
            >
              <Feather name="x" size={20} color={color.neutral.neutral900} />
            </Pressable>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              padding: 8,
              marginTop: 24,
              marginBottom: 32,
            }}
            onPress={() => {
              toggleHapusModal();
              toggleKonfirmasi();
            }}
          >
            <Feather
              name="trash-2"
              size={20}
              color={color.neutral.neutral900}
            />
            <AText
              style={{ paddingLeft: 16 }}
              size={14}
              color={color.neutral.neutral700}
            >
              Hapus
            </AText>
          </Pressable>
        </View>
      </ABottomSheet>

      <ADialog
        title={"Memuat pengguna gagal"}
        desc={"Pengguna gagal dimuat, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.goBack();
        }}
      />

      <ADialog
        title={"Hapus pengguna gagal"}
        desc={"Hapus pengguna gagal, silahkan coba kembali"}
        visibleModal={hapusGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleHapusGagal();
          setPilih("");
        }}
      />

      <AConfirmationDialog
        title={"Hapus"}
        desc={"Apakah Anda yakin ingin hapus pengguna ini?"}
        visibleModal={konfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          context.toggleLoading(true);
          hapus();
        }}
      />

      <View style={{ paddingHorizontal: 16 }}>
        {hapusBerhasil ? (
          <ASnackBar visible={hapusBerhasil} message={message} />
        ) : (
          ""
        )}
      </View>
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

export default DaftarPenggunaScreen;
