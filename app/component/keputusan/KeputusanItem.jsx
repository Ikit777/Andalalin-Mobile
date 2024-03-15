import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import { useStateToggler } from "../../hooks/useUtility";
import { MaterialIcons } from "@expo/vector-icons";
import ADialogInputText from "../utility/ADialogInputText";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import ADatePicker from "../utility/ADatePicker";

export default function KeputusanItem({ navigation, route }) {
  const { keputusan, setKeputusan } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);

  const [tambah, setTambah] = useState("");
  const [tanggal, setTanggal] = useState("");

  const [master, setMaster] = useState("");
  const [kewajiban, setKewajiban] = useState("");
  const [poin, setPoin] = useState("");
  const [subPoin, setSubPoin] = useState("");

  const [dateModal, toggleDateModal] = useStateToggler();

  const [tambahKewajiban, toggleTambahKewajiban] = useStateToggler();
  const [tambahPoin, toggleTambahPoin] = useStateToggler();
  const [tambahSubPoin, toggleTambahSubPoin] = useStateToggler();

  const alphabetArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );

  const lampiran_keputusan = [
    {
      kewajiban:
        context.detailPermohonan.nama_perusahaan +
        " selaku Pembangun wajib melaksanakan penanganan dampak lalu lintas, yaitu:",
      data_kewajiban: [
        {
          poin: "Tahap Konstruksi",
          data_poin: [
            {
              subpoin: "Melakukan manajemen dan rekayasa lalu lintas meliputi:",
              data_subpoin: [
                "Menyediakan akses masuk dan keluar untuk angkutan barang, dengan memberikan ruang manuver yang cukup dan tidak menimbulkan tundaan perjalanan di jalan umum (memperhatikan lebar dan sudut putar kendaraan/radius tikung) serta mempertimbangkan aspek keselamatan.",
                "Penempatan petugas pengatur lalu lintas dan dilengkapi peralatan keselamatan, untuk mengatur lalu lintas kendaraan proyek pada pintu keluar-masuk dan pada persimpangan dengan jalan utama.",
              ],
            },
            {
              subpoin:
                "Melakukan manajemen kebutuhan lalu lintas pada area pembangunan, meliputi:",
              data_subpoin: [
                "Meningkatkan struktur jalan masuk kawasan pembangunan untuk mendukung mobilitas kendaraan material dan peralatan.",
                "Pengangkutan material bangunan menghindari jam-jam sibuk dan pengangkutan dengan dimensi besar atau volume besar di lakukan di malam hari, agar tidak mengganggu arus lalu lintas pada rute yang dilalui.",
                "Menyiram roda kendaraan proyek pada saat keluar lokasi proyek dengan sistem water trap.",
                "Membersihkan jalan di sekitar lokasi proyek jika terdapat ceceran tanah/material.",
                "Proses pengangkutan diharuskan tidak mengganggu lingkungan, kendaraan wajib dengan penutup yang memadai.",
                "Menggunakan kendaraan angkutan barang (pengangkut material dan peralatan konstruksi) sesuai dengan daya dukung jalan terendah pada jalur pengangkutan.",
                "Memberikan penyuluhan SOP pengangkutan sesuai Peraturan Menteri Perhubungan Nomor PM. 60 Tahun 2019 tentang Penyelenggaraan Angkutan Barang dengan Kendaraan Bermotor di Jalan.",
              ],
            },
            {
              subpoin:
                "Menyediakan fasilitas bongkar/muat barang di dalam lokasi pembangunan, tidak menggunakan badan jalan serta menempatkan/menyimpan material bangunan di dalam lokasi pembangunan.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Menyediakan ruang parkir di dalam lokasi pembangunan yang cukup mengakomodir parkir truk (dan angkutan barang lainnya) dan kendaraan pekerja. Dilarang parkir di badan jalan, agar tidak mengurasi kapasitas jalan yang ada dan tidak mengganggu arus lalu lintas.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Menyediakan/memasangkan fasilitas perlengkapan jalan pada area pembangunan, meliputi:",
              data_subpoin: [
                "Lampi peringatan (warning light) untuk memberi peringatan kepada pengguna jalan adanya kegiatan konstruksi.",
                "Rambu lalu lintas sementara, meliputi: rambu peringatan hati-hati dengan papan tambahan &quot;ada pekerjaan konstruksi&quot; dan &quot;keluar masuk kendaraan material&quot; serta peringatan pekerjaan di jalan.",
                "Lampu penerangan jalan, khusus nya pada waktu melakukan aktivitas pada malam hari.",
                "Informasi layanan pengaduan yang di pasang di depan kawasan pembangunan, untuk segara ditindaklanjuti oleh Pembangun/Kontraktor.",
              ],
            },
            {
              subpoin:
                "Memastikan bahwa kendaraan barang yang digunakan pada masa konstruksi harus sesuai dengan ketentuan yang berlaku (baik jalan, dimensi kendaraan, dan tata cara pemuatan) denga berpedoman pada PM 60 Tanun 2019 tentang Penyelenggaraan Angkutan Barang dengan Kendaraan Bermotor di Jalan.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Memastikan bahwa kendaraan barang pengangkut bahan material tidak Over Dimension Over Load (ODOL)",
              data_subpoin: [],
            },
            {
              subpoin:
                "Melakukan perbaikan apabila terdapat kerusakan fasilitas umum dalam proses pembangunan.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Dalam pelaksanaan pembangunan/konstruksi berkoordinasi dengan instansi terkait.",
              data_subpoin: [],
            },
          ],
        },
        {
          poin: "Tahap Operasional",
          data_poin: [
            {
              subpoin:
                "Poin-poin kewajiban pengembang tahap operasional sesuai dengan ketentuan jenis rencana pembangunan dapat dilihat pada Lampiran dibawah ini.",
              data_subpoin: [],
            },
          ],
        },
      ],
    },
    {
      kewajiban:
        "Memastikan tidak ada kegiatan perdagangan kaki lima (PKL) dan parkir kendaraan pada badan jalan dengan pemasangan rambu larangan parkir dan menugaskan petugas keamanan.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Sosialisasi kepada masyarakat yang terkena dampak pembangunan, sehingga tidak terdapat komplain dari masyarakat yang terdampak pada gangguan lalu lintas di jalan.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Memenuhi peraturan perundang-undangan yang berlaku dalam melaksanakan rekomendasi penanganan dampak.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Membantu dalam koordinasi pelaksanaan, pemantauan dan evaluasi Pembangunan/Pengembangan.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Bersedia melakukan Analisis Dampak Lalu Lintas kembali, pada saat akan melakukan pengembangan.",
      data_kewajiban: [],
    },
  ];

  useEffect(() => {
    setItem(lampiran_keputusan.length + 1);
  }, []);

  useEffect(() => {
    if (tanggal != "") {
      setKeputusan({
        tanggal_kesanggupan: tanggal,
      });
    }
  }, [tanggal]);

  const remove_kewajiban = (kewajiban, data_kewajiban) => {
    const updated = keputusan.keputusan.map((value) => {
      if (value.kewajiban == kewajiban) {
        const index = value.data_kewajiban.findIndex((data) => {
          return data.poin == data_kewajiban;
        });
        if (index > -1) {
          value.data_kewajiban.splice(index, 1);
        }
        return { ...value, data_kewajiban: value.data_kewajiban };
      }
      return value;
    });

    setKeputusan({
      keputusan: updated,
    });
  };

  const remove_poin = (kewajiban, data_kewajiban, data_poin) => {
    const updated = keputusan.keputusan.map((value) => {
      if (value.kewajiban == kewajiban) {
        value.data_kewajiban.map((value1) => {
          if (value1.poin == data_kewajiban) {
            const index = value1.data_poin.findIndex((value2) => {
              return value2.subpoin == data_poin;
            });
            if (index > -1) {
              value1.data_poin.splice(index, 1);
            }
            return { ...value1, data_poin: value1.data_poin };
          }
          return value1;
        });
        return { ...value, data_kewajiban: value.data_kewajiban };
      }
      return value;
    });

    setKeputusan({
      keputusan: updated,
    });
  };

  const remove_subpoin = (
    kewajiban,
    data_kewajiban,
    data_poin,
    data_subpoin
  ) => {
    const updated = keputusan.keputusan.map((value) => {
      if (value.kewajiban == kewajiban) {
        value.data_kewajiban.map((value1) => {
          if (value1.poin == data_kewajiban) {
            value1.data_poin.map((value2) => {
              if (value2.subpoin == data_poin) {
                const index = value2.data_subpoin.findIndex((value3) => {
                  return value3 == data_subpoin;
                });
                if (index > -1) {
                  value2.data_subpoin.splice(index, 1);
                }
                return { ...value2, data_subpoin: value2.data_subpoin };
              }
              return value2;
            });
            return { ...value1, data_poin: value1.data_poin };
          }
          return value1;
        });
        return { ...value, data_kewajiban: value.data_kewajiban };
      }
      return value;
    });

    setKeputusan({
      keputusan: updated,
    });
  };

  useEffect(() => {
    if (kewajiban != "" && tambah == "Kewajiban") {
      keputusan.keputusan.map((value) => {
        if (value.kewajiban == master) {
          value.data_kewajiban.push({ poin: kewajiban, data_poin: [] });
        }
      });

      setTambah("");
      setMaster("");
      setKewajiban("");
    }
  }, [kewajiban]);

  useEffect(() => {
    if (poin != "" && tambah == "Poin") {
      keputusan.keputusan.map((value) => {
        if (value.kewajiban == master) {
          value.data_kewajiban.map((value1) => {
            if (value1.poin == kewajiban) {
              value1.data_poin.push({
                subpoin: poin,
                data_subpoin: [],
              });
            }
          });
        }
      });

      setTambah("");
      setMaster("");
      setKewajiban("");
      setPoin("");
    }
  }, [poin]);

  useEffect(() => {
    if (subPoin != "" && tambah == "Sub Poin") {
      keputusan.keputusan.map((value) => {
        if (value.kewajiban == master) {
          value.data_kewajiban.map((value1) => {
            if (value1.poin == kewajiban) {
              value1.data_poin.map((value2) => {
                if (value2.subpoin == poin) {
                  value2.data_subpoin.push(subPoin);
                }
              });
            }
          });
        }
      });

      setTambah("");
      setMaster("");
      setKewajiban("");
      setPoin("");
      setSubPoin("");
    }
  }, [subPoin]);

  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < item; i++) {
      if (i == 0) {
        const keputusanRef = React.createRef();
        const lampiranRef = React.createRef();
        const kesanggupanRef = React.createRef();
        const namaRef = React.createRef();
        const nipRef = React.createRef();

        elements.push(
          <View
            style={{
              flex: 1,
              backgroundColor: color.primary.primary25,
              paddingVertical: 16,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              persistentScrollbar={true}
            >
              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan nomor"}
                title={"Nomor keputusan pemberi persetujuan"}
                rtype={"next"}
                multi={false}
                blur={false}
                value={keputusan.nomor_keputusan}
                ref={keputusanRef}
                onChangeText={(value) => {
                  setKeputusan({
                    nomor_keputusan: value,
                  });
                }}
                submit={() => {
                  lampiranRef.current.focus();
                }}
              />

              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan nomor"}
                title={"Nomor lampiran keputusan pemberi persetujuan"}
                rtype={"next"}
                multi={false}
                padding={20}
                blur={false}
                value={keputusan.nomor_lampiran}
                ref={lampiranRef}
                onChangeText={(value) => {
                  setKeputusan({
                    nomor_lampiran: value,
                  });
                }}
                submit={() => {
                  kesanggupanRef.current.focus();
                }}
              />

              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan nomor"}
                title={"Nomor surat pernyataan kesanggupan"}
                rtype={"done"}
                multi={false}
                padding={20}
                blur={true}
                value={keputusan.nomor_kesanggupan}
                ref={kesanggupanRef}
                onChangeText={(value) => {
                  setKeputusan({
                    nomor_kesanggupan: value,
                  });
                }}
              />

              <ATextInputIcon
                bdColor={color.neutral.neutral300}
                hint={"Masukkan tanggal"}
                title={"Tanggal surat pernyataan kesanggupan"}
                padding={20}
                icon={"calendar"}
                value={keputusan.tanggal_kesanggupan}
                onPress={() => {
                  toggleDateModal();
                }}
              />

              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"default"}
                hint={"Masukkan nama"}
                title={"Nama kepala dinas perhubungan"}
                rtype={"next"}
                multi={false}
                padding={20}
                blur={false}
                value={keputusan.nama_kadis}
                ref={namaRef}
                onChangeText={(value) => {
                  setKeputusan({
                    nama_kadis: value,
                  });
                }}
                submit={() => {
                  nipRef.current.focus();
                }}
              />

              <ATextInput
                bdColor={color.neutral.neutral300}
                ktype={"number-pad"}
                hint={"Masukkan nip"}
                title={"NIP kepala dinas perhubungan"}
                rtype={"done"}
                multi={false}
                padding={20}
                blur={true}
                value={keputusan.nip_kadis}
                ref={nipRef}
                onChangeText={(value) => {
                  setKeputusan({
                    nip_kadis: value,
                  });
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
                <AText
                  color={color.neutral.neutral500}
                  size={14}
                  weight="normal"
                >
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
            </ScrollView>
          </View>
        );
      } else {
        elements.push(
          <ScrollView
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
            style={{
              flex: 1,
              backgroundColor: color.primary.primary25,
            }}
          >
            <View style={{ flexDirection: "row", width: "90%" }}>
              <AText
                style={{ paddingTop: 16, paddingRight: 8 }}
                size={16}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {i}.
              </AText>
              <AText
                style={{ paddingTop: 16 }}
                size={16}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {keputusan.keputusan[i - 1].kewajiban}
              </AText>
            </View>

            {keputusan.keputusan[i - 1].data_kewajiban.length != 0
              ? keputusan.keputusan[i - 1].data_kewajiban.map(
                  (kewajiban, index) => (
                    <View key={index} style={{ marginLeft: 15 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 14,
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flexDirection: "row", width: "80%" }}>
                          <AText
                            style={{ paddingRight: 4 }}
                            size={16}
                            color={color.neutral.neutral700}
                          >
                            {alphabetArray[index]}.
                          </AText>
                          <AText size={16} color={color.neutral.neutral700}>
                            {kewajiban.poin}
                          </AText>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            remove_kewajiban(
                              keputusan.keputusan[i - 1].kewajiban,
                              kewajiban.poin
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

                      {kewajiban.data_poin.length != 0
                        ? kewajiban.data_poin.map((poin, index) => (
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
                                    {index + 1}&#x29;
                                  </AText>
                                  <AText
                                    size={16}
                                    color={color.neutral.neutral700}
                                  >
                                    {poin.subpoin}
                                  </AText>
                                </View>

                                <TouchableOpacity
                                  onPress={() => {
                                    remove_poin(
                                      keputusan.keputusan[i - 1].kewajiban,
                                      kewajiban.poin,
                                      poin.subpoin
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

                              {poin.data_subpoin.length != 0
                                ? poin.data_subpoin.map((subpoin, index) => (
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
                                            {alphabetArray[index]}&#x29;
                                          </AText>
                                          <AText
                                            size={16}
                                            color={color.neutral.neutral700}
                                          >
                                            {subpoin}
                                          </AText>
                                        </View>

                                        <TouchableOpacity
                                          onPress={() => {
                                            remove_subpoin(
                                              keputusan.keputusan[i - 1]
                                                .kewajiban,
                                              kewajiban.poin,
                                              poin.subpoin,
                                              subpoin
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
                                onPress={() => {
                                  setTambah("Sub Poin");
                                  setMaster(
                                    keputusan.keputusan[i - 1].kewajiban
                                  );
                                  setKewajiban(kewajiban.poin);
                                  setPoin(poin.subpoin);
                                  toggleTambahSubPoin();
                                }}
                                style={{ marginLeft: 20 }}
                              >
                                <AText
                                  size={16}
                                  color={color.primary.main}
                                  weight="semibold"
                                >
                                  + Tambah sub poin
                                </AText>
                              </TouchableOpacity>
                            </View>
                          ))
                        : ""}

                      <View style={{ paddingTop: 8 }} />
                      <TouchableOpacity
                        onPress={() => {
                          setTambah("Poin");
                          setMaster(keputusan.keputusan[i - 1].kewajiban);
                          setKewajiban(kewajiban.poin);
                          toggleTambahPoin();
                        }}
                        style={{ marginLeft: 20 }}
                      >
                        <AText
                          size={16}
                          color={color.primary.main}
                          weight="semibold"
                        >
                          + Tambah poin
                        </AText>
                      </TouchableOpacity>
                    </View>
                  )
                )
              : ""}
            <View style={{ paddingTop: 8 }} />
            <TouchableOpacity
              onPress={() => {
                setTambah("Kewajiban");
                setMaster(keputusan.keputusan[i - 1].kewajiban);
                toggleTambahKewajiban();
              }}
              style={{ marginLeft: 15 }}
            >
              <AText size={16} color={color.primary.main} weight="semibold">
                + Tambah kewajiban
              </AText>
            </TouchableOpacity>
            <View style={{ paddingTop: 16 }} />
          </ScrollView>
        );
      }
    }
    return elements;
  };

  return (
    <View style={styles.container}>
      {generateElements()[index - 1]}
      <ADatePicker
        visibleModal={dateModal}
        onPressOKButton={() => {
          toggleDateModal();
        }}
        onPressBATALButton={() => {
          toggleDateModal();
        }}
        pilih={setTanggal}
      />

      <ADialogInputText
        title={"Tambah kewajiban"}
        hint={"Masukan kewajiban"}
        visibleModal={tambahKewajiban}
        setText={setKewajiban}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahKewajiban();
          setKewajiban("");
        }}
        onPressOKButton={() => {
          toggleTambahKewajiban();
        }}
      />

      <ADialogInputText
        title={"Tambah poin"}
        hint={"Masukan poin kewajiban"}
        visibleModal={tambahPoin}
        setText={setPoin}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahPoin();
          setKewajiban("");
          setPoin("");
        }}
        onPressOKButton={() => {
          toggleTambahPoin();
        }}
      />

      <ADialogInputText
        title={"Tambah sub poin kewajiban"}
        hint={"Masukan sub poin"}
        visibleModal={tambahSubPoin}
        setText={setSubPoin}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahSubPoin();
          setKewajiban("");
          setPoin("");
          setSubPoin("");
        }}
        onPressOKButton={() => {
          toggleTambahSubPoin();
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
