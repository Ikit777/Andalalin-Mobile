import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import { useStateToggler } from "../../hooks/useUtility";
import { MaterialIcons } from "@expo/vector-icons";
import ADialogInputText from "../utility/ADialogInputText";

export default function PenyusunItem({ navigation, route }) {
  const { penyusun, setPenyusun } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);

  const [tambah, setTambah] = useState("");
  const [substansi, setSubstansi] = useState("");
  const [muatan, setMuatan] = useState("");
  const [subMuatan, setSubMuatan] = useState("");
  const [poin, setPoin] = useState("");

  const [tambahMuatanModal, toggleTambahMuatan] = useStateToggler();
  const [tambahSubMuatan, toggleTambahSubMuatan] = useStateToggler();
  const [tambahPoin, toggleTambahPoin] = useStateToggler();

  const alphabetArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );

  const penyusun_bangkitan_sedang = [
    {
      substansi: "BAB 1 - PENDAHULUAN",
      muatan: [
        {
          judul:
            "Cakupan wilayah kajian berdasarkan rencana pembangunan/ pengembangan",
          tambahan: [],
        },
        {
          judul: "Penjelasan rencana pembangunan baru/ pengembangan",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 2 - ANALISIS KONDISI DAN KINERJA LALU LINTAS",
      muatan: [
        {
          judul:
            "Penetapan tahun dasar sebagai dasar analisis dan analisis paling sedikit 5 (lima) tahun",
          tambahan: [],
        },
        {
          judul:
            "Analisis kondisi lalu lintas dan angkutan jalan saat ini, meliputi:",
          tambahan: [],
        },
        {
          judul:
            "Kondisi prasarana jalan (paling sedikit memuat geometrik jalan, perkerasan jalan, dimensi potong melintang jalan, fungsi jalan, status jalan, kelas jalan dan perlengkapan jalan)",
          tambahan: [],
        },
        {
          judul:
            "Kondisi lalu lintas eksisting paling sedikit memuat data historis volumen lalu lintas, volumen gerakan membelok, tunda membelok, panjang antrian, kecepatan rata-rata kendaraan, waktu perjalan, okupansi jalan data penumpang angkutan umum, pejalan kaki dan pesepeda",
          tambahan: [],
        },
        {
          judul:
            "Kondisi angkutan jalan (paling sedikit memuat jaringan trayel, faktor muat , jenis kendaraan dan waktu tunggu)",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 3 - SIMULASI KINERJA LALU LINTAS",
      muatan: [
        {
          judul: "Simulasi kinerja lalu lintas sebelum pembangunan",
          tambahan: [],
        },
        {
          judul: "Simulasi kinerja lalu lintas pada saat pembangunan",
          tambahan: [],
        },
        {
          judul: "Simulasi kinerja lalu lintas setelah pembangunan",
          tambahan: [],
        },
        {
          judul:
            "Simulasi kinerja lalu lintas dalam jangka waktu paling sedikit 5 (lima) tahun setelah pembangunan",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 4 - REKOMENDASI PENANGANAN DAMPAK LALU LINTAS",
      muatan: [
        {
          judul: "Peningkatan kapasitas ruas dan/atau persimpangan jalan",
          tambahan: [],
        },
        {
          judul: "Penyediaan angkutan umum",
          tambahan: [],
        },
        {
          judul: "Manajemen dan rekayasa lalu lintas pada ruas jalan",
          tambahan: [],
        },
        {
          judul: "Manajemen kebutuhan lalu lintas",
          tambahan: [],
        },
        {
          judul:
            "Penyediaan fasilitas parkir berupa gedung parkir/ taman parkir",
          tambahan: [],
        },
        {
          judul:
            "Penyediaan akses keluar dan masuk untuk orang, kendaraan pribadi dan kendaraan barang",
          tambahan: [],
        },
        {
          judul: "Penyediaan fasilitas bugnkar muat barang",
          tambahan: [],
        },
        {
          judul: "Penataan sirkualasi lalu lintas dalam kawasan",
          tambahan: [],
        },
        {
          judul: "Penyediaan fasilitas perlengkapan jalan di dalam kawasan",
          tambahan: [],
        },
        {
          judul: "Penyediaan sistem informasi lalu lintas",
          tambahan: [],
        },
        {
          judul: "Penyediaan fasilitas informasi lalu lintas",
          tambahan: [],
        },
        {
          judul: "Penyediaan fasilitas penyebrangan",
          tambahan: [],
        },
        {
          judul:
            "Penyediaan fasilitas lain-lain menyesuaikan jenis proyek, kegiatan dan kebutuhan (sebagain penunjangn keamanan, kenyamanan, keselamatan dan keteraturan)",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 5 - PENUTUP",
      muatan: [
        {
          judul:
            "Rincian tanggungjawab pemerintah dan pengembang/pembangun dalam penanganan dampak lalu lintas (dalam bentuk matriks)",
          tambahan: [],
        },
        {
          judul: "Rencana pemantauan dan evaluasi",
          tambahan: [
            {
              judul: "oleh Pemerintah :",
              poin: [
                "Pemantauan terhadap implementasi dari rekomendasi penangan dampak",
                "Pemantauan terhadap kinerja ruas jalan di sekitar wilayah pembangunan/ pengembangan termasuk akses masuk dan keluar kendaraan di lokasi pusat kegiatan, pemukiman, dan infrastruktur",
              ],
            },
            {
              judul: "oleh Pembangun/Pengembang :",
              poin: [
                "Pemantauan dan evaluasi terhadap akses dan sirkulasi lalu lintas kendaraan di dalam lokasi pusat kegiatan, pemukiman, dan infrastruktur",
                "Pemantauan terhadap fasilitas parkir, dan",
                "Pemantauan terhadap rambu, marka, dan fasilitas perlengkapan jalan lainnya di dalam lokasi pusat kegiatan/ pemukiman/ inftrastruktur",
              ],
            },
          ],
        },
      ],
    },
    {
      substansi: "LAMPIRAN 1 : GAMBAR GAMBAR TEKNIS (WAJIB A3)",
      muatan: [],
    },
    {
      substansi: "CATATAN DAN KETERANGAN TAMBAHAN",
      muatan: [],
    },
  ];

  useEffect(() => {
    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan sedang":
        setItem(penyusun_bangkitan_sedang.length);
        break;
    }
  }, []);

  const removeMuatan = (substansi, muatan) => {
    const updated = penyusun.penyusun.map((value) => {
      if (value.substansi == substansi) {
        const index = value.muatan.findIndex((sub) => {
          return sub.judul == muatan;
        });
        if (index > -1) {
          value.muatan.splice(index, 1);
        }
        return { ...value, muatan: value.muatan };
      }
      return value;
    });

    setPenyusun({
      penyusun: updated,
    });
  };

  const removeSubMuatan = (substansi, muatan, sub_muatan) => {
    const updated = penyusun.penyusun.map((value) => {
      if (value.substansi == substansi) {
        value.muatan.map((value1) => {
          if (value1.judul == muatan) {
            const index = value1.tambahan.findIndex((value2) => {
              return value2.judul == sub_muatan;
            });
            if (index > -1) {
              value1.tambahan.splice(index, 1);
            }
            return { ...value1, tambahan: value1.tambahan };
          }
          return value1;
        });
        return { ...value, muatan: value.muatan };
      }
      return value;
    });

    setPenyusun({
      penyusun: updated,
    });
  };

  const removePoinSubMuatan = (substansi, muatan, sub_muatan, poin) => {
    const updated = penyusun.penyusun.map((value) => {
      if (value.substansi == substansi) {
        value.muatan.map((value1) => {
          if (value1.judul == muatan) {
            value1.tambahan.map((value2) => {
              if (value2.judul == sub_muatan) {
                const index = value2.poin.findIndex((value3) => {
                  return value3 == poin;
                });
                if (index > -1) {
                  value2.poin.splice(index, 1);
                }
                return { ...value2, poin: value2.poin };
              }
              return value2;
            });
            return { ...value1, tambahan: value1.tambahan };
          }
          return value1;
        });
        return { ...value, muatan: value.muatan };
      }
      return value;
    });

    setPenyusun({
      penyusun: updated,
    });
  };

  useEffect(() => {
    if (muatan != "" && tambah == "Muatan") {
      penyusun.penyusun.map((value) => {
        if (value.substansi == substansi) {
          value.muatan.push({ judul: muatan, tambahan: [] });
        }
      });

      setTambah("");
      setSubstansi("");
      setMuatan("");
    }
  }, [muatan]);

  useEffect(() => {
    if (subMuatan != "" && tambah == "Sub Muatan") {
      penyusun.penyusun.map((value) => {
        if (value.substansi == substansi) {
          value.muatan.map((value1) => {
            if (value1.judul == muatan) {
              value1.tambahan.push({
                judul: subMuatan,
                poin: [],
              });
            }
          });
        }
      });

      setTambah("");
      setSubstansi("");
      setMuatan("");
      setSubMuatan("");
    }
  }, [subMuatan]);

  useEffect(() => {
    if (poin != "" && tambah == "Poin") {
      penyusun.penyusun.map((value) => {
        if (value.substansi == substansi) {
          value.muatan.map((value1) => {
            if (value1.judul == muatan) {
              value1.tambahan.map((value2) => {
                if (value2.judul == subMuatan) {
                  value2.poin.push(poin);
                }
              });
            }
          });
        }
      });

      setTambah("");
      setSubstansi("");
      setMuatan("");
      setSubMuatan("");
      setPoin("");
    }
  }, [poin]);

  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < item; i++) {
      switch (context.detailPermohonan.kategori_bangkitan) {
        case "Bangkitan sedang":
          switch (penyusun.penyusun[i].substansi) {
            case "CATATAN DAN KETERANGAN TAMBAHAN":
              elements.push(
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  persistentScrollbar={true}
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
                    {penyusun.penyusun[i].substansi}
                  </AText>

                  <View style={{ paddingTop: 8 }} />

                  {penyusun.penyusun[i].muatan.length != 0
                    ? penyusun.penyusun[i].muatan.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            paddingTop: 14,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <AText
                              style={{ paddingRight: 4 }}
                              size={16}
                              color={color.neutral.neutral700}
                            >
                              {index + 1}.
                            </AText>
                            <AText size={16} color={color.neutral.neutral700}>
                              {item.judul}
                            </AText>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              removeMuatan(
                                penyusun.penyusun[i].substansi,
                                muatan.judul
                              );
                            }}
                          >
                            <MaterialIcons
                              name="delete-outline"
                              size={24}
                              color={color.neutral.neutral900}
                            />
                          </TouchableOpacity>
                        </View>
                      ))
                    : ""}
                  <View style={{ paddingTop: 8 }} />
                  <TouchableOpacity
                    onPress={() => {
                      setTambah("Muatan");
                      setSubstansi(penyusun.penyusun[i].substansi);
                      toggleTambahMuatan();
                    }}
                  >
                    <AText
                      size={16}
                      color={color.primary.main}
                      weight="semibold"
                    >
                      + Tambah catatan atau keterangan
                    </AText>
                  </TouchableOpacity>
                  <View style={{ paddingTop: 16 }} />
                </ScrollView>
              );
            default:
              elements.push(
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  persistentScrollbar={true}
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
                    {penyusun.penyusun[i].substansi}
                  </AText>

                  <View style={{ paddingTop: 8 }} />

                  {penyusun.penyusun[i].muatan.length != 0
                    ? penyusun.penyusun[i].muatan.map((muatan, index) => (
                        <View key={index}>
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 14,
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{ flexDirection: "row", width: "80%" }}
                            >
                              <AText
                                style={{ paddingRight: 4 }}
                                size={16}
                                color={color.neutral.neutral700}
                              >
                                {index + 1}.
                              </AText>
                              <AText size={16} color={color.neutral.neutral700}>
                                {muatan.judul}
                              </AText>
                            </View>

                            <TouchableOpacity
                              onPress={() => {
                                removeMuatan(
                                  penyusun.penyusun[i].substansi,
                                  muatan.judul
                                );
                              }}
                            >
                              <MaterialIcons
                                name="delete-outline"
                                size={24}
                                color={color.neutral.neutral900}
                              />
                            </TouchableOpacity>
                          </View>
                          {muatan.tambahan.length != 0
                            ? muatan.tambahan.map((sub_muatan, index) => (
                                <View key={index} style={{ marginLeft: 15 }}>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      paddingTop: 14,
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        width: "80%",
                                      }}
                                    >
                                      <AText
                                        style={{ paddingRight: 4 }}
                                        size={16}
                                        color={color.neutral.neutral700}
                                      >
                                        {alphabetArray[index]}.
                                      </AText>
                                      <AText
                                        size={16}
                                        color={color.neutral.neutral700}
                                      >
                                        {sub_muatan.judul}
                                      </AText>
                                    </View>

                                    <TouchableOpacity
                                      onPress={() => {
                                        removeSubMuatan(
                                          penyusun.penyusun[i].substansi,
                                          muatan.judul,
                                          sub_muatan.judul
                                        );
                                      }}
                                    >
                                      <MaterialIcons
                                        name="delete-outline"
                                        size={24}
                                        color={color.neutral.neutral900}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                  {sub_muatan.poin.length != 0
                                    ? sub_muatan.poin.map((poin, index) => (
                                        <View
                                          key={index}
                                          style={{ marginLeft: 15 }}
                                        >
                                          <View
                                            style={{
                                              flexDirection: "row",
                                              paddingTop: 14,
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <View
                                              style={{
                                                flexDirection: "row",
                                                width: "80%",
                                              }}
                                            >
                                              <AText
                                                style={{ paddingRight: 4 }}
                                                size={16}
                                                color={color.neutral.neutral700}
                                              >
                                                {index + 1}&#x29;
                                              </AText>
                                              <AText
                                                size={16}
                                                color={color.neutral.neutral700}
                                              >
                                                {poin}
                                              </AText>
                                            </View>

                                            <TouchableOpacity
                                              onPress={() => {
                                                removePoinSubMuatan(
                                                  penyusun.penyusun[i]
                                                    .substansi,
                                                  muatan.judul,
                                                  sub_muatan.judul,
                                                  poin
                                                );
                                              }}
                                            >
                                              <MaterialIcons
                                                name="delete-outline"
                                                size={24}
                                                color={color.neutral.neutral900}
                                              />
                                            </TouchableOpacity>
                                          </View>
                                        </View>
                                      ))
                                    : ""}
                                  <View style={{ paddingTop: 8 }} />
                                  <TouchableOpacity
                                    style={{ marginLeft: 30 }}
                                    onPress={() => {
                                      setTambah("Poin");
                                      setSubstansi(
                                        penyusun.penyusun[i].substansi
                                      );
                                      setMuatan(muatan.judul);
                                      setSubMuatan(sub_muatan.judul);
                                      toggleTambahPoin();
                                    }}
                                  >
                                    <AText
                                      size={16}
                                      color={color.primary.main}
                                      weight="semibold"
                                    >
                                      + Tambah poin sub muatan
                                    </AText>
                                  </TouchableOpacity>
                                </View>
                              ))
                            : ""}
                          <View style={{ paddingTop: 8 }} />
                          <TouchableOpacity
                            style={{ marginLeft: 15 }}
                            onPress={() => {
                              setTambah("Sub Muatan");
                              setSubstansi(penyusun.penyusun[i].substansi);
                              setMuatan(muatan.judul);
                              toggleTambahSubMuatan();
                            }}
                          >
                            <AText
                              size={16}
                              color={color.primary.main}
                              weight="semibold"
                            >
                              + Tambah sub muatan
                            </AText>
                          </TouchableOpacity>
                        </View>
                      ))
                    : ""}
                  <View style={{ paddingTop: 8 }} />
                  <TouchableOpacity
                    onPress={() => {
                      setTambah("Muatan");
                      setSubstansi(penyusun.penyusun[i].substansi);
                      toggleTambahMuatan();
                    }}
                  >
                    <AText
                      size={16}
                      color={color.primary.main}
                      weight="semibold"
                    >
                      + Tambah muatan
                    </AText>
                  </TouchableOpacity>
                  <View style={{ paddingTop: 16 }} />
                </ScrollView>
              );
          }
          break;
      }
    }
    return elements;
  };

  return (
    <View style={styles.container}>
      {generateElements()[index - 1]}
      <ADialogInputText
        title={"Tambah muatan"}
        hint={"Masukan muatan"}
        visibleModal={tambahMuatanModal}
        setText={setMuatan}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahMuatan();
          setSubstansi("");
        }}
        onPressOKButton={() => {
          toggleTambahMuatan();
        }}
      />

      <ADialogInputText
        title={"Tambah sub muatan"}
        hint={"Masukan sub muatan"}
        visibleModal={tambahSubMuatan}
        setText={setSubMuatan}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahSubMuatan();
          setSubstansi("");
          setMuatan("");
        }}
        onPressOKButton={() => {
          toggleTambahSubMuatan();
        }}
      />

      <ADialogInputText
        title={"Tambah poin sub muatan"}
        hint={"Masukan poin"}
        visibleModal={tambahPoin}
        setText={setPoin}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahPoin();
          setSubstansi("");
          setMuatan("");
          setSubMuatan("");
        }}
        onPressOKButton={() => {
          toggleTambahPoin();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
