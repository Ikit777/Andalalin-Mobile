import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  RefreshControl,
  FlatList,
  Pressable,
  Platform,
  UIManager,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import ABottomSheet from "../component/utility/ABottomSheet";
import { useStateToggler } from "../hooks/useUtility";
import ATextInput from "../component/utility/ATextInput";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import ADialog from "../component/utility/ADialog";
import {
  masterEditKategori,
  masterEditLokasiPengambilan,
  masterEditPersyaratanAndalalin,
  masterEditPersyaratanRambulalin,
  masterEditRencanaPembangunan,
  masterHapusKategori,
  masterHapusLokasiPengambilan,
  masterHapusPersyaratanAndalalin,
  masterHapusPersyaratanRambulalin,
  masterHapusRencanaPembangunan,
  masterTambahKategori,
  masterTambahLokasiPengambilan,
  masterTambahPersyaratanAndalalin,
  masterTambahPersyaratanRambulalin,
  masterTambahRencanaPembangunan,
} from "../api/master";
import { authRefreshToken } from "../api/auth";
import ASnackBar from "../component/utility/ASnackBar";
import ADropDownCostume from "../component/utility/ADropdownCostume";
import AJenisDropdown from "../component/utility/AJenisDropdown";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function DaftarProdukScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;
  const [data, setData] = useState();
  const [pilih, setPilih] = useState();
  const [pilih2, setPilih2] = useState();
  const [dataOn, setDataOn] = useState(false);

  const [tambah, toggleTambah] = useStateToggler();
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  const [tambahGagal, toggleTambahGagal] = useStateToggler();
  const [tambahConfirms, toggleTambahConfirms] = useStateToggler();
  const [dataExist, toggleDataExist] = useStateToggler();

  const [message, setMessage] = useState();
  const [snack, toggleSnack] = useStateToggler();

  const [tindakan, toggleTindakan] = useStateToggler();
  const [hapusConfirms, toggleHapusConfirms] = useStateToggler();
  const [hapusGagal, toggleHapusGagal] = useStateToggler();
  const [edit, toggleEdit] = useStateToggler();
  const [editConfirms, toggleEditConfirms] = useStateToggler();
  const [editGagal, toggleEditGagal] = useStateToggler();

  const [kategori, setKategori] = useState();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Pengelolaan");
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.navigate("Pengelolaan");
      return true;
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      load();
    });
    return unsubscribe;
  }, [navigation]);

  const judul = () => {
    switch (kondisi) {
      case "Lokasi":
        return "Lokasi pengambilan";
      case "Kategori":
        return "Kategori pembangunan";
      case "Jenis":
        return "Jenis pembangunan";
      case "Andalalin":
        return "Tambah persyaratan";
      case "Rambulalin":
        return "Tambah persyaratan";
    }
  };

  const title = () => {
    switch (kondisi) {
      case "Lokasi":
        return "Lokasi pengambilan";
      case "Kategori":
        return "Kategori pembangunan";
      case "Jenis":
        return "Jenis pembangunan";
      case "Andalalin":
        return "Persyaratan andalalin";
      case "Rambulalin":
        return "Persyaratan rambulalin";
    }
  };

  const load = () => {
    switch (kondisi) {
      case "Lokasi":
        context.toggleLoading(true);

        setTimeout(() => {
          if (context.dataMaster.lokasi_pengambilan == null) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            setData(context.dataMaster.lokasi_pengambilan);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
      case "Kategori":
        context.toggleLoading(true);

        setTimeout(() => {
          if (context.dataMaster.jenis_rencana == 0) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            const kategori = context.dataMaster.jenis_rencana.filter((item) => {
              return item !== "Lainnya";
            });
            setData(kategori);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
      case "Jenis":
        context.toggleLoading(true);
        const items = context.dataMaster.jenis_rencana.filter(
          (item) => item !== "Lainnya"
        );

        let jenis_rencana = items.map((item) => {
          return { value: item };
        });

        setKategori(jenis_rencana);

        setTimeout(() => {
          if (context.dataMaster.rencana_pembangunan == 0) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            setData(context.dataMaster.rencana_pembangunan);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
      case "Andalalin":
        context.toggleLoading(true);

        setTimeout(() => {
          if (
            context.dataMaster.persyaratan_tambahan
              .PersyaratanTambahanAndalalin.length == 0
          ) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            let persyaratan =
              context.dataMaster.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
                (item) => {
                  return item.persyaratan;
                }
              );
            setData(persyaratan);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
      case "Rambulalin":
        context.toggleLoading(true);

        setTimeout(() => {
          if (
            context.dataMaster.persyaratan_tambahan
              .PersyaratanTambahanRambulalin.length == 0
          ) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            let persyaratan =
              context.dataMaster.persyaratan_tambahan.PersyaratanTambahanRambulalin.map(
                (item) => {
                  return item.persyaratan;
                }
              );
            setData(persyaratan);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
    }
  };

  const getKeterangan = (pilihan) => {
    switch (kondisi) {
      case "Andalalin":
        let keteranganAndalalin =
          context.dataMaster.persyaratan_tambahan.PersyaratanTambahanAndalalin.find(
            (item) => {
              return item.persyaratan == pilihan;
            }
          );
        return keteranganAndalalin.keterangan;
      case "Rambulalin":
        let keteranganRambulalin =
          context.dataMaster.persyaratan_tambahan.PersyaratanTambahanRambulalin.find(
            (item) => {
              return item.persyaratan == pilihan;
            }
          );
        return keteranganRambulalin.keterangan;
    }
  };

  const list = () => {
    switch (kondisi) {
      case "Lokasi":
        return (
          <FlatList
            style={{ paddingTop: 12 }}
            data={data}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 150 / 2,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: color.primary.primary100,
                    }}
                  >
                    <AText size={16} color={color.primary.primary800}>
                      {index + 1}
                    </AText>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <AText
                      style={{ paddingLeft: 20 }}
                      size={14}
                      color={color.neutral.neutral900}
                    >
                      {item}
                    </AText>
                  </View>
                </View>
                <Pressable
                  style={{ flexDirection: "row", padding: 8 }}
                  onPress={() => {
                    setPilih(item);
                    toggleTindakan();
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
        );
      case "Kategori":
        return (
          <FlatList
            style={{ paddingTop: 12 }}
            data={data}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 150 / 2,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: color.primary.primary100,
                    }}
                  >
                    <AText size={16} color={color.primary.primary800}>
                      {index + 1}
                    </AText>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <AText
                      style={{ paddingLeft: 20 }}
                      size={14}
                      color={color.neutral.neutral900}
                    >
                      {item}
                    </AText>
                  </View>
                </View>
                <Pressable
                  style={{ flexDirection: "row", padding: 8 }}
                  onPress={() => {
                    setPilih(item);
                    toggleTindakan();
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
        );
      case "Jenis":
        return (
          <FlatList
            data={data}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item: pembangunan, index }) => (
              <AJenisDropdown
                hint={pembangunan.Kategori}
                padding={index + 1 == 1 ? 0 : 20}
                bdColor={color.neutral.neutral300}
              >
                <FlatList
                  style={{ paddingTop: 16, flex: 1 }}
                  data={pembangunan.JenisRencana}
                  overScrollMode="never"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  vertical
                  renderItem={({ item: jenis, index }) => (
                    <View
                      style={{
                        paddingBottom:
                          index + 1 == pembangunan.JenisRencana.length ? 0 : 24,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 150 / 2,
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: color.primary.primary100,
                          }}
                        >
                          <AText size={16} color={color.primary.primary800}>
                            {index + 1}
                          </AText>
                        </View>

                        <View style={{ flexDirection: "column" }}>
                          <AText
                            style={{ paddingLeft: 20 }}
                            size={14}
                            color={color.neutral.neutral900}
                          >
                            {jenis}
                          </AText>
                        </View>
                      </View>
                      <Pressable
                        style={{ flexDirection: "row", padding: 8 }}
                        onPress={() => {
                          setPilih(jenis);
                          setPilih2(pembangunan.Kategori);
                          toggleTindakan();
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
              </AJenisDropdown>
            )}
          />
        );
      case "Andalalin":
        return (
          <FlatList
            style={{ paddingTop: 12 }}
            data={data}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 150 / 2,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: color.primary.primary100,
                    }}
                  >
                    <AText size={16} color={color.primary.primary800}>
                      {index + 1}
                    </AText>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <AText
                      style={{ paddingLeft: 20 }}
                      size={14}
                      color={color.neutral.neutral900}
                    >
                      {item}
                    </AText>
                  </View>
                </View>
                <Pressable
                  style={{ flexDirection: "row", padding: 8 }}
                  onPress={() => {
                    setPilih(item);
                    toggleTindakan();
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
        );
      case "Rambulalin":
        return (
          <FlatList
            style={{ paddingTop: 12 }}
            data={data}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 150 / 2,
                      overflow: "hidden",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: color.primary.primary100,
                    }}
                  >
                    <AText size={16} color={color.primary.primary800}>
                      {index + 1}
                    </AText>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <AText
                      style={{ paddingLeft: 20 }}
                      size={14}
                      color={color.neutral.neutral900}
                    >
                      {item}
                    </AText>
                  </View>
                </View>
                <Pressable
                  style={{ flexDirection: "row", padding: 8 }}
                  onPress={() => {
                    setPilih(item);
                    toggleTindakan();
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
        );
    }
  };

  const kosong = () => {
    return (
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
          Data
        </AText>
        <AText size={20} color={color.neutral.neutral900} weight="normal">
          Belum ada
        </AText>
      </View>
    );
  };

  const tambah_view = () => {
    switch (kondisi) {
      case "Lokasi":
        return (
          <View style={{ height: 278 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah lokasi pengambilan
              </AText>
            </View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan lokasi"}
              rtype={"done"}
              multi={true}
              max={4}
              maxHeight={90}
              value={input}
              onChangeText={(value) => {
                setInput(value);
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 80,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setInput("");
                  toggleTambah();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </Pressable>

              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (input != "") {
                    toggleTambah();
                    toggleTambahConfirms();
                  }
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Simpan
                </AText>
              </Pressable>
            </View>
          </View>
        );
      case "Kategori":
        return (
          <View style={{ height: 278 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah kategori pembangunan
              </AText>
            </View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan kategori"}
              rtype={"done"}
              multi={true}
              max={4}
              maxHeight={90}
              value={input}
              onChangeText={(value) => {
                setInput(value);
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 80,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setInput("");
                  toggleTambah();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </Pressable>

              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (input != "") {
                    toggleTambah();
                    toggleTambahConfirms();
                  }
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Simpan
                </AText>
              </Pressable>
            </View>
          </View>
        );
      case "Jenis":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah jenis pembangunan
              </AText>
            </View>
            <ADropDownCostume
              hint={"Pilih kategori"}
              saved={""}
              data={kategori}
              selected={setPilih}
              bdColor={color.neutral.neutral300}
              max={300}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan jenis pembangunan"}
              rtype={"done"}
              multi={true}
              max={4}
              maxHeight={90}
              value={input}
              onChangeText={(value) => {
                setInput(value);
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 80,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setInput("");
                  toggleTambah();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </Pressable>

              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (input != "" && pilih != "") {
                    toggleTambah();
                    toggleTambahConfirms();
                  }
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Simpan
                </AText>
              </Pressable>
            </View>
          </View>
        );
      case "Andalalin":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah persyaratan andalalin
              </AText>
            </View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan persyaratan tambahan"}
              rtype={"done"}
              multi={true}
              max={1}
              maxHeight={90}
              value={input}
              onChangeText={(value) => {
                setInput(value);
              }}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan keterangan persyaratan"}
              rtype={"done"}
              multi={true}
              max={4}
              maxHeight={90}
              value={input2}
              onChangeText={(value) => {
                setInput2(value);
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 80,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setInput("");
                  setInput2("");
                  toggleTambah();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </Pressable>

              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (input != "" && input2 != "") {
                    toggleTambah();
                    toggleTambahConfirms();
                  }
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Simpan
                </AText>
              </Pressable>
            </View>
          </View>
        );
      case "Rambulalin":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah persyaratan rambulalin
              </AText>
            </View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan persyaratan tambahan"}
              rtype={"done"}
              multi={true}
              max={1}
              maxHeight={90}
              value={input}
              onChangeText={(value) => {
                setInput(value);
              }}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan keterangan persyaratan"}
              rtype={"done"}
              multi={true}
              max={4}
              maxHeight={90}
              value={input2}
              onChangeText={(value) => {
                setInput2(value);
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 80,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setInput("");
                  setInput2("");
                  toggleTambah();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </Pressable>

              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (input != "" && input2 != "") {
                    toggleTambah();
                    toggleTambahConfirms();
                  }
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Simpan
                </AText>
              </Pressable>
            </View>
          </View>
        );
        break;
    }
  };

  const tindakan_content = () => {
    if (!edit) {
      return (
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
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              padding: 8,
              marginTop: 24,
            }}
            onPress={() => {
              toggleEdit();
              switch (kondisi) {
                case "Andalalin":
                  setInput(pilih);
                  setInput2(getKeterangan(pilih));
                  break;
                case "Rambulalin":
                  setInput(pilih);
                  setInput2(getKeterangan(pilih));
                  break;
                default:
                  setInput(pilih);
                  break;
              }
            }}
          >
            <Feather name="edit-2" size={20} color={color.neutral.neutral900} />
            <AText
              style={{ paddingLeft: 16 }}
              size={14}
              color={color.neutral.neutral700}
            >
              Edit
            </AText>
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              padding: 8,
              marginTop: 8,
              marginBottom: 32,
            }}
            onPress={() => {
              if (pilih != "") {
                toggleTindakan();
                toggleHapusConfirms();
              }
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

          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              marginRight: 16,
              marginBottom: 16,
            }}
          >
            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                toggleTindakan();
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Batal
              </AText>
            </Pressable>
          </View>
        </View>
      );
    } else {
      switch (kondisi) {
        case "Andalalin":
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Edit persyaratan andalalin
                </AText>
              </View>
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan persyaratan tambahan"}
                rtype={"done"}
                multi={true}
                max={1}
                maxHeight={90}
                value={input}
                onChangeText={(value) => {
                  setInput(value);
                }}
              />
              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan keterangan persyaratan"}
                rtype={"done"}
                multi={true}
                max={4}
                maxHeight={90}
                value={input2}
                onChangeText={(value) => {
                  setInput2(value);
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginTop: 80,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <Pressable
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setInput2("");
                    toggleTindakan();
                    toggleEdit();
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Batal
                  </AText>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (input != "" && input2 != "") {
                      toggleTindakan();
                      toggleEdit();
                      toggleEditConfirms();
                    }
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Simpan
                  </AText>
                </Pressable>
              </View>
            </View>
          );
        case "Rambulalin":
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Edit persyaratan rambulalin
                </AText>
              </View>
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan persyaratan tambahan"}
                rtype={"done"}
                multi={true}
                max={1}
                maxHeight={90}
                value={input}
                onChangeText={(value) => {
                  setInput(value);
                }}
              />
              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan keterangan persyaratan"}
                rtype={"done"}
                multi={true}
                max={4}
                maxHeight={90}
                value={input2}
                onChangeText={(value) => {
                  setInput2(value);
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginTop: 80,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <Pressable
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setInput2("");
                    toggleTindakan();
                    toggleEdit();
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Batal
                  </AText>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (input != "" && input2 != "") {
                      toggleTindakan();
                      toggleEdit();
                      toggleEditConfirms();
                    }
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Simpan
                  </AText>
                </Pressable>
              </View>
            </View>
          );
        default:
          return (
            <View style={{ height: 278 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Edit {judul().toLowerCase()}
                </AText>
              </View>
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan " + judul().toLowerCase()}
                rtype={"done"}
                multi={true}
                max={4}
                maxHeight={90}
                value={input}
                onChangeText={(value) => {
                  setInput(value);
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginTop: 80,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <Pressable
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    toggleTindakan();
                    toggleEdit();
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Batal
                  </AText>
                </Pressable>

                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (input != "" && input != pilih) {
                      toggleTindakan();
                      toggleEdit();
                      toggleEditConfirms();
                    }
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Simpan
                  </AText>
                </Pressable>
              </View>
            </View>
          );
      }
    }
  };

  const tindakan_view = () => {
    return <View>{tindakan_content()}</View>;
  };

  const tambah_data = () => {
    switch (kondisi) {
      case "Lokasi":
        masterTambahLokasiPengambilan(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  setData(result.data.lokasi_pengambilan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Lokasi pengambilan berhasil ditambahkan");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 409:
                context.toggleLoading(false);
                setInput("");
                toggleDataExist();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    tambah_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                toggleTambahGagal();
                break;
            }
          }
        );
        break;
      case "Kategori":
        masterTambahKategori(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  const kategori = result.data.jenis_rencana.filter((item) => {
                    return item !== "Lainnya";
                  });
                  setData(kategori);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Kategori berhasil ditambahkan");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 409:
                context.toggleLoading(false);
                setInput("");
                toggleDataExist();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    tambah_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                toggleTambahGagal();
                break;
            }
          }
        );
        break;
      case "Jenis":
        masterTambahRencanaPembangunan(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  setData(result.data.rencana_pembangunan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis pembangunan berhasil ditambahkan");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 409:
                context.toggleLoading(false);
                setInput("");
                toggleDataExist();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    tambah_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                toggleTambahGagal();
                break;
            }
          }
        );
        break;
      case "Andalalin":
        masterTambahPersyaratanAndalalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          input,
          input2,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );
                  setData(persyaratan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan andalalin berhasil ditambahkan");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 409:
                context.toggleLoading(false);
                setInput("");
                setInput2("");
                toggleDataExist();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    tambah_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                setInput2("");
                toggleTambahGagal();
                break;
            }
          }
        );
        break;
      case "Rambulalin":
        masterTambahPersyaratanRambulalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          input,
          input2,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanRambulalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );
                  setData(persyaratan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan rambulalin berhasil ditambahkan");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 409:
                context.toggleLoading(false);
                setInput("");
                setInput2("");
                toggleDataExist();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    tambah_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                setInput2("");
                toggleTambahGagal();
                break;
            }
          }
        );
        break;
    }
  };

  const hapus_data = () => {
    switch (kondisi) {
      case "Lokasi":
        masterHapusLokasiPengambilan(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.json();
                  context.setDataMaster(result.data);
                  if (result.data.lokasi_pengambilan == null) {
                    setDataOn(true);
                    setData(result.data.lokasi_pengambilan);
                  } else {
                    setDataOn(false);
                    setData(result.data.lokasi_pengambilan);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Lokasi pengambilan berhasil dihapus");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    hapus_data();
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
          }
        );
        break;
      case "Kategori":
        masterHapusKategori(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.json();
                  context.setDataMaster(result.data);
                  if (result.data.jenis_rencana == null) {
                    setDataOn(true);
                    const kategori = result.data.jenis_rencana.filter(
                      (item) => {
                        return item !== "Lainnya";
                      }
                    );
                    setData(kategori);
                  } else {
                    setDataOn(false);
                    const kategori = result.data.jenis_rencana.filter(
                      (item) => {
                        return item !== "Lainnya";
                      }
                    );
                    setData(kategori);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Kategori berhasil dihapus");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    hapus_data();
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
          }
        );
        break;
      case "Jenis":
        masterHapusRencanaPembangunan(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih2,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.json();
                  context.setDataMaster(result.data);
                  if (result.data.rencana_pembangunan == null) {
                    setDataOn(true);
                    setData(result.data.rencana_pembangunan);
                  } else {
                    setDataOn(false);
                    setData(result.data.rencana_pembangunan);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis pembangunan berhasil dihapus");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    hapus_data();
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
          }
        );
        break;
      case "Andalalin":
        masterHapusPersyaratanAndalalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.json();
                  context.setDataMaster(result.data);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );

                  if (persyaratan.length == 0) {
                    setDataOn(true);
                    setData(persyaratan);
                  } else {
                    setDataOn(false);
                    setData(persyaratan);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan andalalin berhasil dihapus");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    hapus_data();
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
          }
        );
        break;
      case "Rambulalin":
        masterHapusPersyaratanRambulalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.json();
                  context.setDataMaster(result.data);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanRambulalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );

                  if (persyaratan.length == 0) {
                    setDataOn(true);
                    setData(persyaratan);
                  } else {
                    setDataOn(false);
                    setData(persyaratan);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan rambulalin berhasil dihapus");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    hapus_data();
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
          }
        );
        break;
    }
  };

  const edit_data = () => {
    switch (kondisi) {
      case "Lokasi":
        masterEditLokasiPengambilan(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  setData(result.data.lokasi_pengambilan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Lokasi pengambilan berhasil diedit");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    edit_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                toggleEditGagal();
                break;
            }
          }
        );
        break;
      case "Kategori":
        masterEditKategori(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  const kategori = result.data.jenis_rencana.filter((item) => {
                    return item !== "Lainnya";
                  });
                  setData(kategori);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Kategori berhasil diedit");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    edit_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                toggleEditGagal();
                break;
            }
          }
        );
        break;
      case "Jenis":
        masterEditRencanaPembangunan(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih2,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  setData(result.data.rencana_pembangunan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis pembangunan berhasil diedit");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    edit_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                toggleEditGagal();
                break;
            }
          }
        );
        break;
      case "Andalalin":
        masterEditPersyaratanAndalalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          input,
          input2,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );
                  setData(persyaratan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan andalalin berhasil diedit");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    tambah_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                setInput2("");
                toggleEditGagal();
                break;
            }
          }
        );
        break;
      case "Rambulalin":
        masterEditPersyaratanRambulalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          input,
          input2,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanRambulalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );
                  setData(persyaratan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan rambulalin berhasil diedit");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 424:
                authRefreshToken(context, (response) => {
                  if (response.status === 200) {
                    tambah_data();
                  } else {
                    context.toggleLoading(false);
                  }
                });
                break;
              default:
                context.toggleLoading(false);
                setInput("");
                setInput2("");
                toggleEditGagal();
                break;
            }
          }
        );
        break;
    }
  };

  const showSnackbar = () => {
    toggleSnack();
    setTimeout(() => {
      toggleSnack();
    }, 3000);
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.navigate("Pengelolaan");
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
        {data != null ? list() : ""}
        {dataOn ? kosong() : ""}

        <ABottomSheet visible={tambah}>{tambah_view()}</ABottomSheet>

        <ABottomSheet visible={tindakan}>{tindakan_view()}</ABottomSheet>
      </View>

      {data != null || dataOn ? (
        <Pressable
          style={{
            shadowColor: "rgba(0, 0, 0, 0.30)",
            elevation: 8,
            borderRadius: 16,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color.primary.primary100,
            position: "absolute",
            bottom: 64,
            right: 16,
            padding: 16,
          }}
          onPress={() => {
            toggleTambah();
          }}
        >
          <Feather name="plus" size={24} color={color.neutral.neutral900} />
        </Pressable>
      ) : (
        ""
      )}

      {snack ? (
        <View style={{ paddingHorizontal: 16, bottom: 100 }}>
          <ASnackBar visible={snack} message={message} />
        </View>
      ) : (
        ""
      )}

      <AConfirmationDialog
        title={"Tambah " + title().toLowerCase()}
        desc={"Apakah Anda yakin ingin tambah " + title().toLowerCase() + "?"}
        visibleModal={tambahConfirms}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahConfirms();
        }}
        onPressOKButton={() => {
          toggleTambahConfirms();
          tambah_data();
          context.toggleLoading(true);
        }}
      />

      <AConfirmationDialog
        title={"Hapus " + title().toLowerCase()}
        desc={"Apakah Anda yakin ingin hapus " + pilih + "?"}
        visibleModal={hapusConfirms}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleHapusConfirms();
        }}
        onPressOKButton={() => {
          toggleHapusConfirms();
          hapus_data();
          context.toggleLoading(true);
        }}
      />

      <AConfirmationDialog
        title={"Edit " + title().toLowerCase()}
        desc={"Apakah Anda yakin ingin edit " + pilih + "?"}
        visibleModal={editConfirms}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleEditConfirms();
        }}
        onPressOKButton={() => {
          toggleEditConfirms();
          edit_data();
          context.toggleLoading(true);
        }}
      />

      <ADialog
        title={"Tambah " + title().toLowerCase() + " gagal"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={tambahGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleTambahGagal();
        }}
      />

      <ADialog
        title={"Hapus " + title().toLowerCase() + " gagal"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={hapusGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleHapusGagal();
        }}
      />

      <ADialog
        title={"Edit " + title().toLowerCase() + " gagal"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={editGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleEditGagal();
        }}
      />

      <ADialog
        title={title() + " sudah tersedia"}
        desc={
          title() + " yang diinputkan sudah tersedia, silahkan coba kembali"
        }
        visibleModal={dataExist}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleDataExist();
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
    flex: 1,
  },
});

export default DaftarProdukScreen;
