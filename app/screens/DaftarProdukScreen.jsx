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
  Dimensions,
  ScrollView,
  TouchableOpacity,
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
  masterByTipe,
  masterEditJalan,
  masterEditJenisProyek,
  masterEditKabupaten,
  masterEditKategori,
  masterEditKategoriPerlalin,
  masterEditKategoriUtamaPerlalin,
  masterEditKecamatan,
  masterEditKelurahan,
  masterEditLokasiPengambilan,
  masterEditPerlalin,
  masterEditPersyaratanAndalalin,
  masterEditPersyaratanPerlalin,
  masterEditProvinsi,
  masterEditRencanaPembangunan,
  masterHapusJalan,
  masterHapusJenisProyek,
  masterHapusKabupaten,
  masterHapusKategori,
  masterHapusKategoriPerlalin,
  masterHapusKategoriUtamaPerlalin,
  masterHapusKecamatan,
  masterHapusKelurahan,
  masterHapusLokasiPengambilan,
  masterHapusPerlalin,
  masterHapusPersyaratanAndalalin,
  masterHapusPersyaratanPerlalin,
  masterHapusProvinsi,
  masterHapusRencanaPembangunan,
  masterTambahJalan,
  masterTambahJenisProyek,
  masterTambahKabupaten,
  masterTambahKategori,
  masterTambahKategoriPerlalin,
  masterTambahKategoriUtamaPerlalin,
  masterTambahKecamatan,
  masterTambahKelurahan,
  masterTambahLokasiPengambilan,
  masterTambahPerlalin,
  masterTambahPersyaratanAndalalin,
  masterTambahPersyaratanPerlalin,
  masterTambahProvinsi,
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
import AWilayah from "../component/utility/AWilayah";
import { RadioButton } from "react-native-paper";
import AJalan from "../component/utility/AJalan";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function DaftarProdukScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;
  const [data, setData] = useState();
  const [IdMaster, setIdMaster] = useState();

  const [pilih, setPilih] = useState();
  const [pilih2, setPilih2] = useState();
  const [pilih3, setPilih3] = useState();
  const [pilih4, setPilih4] = useState();
  const [pilih5, setPilih5] = useState();
  const [dataOn, setDataOn] = useState(false);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const [tambah, toggleTambah] = useStateToggler();
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");
  const [input8, setInput8] = useState("");
  const [input9, setInput9] = useState("");
  const [input10, setInput10] = useState("");

  const inputRef = React.createRef();
  const input2Ref = React.createRef();
  const input3Ref = React.createRef();
  const input4Ref = React.createRef();
  const input5Ref = React.createRef();
  const input6Ref = React.createRef();
  const input7Ref = React.createRef();
  const input8Ref = React.createRef();
  const input9Ref = React.createRef();
  const input10Ref = React.createRef();

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
  const [wilayah, toggleWilayah] = useStateToggler();

  const [kategori, setKategori] = useState();
  const [kategori2, setKategori2] = useState();
  const [kategori3, setKategori3] = useState();

  const [uri, setUri] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);
  const [image, toggleImage] = useStateToggler();
  const [imageUri, setImageUri] = useState();

  const [rambuName, setRambuName] = useState();
  const [rambuFile, setRambuFile] = useState();

  const [jalan, toggleJalan] = useStateToggler();

  const [lanjutan, toggleLanjutan] = useState("Wilayah");

  const [loadGagal, toggleLoadGagal] = useStateToggler();

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
      case "Kategori utama":
          return "Kategori utama";
      case "Kategori perlalin":
        return "Kategori perlengkapan";
      case "Jenis perlalin":
        return "Jenis perlengkapan";
      case "Andalalin":
        return "Persyaratan andalalin";
      case "Perlalin":
        return "Persyaratan perlalin";
      case "Wilayah":
        return "Wilayah administratif";
      case "Proyek":
        return "Jenis proyek";
      case "Jalan":
        return "Jalan";
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
      case "Kategori utama":
          return "Kategori utama";
      case "Kategori perlalin":
        return "Kategori perlengkapan";
      case "Jenis perlalin":
        return "Jenis perlengkapan";
      case "Andalalin":
        return "Persyaratan andalalin";
      case "Perlalin":
        return "Persyaratan perlalin";
      case "Wilayah":
        return "Wilayah administratif";
      case "Proyek":
        return "Jenis proyek";
      case "Jalan":
        return "Jalan";
    }
  };

  const kategoriBangkitan = [
    "Bangkitan rendah",
    "Bangkitan sedang",
    "Bangkitan tinggi",
  ];

  const kategoriPilihan = [
    { value: "Bangkitan rendah" },
    { value: "Bangkitan sedang" },
    { value: "Bangkitan tinggi" },
  ];

  const kategoriKebutuhan = [{ value: "Wajib" }, { value: "Tidak wajib" }];

  const kategoriTipe = [{ value: "Pdf" }, { value: "Word" }];

  const load = () => {
    switch (kondisi) {
      case "Lokasi":
        context.toggleLoading(true);
        load_master("pengambilan", "pengambilan");
        break;
      case "Kategori":
        context.toggleLoading(true);
        load_master("kategorirencana", "kategori_pembangunan");
        break;
      case "Jenis":
        context.toggleLoading(true);
        load_master("jenispembangunan", "jenis_pembangunan");   
        break;
      case "Kategori utama":
        context.toggleLoading(true);
        load_master("kategoriutama", "kategori_utama");
        break;
      case "Kategori perlalin":
        context.toggleLoading(true);
        load_master("kategoriperlengkapan", "kategori_perlengkapan");
        
        break;
      case "Jenis perlalin":
        context.toggleLoading(true);
        load_master("jenisperlengkapan", "jenis_perlengkapan");
        
        break;
      case "Andalalin":
        context.toggleLoading(true);
        load_master("persyaratan", "persyaratan_andalalin");
        
        break;
      case "Perlalin":
        context.toggleLoading(true);
        load_master("persyaratan", "persyaratan_perlalin");
        
        break;
      case "Wilayah":
        context.toggleLoading(true);
        load_master("wilayah", "provinsi");
        break;
      case "Proyek":
        context.toggleLoading(true);
        load_master("proyek", "jenis_proyek");
        break;
      case "Jalan":
        context.toggleLoading(true);
        load_master("jalan", "jalan");
        break;
    }
  };

  const load_master = (tipe, field) => {
    masterByTipe(tipe, (response) => {
      if (response.status === 200) {
        (async () => {
          const result = await response.data;
          switch (field) {
            case "jenis_proyek":
              if (result.data.jenis_proyek == null) {
                setDataOn(true);
                setIdMaster(result.data.id_data_master);
                context.toggleLoading(false);
              } else {
                setIdMaster(result.data.id_data_master);
                setData(result.data);
                context.toggleLoading(false);
              }
              break;
            case "provinsi":
              if (result.data.provinsi == null) {
                setDataOn(true);
                setIdMaster(result.data.id_data_master);
                context.toggleLoading(false);
              } else {
                setIdMaster(result.data.id_data_master);
                setData(result.data);
                context.toggleLoading(false);
              }
              break;
            case "jalan":
              if (result.data.kecamatan == null) {
                setDataOn(true);
                setIdMaster(result.data.id_data_master);
                context.toggleLoading(false);
              } else {
                setIdMaster(result.data.id_data_master);
                setData(result.data);
                kec_item = result.data.kecamatan.map((item) => {
                  return { value: item.Name };
                });
                setKategori(kec_item);
                setKategori2([]);
                context.toggleLoading(false);
              }
              break;
            case "pengambilan":
              setTimeout(() => {
                if (result.data.lokasi_pengambilan == null) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {
                  setIdMaster(result.data.id_data_master);
                  setData(result.data);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "kategori_pembangunan":
              setTimeout(() => {
                if (result.data.kategori_rencana == null) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {
                  setIdMaster(result.data.id_data_master);
                  setData(result.data);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "jenis_pembangunan":
              let kategori_rencana = result.data.kategori_rencana.map((item) => {
                return { value: item };
              });
      
              setKategori(kategori_rencana);
      
              setTimeout(() => {
                if (result.data.jenis_rencana == null) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {
                  setIdMaster(result.data.id_data_master);
                  setData(result.data);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "kategori_utama":
              setTimeout(() => {
                if (result.data.kategori_utama == null) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {                  
                  setIdMaster(result.data.id_data_master);
                  setData(result.data);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "kategori_perlengkapan":
              setTimeout(() => {
                let kategori_utama = result.data.kategori_utama.map((item) => {
                  return { value: item };
                });
        
                setKategori(kategori_utama);
                if (result.data.kategori_perlengkapan == null) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {
                  setIdMaster(result.data.id_data_master);
                  setData(result.data);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "jenis_perlengkapan":
              let kategori_utama = result.data.kategori_utama.map(
                (item) => {
                  return { value: item };
                }
              );
      
              setKategori(kategori_utama);
              setKategori2([]);
              setTimeout(() => {
                if (result.data.perlengkapan == null) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {
                  setIdMaster(result.data.id_data_master);
                  setData(result.data);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "persyaratan_andalalin":
              setTimeout(() => {
                if (result.data.persyaratan.PersyaratanAndalalin.length == 0) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {
                  setIdMaster(result.data.id_data_master);
                  setData(result.data.persyaratan.PersyaratanAndalalin);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
            case "persyaratan_perlalin":
              setTimeout(() => {
                if (result.data.persyaratan.PersyaratanPerlalin.length == 0) {
                  setDataOn(true);
                  setIdMaster(result.data.id_data_master);
                  context.toggleLoading(false);
                } else {
                  setIdMaster(result.data.id_data_master);
                  setData(result.data.persyaratan.PersyaratanPerlalin);
                  context.toggleLoading(false);
                }
              }, 1000);
              break;
          }
        })();
      } else {
        context.toggleLoading(false);
        toggleLoadGagal();
      }
    });
  };

  const refresh = () => {
    load();
  };

  const list = () => {
    switch (kondisi) {
      case "Lokasi":
        return (
          <FlatList
            data={data.lokasi_pengambilan}
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
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            )}
          />
        );
      case "Kategori":
        return (
          <FlatList
            data={data.kategori_rencana}
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
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            )}
          />
        );
      case "Jenis":
        return (
          <FlatList
            data={data.jenis_rencana}
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
                            {jenis.Jenis}
                          </AText>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ flexDirection: "row", padding: 8 }}
                        onPress={() => {
                          setPilih(jenis.Jenis);
                          setPilih2(pembangunan.Kategori);
                          setPilih3(jenis.Kriteria);
                          setPilih4(jenis.Satuan);
                          setPilih5(jenis.Terbilang);
                          toggleTindakan();
                        }}
                      >
                        <Feather
                          name="more-vertical"
                          size={20}
                          color={color.neutral.neutral900}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </AJenisDropdown>
            )}
          />
        );
      case "Kategori utama":
        return (
          <FlatList
            style={{ paddingTop: 12, flex: 1 }}
            data={data.kategori_utama}
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
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            )}
          />
        );
      case "Kategori perlalin":
        return (
          <FlatList
            data={data.kategori_perlengkapan}
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
            renderItem={({ item: utama, index }) => (
              <AJenisDropdown
                hint={utama.KategoriUtama}
                padding={index + 1 == 1 ? 0 : 20}
                bdColor={color.neutral.neutral300}
              >
                <FlatList
                  style={{ paddingTop: 16, flex: 1 }}
                  data={utama.Kategori}
                  overScrollMode="never"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  vertical
                  renderItem={({ item: kategori, index }) => (
                    <View
                      style={{
                        paddingBottom: index + 1 == kategori.length ? 0 : 24,
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
                            {kategori}
                          </AText>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ flexDirection: "row", padding: 8 }}
                        onPress={() => {
                          setPilih2(utama.KategoriUtama);
                          setPilih(kategori)
                          toggleTindakan();
                        }}
                      >
                        <Feather
                          name="more-vertical"
                          size={20}
                          color={color.neutral.neutral900}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </AJenisDropdown>
            )}
          />
        );
      case "Jenis perlalin":
        return (
          <FlatList
            style={{ flex: 1 }}
            data={data.perlengkapan}
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
                        <TouchableOpacity
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
                        </TouchableOpacity>

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
                      <TouchableOpacity
                        style={{ flexDirection: "row", padding: 8 }}
                        onPress={() => {
                          setPilih(perlengkapan.JenisPerlengkapan);
                          setPilih2(perlalin.Kategori);
                          setPilih3(perlalin.KategoriUtama);
                          toggleTindakan();
                        }}
                      >
                        <Feather
                          name="more-vertical"
                          size={20}
                          color={color.neutral.neutral900}
                        />
                      </TouchableOpacity>
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
            data={kategoriBangkitan}
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
            renderItem={({ item: kategori, index }) => (
              <AJenisDropdown
                hint={kategori}
                padding={index + 1 == 1 ? 0 : 20}
                bdColor={color.neutral.neutral300}
              >
                <FlatList
                  style={{ paddingTop: 16, flex: 1 }}
                  data={data.filter((bangkitan) => {
                    return bangkitan.bangkitan == kategori;
                  })}
                  overScrollMode="never"
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  vertical
                  renderItem={({ item: persyaratan, index }) => (
                    <View
                      style={{
                        paddingBottom: index + 1 == kategori.length ? 0 : 24,
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
                            {persyaratan.persyaratan}
                          </AText>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ flexDirection: "row", padding: 8 }}
                        onPress={() => {
                          setPilih(persyaratan.persyaratan);
                          setPilih2(persyaratan.bangkitan);
                          setPilih3(persyaratan.keterangan);
                          setPilih4(persyaratan.kebutuhan);
                          setPilih5(persyaratan.tipe);
                          toggleTindakan();
                        }}
                      >
                        <Feather
                          name="more-vertical"
                          size={20}
                          color={color.neutral.neutral900}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </AJenisDropdown>
            )}
          />
        );
      case "Perlalin":
        return (
          <FlatList
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
                      {item.persyaratan}
                    </AText>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: "row", padding: 8 }}
                  onPress={() => {
                    setPilih(item.persyaratan);
                    setPilih2(item.keterangan);
                    setPilih3(item.kebutuhan);
                    setPilih4(item.tipe);
                    toggleTindakan();
                  }}
                >
                  <Feather
                    name="more-vertical"
                    size={20}
                    color={color.neutral.neutral900}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        );
      case "Wilayah":
        return (
          <FlatList
            data={data.provinsi}
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
            renderItem={({ item: provinsi, index }) => (
              <View style={{ paddingTop: index + 1 == 1 ? 0 : 20 }}>
                <TouchableOpacity
                  style={{
                    borderColor: color.neutral.neutral300,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: color.text.white,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    const kab = data.kabupaten.filter((item) => {
                      return item.IdProvinsi == provinsi.Id;
                    });
                    if (kab.length != 0) {
                      toggleWilayah();
                      setPilih3(provinsi);
                    }
                  }}
                >
                  <AText size={16} color={color.neutral.neutral900}>
                    {provinsi.Name}
                  </AText>

                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setPilih(provinsi.Name);
                      setPilih2("Provinsi");
                      toggleTindakan();
                    }}
                  >
                    <Feather
                      name="more-vertical"
                      size={20}
                      color={color.neutral.neutral900}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )}
          />
        );
      case "Proyek":
        return (
          <FlatList
            data={data.jenis_proyek}
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
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            )}
          />
        );
      case "Jalan":
        return (
          <FlatList
            data={data.kecamatan}
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
            renderItem={({ item: kec, index }) => (
              <View style={{ paddingTop: index + 1 == 1 ? 0 : 20 }}>
                <TouchableOpacity
                  style={{
                    borderColor: color.neutral.neutral300,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: color.text.white,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    const kel = data.kelurahan.filter((item) => {
                      return item.IdKecamatan == kec.Id;
                    });
                    if (kel.length != 0) {
                      toggleJalan();
                      setPilih5(kec.Id);
                    }
                  }}
                >
                  <AText size={16} color={color.neutral.neutral900}>
                    {kec.Name}
                  </AText>
                </TouchableOpacity>
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
      setRambuName(result.assets[0].name);
      setRambuFile(result.assets[0].uri);
    }
  };

  const getJalan = (kode, nama) => {
    switch (kondisi) {
      case "Jalan":
        let jalan = data.jalan.find((item) => {
          return item.KodeJalan == kode && item.Nama == nama;
        });
        return jalan;
    }
  };

  const closeTambah = () => {
    setPilih(null);
    setPilih2(null);
    setPilih3(null);
    setPilih4(null);
    setPilih5(null);
    setInput("");
    setInput2("");
    setInput3("");
    setInput4("");
    setInput5("");
    setInput6("");
    setInput7("");
    setInput8("");
    setInput9("");
    setInput10("");
    setKategori2([]);
    toggleTambah();
    setRambuFile();
    setRambuName();

    if (lanjutan != "Wilayah") {
      toggleLanjutan("Wilayah");
    }
  };

  const jalan_content = () => {
    switch (lanjutan) {
      case "Wilayah":
        return (
          <View>
            <ADropDownCostume
              hint={"Pilih kecamatan"}
              saved={""}
              data={kategori}
              selected={setPilih}
              bdColor={color.neutral.neutral300}
              max={150}
              notFound={"Kecamatan tidak ditemukan"}
            />

            <View style={{ paddingBottom: 16 }} />

            <ADropDownCostume
              hint={"Pilih kelurahan"}
              saved={""}
              data={kategori2}
              selected={setPilih2}
              bdColor={color.neutral.neutral300}
              max={150}
              notFound={"Kelurahan tidak ditemukan"}
            />
          </View>
        );
      case "Kode":
        return (
          <ScrollView
            style={{ maxHeight: "100%" }}
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
          >
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"number-pad"}
              hint={"Masukkan kode kecamatan"}
              rtype={"next"}
              value={input9}
              blur={false}
              ref={input9Ref}
              onChangeText={(value) => {
                setInput9(value);
              }}
              submit={() => {
                input9 != "" ? input10Ref.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"number-pad"}
              hint={"Masukkan kode kelurahan"}
              rtype={"next"}
              blur={false}
              value={input10}
              ref={input10Ref}
              onChangeText={(value) => {
                setInput10(value);
              }}
              submit={() => {
                input10 != "" ? inputRef.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"number-pad"}
              hint={"Masukkan kode jalan"}
              rtype={"done"}
              value={input}
              blur={true}
              ref={inputRef}
              onChangeText={(value) => {
                setInput(value);
              }}
            />
          </ScrollView>
        );
      case "Jalan":
        return (
          <ScrollView
            style={{ maxHeight: "100%" }}
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
          >
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan nama jalan"}
              rtype={"next"}
              value={input2}
              blur={false}
              ref={input2Ref}
              onChangeText={(value) => {
                setInput2(value);
              }}
              submit={() => {
                input2 != "" ? input3Ref.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan pangkal jalan"}
              rtype={"next"}
              value={input3}
              ref={input3Ref}
              blur={false}
              onChangeText={(value) => {
                setInput3(value);
              }}
              submit={() => {
                input3 != "" ? input4Ref.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan ujung jalan"}
              rtype={"next"}
              value={input4}
              blur={false}
              ref={input4Ref}
              onChangeText={(value) => {
                setInput4(value);
              }}
              submit={() => {
                input4 != "" ? input5Ref.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"number-pad"}
              hint={"Masukkan panjang jalan"}
              rtype={"next"}
              value={input5}
              blur={false}
              ref={input5Ref}
              onChangeText={(value) => {
                setInput5(value);
              }}
              submit={() => {
                input5 != "" ? input6Ref.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"number-pad"}
              hint={"Masukkan lebar jalan"}
              rtype={"next"}
              value={input6}
              blur={false}
              ref={input6Ref}
              onChangeText={(value) => {
                setInput6(value);
              }}
              submit={() => {
                input6 != "" ? input7Ref.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan permukaan jalan"}
              rtype={"next"}
              value={input7}
              blur={false}
              ref={input7Ref}
              onChangeText={(value) => {
                setInput7(value);
              }}
              submit={() => {
                input7 != "" ? input8Ref.current.focus() : "";
              }}
            />

            <View style={{ paddingBottom: 16 }} />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan fungsi jalan"}
              rtype={"done"}
              blur={true}
              value={input8}
              ref={input8Ref}
              onChangeText={(value) => {
                setInput8(value);
              }}
            />
          </ScrollView>
        );
    }
  };

  const tambah_view = () => {
    switch (kondisi) {
      case "Lokasi":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Kategori":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Jenis":
        return (
          <View>
            <View
              style={{
                marginBottom: 16,
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
              max={150}
            />

            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan jenis pembangunan"}
              rtype={"done"}
              multi={true}
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
              title={"Opsional"}
              hint={"Masukkan kriteria khusus"}
              rtype={"done"}
              multi={true}
              maxHeight={90}
              value={input2}
              onChangeText={(value) => {
                setInput2(value);
              }}
            />

            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan satuan"}
              rtype={"done"}
              multi={true}
              maxHeight={90}
              value={input3}
              onChangeText={(value) => {
                setInput3(value);
              }}
            />

            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan terbilang"}
              rtype={"done"}
              multi={true}
              maxHeight={90}
              value={input4}
              onChangeText={(value) => {
                setInput4(value);
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setInput("");
                  setInput2("");
                  setInput3("");
                  setInput4("");
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Kategori utama":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah kategori utama perlengkapan
              </AText>
            </View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan kategori"}
              rtype={"done"}
              multi={true}
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Kategori perlalin":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
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
            <ADropDownCostume
              hint={"Pilih kategori"}
              saved={""}
              data={kategori}
              selected={setPilih}
              bdColor={color.neutral.neutral300}
              max={150}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan kategori"}
              rtype={"done"}
              multi={true}
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
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
                marginBottom: 16,
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
              hint={"Pilih kategori utama"}
              saved={""}
              data={kategori}
              selected={setPilih}
              bdColor={color.neutral.neutral300}
              max={150}
              notFound={"Kategori utama tidak ditemukan"}
            />
            <View style={{ paddingBottom: 16 }} />
            <ADropDownCostume
              hint={"Pilih kategori perlengkapan"}
              saved={""}
              data={kategori2}
              selected={setPilih2}
              bdColor={color.neutral.neutral300}
              max={150}
              notFound={"Kategori perlengkapan tidak ditemukan"}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan rambu lalu lintas"}
              icon={"image"}
              mult={true}
              value={rambuName}
              onPress={() => {
                file();
              }}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan jenis perlengkapan lalu lintas"}
              rtype={"done"}
              multi={true}
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (input != "" && pilih != "" && pilih2 != "" && rambuFile != null) {
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
              </TouchableOpacity>
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
                marginBottom: 16,
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
            <ADropDownCostume
              hint={"Pilih kebutuhan"}
              saved={""}
              data={kategoriKebutuhan}
              selected={setPilih2}
              bdColor={color.neutral.neutral300}
              max={150}
            />
            <View style={{ paddingBottom: 16 }} />
            <ADropDownCostume
              hint={"Pilih kategori"}
              saved={""}
              data={kategoriPilihan}
              selected={setPilih}
              bdColor={color.neutral.neutral300}
              max={150}
            />
            <View style={{ paddingBottom: 16 }} />
            <ADropDownCostume
              hint={"Pilih tipe"}
              saved={""}
              data={kategoriTipe}
              selected={setPilih3}
              bdColor={color.neutral.neutral300}
              max={150}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan persyaratan"}
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (input != "" && input2 != "" && pilih != "") {
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
              </TouchableOpacity>
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
                marginBottom: 16,
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
            <ADropDownCostume
              hint={"Pilih kebutuhan"}
              saved={""}
              data={kategoriKebutuhan}
              selected={setPilih}
              bdColor={color.neutral.neutral300}
              max={150}
            />
            <View style={{ paddingBottom: 16 }} />
            <ADropDownCostume
              hint={"Pilih tipe"}
              saved={""}
              data={kategoriTipe}
              selected={setPilih2}
              bdColor={color.neutral.neutral300}
              max={150}
            />
            <View style={{ paddingBottom: 16 }} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan persyaratan"}
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Wilayah":
        return <View>{wilayah_tindakan()}</View>;
      case "Proyek":
        return (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah jenis proyek
              </AText>
            </View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan jenis proyek"}
              rtype={"done"}
              multi={true}
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
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Jalan":
        return (
          <View
            style={{
              maxHeight:
                lanjutan != "Jalan"
                  ? Dimensions.get("screen").height / 2
                  : Dimensions.get("screen").height / 2.5,
            }}
          >
            <View
              style={{
                marginBottom: 16,
              }}
            >
              <AText
                size={18}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Tambah Jalan
              </AText>
            </View>

            {jalan_content()}

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginTop: 32,
                marginRight: 16,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  closeTambah();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingLeft: 4,
                  marginLeft: 32,
                }}
                onPress={() => {
                  switch (lanjutan) {
                    case "Wilayah":
                      if (pilih != "" && pilih2 != "") {
                        toggleLanjutan("Kode");
                      }
                      break;
                    case "Kode":
                      if (input9 != "" && input10 != "" && input != "") {
                        toggleLanjutan("Jalan");
                      }
                      break;
                    case "Jalan":
                      if (
                        input2 != "" &&
                        input3 != "" &&
                        input4 != "" &&
                        input5 != "" &&
                        input6 != "" &&
                        input7 != "" &&
                        input8 != ""
                      ) {
                        toggleTambah();
                        toggleTambahConfirms();
                      }
                      break;
                  }
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  {lanjutan != "Jalan" ? "Lanjut" : "Simpan"}
                </AText>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  const closeTindakan = () => {
    toggleTindakan();
    if (edit == true) {
      toggleEdit();
      setPilih(null);
      setPilih2(null);
      setPilih3(null);
      setPilih4(null);
      setPilih5(null);
      setInput("");
      setInput2("");
      setInput3("");
      setInput4("");
      setInput5("");
      setInput6("");
      setInput7("");
      setInput8("");
      setInput9("");
      setInput10("");
    }
  };

  useEffect(() => {
    if (kondisi == "Wilayah" && data != null) {
      let prov = data.provinsi.find((item) => {
        return item.Name == pilih;
      });
      if (prov != null) {
        let kab = data.kabupaten.filter((item) => {
          return item.IdProvinsi == prov.Id;
        });

        if (kab.length != 0) {
          let kabItem = kab.map((item) => {
            return { value: item.Name };
          });

          setKategori2(kabItem);
        } else {
          setKategori2([]);
          setError1("Kabupaten tidak tersedia");
        }
      } else {
        setKategori2([]);
        setError1("Kabupaten tidak tersedia");
      }
    }
  }, [pilih]);

  useEffect(() => {
    if (kondisi == "Wilayah" && data != null) {
      let kabPilih = data.kabupaten.find((item) => {
        return item.Name == pilih2;
      });
      if (kabPilih != null) {
        let kec = data.kecamatan.filter((item) => {
          return item.IdKabupaten == kabPilih.Id;
        });

        if (kec.length != 0) {
          let kecItem = kec.map((item) => {
            return { value: item.Name };
          });
          setKategori3(kecItem);
        } else {
          setError2("Kecamatan tidak tersedia");
          setKategori3([]);
        }
      } else {
        setError2("Kecamatan tidak tersedia");
        setKategori3([]);
      }
    }
  }, [pilih2]);

  useEffect(() => {
    if (kondisi == "Jalan" && data != null) {
      let kec = data.kecamatan.find((item) => {
        return item.Name == pilih;
      });
      if (kec != null) {
        let kel = data.kelurahan.filter((item) => {
          return item.IdKecamatan == kec.Id;
        });

        if (kel.length != 0) {
          let kelItem = kel.map((item) => {
            return { value: item.Name };
          });
          setTimeout(() => {
            setKategori2(kelItem);
          }, 300);
        } else {
          setKategori2([]);
        }
      } else {
        setKategori2([]);
      }
    }
  }, [pilih]);

  useEffect(() => {
    if (kondisi == "Jenis perlalin" && data != null) {
      let perlengkapan = data.kategori_perlengkapan.find((item) => {
        return item.KategoriUtama == pilih;
      });
      if (perlengkapan != null) {
        let perlengkapan_item = perlengkapan.Kategori.map((item) => {
          return { value: item };
        });
          setKategori2(perlengkapan_item);
        
      } else {
        setKategori2([]);
      }
    }
  }, [pilih]);

  const wilayah_tindakan = () => {
    if (pilih5 == null) {
      return (
        <View>
          <AText
            style={{ paddingBottom: 16 }}
            size={18}
            color={color.neutral.neutral700}
            weight="semibold"
          >
            Pilih jenis wilayah
          </AText>

          <RadioButton.Group onValueChange={(value) => setPilih4(value)}>
            {dataOn ? (
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    label="Provinsi"
                    value="Provinsi"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={pilih4 === "Provinsi" ? "checked" : "unchecked"}
                  />
                  <Pressable
                    onPress={() => {
                      setPilih4("Provinsi");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Provinsi
                    </AText>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    label="Provinsi"
                    value="Provinsi"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={pilih4 === "Provinsi" ? "checked" : "unchecked"}
                  />
                  <Pressable
                    onPress={() => {
                      setPilih4("Provinsi");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Provinsi
                    </AText>
                  </Pressable>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <RadioButton
                    label="Kabupaten"
                    value="Kabupaten"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={pilih4 === "Kabupaten" ? "checked" : "unchecked"}
                  />
                  <Pressable
                    onPress={() => {
                      setPilih4("Kabupaten");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Kabupaten
                    </AText>
                  </Pressable>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <RadioButton
                    label="Kecamatan"
                    value="Kecamatan"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={pilih4 === "Kecamatan" ? "checked" : "unchecked"}
                  />
                  <Pressable
                    onPress={() => {
                      setPilih4("Kecamatan");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Kecamatan
                    </AText>
                  </Pressable>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <RadioButton
                    label="Kelurahan"
                    value="Kelurahan"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={pilih4 === "Kelurahan" ? "checked" : "unchecked"}
                  />
                  <Pressable
                    onPress={() => {
                      setPilih4("Kelurahan");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Kelurahan
                    </AText>
                  </Pressable>
                </View>
              </View>
            )}
          </RadioButton.Group>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              marginTop: 32,
              marginRight: 16,
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                toggleTambah();
                setPilih4(null);
                setPilih5(null);
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Batal
              </AText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
              onPress={() => {
                setPilih5(pilih4);
                switch (pilih4) {
                  case "Kabupaten":
                    let provinsi = data.provinsi.map((item) => {
                      return { value: item.Name };
                    });

                    setKategori(provinsi);
                    break;
                  case "Kecamatan":
                    let provinsi1 = data.provinsi.map((item) => {
                      return { value: item.Name };
                    });

                    setKategori(provinsi1);
                    setError1("Provinsi belum dipilih");
                    setKategori2([]);
                    break;
                  case "Kelurahan":
                    let provinsi2 = data.provinsi.map((item) => {
                      return { value: item.Name };
                    });

                    setKategori(provinsi2);
                    setError1("Provinsi belum dipilih");
                    setError2("Kabupaten belum dipilih");
                    setKategori2([]);
                    setKategori3([]);
                    break;
                }
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lanjut
              </AText>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      switch (pilih4) {
        case "Provinsi":
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Tambah provinsi
                </AText>
              </View>
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan provinsi"}
                rtype={"done"}
                multi={true}
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
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setPilih4(null);
                    setPilih5(null);
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
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
                </TouchableOpacity>
              </View>
            </View>
          );
        case "Kabupaten":
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Tambah kabupaten
                </AText>
              </View>
              <ADropDownCostume
                hint={"Pilih provinsi"}
                saved={""}
                data={kategori}
                selected={setPilih}
                bdColor={color.neutral.neutral300}
                max={150}
              />

              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan kabupaten"}
                rtype={"done"}
                multi={true}
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
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setPilih4(null);
                    setPilih5(null);
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (pilih != "" && input != "") {
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
                </TouchableOpacity>
              </View>
            </View>
          );
        case "Kecamatan":
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Tambah kecamatan
                </AText>
              </View>

              <ADropDownCostume
                hint={"Pilih provinsi"}
                saved={""}
                data={kategori}
                selected={setPilih}
                bdColor={color.neutral.neutral300}
                max={150}
              />

              <View style={{ paddingBottom: 16 }} />

              <ADropDownCostume
                hint={"Pilih kabupaten"}
                saved={""}
                data={kategori2}
                selected={setPilih2}
                bdColor={color.neutral.neutral300}
                max={150}
                notFound={error1}
              />

              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan kecamatan"}
                rtype={"done"}
                maxHeight={90}
                multi={true}
                value={input}
                onChangeText={(value) => {
                  setInput(value);
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setPilih4(null);
                    setPilih5(null);
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (pilih != "" && pilih2 != "" && input != "") {
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
                </TouchableOpacity>
              </View>
            </View>
          );
        case "Kelurahan":
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Tambah kelurahan
                </AText>
              </View>

              <ADropDownCostume
                hint={"Pilih provinsi"}
                saved={""}
                data={kategori}
                selected={setPilih}
                bdColor={color.neutral.neutral300}
                max={150}
              />

              <View style={{ paddingBottom: 16 }} />

              <ADropDownCostume
                hint={"Pilih kabupaten"}
                saved={""}
                data={kategori2}
                selected={setPilih2}
                bdColor={color.neutral.neutral300}
                max={150}
                notFound={error1}
              />

              <View style={{ paddingBottom: 16 }} />

              <ADropDownCostume
                hint={"Pilih kecamatan"}
                saved={""}
                data={kategori3}
                selected={setPilih3}
                bdColor={color.neutral.neutral300}
                max={150}
                notFound={error2}
              />

              <View style={{ paddingBottom: 16 }} />

              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan kelurahan"}
                rtype={"done"}
                multi={true}
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
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setPilih4(null);
                    setPilih5(null);
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (
                      pilih != "" &&
                      pilih2 != "" &&
                      pilih3 != "" &&
                      input != ""
                    ) {
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
                </TouchableOpacity>
              </View>
            </View>
          );
      }
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
            android_ripple={{
              color: "rgba(0, 0, 0, 0.1)",
              borderless: false,
            }}
            style={{
              flexDirection: "row",
              padding: 8,
              marginTop: 16,
            }}
            onPress={() => {
              toggleEdit();
              switch (kondisi) {
                case "Andalalin":
                  setInput(pilih);
                  setInput2(pilih3);
                  break;
                case "Perlalin":
                  setInput(pilih);
                  setInput2(pilih2);
                  break;
                case "Jenis perlalin":
                  setInput(pilih);
                  setInput2(pilih2);
                  setInput3(pilih3);
                  break;
                case "Jenis":
                  setInput(pilih);
                  setInput2(pilih3);
                  setInput3(pilih4);
                  setInput4(pilih5);
                  break;
                case "Jalan":
                  setInput(getJalan(pilih2, pilih).KodeJalan);
                  setInput2(getJalan(pilih2, pilih).Nama);
                  setInput3(getJalan(pilih2, pilih).Pangkal);
                  setInput4(getJalan(pilih2, pilih).Ujung);
                  setInput5(getJalan(pilih2, pilih).Panjang);
                  setInput6(getJalan(pilih2, pilih).Lebar);
                  setInput7(getJalan(pilih2, pilih).Permukaan);
                  setInput8(getJalan(pilih2, pilih).Fungsi);
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
            android_ripple={{
              color: "rgba(0, 0, 0, 0.1)",
              borderless: false,
            }}
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
            <TouchableOpacity
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
            </TouchableOpacity>
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
                  marginBottom: 16,
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
              <ADropDownCostume
                hint={"Pilih kebutuhan"}
                saved={pilih4}
                data={kategoriKebutuhan}
                selected={setPilih4}
                bdColor={color.neutral.neutral300}
                max={150}
              />
              <View style={{ paddingBottom: 16 }} />
              <ADropDownCostume
                hint={"Pilih tipe"}
                saved={pilih5}
                data={kategoriTipe}
                selected={setPilih5}
                bdColor={color.neutral.neutral300}
                max={150}
              />
              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan persyaratan"}
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
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setInput2("");
                    setPilih4(null);
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (input != "" && input2 != "" && pilih4 != "") {
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
                </TouchableOpacity>
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
                  marginBottom: 16,
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
              <ADropDownCostume
                hint={"Pilih kebutuhan"}
                saved={pilih3}
                data={kategoriKebutuhan}
                selected={setPilih3}
                bdColor={color.neutral.neutral300}
                max={150}
              />
              <View style={{ paddingBottom: 16 }} />
              <ADropDownCostume
                hint={"Pilih tipe"}
                saved={pilih4}
                data={kategoriTipe}
                selected={setPilih4}
                bdColor={color.neutral.neutral300}
                max={150}
              />
              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan persyaratan"}
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
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setInput2("");
                    setPilih2(null);
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (input != "" && input2 != "" && pilih2 != "") {
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
                </TouchableOpacity>
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
                  marginBottom: 16,
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
                  file();
                }}
              />
              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan " + judul().toLowerCase()}
                rtype={"done"}
                multi={true}
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
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
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
                </TouchableOpacity>

                <TouchableOpacity
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
                </TouchableOpacity>
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
                  marginBottom: 16,
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
                title={"Opsional"}
                hint={"Masukkan kriteria khusus"}
                rtype={"done"}
                multi={true}
                maxHeight={90}
                value={input2}
                onChangeText={(value) => {
                  setInput2(value);
                }}
              />

              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan satuan"}
                rtype={"done"}
                multi={true}
                maxHeight={90}
                value={input3}
                onChangeText={(value) => {
                  setInput3(value);
                }}
              />

              <View style={{ paddingBottom: 16 }} />
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan terbilang"}
                rtype={"done"}
                multi={true}
                maxHeight={90}
                value={input4}
                onChangeText={(value) => {
                  setInput4(value);
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setInput("");
                    setInput2("");
                    setInput3("");
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (input != "") {
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
                </TouchableOpacity>
              </View>
            </View>
          );
        case "Jalan":
          return (
            <View style={{ maxHeight: Dimensions.get("screen").height / 2.5 }}>
              <View
                style={{
                  marginBottom: 16,
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

              <ScrollView
                style={{ maxHeight: "100%" }}
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"number-pad"}
                  hint={"Masukkan kode jalan"}
                  rtype={"next"}
                  value={input}
                  blur={false}
                  ref={inputRef}
                  onChangeText={(value) => {
                    setInput(value);
                  }}
                  submit={() => {
                    input != "" ? input2Ref.current.focus() : "";
                  }}
                />

                <View style={{ paddingBottom: 16 }} />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"default"}
                  hint={"Masukkan nama jalan"}
                  rtype={"next"}
                  value={input2}
                  blur={false}
                  ref={input2Ref}
                  onChangeText={(value) => {
                    setInput2(value);
                  }}
                  submit={() => {
                    input2 != "" ? input3Ref.current.focus() : "";
                  }}
                />

                <View style={{ paddingBottom: 16 }} />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"default"}
                  hint={"Masukkan pangkal jalan"}
                  rtype={"next"}
                  value={input3}
                  ref={input3Ref}
                  blur={false}
                  onChangeText={(value) => {
                    setInput3(value);
                  }}
                  submit={() => {
                    input3 != "" ? input4Ref.current.focus() : "";
                  }}
                />

                <View style={{ paddingBottom: 16 }} />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"default"}
                  hint={"Masukkan ujung jalan"}
                  rtype={"next"}
                  value={input4}
                  blur={false}
                  ref={input4Ref}
                  onChangeText={(value) => {
                    setInput4(value);
                  }}
                  submit={() => {
                    input4 != "" ? input5Ref.current.focus() : "";
                  }}
                />

                <View style={{ paddingBottom: 16 }} />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"number-pad"}
                  hint={"Masukkan panjang jalan"}
                  rtype={"next"}
                  value={input5}
                  blur={false}
                  ref={input5Ref}
                  onChangeText={(value) => {
                    setInput5(value);
                  }}
                  submit={() => {
                    input5 != "" ? input6Ref.current.focus() : "";
                  }}
                />

                <View style={{ paddingBottom: 16 }} />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"number-pad"}
                  hint={"Masukkan lebar jalan"}
                  rtype={"next"}
                  value={input6}
                  blur={false}
                  ref={input6Ref}
                  onChangeText={(value) => {
                    setInput6(value);
                  }}
                  submit={() => {
                    input6 != "" ? input7Ref.current.focus() : "";
                  }}
                />

                <View style={{ paddingBottom: 16 }} />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"default"}
                  hint={"Masukkan permukaan jalan"}
                  rtype={"next"}
                  value={input7}
                  blur={false}
                  ref={input7Ref}
                  onChangeText={(value) => {
                    setInput7(value);
                  }}
                  submit={() => {
                    input7 != "" ? input8Ref.current.focus() : "";
                  }}
                />

                <View style={{ paddingBottom: 16 }} />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"default"}
                  hint={"Masukkan fungsi jalan"}
                  rtype={"done"}
                  blur={true}
                  value={input8}
                  ref={input8Ref}
                  onChangeText={(value) => {
                    setInput8(value);
                  }}
                />
              </ScrollView>

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setPilih(null);
                    setPilih2(null);
                    setInput("");
                    setInput2("");
                    setInput3("");
                    setInput4("");
                    setInput5("");
                    setInput6("");
                    setInput7("");
                    setInput8("");
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingLeft: 4,
                    marginLeft: 32,
                  }}
                  onPress={() => {
                    if (
                      input != "" &&
                      input2 != "" &&
                      input3 != "" &&
                      input4 != "" &&
                      input5 != "" &&
                      input6 != "" &&
                      input7 != "" &&
                      input8 != ""
                    ) {
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
                </TouchableOpacity>
              </View>
            </View>
          );
        default:
          return (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
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
                  marginTop: 32,
                  marginRight: 16,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity
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
                </TouchableOpacity>

                <TouchableOpacity
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
                </TouchableOpacity>
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
          IdMaster,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.lokasi_pengambilan = result.data.lokasi_pengambilan;
                  setDataOn(false);
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
          IdMaster,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.kategori_rencana = result.data.kategori_rencana;

                  setDataOn(false);
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
          IdMaster,
          pilih,
          input,
          input2,
          input3,
          input4,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");
                  setInput3("");
                  setInput4("");

                  const result = await response.data;
                  data.jenis_rencana = result.data.jenis_rencana;

                  setDataOn(false);
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
                setInput2("");
                setInput3("");
                setInput4("");
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
                setInput3("");
                setInput4("");
                toggleTambahGagal();
                break;
            }
          }
        );
        break;
      case "Kategori utama":
        masterTambahKategoriUtamaPerlalin(
          context.getUser().access_token,
          IdMaster,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.kategori_utama =
                    result.data.kategori_utama;

                    setDataOn(false);
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
      case "Kategori perlalin":
        masterTambahKategoriPerlalin(
          context.getUser().access_token,
          IdMaster,
          input,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.kategori_perlengkapan =
                    result.data.kategori_perlengkapan;

                    setDataOn(false);
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
          IdMaster,
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

                  const result = await response.data;
                  data.perlengkapan = result.data.perlengkapan;

                  setDataOn(false);
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
                setRambuFile();
                  setRambuName();
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
                setRambuFile();
                  setRambuName();
                toggleTambahGagal();
                break;
            }
          }
        );
        break;
      case "Andalalin":
        masterTambahPersyaratanAndalalin(
          context.getUser().access_token,
          IdMaster,
          input,
          input2,
          pilih,
          pilih2,
          pilih3,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.data;
                  setData(result.data.persyaratan.PersyaratanAndalalin);

                  setDataOn(false);
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage(
                          "Persyaratan andalalin berhasil ditambahkan"
                        );
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
          IdMaster,
          input,
          input2,
          pilih,
          pilih2,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.data;
                  setData(result.data.persyaratan.PersyaratanPerlalin);

                  setDataOn(false);
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
      case "Wilayah":
        switch (pilih4) {
          case "Provinsi":
            masterTambahProvinsi(
              context.getUser().access_token,
              IdMaster,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setPilih4(null);
                      setPilih5(null);
                      setInput("");

                      const result = await response.data;

                      data.provinsi = result.data.provinsi;

                      setDataOn(false);
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Provinsi berhasil ditambahkan");
                        showSnackbar();
                      }, 1000);
                    })();
                    break;
                  case 409:
                    context.toggleLoading(false);
                    setPilih4(null);
                    setPilih5(null);
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
                    setPilih4(null);
                    setPilih5(null);
                    setInput("");
                    toggleTambahGagal();
                    break;
                }
              }
            );
            break;
          case "Kabupaten":
            masterTambahKabupaten(
              context.getUser().access_token,
              IdMaster,
              pilih,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setPilih4(null);
                      setPilih5(null);
                      setInput("");

                      const result = await response.data;
                      data.kabupaten = result.data.kabupaten;
                      setDataOn(false);
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kabupaten berhasil ditambahkan");
                        showSnackbar();
                      }, 1000);
                    })();
                    break;
                  case 409:
                    context.toggleLoading(false);
                    setPilih4(null);
                    setPilih5(null);
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
                    setPilih4(null);
                    setPilih5(null);
                    setInput("");
                    toggleTambahGagal();
                    break;
                }
              }
            );
            break;
          case "Kecamatan":
            masterTambahKecamatan(
              context.getUser().access_token,
              IdMaster,
              pilih2,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setPilih4(null);
                      setPilih5(null);
                      setInput("");

                      const result = await response.data;
                      data.kecamatan = result.data.kecamatan;
                      setDataOn(false);
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kecamatan berhasil ditambahkan");
                        showSnackbar();
                      }, 1000);
                    })();
                    break;
                  case 409:
                    context.toggleLoading(false);
                    setPilih4(null);
                    setPilih5(null);
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
                    setPilih4(null);
                    setPilih5(null);
                    setInput("");
                    toggleTambahGagal();
                    break;
                }
              }
            );
            break;
          case "Kelurahan":
            masterTambahKelurahan(
              context.getUser().access_token,
              IdMaster,
              pilih3,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setPilih4(null);
                      setPilih5(null);
                      setInput("");

                      const result = await response.data;
                      data.kelurahan = result.data.kelurahan;

                      setDataOn(false);
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kelurahan berhasil ditambahkan");
                        showSnackbar();
                      }, 1000);
                    })();
                    break;
                  case 409:
                    context.toggleLoading(false);
                    setPilih4(null);
                    setPilih5(null);
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
                    setPilih4(null);
                    setPilih5(null);
                    setInput("");
                    toggleTambahGagal();
                    break;
                }
              }
            );
            break;
        }
        break;
      case "Proyek":
        masterTambahJenisProyek(
          context.getUser().access_token,
          IdMaster,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.jenis_proyek = result.data.jenis_proyek;
                  setDataOn(false);

                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis proyek berhasil ditambahkan");
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
      case "Jalan":
        const data_jalan = {
          kode_kecamatan: input9,
          kode_kelurahan: input10,
          kode_jalan: input,
          nama: input2,
          pangkal: input3,
          ujung: input4,
          kelurahan: pilih2,
          kecamatan: pilih,
          panjang: input5,
          lebar: input6,
          permukaan: input7,
          fungsi: input8,
        };
        masterTambahJalan(
          context.getUser().access_token,
          IdMaster,
          data_jalan,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setPilih(null);
                  setPilih2(null);
                  setInput("");
                  setInput2("");
                  setInput3("");
                  setInput4("");
                  setInput5("");
                  setInput6("");
                  setInput7("");
                  setInput8("");
                  setInput9("");
                  setInput10("");
                  setKategori2([]);

                  const result = await response.data;
                  data.jalan = result.data.jalan;

                  setDataOn(false);
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jalan berhasil ditambahkan");
                    showSnackbar();
                  }, 1000);
                })();
                break;
              case 409:
                context.toggleLoading(false);
                setPilih(null);
                setPilih2(null);
                setInput("");
                setInput2("");
                setInput3("");
                setInput4("");
                setInput5("");
                setInput6("");
                setInput7("");
                setInput8("");
                setInput9("");
                setInput10("");
                setKategori2([]);
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
                setPilih(null);
                setPilih2(null);
                setInput("");
                setInput2("");
                setInput3("");
                setInput4("");
                setInput5("");
                setInput6("");
                setInput7("");
                setInput8("");
                setInput9("");
                setInput10("");
                setKategori2([]);
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
          IdMaster,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.lokasi_pengambilan = result.data.lokasi_pengambilan;
                  if (result.data.lokasi_pengambilan == null) {
                    setDataOn(true);
                  } else {
                    setDataOn(false);
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
          IdMaster,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.kategori_rencana = result.data.kategori_rencana;

                  if (result.data.kategori_rencana == null) {
                        setDataOn(true);
                      } else {
                        setDataOn(false);
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
          IdMaster,
          pilih2,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.jenis_rencana = result.data.jenis_rencana;

                  if (result.data.jenis_rencana == null) {
                        setDataOn(true);
                      } else {
                        setDataOn(false);
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
      case "Kategori utama":
        masterHapusKategoriUtamaPerlalin(
          context.getUser().access_token,
          IdMaster,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.kategori_utama =
                    result.data.kategori_utama;

                    if (result.data.kategori_utama == null) {
                      setDataOn(true);
                    } else {
                      setDataOn(false);
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
      case "Kategori perlalin":
        masterHapusKategoriPerlalin(
          context.getUser().access_token,
          IdMaster,
          pilih,
          pilih2,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.kategori_perlengkapan =
                    result.data.kategori_perlengkapan;

                    if (result.data.kategori_perlengkapan == null) {
                      setDataOn(true);
                    } else {
                      setDataOn(false);
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
          IdMaster,
          pilih2,
          pilih3,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.perlengkapan = result.data.perlengkapan;

                  if (result.data.perlengkapan == null) {
                    setDataOn(true);
                  } else {
                    setDataOn(false);
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
          IdMaster,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;

                  download(pilih, uri, result.file);
                  let persyaratan =
                  result.data.persyaratan.PersyaratanAndalalin.map(
                    (item) => {
                      return item.persyaratan;
                    }
                  );
                  if (persyaratan.length == 0) {
                    setDataOn(true);
                    setData(null);
                  } else {
                    setDataOn(false);
                    setData(result.data.persyaratan.PersyaratanAndalalin);
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
          IdMaster,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;

                  download(pilih, uri, result.file);
                  let persyaratan =
                  result.data.persyaratan.PersyaratanPerlalin.map(
                    (item) => {
                      return item.persyaratan;
                    }
                  );
                      if (persyaratan.length == 0) {
                        setDataOn(true);
                        setData(null);
                      } else {
                        setDataOn(false);
                        setData(result.data.persyaratan.PersyaratanPerlalin);
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
      case "Wilayah":
        switch (pilih2) {
          case "Provinsi":
            masterHapusProvinsi(
              context.getUser().access_token,
              IdMaster,
              pilih,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      const result = await response.data;
                      data.provinsi = result.data.provinsi;

                      if (result.data.provinsi == null) {
                        setDataOn(true);
                      } else {
                        setDataOn(false);
                      }
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Provinsi berhasil dihapus");
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
          case "Kabupaten":
            toggleWilayah();
            masterHapusKabupaten(
              context.getUser().access_token,
              IdMaster,
              pilih,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      const result = await response.data;
                      data.kabupaten = result.data.kabupaten;

                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kabupaten berhasil dihapus");
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
          case "Kecamatan":
            toggleWilayah();
            masterHapusKecamatan(
              context.getUser().access_token,
              IdMaster,
              pilih,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      const result = await response.data;
                      data.kecamatan = result.data.kecamatan;
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kecamatan berhasil dihapus");
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
          case "Kelurahan":
            toggleWilayah();
            masterHapusKelurahan(
              context.getUser().access_token,
              IdMaster,
              pilih,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      const result = await response.data;
                      data.kelurahan = result.data.kelurahan;
                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kelurahan berhasil dihapus");
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
        break;
      case "Proyek":
        masterHapusJenisProyek(
          context.getUser().access_token,
          IdMaster,
          pilih,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.jenis_proyek = result.data.jenis_proyek;
                  if (result.data.jenis_proyek == null) {
                    setDataOn(true);
                  } else {
                    setDataOn(false);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis proyek berhasil dihapus");
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
      case "Jalan":
        toggleJalan();
        masterHapusJalan(
          context.getUser().access_token,
          IdMaster,
          pilih2,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  const result = await response.data;
                  data.jalan = result.data.jalan;

                  if (result.data.jalan == null) {
                    setDataOn(true);
                  } else {
                    setDataOn(false);
                  }
                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jalan berhasil dihapus");
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
          IdMaster,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.lokasi_pengambilan = result.data.lokasi_pengambilan;
                  setDataOn(false);

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
          IdMaster,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.kategori_rencana = result.data.kategori_rencana;

                  setDataOn(false);
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
          IdMaster,
          pilih2,
          pilih,
          input,
          input2,
          input3,
          input4,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");
                  setInput3("");
                  setInput4("");

                  const result = await response.data;
                  data.jenis_rencana = result.data.jenis_rencana;

                  setDataOn(false);
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
                setInput2("");
                setInput3("");
                setInput4("");
                toggleEditGagal();
                break;
            }
          }
        );
        break;
      case "Kategori utama":
        masterEditKategoriUtamaPerlalin(
          context.getUser().access_token,
          IdMaster,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.kategori_utama =
                    result.data.kategori_utama;

                    setDataOn(false);
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
      case "Kategori perlalin":
        masterEditKategoriPerlalin(
          context.getUser().access_token,
          IdMaster,
          pilih,
          pilih2,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.kategori_perlengkapan =
                    result.data.kategori_perlengkapan;

                    setDataOn(false);
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
          IdMaster,
          pilih2,
          pilih3,
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

                  const result = await response.data;
                  data.perlengkapan = result.data.perlengkapan;

                  setDataOn(false);
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
                setRambuFile();
                  setRambuName();
                toggleEditGagal();
                break;
            }
          }
        );
        break;
      case "Andalalin":
        masterEditPersyaratanAndalalin(
          context.getUser().access_token,
          IdMaster,
          pilih,
          input,
          input2,
          pilih2,
          pilih4,
          pilih5,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.data;
                  setData(result.data.persyaratan.PersyaratanAndalalin);

                  setDataOn(false);
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
          IdMaster,
          pilih,
          input,
          input2,
          pilih3,
          pilih4,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");
                  setInput2("");

                  const result = await response.data;
                  setData(result.data.persyaratan.PersyaratanPerlalin);

                  setDataOn(false);
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
      case "Wilayah":
        switch (pilih2) {
          case "Provinsi":
            masterEditProvinsi(
              context.getUser().access_token,
              IdMaster,
              pilih,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setInput("");

                      const result = await response.data;
                      data.provinsi = result.data.provinsi;

                      setDataOn(false);

                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Provinsi berhasil diedit");
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
          case "Kabupaten":
            toggleWilayah();
            masterEditKabupaten(
              context.getUser().access_token,
              IdMaster,
              pilih,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setInput("");

                      const result = await response.data;
                      data.kabupaten = result.data.kabupaten;
                      setDataOn(false);

                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kabupaten berhasil diedit");
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
          case "Kecamatan":
            toggleWilayah();
            masterEditKecamatan(
              context.getUser().access_token,
              IdMaster,
              pilih,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setInput("");

                      const result = await response.data;
                      data.kecamatan = result.data.kecamatan;
                      setDataOn(false);

                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kecamatan berhasil diedit");
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
          case "Kelurahan":
            toggleWilayah();
            masterEditKelurahan(
              context.getUser().access_token,
              IdMaster,
              pilih,
              input,
              (response) => {
                switch (response.status) {
                  case 200:
                    (async () => {
                      setInput("");

                      const result = await response.data;
                      data.kelurahan = result.data.kelurahan;
                      setDataOn(false);

                      setTimeout(() => {
                        context.toggleLoading(false);
                        setMessage("Kelurahan berhasil diedit");
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
        }
        break;
      case "Proyek":
        masterEditJenisProyek(
          context.getUser().access_token,
          IdMaster,
          pilih,
          input,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setInput("");

                  const result = await response.data;
                  data.jenis_proyek = result.data.jenis_proyek;
                  setDataOn(false);

                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jenis proyek berhasil diedit");
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
      case "Jalan":
        toggleJalan();
        const data_jalan = {
          kode_kecamatan: getJalan(pilih2, pilih).KodeKecamatan,
          kode_kelurahan: getJalan(pilih2, pilih).KodeKelurahan,
          kode_jalan: input,
          nama: input2,
          pangkal: input3,
          ujung: input4,
          kelurahan: getJalan(pilih2, pilih).Kelurahan,
          kecamatan: getJalan(pilih2, pilih).Kecamatan,
          panjang: input5,
          lebar: input6,
          permukaan: input7,
          fungsi: input8,
        };
        masterEditJalan(
          context.getUser().access_token,
          IdMaster,
          pilih2,
          pilih,
          data_jalan,
          (response) => {
            switch (response.status) {
              case 200:
                (async () => {
                  setPilih(null);
                  setPilih2(null);
                  setInput("");
                  setInput2("");
                  setInput3("");
                  setInput4("");
                  setInput5("");
                  setInput6("");
                  setInput7("");
                  setInput8("");

                  const result = await response.data;
                  data.jalan = result.data.jalan;
                  setDataOn(false);

                  setTimeout(() => {
                    context.toggleLoading(false);
                    setMessage("Jalan berhasil diedit");
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
                setPilih(null);
                setPilih2(null);
                setInput("");
                setInput2("");
                setInput3("");
                setInput4("");
                setInput5("");
                setInput6("");
                setInput7("");
                setInput8("");
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
            size={20}
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

        <ABottomSheet visible={tambah} close={closeTambah}>
          {tambah_view()}
        </ABottomSheet>

        <ABottomSheet visible={tindakan} close={closeTindakan}>
          {tindakan_view()}
        </ABottomSheet>
      </View>

      {data != null || dataOn ? (
        <Pressable
          android_ripple={{
            color: "rgba(0, 0, 0, 0.1)",
            borderless: false,
            radius: 32,
          }}
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
          deviceHeight={Dimensions.get("screen").height}
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
        toggleVisibleModal={toggleTambahConfirms}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          setPilih(null);
    setPilih2(null);
    setPilih3(null);
    setPilih4(null);
    setPilih5(null);
    setInput("");
    setInput2("");
    setInput3("");
    setInput4("");
    setInput5("");
    setInput6("");
    setInput7("");
    setInput8("");
    setInput9("");
    setInput10("");
    setKategori2([]);
    toggleTambah();
    setRambuFile();
    setRambuName();
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
        toggleVisibleModal={toggleHapusConfirms}
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
        toggleVisibleModal={toggleEditConfirms}
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
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={tambahGagal}
        toggleModal={toggleTambahGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleTambahGagal();
        }}
      />

      <ADialog
        title={"Hapus " + title().toLowerCase() + " gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={hapusGagal}
        toggleModal={toggleHapusGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleHapusGagal();
        }}
      />

      <ADialog
        title={"Edit " + title().toLowerCase() + " gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={editGagal}
        toggleModal={toggleEditGagal}
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
        toggleModal={toggleDataExist}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleDataExist();
        }}
      />

      <ADialog
        title={"Data master gagal dimuat"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={loadGagal}
        toggleModal={toggleLoadGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleLoadGagal();
          setProgressViewOffset(-1000);
          navigation.navigate("Pengelolaan");
        }}
      />

      {kondisi == "Wilayah" && data != null ? (
        <AWilayah
          visibleModal={wilayah}
          master={data}
          btnBATAL={"Batal"}
          id={pilih3}
          tahapan={setPilih2}
          selected={setPilih}
          pilihan={toggleTindakan}
          onPressBATALButton={() => {
            toggleWilayah();
          }}
        />
      ) : (
        ""
      )}

      {kondisi == "Jalan" && data != null ? (
        <AJalan
          visibleModal={jalan}
          master={data}
          btnBATAL={"Batal"}
          id={pilih5}
          selected={setPilih2}
          selectedName={setPilih}
          pilihan={toggleTindakan}
          onPressBATALButton={() => {
            toggleJalan();
          }}
        />
      ) : (
        ""
      )}
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
