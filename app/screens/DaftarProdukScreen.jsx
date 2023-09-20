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
  Image,
  Dimensions
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
  masterAndalalin,
  masterEditKategori,
  masterEditKategoriPerlalin,
  masterEditLokasiPengambilan,
  masterEditPerlalin,
  masterEditPersyaratanAndalalin,
  masterEditPersyaratanPerlalin,
  masterEditRencanaPembangunan,
  masterHapusKategori,
  masterHapusKategoriPerlalin,
  masterHapusLokasiPengambilan,
  masterHapusPerlalin,
  masterHapusPersyaratanAndalalin,
  masterHapusPersyaratanPerlalin,
  masterHapusRencanaPembangunan,
  masterTambahKategori,
  masterTambahKategoriPerlalin,
  masterTambahLokasiPengambilan,
  masterTambahPerlalin,
  masterTambahPersyaratanAndalalin,
  masterTambahPersyaratanPerlalin,
  masterTambahRencanaPembangunan,
} from "../api/master";
import { authRefreshToken } from "../api/auth";
import ASnackBar from "../component/utility/ASnackBar";
import ADropDownCostume from "../component/utility/ADropdownCostume";
import AJenisDropdown from "../component/utility/AJenisDropdown";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import Modal from "react-native-modal";
import ATextInputIcon from "../component/utility/ATextInputIcon";
import * as DocumentPicker from "expo-document-picker";

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

  const [uri, setUri] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);
  const [image, toggleImage] = useStateToggler();
  const [imageUri, setImageUri] = useState();

  const [rambuName, setRambuName] = useState();
  const [rambuFile, setRambuFile] = useState();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-1000);
      navigation.navigate("Pengelolaan");
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-1000);
      navigation.navigate("Pengelolaan");
      return true;
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      refresh();
    }, 50);
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
      case "Kategori perlalin":
        return "Kategori perlengkapan";
      case "Jenis perlalin":
        return "Jenis perlengkapan";
      case "Andalalin":
        return "Tambah persyaratan";
      case "Perlalin":
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
      case "Kategori perlalin":
        return "Kategori perlengkapan";
      case "Jenis perlalin":
        return "Jenis perlengkapan";
      case "Andalalin":
        return "Persyaratan andalalin";
      case "Perlalin":
        return "Persyaratan perlalin";
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
          if (context.dataMaster.jenis_rencana == null) {
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
          if (context.dataMaster.rencana_pembangunan == null) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            setData(context.dataMaster.rencana_pembangunan);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
      case "Kategori perlalin":
        context.toggleLoading(true);

        setTimeout(() => {
          if (context.dataMaster.kategori_perlengkapan == null) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            const kategori = context.dataMaster.kategori_perlengkapan.filter(
              (item) => {
                return item !== "Lainnya";
              }
            );
            setData(kategori);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
      case "Jenis perlalin":
        context.toggleLoading(true);
        const perlalin = context.dataMaster.kategori_perlengkapan.filter(
          (item) => item !== "Lainnya"
        );

        let kategori_perlalin = perlalin.map((item) => {
          return { value: item };
        });

        setKategori(kategori_perlalin);
        setTimeout(() => {
          if (context.dataMaster.perlengkapan == null) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            setData(context.dataMaster.perlengkapan);
            context.toggleLoading(false);
          }
        }, 1000);
        break;
      case "Andalalin":
        context.toggleLoading(true);

        setTimeout(() => {
          if (
            context.dataMaster.persyaratan_tambahan.PersyaratanTambahanAndalalin
              .length == 0
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
      case "Perlalin":
        context.toggleLoading(true);

        setTimeout(() => {
          if (
            context.dataMaster.persyaratan_tambahan.PersyaratanTambahanPerlalin
              .length == 0
          ) {
            setDataOn(true);
            context.toggleLoading(false);
          } else {
            let persyaratan =
              context.dataMaster.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
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

  const refresh = () => {
    masterAndalalin((response) => {
      if (response.status === 200) {
        (async () => {
          const result = await response.json();
          context.setDataMaster(result.data);
          switch (kondisi) {
            case "Lokasi":
              setTimeout(() => {
                if (result.data.lokasi_pengambilan == null) {
                  setDataOn(true);
                  context.toggleLoading(false);
                } else {
                  setData(result.data.lokasi_pengambilan);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "Kategori":
              setTimeout(() => {
                if (result.data.jenis_rencana == null) {
                  setDataOn(true);
                  context.toggleLoading(false);
                } else {
                  const kategori = result.data.jenis_rencana.filter((item) => {
                    return item !== "Lainnya";
                  });
                  setData(kategori);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "Jenis":
              const items = result.data.jenis_rencana.filter(
                (item) => item !== "Lainnya"
              );

              let jenis_rencana = items.map((item) => {
                return { value: item };
              });

              setKategori(jenis_rencana);

              setTimeout(() => {
                if (result.data.rencana_pembangunan == null) {
                  setDataOn(true);
                  context.toggleLoading(false);
                } else {
                  setData(result.data.rencana_pembangunan);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "Kategori perlalin":
              setTimeout(() => {
                if (result.data.kategori_perlengkapan == null) {
                  setDataOn(true);
                  context.toggleLoading(false);
                } else {
                  const kategori = result.data.kategori_perlengkapan.filter(
                    (item) => {
                      return item !== "Lainnya";
                    }
                  );
                  setData(kategori);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "Jenis perlalin":
              context.toggleLoading(true);
              const perlalin = result.data.kategori_perlengkapan.filter(
                (item) => item !== "Lainnya"
              );

              let kategori_perlalin = perlalin.map((item) => {
                return { value: item };
              });

              setKategori(kategori_perlalin);
              setTimeout(() => {
                if (result.data.perlengkapan == null) {
                  setDataOn(true);
                  context.toggleLoading(false);
                } else {
                  setData(result.data.perlengkapan);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "Andalalin":
              setTimeout(() => {
                if (
                  result.data.persyaratan_tambahan.PersyaratanTambahanAndalalin
                    .length == 0
                ) {
                  setDataOn(true);
                  context.toggleLoading(false);
                } else {
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );
                  setData(persyaratan);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "Perlalin":
              setTimeout(() => {
                if (
                  result.data.persyaratan_tambahan.PersyaratanTambahanPerlalin
                    .length == 0
                ) {
                  setDataOn(true);
                  context.toggleLoading(false);
                } else {
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
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
        })();
      }
    });
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
      case "Perlalin":
        let keteranganPerlalin =
          context.dataMaster.persyaratan_tambahan.PersyaratanTambahanPerlalin.find(
            (item) => {
              return item.persyaratan == pilihan;
            }
          );
        return keteranganPerlalin.keterangan;
    }
  };

  const list = () => {
    switch (kondisi) {
      case "Lokasi":
        return (
          <FlatList
            style={{ paddingTop: 12, flex: 1 }}
            data={data}
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
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "75%",
                  }}
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
            style={{ paddingTop: 12, flex: 1 }}
            data={data}
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
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "75%",
                  }}
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
            style={{ flex: 1 }}
            data={data}
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
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          width: "75%",
                        }}
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
      case "Kategori perlalin":
        return (
          <FlatList
            style={{ paddingTop: 12, flex: 1 }}
            data={data}
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
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "75%",
                  }}
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
      case "Jenis perlalin":
        return (
          <FlatList
            style={{ flex: 1 }}
            data={data}
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
            renderItem={({ item: perlalin, index }) => (
              <AJenisDropdown
                hint={perlalin.Kategori}
                padding={index + 1 == 1 ? 0 : 20}
                bdColor={color.neutral.neutral300}
              >
                <FlatList
                  style={{ paddingTop: 16, flex: 1 }}
                  data={perlalin.Perlengkapan}
                  overScrollMode="never"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  vertical
                  renderItem={({ item: perlengkapan, index }) => (
                    <View
                      style={{
                        paddingBottom:
                          index + 1 == perlalin.Perlengkapan.length ? 0 : 24,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          width: "75%",
                        }}
                      >
                        <Pressable
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: 150 / 2,
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: color.text.white,
                          }}
                          onPress={() => {
                            setImageUri(
                              `data:image/png;base64,${perlengkapan.GambarPerlengkapan}`
                            );
                            toggleImage();
                          }}
                        >
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              resizeMode: "contain",
                            }}
                            source={{
                              uri: `data:image/png;base64,${perlengkapan.GambarPerlengkapan}`,
                            }}
                          />
                        </Pressable>

                        <View style={{ flexDirection: "column" }}>
                          <AText
                            style={{ paddingLeft: 20 }}
                            size={14}
                            color={color.neutral.neutral900}
                          >
                            {perlengkapan.JenisPerlengkapan}
                          </AText>
                        </View>
                      </View>
                      <Pressable
                        style={{ flexDirection: "row", padding: 8 }}
                        onPress={() => {
                          setPilih(perlengkapan.JenisPerlengkapan);
                          setPilih2(perlalin.Kategori);
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
            style={{ paddingTop: 12, flex: 1 }}
            data={data}
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
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "75%",
                  }}
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
      case "Perlalin":
        return (
          <FlatList
            style={{ paddingTop: 12, flex: 1 }}
            data={data}
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
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingBottom: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "75%",
                  }}
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

  const file = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    if (!result.canceled) {
      setRambuName(result.assets[0].name)
      setRambuFile(result.assets[0].uri)
    }
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
      case "Kategori perlalin":
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
                Tambah kategori perlengkapan
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
      case "Jenis perlalin":
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
                Tambah jenis perlengkapan
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
            <ATextInputIcon
                bdColor={color.neutral.neutral300}
                hint={"Masukkan rambu lalu lintas"}
                icon={"image"}
                padding={16}
                mult={true}
                value={rambuName}
                onPress={() => {
                  file()
                }}
                />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan jenis perlengkapan lalu lintas"}
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
                  setRambuFile();
                  setRambuName();
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
                  if (input != "" && pilih != "" && rambuFile != null) {
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
      case "Perlalin":
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
                Tambah persyaratan perlalin
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
                case "Perlalin":
                  setInput(pilih);
                  setInput2(getKeterangan(pilih));
                  break;
                case "Jenis perlalin":
                  setInput(pilih);
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
        case "Perlalin":
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
                  Edit persyaratan perlalin
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
        case "Jenis perlalin":
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
                  Edit {judul().toLowerCase()}
                </AText>
              </View>
              <ATextInputIcon
                bdColor={color.neutral.neutral300}
                hint={"Masukkan perlalin"}
                icon={"image"}
                mult={true}
                value={rambuName}
                onPress={() => {
                  file()
                }}
                />
              <View style={{ paddingBottom: 16 }} />
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
                    setRambuFile();
                    setRambuName();
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
                    if (input != "") {
                      if (rambuFile == null) setRambuFile("Kosong");
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
      case "Kategori perlalin":
        masterTambahKategoriPerlalin(
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
                  const kategori = result.data.kategori_perlengkapan.filter(
                    (item) => {
                      return item !== "Lainnya";
                    }
                  );
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
      case "Jenis perlalin":
        masterTambahPerlalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          input,
          rambuFile,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setRambuFile();
                  setRambuName();

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  setData(result.data.perlengkapan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis perlengkapan berhasil ditambahkan");
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
      case "Perlalin":
        masterTambahPersyaratanPerlalin(
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
                    result.data.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );
                  setData(persyaratan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan perlalin berhasil ditambahkan");
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

  useEffect(() => {
    if (uri != null) {
      hapus_data();
      context.toggleLoading(true);
    }
  }, [uri]);

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
      case "Kategori perlalin":
        masterHapusKategoriPerlalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.json();
                  context.setDataMaster(result.data);
                  if (result.data.kategori_perlengkapan == null) {
                    setDataOn(true);
                    const kategori = result.data.kategori_perlengkapan.filter(
                      (item) => {
                        return item !== "Lainnya";
                      }
                    );
                    setData(kategori);
                  } else {
                    setDataOn(false);
                    const kategori = result.data.kategori_perlengkapan.filter(
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
      case "Jenis perlalin":
        masterHapusPerlalin(
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
                  if (result.data.perlengkapan == null) {
                    setDataOn(true);
                    setData(result.data.perlengkapan);
                  } else {
                    setDataOn(false);
                    setData(result.data.perlengkapan);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis perlengkapan berhasil dihapus");
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
                  download(pilih, uri, result.file);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );

                  if (persyaratan.length == 0) {
                    setDataOn(true);
                    setData(null);
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
      case "Perlalin":
        masterHapusPersyaratanPerlalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.json();
                  context.setDataMaster(result.data);
                  download(pilih, uri, result.file);
                  let persyaratan =
                    result.data.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );

                  if (persyaratan.length == 0) {
                    setDataOn(true);
                    setData(null);
                  } else {
                    setDataOn(false);
                    setData(persyaratan);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan perlalin berhasil dihapus");
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
      case "Kategori perlalin":
        masterEditKategoriPerlalin(
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
                  const kategori = result.data.kategori_perlengkapan.filter(
                    (item) => {
                      return item !== "Lainnya";
                    }
                  );
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
      case "Jenis perlalin":
        masterEditPerlalin(
          context.getUser().access_token,
          context.dataMaster.id_data_master,
          pilih2,
          pilih,
          input,
          rambuFile,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setRambuFile();
                  setRambuName();

                  const result = await response.json();
                  context.setDataMaster(result.data);
                  setDataOn(false);
                  setData(result.data.perlengkapan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis perlengkapan berhasil diedit");
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
      case "Perlalin":
        masterEditPersyaratanPerlalin(
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
                    result.data.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
                      (item) => {
                        return item.persyaratan;
                      }
                    );
                  setData(persyaratan);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Persyaratan perlalin berhasil diedit");
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

  const uriFile = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    setUri(permissions.directoryUri);
  };

  const download = async (namaFile, uri, file) => {
    await StorageAccessFramework.createFileAsync(
      uri,
      namaFile + ".zip",
      "application/zip"
    ).then(async (uri) => {
      context.toggleLoading(true);
      await FileSystem.writeAsStringAsync(uri, file, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setUri();
    });
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
              setProgressViewOffset(-1000);
              navigation.navigate("Pengelolaan");
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
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

      {imageUri != null ? (
        <Modal
          isVisible={image}
          backdropOpacity={0.5}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={300}
          statusBarTranslucent
          coverScreen={true}
          deviceHeight={Dimensions.get('screen').height}
          backdropTransitionOutTiming={0}
          onBackButtonPress={() => {
            setImageUri();
            toggleImage();
          }}
          onBackdropPress={() => {
            setImageUri();
            toggleImage();
          }}
        >
          <View
            style={{
              overflow: "hidden",
              width: 250,
              height: 250,
              borderRadius: 8,
              alignSelf: "center",
              backgroundColor: color.text.white,
            }}
          >
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
              source={{
                uri: imageUri,
              }}
            />
          </View>
        </Modal>
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
          if (kondisi == "Andalalin" || kondisi == "Perlalin") {
            setTimeout(() => {
              uriFile();
            }, 500);
          } else {
            hapus_data();
            context.toggleLoading(true);
          }
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
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
  },
});

export default DaftarProdukScreen;
