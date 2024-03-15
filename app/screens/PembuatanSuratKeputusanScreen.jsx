import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { authRefreshToken } from "../api/auth";
import { andalalinPembuatanSuratKeputusan } from "../api/andalalin";
import KeputusanNavigator from "../component/keputusan/KeputusanNavigator";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AProgressBar from "../component/utility/AProgressBar";

function PembuatanSuratKeputusanScreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);

  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [item, setItem] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        back();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        back();
        return true;
      });
    }, [context.indexKeputusan])
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
    context.toggleLoading(true);
    setItem(lampiran_keputusan.length + 1);

    context.setKeputusan({
      nomor_keputusan: "",
      nomor_lampiran: "",
      nomor_kesanggupan: "",
      tanggal_kesanggupan: "",
      nama_kadis: "",
      nip_kadis: "",
      nomor_ba: "",
      tanggal_ba: "",
      nomor_bapl: "",
      tanggal_bapl: "",
      keputusan: lampiran_keputusan,
    });

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

  const back = () => {
    if (context.indexKeputusan == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexKeputusan - 1;
      context.setIndexKeputusan(newIndex);

      navigation.replace("Back Keputusan", {
        index: newIndex,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexKeputusan < item) {
      const newIndex = context.indexKeputusan + 1;
      context.setIndexKeputusan(newIndex);

      navigation.push("KeputusanItem", {
        index: newIndex,
      });
    }
  };

  const simpan = () => {
    context.toggleLoading(true);
    andalalinPembuatanSuratKeputusan(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      context.keputusan,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Detail", {
              id: context.detailPermohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan();
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

  return (
    <AScreen>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <ABackButton
            onPress={() => {
              back();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Surat keputusan
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor((context.indexKeputusan * 100) / item)}
        />
      </View>

      <View style={styles.content}>
        <KeputusanNavigator index={context.indexKeputusan} />
      </View>

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
          right: 32,
          padding: 16,
        }}
        onPress={() => {
          switch (context.indexKeputusan) {
            case 1:
              if (
                context.detailPermohonan.kategori_bangkitan ==
                "Bangkitan tinggi"
              ) {
                if (
                  context.keputusan.nomor_keputusan != "" &&
                  context.keputusan.nomor_lampiran != "" &&
                  context.keputusan.nomor_kesanggupan != "" &&
                  context.keputusan.tanggal_kesanggupan != "" &&
                  context.keputusan.nama_kadis != "" &&
                  context.keputusan.nip_kadis != "" &&
                  nomor_ba != "" &&
                  tanggal_ba != "" &&
                  nomor_bapl != "" &&
                  tanggal_bapl != ""
                ) {
                  onGoToNext();
                }
              } else {
                if (
                  context.keputusan.nomor_keputusan != "" &&
                  context.keputusan.nomor_lampiran != "" &&
                  context.keputusan.nomor_kesanggupan != "" &&
                  context.keputusan.tanggal_kesanggupan != "" &&
                  context.keputusan.nama_kadis != "" &&
                  context.keputusan.nip_kadis != ""
                ) {
                  onGoToNext();
                }
              }

              break;
            case item:
              toggleKonfirmasi();
              break;
            default:
              onGoToNext();
              break;
          }
        }}
      >
        <Feather
          name={context.indexKeputusan != item ? "arrow-right" : "check"}
          size={24}
          color={color.neutral.neutral900}
        />
      </Pressable>

      <AConfirmationDialog
        title={"Peringatan"}
        desc={"Data yang Anda masukkan akan hilang"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.setIndexKeputusan(1);
          context.clearKeputusan();
          navigation.goBack();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Simpan data surat keputusan?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          simpan();
        }}
      />

      <ADialog
        title={"Simpan gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default PembuatanSuratKeputusanScreen;
