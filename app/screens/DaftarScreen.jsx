import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  RefreshControl,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ACardPermohonan from "../component/utility/ACardPermohonan";
import {
  andalalinGetAll,
  andalalinGetAllPemasangan,
  andalalinGetAllSurvei,
  andalalinGetAllSurveiMandiri,
  andalalinGetAllSurveiMandiriPetugas,
  andalalinGetByIdUser,
  andalalinGetByStatus,
  andalalinGetByTiketLevel2,
  andalalinGetPermohonanPemasangan,
  andalalinGetUsulanTindakan,
  andalalinSimpanKeputusan,
  andalalinTindakan,
} from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import { Feather } from "@expo/vector-icons";
import ABottomSheet from "../component/utility/ABottomSheet";
import { RadioButton } from "react-native-paper";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import ATextInput from "../component/utility/ATextInput";
import { poppins } from "../constants/font";
import AFilterModal from "../component/utility/AFilterModal";
import { useFocusEffect } from "@react-navigation/native";

function DaftarScreen({ navigation, route }) {
  const [gagal, toggleGagal] = useStateToggler();
  const [surveiGagal, toggleSurveiGagal] = useStateToggler();
  const [pemasanganGagal, togglePemasanganGagal] = useStateToggler();
  const [usulanGagal, toggleUsulanGagal] = useStateToggler();
  const [permohonan, setPermohonan] = useState("permohonan");
  const [permohonanaDefault, setPermohonanDefault] = useState("permohonan");
  const [permohonanaFilterDefault, setPermohonanFilterDefault] = useState();
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);

  

  const [filterModal, toggleFilterModal] = useStateToggler();

  const [pencarian, setPencarian] = useState();

  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.navigate("Home");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.navigate("Home");
        return true;
      });
    }, [kondisi])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      context.toggleLoading(true);
      setTimeout(() => {
        setPermohonan("permohonan");
        switch (context.getUser().role) {
          case "User":
            loadDaftarPermohonan();
            break;
          case "Operator":
            switch (kondisi) {
              case "Diajukan":
                loadPermohonan();
                break;
              case "Mandiri":
                loadSurveiMandiri();
                break;
            }
            break;
          case "Petugas":
            switch (kondisi) {
              case "Survei":
                loadDaftarByTiketLevel2("Buka");
                break;
              case "Mandiri":
                loadSurveiMandiriByPetugas();
                break;
              case "Daftar":
                loadDaftarSurvei();
                break;
              case "Pemasangan":
                loadDaftarPermohonanPemasangan();
                break;
              case "Daftar Pemasangan":
                loadDaftarPemasangan();
                break;
            }
            break;
          case "Admin":
            switch (kondisi) {
              case "Diajukan":
                loadPermohonan();
                break;
              case "Pengawasan":
                loadUsulanTindakan();
                break;
              case "Mandiri":
                loadSurveiMandiri();
                break;
            }
            break;
          case "Dinas Perhubungan":
            switch (kondisi) {
              case "Diajukan":
                loadPermohonan();
                break;
              case "Mandiri":
                loadSurveiMandiri();
                break;
            }
            break;
          case "Super Admin":
            switch (kondisi) {
              case "Mandiri":
                loadSurveiMandiri();
                break;
              case "Diajukan":
                loadPermohonan();
                break;
              case "Pengawasan":
                loadUsulanTindakan();
                break;
            }
            break;
        }
      }, 500);
    });
    return unsubscribe;
  }, [navigation]);

  const loadPermohonan = () => {
    andalalinGetAll(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            setPermohonan(result.data);
            setPermohonanDefault(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadPermohonan();
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

  const loadDaftarPermohonan = () => {
    andalalinGetByIdUser(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            setPermohonan(result.data);
            setPermohonanDefault(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadDaftarPermohonan();
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

  const loadSurveiMandiri = () => {
    andalalinGetAllSurveiMandiri(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            setPermohonan(result.data);
            setPermohonanDefault(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadSurveiMandiri();
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

  const loadDaftarByTiketLevel2 = (status) => {
    andalalinGetByTiketLevel2(
      context.getUser().access_token,
      status,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              setPermohonan(result.data);
              setPermohonanDefault(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadDaftarByTiketLevel2();
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
      }
    );
  };

  const loadSurveiMandiriByPetugas = () => {
    andalalinGetAllSurveiMandiriPetugas(
      context.getUser().access_token,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              setPermohonan(result.data);
              setPermohonanDefault(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadSurveiMandiriByPetugas();
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
      }
    );
  };

  const loadDaftarSurvei = () => {
    andalalinGetAllSurvei(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            setPermohonan(result.data);
            setPermohonanDefault(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadDaftarSurvei();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleSurveiGagal();
          break;
      }
    });
  };

  const loadDaftarPermohonanPemasangan = () => {
    andalalinGetPermohonanPemasangan(
      context.getUser().access_token,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              setPermohonan(result.data);
              setPermohonanDefault(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadDaftarPermohonanPemasangan();
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
      }
    );
  };

  const loadDaftarPemasangan = () => {
    andalalinGetAllPemasangan(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            setPermohonan(result.data);
            setPermohonanDefault(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadDaftarPemasangan();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          togglePemasanganGagal();
          break;
      }
    });
  };

  const loadUsulanTindakan = () => {
    andalalinGetUsulanTindakan(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            setPermohonan(result.data);
            setPermohonanDefault(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadUsulanTindakan();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleUsulanGagal();
          break;
      }
    });
  };

  const loadPermohonanByStatus = (status) => {
    andalalinGetByStatus(context.getUser().access_token, status, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            setPermohonan(result.data);
            setPermohonanDefault(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadPermohonanByStatus();
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

  const helper = () => {
    switch (context.getUser().role) {
      case "User":
        return (
          <View>
            {permohonan != "permohonan" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 6,
                  marginBottom: 32,
                }}
              >
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
                    placeholder="Pencarian permohonan"
                    selectionColor={color.neutral.neutral400}
                    autoComplete="off"
                    returnKeyType="search"
                    value={pencarian}
                    autoCapitalize="none"
                    onChangeText={(value) => {
                      search(value);
                    }}
                    onSubmitEditing={() => search(pencarian)}
                  />
                </View>

                <Pressable
                  android_ripple={{
                    color: "rgba(0, 0, 0, 0.1)",
                    borderless: false,
                    radius: 32,
                  }}
                  style={styles.filter}
                  onPress={() => {
                    toggleFilterModal();
                  }}
                >
                  <Feather name="filter" size={24} color={color.primary.main} />
                </Pressable>
              </View>
            ) : (
              ""
            )}
          </View>
        );
      case "Operator":
        switch (kondisi) {
          case "Diajukan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          search(value);
                        }}
                        onSubmitEditing={() => search(pencarian)}
                      />
                    </View>

                    <Pressable
                      android_ripple={{
                        color: "rgba(0, 0, 0, 0.1)",
                        borderless: false,
                        radius: 32,
                      }}
                      style={styles.filter}
                      onPress={() => {
                        toggleFilterModal();
                      }}
                    >
                      <Feather
                        name="filter"
                        size={24}
                        color={color.primary.main}
                      />
                    </Pressable>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Mandiri":
            return (
              <View style={{ marginTop: 6, marginBottom: 32 }}>
                {permohonan != "permohonan" ? (
                  <View style={styles.searchInputMandiri}>
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
                      placeholder="Pencarian survei"
                      selectionColor={color.neutral.neutral400}
                      autoComplete="off"
                      returnKeyType="search"
                      value={pencarian}
                      autoCapitalize="none"
                      onChangeText={(value) => {
                        searchMandiri(value);
                      }}
                      onSubmitEditing={() => searchMandiri(pencarian)}
                    />
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
        }
        break;
      case "Petugas":
        switch (kondisi) {
          case "Survei":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Pemasangan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Mandiri":
            return (
              <View style={{ marginTop: 6, marginBottom: 32 }}>
                {permohonan != "permohonan" ? (
                  <View style={styles.searchInputMandiri}>
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
                      placeholder="Pencarian survei"
                      selectionColor={color.neutral.neutral400}
                      autoComplete="off"
                      returnKeyType="search"
                      value={pencarian}
                      autoCapitalize="none"
                      onChangeText={(value) => {
                        searchMandiri(value);
                      }}
                      onSubmitEditing={() => searchMandiri(pencarian)}
                    />
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Daftar":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Daftar Pemasangan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
        }
        break;
      case "Admin":
        switch (kondisi) {
          case "Diajukan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          search(value);
                        }}
                        onSubmitEditing={() => search(pencarian)}
                      />
                    </View>

                    <Pressable
                      android_ripple={{
                        color: "rgba(0, 0, 0, 0.1)",
                        borderless: false,
                        radius: 32,
                      }}
                      style={styles.filter}
                      onPress={() => {
                        toggleFilterModal();
                      }}
                    >
                      <Feather
                        name="filter"
                        size={24}
                        color={color.primary.main}
                      />
                    </Pressable>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Pengawasan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Tertunda":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Mandiri":
            return (
              <View style={{ marginTop: 6, marginBottom: 32 }}>
                {permohonan != "permohonan" ? (
                  <View style={styles.searchInputMandiri}>
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
                      placeholder="Pencarian survei"
                      selectionColor={color.neutral.neutral400}
                      autoComplete="off"
                      returnKeyType="search"
                      value={pencarian}
                      autoCapitalize="none"
                      onChangeText={(value) => {
                        searchMandiri(value);
                      }}
                      onSubmitEditing={() => searchMandiri(pencarian)}
                    />
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Lanjutkan Pemasangan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
        }
        break;
      case "Dinas Perhubungan":
        switch (kondisi) {
          case "Diajukan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          search(value);
                        }}
                        onSubmitEditing={() => search(pencarian)}
                      />
                    </View>

                    <Pressable
                      android_ripple={{
                        color: "rgba(0, 0, 0, 0.1)",
                        borderless: false,
                        radius: 32,
                      }}
                      style={styles.filter}
                      onPress={() => {
                        toggleFilterModal();
                      }}
                    >
                      <Feather
                        name="filter"
                        size={24}
                        color={color.primary.main}
                      />
                    </Pressable>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Mandiri":
            return (
              <View style={{ marginTop: 6, marginBottom: 32 }}>
                {permohonan != "permohonan" ? (
                  <View style={styles.searchInputMandiri}>
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
                      placeholder="Pencarian survei"
                      selectionColor={color.neutral.neutral400}
                      autoComplete="off"
                      returnKeyType="search"
                      value={pencarian}
                      autoCapitalize="none"
                      onChangeText={(value) => {
                        searchMandiri(value);
                      }}
                      onSubmitEditing={() => searchMandiri(pencarian)}
                    />
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
        }
        break;
      case "Super Admin":
        switch (kondisi) {
          case "Diajukan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          search(value);
                        }}
                        onSubmitEditing={() => search(pencarian)}
                      />
                    </View>

                    <Pressable
                      android_ripple={{
                        color: "rgba(0, 0, 0, 0.1)",
                        borderless: false,
                        radius: 32,
                      }}
                      style={styles.filter}
                      onPress={() => {
                        toggleFilterModal();
                      }}
                    >
                      <Feather
                        name="filter"
                        size={24}
                        color={color.primary.main}
                      />
                    </Pressable>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Mandiri":
            return (
              <View style={{ marginTop: 6, marginBottom: 32 }}>
                {permohonan != "permohonan" ? (
                  <View style={styles.searchInputMandiri}>
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
                      placeholder="Pencarian survei"
                      selectionColor={color.neutral.neutral400}
                      autoComplete="off"
                      returnKeyType="search"
                      value={pencarian}
                      autoCapitalize="none"
                      onChangeText={(value) => {
                        searchMandiri(value);
                      }}
                      onSubmitEditing={() => searchMandiri(pencarian)}
                    />
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Pengawasan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Tertunda":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
          case "Lanjutkan Pemasangan":
            return (
              <View>
                {permohonan != "permohonan" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 6,
                      marginBottom: 32,
                    }}
                  >
                    <View style={styles.searchInputMandiri}>
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
                        placeholder="Pencarian permohonan"
                        selectionColor={color.neutral.neutral400}
                        autoComplete="off"
                        returnKeyType="search"
                        value={pencarian}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                          searchSimple(value);
                        }}
                        onSubmitEditing={() => searchSimple(pencarian)}
                      />
                    </View>
                  </View>
                ) : (
                  ""
                )}
              </View>
            );
        }
        break;
    }
  };

  const filter = (f1, f2) => {
    if (permohonanaDefault != null && permohonanaDefault.length != 0) {
      if (f1 != null && f2 != null) {
        if (pencarian != null) {
          const newData1 = permohonan.filter(function (item) {
            return (
              item.jenis_andalalin &&
              item.jenis_andalalin.toLowerCase().indexOf(f1.toLowerCase()) >
                -1 &&
              item.status_andalalin &&
              item.status_andalalin.toLowerCase().indexOf(f2.toLowerCase()) > -1
            );
          });
          setPermohonan(newData1);
          setPermohonanFilterDefault(newData1);
          setFilter1(f1);
          setFilter2(f2);
        } else {
          const newData1 = permohonanaDefault.filter(function (item) {
            return (
              item.jenis_andalalin &&
              item.jenis_andalalin.toLowerCase().indexOf(f1.toLowerCase()) >
                -1 &&
              item.status_andalalin &&
              item.status_andalalin.toLowerCase().indexOf(f2.toLowerCase()) > -1
            );
          });
          setPermohonan(newData1);
          setPermohonanFilterDefault(newData1);
          setFilter1(f1);
          setFilter2(f2);
        }
      } else if (f1 != null) {
        if (pencarian != null) {
          const newData2 = permohonan.filter(function (item) {
            return (
              item.jenis_andalalin &&
              item.jenis_andalalin.toLowerCase().indexOf(f1.toLowerCase()) > -1
            );
          });
          setPermohonan(newData2);
          setPermohonanFilterDefault(newData2);
          setFilter1(f1);
          setFilter2(f2);
        } else {
          const newData2 = permohonanaDefault.filter(function (item) {
            return (
              item.jenis_andalalin &&
              item.jenis_andalalin.toLowerCase().indexOf(f1.toLowerCase()) > -1
            );
          });
          setPermohonan(newData2);
          setPermohonanFilterDefault(newData2);
          setFilter1(f1);
          setFilter2(f2);
        }
      } else if (f2 != null) {
        if (pencarian != null) {
          const newData3 = permohonan.filter(function (item) {
            return (
              item.status_andalalin &&
              item.status_andalalin.toLowerCase().indexOf(f2.toLowerCase()) > -1
            );
          });
          setPermohonan(newData3);
          setPermohonanFilterDefault(newData3);
          setFilter1(f1);
          setFilter2(f2);
        } else {
          const newData3 = permohonanaDefault.filter(function (item) {
            return (
              item.status_andalalin &&
              item.status_andalalin.toLowerCase().indexOf(f2.toLowerCase()) > -1
            );
          });
          setPermohonan(newData3);
          setPermohonanFilterDefault(newData3);
          setFilter1(f1);
          setFilter2(f2);
        }
      } else {
        if (pencarian != null && pencarian != "") {
          search(pencarian);
          setPermohonanFilterDefault(null);
          setFilter1(f1);
          setFilter2(f2);
        } else {
          setPermohonan(permohonanaDefault);
          setPermohonanFilterDefault(null);
          setFilter1(f1);
          setFilter2(f2);
        }
      }
    } else {
      if (pencarian != null && pencarian != "") {
        search(pencarian);
        setPermohonanFilterDefault(null);
        setFilter1(f1);
        setFilter2(f2);
      } else {
        setPermohonan(permohonanaDefault);
        setPermohonanFilterDefault(null);
        setFilter1(f1);
        setFilter2(f2);
      }
    }
  };

  const search = (cari) => {
    if (cari) {
      if (permohonanaDefault != null && permohonanaDefault.length != 0) {
        if (
          permohonanaFilterDefault != null &&
          permohonanaFilterDefault.length != 0
        ) {
          const newData = permohonanaFilterDefault.filter(function (item) {
            return (
              (item.kode_andalalin &&
                item.kode_andalalin.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.nama_pemohon &&
                item.nama_pemohon.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.email_pemohon &&
                item.email_pemohon.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.status_andalalin &&
                item.status_andalalin
                  .toLowerCase()
                  .indexOf(cari.toLowerCase()) > -1) ||
              (item.tanggal_andalalin &&
                item.tanggal_andalalin
                  .toLowerCase()
                  .indexOf(cari.toLowerCase()) > -1) ||
              (item.jenis_andalalin &&
                item.jenis_andalalin.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.pengembang &&
                item.pengembang.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.petugas &&
                item.petugas.toLowerCase().indexOf(cari.toLowerCase()) > -1)
            );
          });
          setPermohonan(newData);
        } else {
          const newData = permohonanaDefault.filter(function (item) {
            return (
              (item.kode_andalalin &&
                item.kode_andalalin.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.nama_pemohon &&
                item.nama_pemohon.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.email_pemohon &&
                item.email_pemohon.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.status_andalalin &&
                item.status_andalalin
                  .toLowerCase()
                  .indexOf(cari.toLowerCase()) > -1) ||
              (item.tanggal_andalalin &&
                item.tanggal_andalalin
                  .toLowerCase()
                  .indexOf(cari.toLowerCase()) > -1) ||
              (item.jenis_andalalin &&
                item.jenis_andalalin.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.pengembang &&
                item.pengembang.toLowerCase().indexOf(cari.toLowerCase()) >
                  -1) ||
              (item.petugas &&
                item.petugas.toLowerCase().indexOf(cari.toLowerCase()) > -1)
            );
          });
          setPermohonan(newData);
        }
      } else {
        if (
          permohonanaFilterDefault != null &&
          permohonanaFilterDefault.length != 0
        ) {
          setPermohonan(permohonanaFilterDefault);
        } else {
          setPermohonan(permohonanaDefault);
        }
      }

      setPencarian(cari);
    } else {
      if (
        permohonanaFilterDefault != null &&
        permohonanaFilterDefault.length != 0
      ) {
        setPermohonan(permohonanaFilterDefault);
      } else {
        setPermohonan(permohonanaDefault);
      }

      setPencarian(cari);
    }
  };

  const searchSimple = (cari) => {
    if (cari) {
      if (permohonanaDefault != null && permohonanaDefault.length != 0) {
        const newData = permohonanaDefault.filter(function (item) {
          return (
            (item.kode_andalalin &&
              item.kode_andalalin.toLowerCase().indexOf(cari.toLowerCase()) >
                -1) ||
            (item.nama_pemohon &&
              item.nama_pemohon.toLowerCase().indexOf(cari.toLowerCase()) >
                -1) ||
            (item.tanggal_andalalin &&
              item.tanggal_andalalin.toLowerCase().indexOf(cari.toLowerCase()) >
                -1) ||
            (item.email_pemohon &&
              item.email_pemohon.toLowerCase().indexOf(cari.toLowerCase()) > -1)
          );
        });
        setPermohonan(newData);
        setPencarian(cari);
      } else {
        setPermohonan(permohonanaDefault);
        setPencarian(cari);
      }
    } else {
      setPermohonan(permohonanaDefault);
      setPencarian(cari);
    }
  };

  const searchMandiri = (cari) => {
    if (cari) {
      if (permohonanaDefault != null && permohonanaDefault.length != 0) {
        const newData = permohonanaDefault.filter(function (item) {
          return (
            item.Petugas.toLowerCase().indexOf(cari.toLowerCase()) > -1 ||
            item.StatusSurvei.toLowerCase().indexOf(cari.toLowerCase()) > -1 ||
            item.TanggalSurvei.toLowerCase().indexOf(cari.toLowerCase()) > -1
          );
        });
        setPermohonan(newData);
        setPencarian(cari);
      } else {
        setPermohonan(permohonanaDefault);
        setPencarian(cari);
      }
    } else {
      setPermohonan(permohonanaDefault);
      setPencarian(cari);
    }
  };

  const judul = () => {
    switch (context.getUser().role) {
      case "User":
        return "Daftar permohonan";
      case "Operator":
        switch (kondisi) {
          case "Mandiri":
            return "Daftar survei mandiri";
          default:
            return "Daftar permohonan";
        }
      case "Petugas":
        switch (kondisi) {
          case "Survei":
            return "Daftar permohonan";
          case "Mandiri":
            return "Daftar survei mandiri";
          case "Daftar":
            return "Daftar survei";
          case "Pemasangan":
            return "Daftar permohonan";
          case "Daftar Pemasangan":
            return "Daftar pemasangan";
        }
      case "Admin":
        switch (kondisi) {
          case "Pengawasan":
            return "Daftar usulan";
          case "Mandiri":
            return "Daftar survei mandiri";
          default:
            return "Daftar permohonan";
        }
      case "Dinas Perhubungan":
        switch (kondisi) {
          case "Mandiri":
            return "Daftar survei mandiri";
          default:
            return "Daftar permohonan";
        }
      case "Super Admin":
        switch (kondisi) {
          case "Mandiri":
            return "Daftar survei mandiri";
          case "Pengawasan":
            return "Daftar usulan";
          default:
            return "Daftar permohonan";
        }
    }
  };

  const doPress = (item) => {
    switch (context.getUser().role) {
      case "User":
        return navigation.push("Detail", { id: item.id_andalalin });
      case "Operator":
        switch (kondisi) {
          case "Mandiri":
            return navigation.push("Detail Survei", {
              id: item.IdSurvey,
              kondisi: "Operator",
              jenis: "Mandiri",
            });
          default:
            return navigation.push("Detail", { id: item.id_andalalin });
        }
      case "Petugas":
        switch (kondisi) {
          case "Survei":
            return navigation.push("Detail", {
              id: item.id_andalalin,
            });
          case "Mandiri":
            return navigation.push("Detail Survei", {
              id: item.IdSurvey,
              kondisi: "Petugas",
              jenis: "Mandiri",
            });
          case "Daftar":
            return navigation.push("Detail Survei", {
              id: item.id_andalalin,
              kondisi: "Petugas",
              jenis: "Permohonan",
            });
          case "Pemasangan":
            return navigation.push("Detail", {
              id: item.id_andalalin,
            });
          case "Daftar Pemasangan":
            return navigation.push("Detail Survei", {
              id: item.id_andalalin,
              kondisi: "Petugas",
              jenis: "Pemasangan",
            });
        }
        break;
      case "Admin":
        switch (kondisi) {
          case "Pengawasan":
            return navigation.push("Detail Usulan", { id: item.id_andalalin });
          case "Mandiri":
            return navigation.push("Detail Survei", {
              id: item.IdSurvey,
              kondisi: "Admin",
              jenis: "Mandiri",
            });
          default:
            return navigation.push("Detail", { id: item.id_andalalin });
        }
        break;
      case "Dinas Perhubungan":
        switch (kondisi) {
          case "Mandiri":
            return navigation.push("Detail Survei", {
              id: item.IdSurvey,
              kondisi: "Dinas perhubungan",
              jenis: "Mandiri",
            });
          default:
            return navigation.push("Detail", { id: item.id_andalalin });
        }
      case "Super Admin":
        switch (kondisi) {
          case "Mandiri":
            return navigation.push("Detail Survei", {
              id: item.IdSurvey,
              kondisi: "Dinas perhubungan",
              jenis: "Mandiri",
            });
          case "Pengawasan":
            return navigation.push("Detail Usulan", { id: item.id_andalalin });
          default:
            return navigation.push("Detail", { id: item.id_andalalin });
        }
        break;
    }
  };

  const list_item = (item) => {
    switch (context.getUser().role) {
      case "User":
        return list("Detail", item);
      case "Operator":
        switch (kondisi) {
          case "Mandiri":
            return list_survei_mandiri("Detail", item);
          default:
            return list("Detail", item);
        }
      case "Petugas":
        switch (kondisi) {
          case "Survei":
            return list("Detail", item);
          case "Mandiri":
            return list_survei_mandiri("Detail", item);
          case "Daftar":
            return list("Detail", item);
          case "Pemasangan":
            return list("Detail", item);
          case "Daftar Pemasangan":
            return list("Detail", item);
        }
      case "Admin":
        switch (kondisi) {
          case "Pengawasan":
            return list("Detail", item);
          case "Mandiri":
            return list_survei_mandiri("Detail", item);
          default:
            return list("Detail", item);
        }
      case "Dinas Perhubungan":
        switch (kondisi) {
          case "Mandiri":
            return list_survei_mandiri("Detail", item);
          default:
            return list("Detail", item);
        }
      case "Super Admin":
        switch (kondisi) {
          case "Mandiri":
            return list_survei_mandiri("Detail", item);
          case "Pengawasan":
            return list("Detail", item);
          default:
            return list("Detail", item);
        }
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      setPermohonan("permohonan");
      switch (context.getUser().role) {
        case "User":
          loadDaftarPermohonan();
          break;
        case "Operator":
          switch (kondisi) {
            case "Diajukan":
              loadPermohonan();
              break;
            case "Mandiri":
              loadSurveiMandiri();
              break;
          }
          break;
        case "Petugas":
          switch (kondisi) {
            case "Survei":
              loadDaftarByTiketLevel2("Buka");
              break;
            case "Mandiri":
              loadSurveiMandiriByPetugas();
              break;
            case "Daftar":
              loadDaftarSurvei();
              break;
            case "Pemasangan":
              loadDaftarPermohonanPemasangan();
              break;
            case "Daftar Pemasangan":
              loadDaftarPemasangan();
              break;
          }
          break;
        case "Admin":
          switch (kondisi) {
            case "Diajukan":
              loadPermohonan();
              break;
            case "Pengawasan":
              loadUsulanTindakan();
              break;
            case "Mandiri":
              loadSurveiMandiri();
              break;
          }
          break;
        case "Dinas Perhubungan":
          switch (kondisi) {
            case "Diajukan":
              loadPermohonan();
              break;
            case "Mandiri":
              loadSurveiMandiri();
              break;
          }
          break;
        case "Super Admin":
          switch (kondisi) {
            case "Mandiri":
              loadSurveiMandiri();
              break;
            case "Diajukan":
              loadPermohonan();
              break;
            case "Pengawasan":
              loadUsulanTindakan();
              break;
          }
          break;
      }
    }, 50);
  }, []);

  const list = (text, item) => {
    return (
      <ACardPermohonan
        style={{ marginBottom: 16 }}
        status={item.status_andalalin}
        tanggal={item.tanggal_andalalin}
        jenis={item.jenis_andalalin}
        kode={item.kode_andalalin}
        pemohon={item.nama_pemohon}
        email={item.email_pemohon}
        alamat={item.pengembang}
        title={text}
        onPress={() => {
          doPress(item);
        }}
      />
    );
  };

  const list_survei_mandiri = (text, item) => {
    return (
      <ACardPermohonan
        style={{ marginBottom: 16 }}
        tanggal={item.TanggalSurvei}
        jenis={"Survei mandiri"}
        status={item.StatusSurvei}
        kode={item.Petugas}
        pemohon={item.EmailPetugas}
        title={text}
        onPress={() => {
          doPress(item);
        }}
      />
    );
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
              navigation.navigate("Home");
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
        {helper()}

        {permohonan != "permohonan" &&
        permohonan != null &&
        permohonan.length != 0 ? (
          <FlatList
            data={permohonan}
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
            renderItem={({ item }) => list_item(item)}
          />
        ) : (
          ""
        )}
        {permohonan == null || permohonan.length == 0 ? (
          <View
            style={{
              alignItems: "center",
              marginTop: "60%",
              paddingBottom: 16,
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
              {judul()}
            </AText>
            <AText size={20} color={color.neutral.neutral900} weight="normal">
              Belum ada
            </AText>
          </View>
        ) : (
          ""
        )}
      </View>

      

      <ADialog
        title={"Permohoman gagal dimuat"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.navigate("Home");
        }}
      />

      <ADialog
        title={"Daftar survei gagal dimuat"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={surveiGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSurveiGagal();
          navigation.navigate("Home");
        }}
      />

      <ADialog
        title={"Daftar pemasangan gagal dimuat"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={pemasanganGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          togglePemasanganGagal();
          navigation.navigate("Home");
        }}
      />

      <ADialog
        title={"Usulan tindakan gagal dimuat"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={usulanGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleUsulanGagal();
          navigation.navigate("Home");
        }}
      />

      

      <AFilterModal
        visibleModal={filterModal}
        btnBATAL={"Batal"}
        btnOK={"OK"}
        filter1={filter1}
        filter2={filter2}
        filter={filter}
        onPressBATALButton={() => {
          toggleFilterModal();
        }}
        onPressOKButton={() => {
          toggleFilterModal();
        }}
      />

      
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
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
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  searchInputMandiri: {
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  filter: {
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
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: color.text.white,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: poppins.normal,
    fontSize: 16,
    color: color.neutral.neutral700,
    width: "90%",
  },
});

export default DaftarScreen;
