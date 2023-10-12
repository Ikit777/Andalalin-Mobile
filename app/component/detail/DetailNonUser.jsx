import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADetailView from "../utility/ADetailView";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import ABottomSheet from "../utility/ABottomSheet";
import { RadioButton, Checkbox } from "react-native-paper";
import {
  andalalinPersyaratanTerpenuhi,
  andalalinPersyaratanTidakSesuai,
  andalalinSimpanKeputusan,
  andalalinSimpanLaporanSurvei,
  andalalinSimpanPersetujuan,
  andalalinSimpanSK,
} from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import ADialog from "../utility/ADialog";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import * as DocumentPicker from "expo-document-picker";

function DetailNonUser({ permohonan, navigation }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [checked, setChecked] = useState();
  const [syarat, setSyarat] = useState();
  const [lanjut, toggleLanjut] = useStateToggler();
  const [persyaratanModal, setPersyaratanModal] = useStateToggler();

  const [ktp, setKtp] = React.useState(false);
  const [akta, setAkta] = React.useState(false);
  const [surat, setSurat] = React.useState(false);
  const state = false;

  const [stateVariables, setStateVariables] = useState([]);

  const [tidak_sesuai, setTidakSesuai] = useState([]);

  const [persetujuanDokumen, setPersetujuanDokumen] = useState();
  const [setujuLanjut, setSetujuLanjut] = useState();
  const [keteranganPersetujuan, setKeteranganPersetujuan] = useState("");
  const [persetujuanModal, setPersetujuanModal] = useStateToggler();
  const [konfirmasiPersetujuan, toggleKonfirmasiPersetujuan] =
    useStateToggler();

  const [skModal, setSKModal] = useStateToggler();
  const [fileSK, setFileSK] = useState();
  const [namaFileSK, setNamaFileSK] = useState();
  const [konfrimasiSK, toggleKonformasiSK] = useStateToggler();

  const [laporanModal, setLaporanModal] = useStateToggler();
  const [laporanFile, setLaporanFile] = useState();
  const [laporanNamaFile, setLaporanNamaFile] = useState();
  const [laporanKonfirmasi, toggleLaporanKonfirmasi] = useStateToggler();

  const [keputusanModal, toggleKeputusanModal] = useStateToggler();
  const [keputusanLanjut, setKeputusanLanjut] = useState();
  const [keputusan, setKeputusan] = useState();
  const [keputusanKeterangan, setKeputusanKeterangan] = useState();
  const [keputusanKonfirmasi, toggleKeputusanKonfirmasi] = useStateToggler();

  useEffect(() => {
    if (permohonan.persyaratan_tambahan != null)
      permohonan.persyaratan_tambahan.map((item) => {
        stateVariables.push({
          persyaratan: item.Persyaratan,
          state,
        });
      });
  }, [permohonan.persyaratan_tambahan]);

  const handleChangeCheck = (persyaratan, cek) => {
    const updateItems = stateVariables.map((item) => {
      if (item.persyaratan === persyaratan) {
        return { ...item, state: cek };
      }
      return item;
    });

    setStateVariables(updateItems);
  };

  const status = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error50;
      case "Permohonan dibatalkan":
        return color.error.error50;
      case "Permohonan selesai":
        return color.success.success50;
      case "Pemasangan selesai":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (permohonan.status_andalalin) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error700;
      case "Permohonan dibatalkan":
        return color.error.error700;
      case "Permohonan selesai":
        return color.success.success700;
      case "Pemasangan selesai":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
  };

  const tindakan = (onPress, title) => {
    return (
      <AButton
        style={{ marginBottom: 32 }}
        title={title}
        mode="contained"
        onPress={onPress}
      />
    );
  };

  const doubletindakan = (onPress1, title1, onPress2, title2) => {
    return (
      <View style={{ flexDirection: "column" }}>
        <AButton
          style={{ marginBottom: 16 }}
          title={title1}
          mode="contained"
          onPress={onPress1}
        />
        <AButton
          style={{ marginBottom: 32 }}
          title={title2}
          mode="contained"
          onPress={onPress2}
        />
      </View>
    );
  };

  const buttonAndalalin = () => {
    switch (context.getUser().role) {
      case "Operator":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Cek persyaratan");
          case "Berita acara pemeriksaan":
            switch (permohonan.persetujuan) {
              case "Dokumen tidak disetujui":
                return tindakan(() => {
                  navigation.push("Berita acara pemeriksaan", {
                    id: permohonan.id_andalalin,
                    kondisi: "perbarui",
                  });
                }, "perbarui laporan");
              default:
                return tindakan(() => {
                  navigation.push("Berita acara pemeriksaan", {
                    id: permohonan.id_andalalin,
                    kondisi: "Laporan",
                  });
                }, "Berita acara pemeriksaan");
            }
          case "Pembuatan surat keputusan":
            return tindakan(() => {
              setSKModal();
            }, "Pembuatan surat keputusan");
        }
        break;
      case "Admin":
        switch (permohonan.status_andalalin) {
          case "Persetujuan dokumen":
            return tindakan(() => {
              setPersetujuanModal();
            }, "Persetujuan dokumen");
        }
        break;
      case "Super Admin":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Cek persyaratan");
          case "Berita acara pemeriksaan":
            switch (permohonan.persetujuan) {
              case "Dokumen tidak disetujui":
                return tindakan(() => {
                  navigation.push("Berita acara pemeriksaan", {
                    id: permohonan.id_andalalin,
                    kondisi: "perbarui",
                  });
                }, "perbarui laporan");
              default:
                return tindakan(() => {
                  navigation.push("Berita acara pemeriksaan", {
                    id: permohonan.id_andalalin,
                    kondisi: "Laporan",
                  });
                }, "Berita acara pemeriksaan");
            }
          case "Pembuatan surat keputusan":
            return tindakan(() => {
              setSKModal();
            }, "Pembuatan surat keputusan");
          case "Persetujuan dokumen":
            return tindakan(() => {
              setPersetujuanModal();
            }, "Persetujuan dokumen");
        }
        break;
    }
  };

  const buttonPerlalin = () => {
    switch (context.getUser().role) {
      case "Operator":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Cek persyaratan");
          case "Persyaratan terpenuhi":
            return tindakan(() => {
              navigation.push("Pilih Petugas", {
                kondisi: "Pilih",
                permohonan: permohonan,
              });
            }, "Pilih petugas");
          case "Survei lapangan":
            switch (permohonan.status_tiket) {
              case "Buka":
                return tindakan(() => {
                  navigation.push("Usulan", {
                    id: permohonan.id_andalalin,
                  });
                }, "Usulan tindakan");
              case "Batal":
                return tindakan(() => {
                  navigation.push("Pilih Petugas", {
                    kondisi: "Ganti",
                    permohonan: permohonan,
                  });
                }, "Ganti pentugas");
            }
            break;
          case "Laporan survei":
            return tindakan(() => {
              setLaporanModal();
            }, "Laporan survei");
          case "Pemasangan sedang dilakukan":
            return tindakan(() => {
              navigation.push("Pilih Petugas", {
                kondisi: "Ganti",
                permohonan: permohonan,
              });
            }, "Ganti pentugas");
        }
        break;
      case "Petugas":
        switch (permohonan.status_andalalin) {
          case "Survei lapangan":
            return tindakan(() => {
              navigation.push("Survei", {
                id: permohonan.id_andalalin,
                kondisi: "Permohonan",
              }),
                context.clearSurvei();
            }, "Survei lapangan");
          case "Pemasangan sedang dilakukan":
            return tindakan(() => {
              navigation.push("Survei", {
                id: permohonan.id_andalalin,
                kondisi: "Pemasangan",
              }),
                context.clearSurvei();
            }, "Pemasangan perlengkapan");
        }
        break;
      case "Admin":
        switch (permohonan.status_andalalin) {
          case "Menunggu hasil keputusan":
            return tindakan(() => {
              toggleKeputusanModal();
            }, "Pengambilan keputusan hasil");
        }
        break;
      case "Super Admin":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan(() => {
              setPersyaratanModal();
            }, "Cek persyaratan");
          case "Persyaratan terpenuhi":
            return tindakan(() => {
              navigation.push("Pilih Petugas", {
                kondisi: "Pilih",
                permohonan: permohonan,
              });
            }, "Pilih petugas");
          case "Survei lapangan":
            switch (permohonan.status_tiket) {
              case "Buka":
                return doubletindakan(
                  () => {
                    navigation.push("Survei", {
                      id: permohonan.id_andalalin,
                      kondisi: "Permohonan",
                    }),
                      context.clearSurvei();
                  },
                  "Survei lapangan",
                  () => {
                    navigation.push("Usulan", {
                      id: permohonan.id_andalalin,
                    });
                  },
                  "Usulan tindakan"
                );
              case "Batal":
                return tindakan(() => {
                  navigation.push("Pilih Petugas", {
                    kondisi: "Ganti",
                    permohonan: permohonan,
                  });
                }, "Ganti pentugas");
            }
            break;
          case "Laporan survei":
            return tindakan(() => {
              setLaporanModal();
            }, "Laporan survei");
          case "Menunggu hasil keputusan":
            return tindakan(() => {
              toggleKeputusanModal();
            }, "Pengambilan keputusan hasil");
          case "Pemasangan sedang dilakukan":
            return doubletindakan(
              () => {
                navigation.push("Survei", {
                  id: permohonan.id_andalalin,
                  kondisi: "Pemasangan",
                }),
                  context.clearSurvei();
              },
              "Pemasangan perlengkapan",
              () => {
                navigation.push("Pilih Petugas", {
                  kondisi: "Ganti",
                  permohonan: permohonan,
                });
              },
              "Ganti pentugas"
            );
        }
        break;
    }
  };

  const closeCekPersyaratan = () => {
    setChecked(null);
    setKtp(null);
    setAkta(null);
    setSurat(null);
    setSyarat(null);
    setTidakSesuai([]);
    setPersyaratanModal();
    if (lanjut == true) {
      toggleLanjut();
    }
  };

  const persyaratan = () => {
    return (
      <View>
        {syarat == null || syarat == "Persyaratan terpenuhi"
          ? persyaratan_sesuai()
          : ""}
        {syarat === "Persyaratan tidak terpenuhi"
          ? permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas"
            ? persyaratan_tidak_sesuai_andalalin()
            : persyaratan_tidak_sesuai_perlalin()
          : ""}

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 32,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setChecked(null);
              setKtp(null);
              setAkta(null);
              setSurat(null);
              setSyarat(null);
              setTidakSesuai([]);
              setPersyaratanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              toggleLanjut();
              setSyarat(checked);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const persyaratan_sesuai = () => {
    return (
      <View>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Apakah persyaratan sudah{"\n"}sesuai?
        </AText>
        <View style={{ paddingBottom: 106 }}>
          <RadioButton.Group onValueChange={(value) => setChecked(value)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                label="Persyaratan terpenuhi"
                value="Persyaratan terpenuhi"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  checked === "Persyaratan terpenuhi" ? "checked" : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setChecked("Persyaratan terpenuhi");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Persyaratan terpenuhi
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
                label="Persyaratan tidak terpenuhi"
                value="Persyaratan tidak terpenuhi"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  checked === "Persyaratan tidak terpenuhi"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setChecked("Persyaratan tidak terpenuhi");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Persyaratan tidak terpenuhi
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    );
  };

  const persyaratan_tidak_sesuai_andalalin = () => {
    return (
      <View>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Persyaratan apa saja yang{"\n"}tidak terpenuhi?
        </AText>
        <View style={{ paddingBottom: 106 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              uncheckedColor={color.neutral.neutral300}
              color={color.primary.primary600}
              status={ktp ? "checked" : "unchecked"}
              onPress={() => {
                setKtp(!ktp);
                if (!ktp) {
                  addItem("Kartu tanda penduduk");
                } else {
                  removeItem("Kartu tanda penduduk");
                }
              }}
            />
            <Pressable
              onPress={() => {
                setKtp(!ktp);
                if (!ktp) {
                  addItem("Kartu tanda penduduk");
                } else {
                  removeItem("Kartu tanda penduduk");
                }
              }}
            >
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Kartu tanda penduduk
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
            <Checkbox
              uncheckedColor={color.neutral.neutral300}
              color={color.primary.primary600}
              status={akta ? "checked" : "unchecked"}
              onPress={() => {
                setAkta(!akta);
                if (!akta) {
                  addItem("Akta pendirian badan");
                } else {
                  removeItem("Akta pendirian badan");
                }
              }}
            />
            <Pressable
              onPress={() => {
                setAkta(!akta);
                if (!akta) {
                  addItem("Akta pendirian badan");
                } else {
                  removeItem("Akta pendirian badan");
                }
              }}
            >
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Akta pendirian badan
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
            <Checkbox
              uncheckedColor={color.neutral.neutral300}
              color={color.primary.primary600}
              status={surat ? "checked" : "unchecked"}
              onPress={() => {
                setSurat(!surat);
                if (!surat) {
                  addItem("Surat kuasa");
                } else {
                  removeItem("Surat kuasa");
                }
              }}
            />
            <Pressable
              onPress={() => {
                setSurat(!surat);
                if (!surat) {
                  addItem("Surat kuasa");
                } else {
                  removeItem("Surat kuasa");
                }
              }}
            >
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Surat kuasa
              </AText>
            </Pressable>
          </View>

          {permohonan.persyaratan_tambahan != null
            ? permohonan.persyaratan_tambahan.map((item, index) => (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: 8,
                    }}
                  >
                    <Checkbox
                      uncheckedColor={color.neutral.neutral300}
                      color={color.primary.primary600}
                      status={
                        stateVariables.find((variabel) => {
                          return variabel.persyaratan == item.Persyaratan;
                        }).state
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        handleChangeCheck(
                          item.Persyaratan,
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        );
                        if (
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        ) {
                          addItem(item.Persyaratan);
                        } else {
                          removeItem(item.Persyaratan);
                        }
                      }}
                    />
                    <Pressable
                      onPress={() => {
                        handleChangeCheck(
                          item.Persyaratan,
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        );
                        if (
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        ) {
                          addItem(item.Persyaratan);
                        } else {
                          removeItem(item.Persyaratan);
                        }
                      }}
                    >
                      <AText
                        style={{ paddingLeft: 4 }}
                        size={14}
                        color={color.neutral.neutral700}
                      >
                        {item.Persyaratan}
                      </AText>
                    </Pressable>
                  </View>
                </View>
              ))
            : ""}
        </View>
      </View>
    );
  };

  const persyaratan_tidak_sesuai_perlalin = () => {
    return (
      <View>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Persyaratan apa saja yang{"\n"}tidak terpenuhi?
        </AText>
        <View style={{ paddingBottom: 106 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              uncheckedColor={color.neutral.neutral300}
              color={color.primary.primary600}
              status={ktp ? "checked" : "unchecked"}
              onPress={() => {
                setKtp(!ktp);
                if (!ktp) {
                  addItem("Kartu tanda penduduk");
                } else {
                  removeItem("Kartu tanda penduduk");
                }
              }}
            />
            <Pressable
              onPress={() => {
                setKtp(!ktp);
                if (!ktp) {
                  addItem("Kartu tanda penduduk");
                } else {
                  removeItem("Kartu tanda penduduk");
                }
              }}
            >
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Kartu tanda penduduk
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
            <Checkbox
              uncheckedColor={color.neutral.neutral300}
              color={color.primary.primary600}
              status={surat ? "checked" : "unchecked"}
              onPress={() => {
                setSurat(!surat);
                if (!surat) {
                  addItem("Surat permohonan");
                } else {
                  removeItem("Surat permohonan");
                }
              }}
            />
            <Pressable
              onPress={() => {
                setSurat(!surat);
                if (!surat) {
                  addItem("Surat permohonan");
                } else {
                  removeItem("Surat permohonan");
                }
              }}
            >
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Surat permohonan
              </AText>
            </Pressable>
          </View>

          {permohonan.persyaratan_tambahan != null
            ? permohonan.persyaratan_tambahan.map((item, index) => (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: 8,
                    }}
                  >
                    <Checkbox
                      uncheckedColor={color.neutral.neutral300}
                      color={color.primary.primary600}
                      status={
                        stateVariables.find((variabel) => {
                          return variabel.persyaratan == item.Persyaratan;
                        }).state
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        handleChangeCheck(
                          item.Persyaratan,
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        );
                        if (
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        ) {
                          addItem(item.Persyaratan);
                        } else {
                          removeItem(item.Persyaratan);
                        }
                      }}
                    />
                    <Pressable
                      onPress={() => {
                        handleChangeCheck(
                          item.Persyaratan,
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        );
                        if (
                          !stateVariables.find((variabel) => {
                            return variabel.persyaratan == item.Persyaratan;
                          }).state
                        ) {
                          addItem(item.Persyaratan);
                        } else {
                          removeItem(item.Persyaratan);
                        }
                      }}
                    >
                      <AText
                        style={{ paddingLeft: 4 }}
                        size={14}
                        color={color.neutral.neutral700}
                      >
                        {item.Persyaratan}
                      </AText>
                    </Pressable>
                  </View>
                </View>
              ))
            : ""}
        </View>
      </View>
    );
  };

  const addItem = (item) => {
    tidak_sesuai.push(item);
    setTidakSesuai(tidak_sesuai);
  };

  const removeItem = (item) => {
    const index = tidak_sesuai.indexOf(item);
    if (index > -1) {
      tidak_sesuai.splice(index, 1);
    }
  };

  const simpan_persyaratan_terpenuhi = () => {
    andalalinPersyaratanTerpenuhi(
      context.getUser().access_token,
      permohonan.id_andalalin,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Reload Detail", {
              id: permohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_persyaratan_terpenuhi();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setChecked(null);
            setKtp(null);
            setAkta(null);
            setSurat(null);
            setSyarat(null);
            setTidakSesuai([]);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const simpan_persyaratan_tidak_sesuai = () => {
    if (tidak_sesuai.length != 0) {
      andalalinPersyaratanTidakSesuai(
        context.getUser().access_token,
        permohonan.id_andalalin,
        tidak_sesuai,
        (response) => {
          switch (response.status) {
            case 200:
              navigation.replace("Reload Detail", {
                id: permohonan.id_andalalin,
              });
              break;
            case 424:
              authRefreshToken(context, (response) => {
                if (response.status === 200) {
                  simpan_persyaratan_tidak_sesuai();
                } else {
                  context.toggleLoading(false);
                }
              });
              break;
            default:
              setChecked(null);
              setKtp(null);
              setAkta(null);
              setSurat(null);
              setSyarat(null);
              setTidakSesuai([]);
              context.toggleLoading(false);
              toggleGagal();
              break;
          }
        }
      );
    } else {
      setChecked(null);
      setKtp(null);
      setAkta(null);
      setSurat(null);
      setSyarat(null);
      setTidakSesuai([]);
      context.toggleLoading(false);
      toggleGagal();
    }
  };

  useEffect(() => {
    if (syarat == "Persyaratan terpenuhi") {
      toggleKonfirmasi();
      setPersyaratanModal();
    } else if (tidak_sesuai.length != 0) {
      toggleKonfirmasi();
      setPersyaratanModal();
    }
  }, [lanjut]);

  const survei = () => {
    if (
      permohonan.status_andalalin != "Cek persyaratan" &&
      permohonan.status_andalalin != "Persyaratan tidak terpenuhi" &&
      permohonan.status_andalalin != "Persyaratan terpenuhi" &&
      permohonan.status_andalalin != "Survei lapangan"
    ) {
      return (
        <ADetailView style={{ marginTop: 20 }} title={"Survei lapangan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Data survei lapangan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Detail Survei", {
                  id: permohonan.id_andalalin,
                  kondisi: context.getUser().role,
                  jenis: "Permohonan",
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
        </ADetailView>
      );
    }
  };

  const bap = () => {
    if (permohonan.file_bap != null) {
      return (
        <ADetailView
          style={{ marginTop: 20 }}
          title={"Berita acara pemeriksaan"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Laporan berita acara pemeriksaan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Laporan BAP",
                  pdf: permohonan.file_bap,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
        </ADetailView>
      );
    }
  };

  const closePeretujuanDokumen = () => {
    setPersetujuanDokumen(null);
    setSetujuLanjut(null);
    setKeteranganPersetujuan(null);
    setPersetujuanModal();
  };

  const persetujuan = () => {
    return (
      <View style={{ height: 278 }}>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Apakah permohoman sudah{"\n"}terpenuhi?
        </AText>

        {setujuLanjut == null ? (
          <RadioButton.Group
            onValueChange={(value) => setPersetujuanDokumen(value)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                label="Dokumen disetujui"
                value="Dokumen disetujui"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  persetujuanDokumen === "Dokumen disetujui"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setPersetujuanDokumen("Dokumen disetujui");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Dokumen disetujui
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
                label="Dokumen tidak disetujui"
                value="Dokumen tidak disetujui"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  persetujuanDokumen === "Dokumen tidak disetujui"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setPersetujuanDokumen("Dokumen tidak disetujui");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Dokumen tidak disetujui
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
        ) : (
          <View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan keterangan"}
              rtype={"done"}
              max={4}
              maxHeight={90}
              multi={true}
              value={keteranganPersetujuan}
              onChangeText={(value) => {
                setKeteranganPersetujuan(value);
              }}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 32,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setPersetujuanDokumen(null);
              setSetujuLanjut(null);
              setKeteranganPersetujuan(null);
              setPersetujuanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (setujuLanjut != null) {
                setPersetujuanModal();
                toggleKonfirmasiPersetujuan();
              }
              setSetujuLanjut(persetujuanDokumen);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const simpan_persetujuan = () => {
    const setuju = {
      dokumen: setujuLanjut,
      keterangan: keteranganPersetujuan,
    };
    andalalinSimpanPersetujuan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      setuju,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Reload Detail", {
              id: permohonan.id_andalalin,
              kondisi: "Persetujuan",
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_persetujuan();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setPersetujuanDokumen(null);
            setSetujuLanjut(null);
            setKeteranganPersetujuan(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const persetujuan_dokumen = () => {
    if (permohonan.persetujuan != null) {
      return (
        <View>
          <ADetailView style={{ marginTop: 20 }} title={"Persetujuan dokumen"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.persetujuan}
            </AText>
          </ADetailView>
          {permohonan.keterangan_persetujuan != "" ? (
            <ADetailView
              style={{ marginTop: 20 }}
              title={"Keterangan persetujuan dokumen"}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {permohonan.keterangan_persetujuan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}
        </View>
      );
    }
  };

  const file = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setFileSK(result.assets[0].uri);
      setNamaFileSK(result.assets[0].name);
    }
  };

  const closePembuatanSK = () => {
    setFileSK(null);
    setNamaFileSK(null);
    setSKModal();
  };

  const pembuatan_sk = () => {
    return (
      <View style={{ height: 250 }}>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pembuatan surat keputusan
        </AText>

        <ATextInputIcon
          bdColor={color.neutral.neutral300}
          hint={"Masukkan surat keputusan"}
          icon={"file-plus"}
          mult={true}
          value={namaFileSK}
          maxHeight={90}
          onPress={() => {
            file();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 24,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setFileSK(null);
              setNamaFileSK(null);
              setSKModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (fileSK != null) {
                setSKModal();
                toggleKonformasiSK();
              }
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Simpan
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const simpan_sk = () => {
    andalalinSimpanSK(
      context.getUser().access_token,
      permohonan.id_andalalin,
      fileSK,
      (response) => {
        switch (response.status) {
          case 201:
            navigation.replace("Reload Detail", {
              id: permohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_sk();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setFileSK(null);
            setNamaFileSK(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const sk = () => {
    if (permohonan.file_sk != null) {
      return (
        <ADetailView style={{ marginTop: 20 }} title={"Surat keputusan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Surat keputusan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Berita acara pemeriksaan",
                  pdf: permohonan.file_sk,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
        </ADetailView>
      );
    }
  };

  const pemasangan = () => {
    if (permohonan.status_andalalin == "Pemasangan selesai") {
      return (
        <ADetailView
          style={{ marginTop: 20 }}
          title={"Pemasangan perlengkapan lalu lintas"}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Data pemasangan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Detail Survei", {
                  id: permohonan.id_andalalin,
                  kondisi: context.getUser().role,
                  jenis: "Pemasangan",
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
        </ADetailView>
      );
    }
  };

  const andalalin = () => {
    return (
      <View>
        <ADetailView title={"Jenis permohonan"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_andalalin}
          </AText>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Jenis kegiatan"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_kegiatan}
          </AText>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Peruntukan"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.peruntukan}
          </AText>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Kategori rencana pembangunan"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.kategori}
          </AText>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Jenis rencana pembangunan"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_rencana_pembangunan}
          </AText>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Informasi"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Status
            </AText>
            <AText
              style={{
                backgroundColor: status(),
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 15,
              }}
              size={12}
              color={statusText()}
              weight="normal"
            >
              {permohonan.status_andalalin}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Tanggal
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.tanggal_andalalin}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Kode Registrasi
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.kode_andalalin}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Lokasi pengambilan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.lokasi_pengambilan}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Pemohon
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nama_pemohon}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Perusahaan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nama_perusahaan}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Luas lahan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.luas_lahan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Berkas"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Tanda terima pendaftaran
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Tanda terima",
                  pdf: permohonan.tanda_terima_pendaftaran,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Kartu tanda penduduk
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Kartu tanda penduduk",
                  pdf: permohonan.ktp,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Akta pendirian badan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Akta",
                  pdf: permohonan.akta_pendirian_badan,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Surat kuasa
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Surat kuasa",
                  pdf: permohonan.surat_kuasa,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>

          {permohonan.persyaratan_tambahan != null
            ? permohonan.persyaratan_tambahan.map((item, index) => (
                <View key={index}>
                  <View style={styles.separator} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 16,
                    }}
                  >
                    <AText
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item.Persyaratan}
                    </AText>

                    <Pressable
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        navigation.push("PDF", {
                          title: item.Persyaratan,
                          pdf: item.Berkas,
                        });
                      }}
                    >
                      <AText
                        size={14}
                        color={color.neutral.neutral700}
                        weight="semibold"
                      >
                        Lihat
                      </AText>
                    </Pressable>
                  </View>
                </View>
              ))
            : ""}
        </ADetailView>
      </View>
    );
  };

  const perlalin = () => {
    return (
      <View>
        <ADetailView title={"Jenis permohonan"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_andalalin}
          </AText>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Jenis kegiatan"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_kegiatan}
          </AText>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Peruntukan"}>
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.peruntukan}
          </AText>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Kategori perlengkapan lalu lintas"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.kategori}
          </AText>
        </ADetailView>

        <ADetailView
          style={{ marginTop: 20 }}
          title={"Jenis perlengkapan lalu lintas"}
        >
          <AText
            style={{ padding: 16 }}
            size={12}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {permohonan.jenis_rencana_pembangunan}
          </AText>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Informasi"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Status
            </AText>
            <AText
              style={{
                backgroundColor: status(),
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 15,
              }}
              size={12}
              color={statusText()}
              weight="normal"
            >
              {permohonan.status_andalalin}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Tanggal
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.tanggal_andalalin}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Kode Registrasi
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.kode_andalalin}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Lokasi pengambilan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.lokasi_pengambilan}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Pemohon
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.nama_pemohon}
            </AText>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Luas lahan
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {permohonan.luas_lahan}
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Berkas"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Tanda terima pendaftaran
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Tanda terima",
                  pdf: permohonan.tanda_terima_pendaftaran,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Kartu tanda penduduk
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Kartu tanda penduduk",
                  pdf: permohonan.ktp,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>

          <View style={styles.separator} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Surat permohonan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("PDF", {
                  title: "Surat permohonan",
                  pdf: permohonan.surat_kuasa,
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat
              </AText>
            </Pressable>
          </View>
          {permohonan.laporan_survei != null ? (
            <View>
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Laporan survei
                </AText>

                <Pressable
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    navigation.push("PDF", {
                      title: "Laporan survei",
                      pdf: permohonan.laporan_survei,
                    });
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Lihat
                  </AText>
                </Pressable>
              </View>
            </View>
          ) : (
            ""
          )}

          {permohonan.persyaratan_tambahan != null
            ? permohonan.persyaratan_tambahan.map((item, index) => (
                <View key={index}>
                  <View style={styles.separator} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 16,
                    }}
                  >
                    <AText
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {item.Persyaratan}
                    </AText>

                    <Pressable
                      style={{ flexDirection: "row", paddingLeft: 4 }}
                      onPress={() => {
                        navigation.push("PDF", {
                          title: item.Persyaratan,
                          pdf: item.Berkas,
                        });
                      }}
                    >
                      <AText
                        size={14}
                        color={color.neutral.neutral700}
                        weight="semibold"
                      >
                        Lihat
                      </AText>
                    </Pressable>
                  </View>
                </View>
              ))
            : ""}
        </ADetailView>

        {survei()}

        {keputusan_hasil()}

        {pemasangan()}
      </View>
    );
  };

  const fileLaporan = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setLaporanFile(result.assets[0].uri);
      setLaporanNamaFile(result.assets[0].name);
    }
  };

  const closeLaporanSurvei = () => {
    setLaporanFile(null);
    setLaporanNamaFile(null);
    setLaporanModal();
  };

  const laporan_survei = () => {
    return (
      <View style={{ height: 250 }}>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Laporan survei
        </AText>

        <ATextInputIcon
          bdColor={color.neutral.neutral300}
          hint={"Masukkan laporan"}
          icon={"file-plus"}
          mult={true}
          value={laporanNamaFile}
          maxHeight={90}
          onPress={() => {
            fileLaporan();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 24,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setLaporanFile(null);
              setLaporanNamaFile(null);
              setLaporanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (laporanFile != null) {
                setLaporanModal();
                toggleLaporanKonfirmasi();
              }
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Simpan
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const simpan_laporan_survei = () => {
    andalalinSimpanLaporanSurvei(
      context.getUser().access_token,
      permohonan.id_andalalin,
      laporanFile,
      (response) => {
        switch (response.status) {
          case 201:
            navigation.replace("Reload Detail", {
              id: permohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_laporan_survei();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setLaporanFile(null);
            setLaporanNamaFile(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const closeKeputuan = () => {
    setKeputusan(null);
    setKeputusanLanjut(null);
    setKeputusan(null);
    toggleKeputusanModal();
  };

  const keputusan_modal = () => {
    return (
      <View style={{ height: 278 }}>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pengambilan keputusan hasil permohonan
        </AText>

        {keputusanLanjut == null ? (
          <RadioButton.Group onValueChange={(value) => setKeputusan(value)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                label="Pemasangan disegerakan"
                value="Pemasangan disegerakan"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  keputusan === "Pemasangan disegerakan"
                    ? "checked"
                    : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setKeputusan("Pemasangan disegerakan");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Pemasangan disegerakan
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
                label="Pemasangan ditunda"
                value="Pemasangan ditunda"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={
                  keputusan === "Pemasangan ditunda" ? "checked" : "unchecked"
                }
              />
              <Pressable
                onPress={() => {
                  setKeputusan("Pemasangan ditunda");
                }}
              >
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Pemasangan ditunda
                </AText>
              </Pressable>
            </View>
          </RadioButton.Group>
        ) : (
          <View>
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan pertimbangan"}
              rtype={"done"}
              max={4}
              maxHeight={90}
              multi={true}
              value={keputusanKeterangan}
              onChangeText={(value) => {
                setKeputusanKeterangan(value);
              }}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 32,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setKeputusan(null);
              setKeputusanLanjut(null);
              setKeputusan(null);
              toggleKeputusanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              if (keputusanLanjut != null && keputusanKeterangan != null) {
                toggleKeputusanModal();
                toggleKeputusanKonfirmasi();
              }
              setKeputusanLanjut(keputusan);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const simpan_keputusan = () => {
    andalalinSimpanKeputusan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      keputusan,
      keputusanKeterangan,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Reload Detail", {
              id: permohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_keputusan();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            setKeputusanKeterangan(null);
            setKeputusan(null);
            setKeputusanLanjut(null);
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const keputusan_hasil = () => {
    if (permohonan.keputusan_hasil != null) {
      return (
        <View>
          <ADetailView
            style={{ marginTop: 20 }}
            title={"Keputusan hasil permohonan"}
          >
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {permohonan.keputusan_hasil}
            </AText>
          </ADetailView>
          {permohonan.pertimbangan != null ? (
            <ADetailView
              style={{ marginTop: 20 }}
              title={"Pertimbangan keputusan hasil"}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {permohonan.pertimbangan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}
        </View>
      );
    }
  };

  return (
    <View>
      {permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas"
        ? andalalin()
        : perlalin()}
      {bap()}
      {persetujuan_dokumen()}
      {sk()}
      <ADetailView
        style={{ marginTop: 20, marginBottom: 32 }}
        title={"Lanjutan"}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Informasi lengkap
          </AText>

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              navigation.push("Lanjutan", { permohonan: permohonan });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lanjut
            </AText>
          </Pressable>
        </View>
      </ADetailView>
      {permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas"
        ? buttonAndalalin()
        : buttonPerlalin()}
      <ABottomSheet visible={persyaratanModal} close={closeCekPersyaratan}>
        {persyaratan()}
      </ABottomSheet>

      <ABottomSheet visible={persetujuanModal} close={closePeretujuanDokumen}>
        {persetujuan()}
      </ABottomSheet>

      <ABottomSheet visible={skModal} close={closePembuatanSK}>
        {pembuatan_sk()}
      </ABottomSheet>

      <ABottomSheet visible={laporanModal} close={closeLaporanSurvei}>
        {laporan_survei()}
      </ABottomSheet>

      <ABottomSheet visible={keputusanModal} close={closeKeputuan}>
        {keputusan_modal()}
      </ABottomSheet>

      <ADialog
        title={"Menyimpan gagal"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan validasi?"}
        visibleModal={konfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
          setChecked(null);
          setKtp(null);
          setAkta(null);
          setSurat(null);
          setSyarat(null);
          setTidakSesuai([]);
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          context.toggleLoading(true);
          if (syarat === "Persyaratan terpenuhi") {
            simpan_persyaratan_terpenuhi();
          } else {
            simpan_persyaratan_tidak_sesuai();
          }
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan persetujuan?"}
        visibleModal={konfirmasiPersetujuan}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasiPersetujuan();
          setPersetujuanDokumen(null);
          setSetujuLanjut(null);
          setKeteranganPersetujuan(null);
        }}
        onPressOKButton={() => {
          toggleKonfirmasiPersetujuan();
          context.toggleLoading(true);
          simpan_persetujuan();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan surat keputusan?"}
        visibleModal={konfrimasiSK}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonformasiSK();
          setFileSK(null);
          setNamaFileSK(null);
        }}
        onPressOKButton={() => {
          toggleKonformasiSK();
          context.toggleLoading(true);
          simpan_sk();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan laporan survei?"}
        visibleModal={laporanKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleLaporanKonfirmasi();
          setLaporanFile(null);
          setLaporanNamaFile(null);
        }}
        onPressOKButton={() => {
          toggleLaporanKonfirmasi();
          context.toggleLoading(true);
          simpan_laporan_survei();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan keputusan hasil?"}
        visibleModal={keputusanKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKeputusanKonfirmasi();
          setKeputusanKeterangan(null);
          setKeputusan(null);
          setKeputusanLanjut(null);
        }}
        onPressOKButton={() => {
          toggleKeputusanKonfirmasi();
          context.toggleLoading(true);
          simpan_keputusan();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default DetailNonUser;
