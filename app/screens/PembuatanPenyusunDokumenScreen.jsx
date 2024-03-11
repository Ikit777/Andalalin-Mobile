import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import { useStateToggler } from "../hooks/useUtility";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import AProgressBar from "../component/utility/AProgressBar";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import PenyusunNavigator from "../component/penyusun/PenyusunNavigator";
import { andalalinPembuatanPenyusunDokumen } from "../api/andalalin";

function PembuatanPenyusunDokumenScreen({ navigation }) {
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
    }, [context.indexPenyusun])
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

  const penyusun_bangkitan_tinggi = [
    {
      substansi: "BAB 1 - PENDAHULUAN",
      muatan: [
        {
          judul: "Latar belakang",
          tambahan: [],
        },
        {
          judul: "Identifikasi masalah",
          tambahan: [],
        },
        {
          judul: "Rumusan masalah",
          tambahan: [],
        },
        {
          judul: "Maksud tujuan",
          tambahan: [],
        },
        {
          judul: "Ruang lingkup",
          tambahan: [],
        },
        {
          judul: "Keluaran yang diharapkan",
          tambahan: [],
        },
        {
          judul: "Batasan pengertian",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 2 - PERENCANAAN DAN METODOLOGI ANDALALIN",
      muatan: [
        {
          judul:
            "Metode analisis bangkitan/pertarikan perjalanan, distribusi perjalanan, pemilihan moda, dan pembebanan jaringan",
          tambahan: [],
        },
        {
          judul: "Kebutuhan pengumpulan data lalu lintas",
          tambahan: [],
        },
        {
          judul: "Penetapan tahun dasar yang dipakai sebagai analisis",
          tambahan: [],
        },
        {
          judul: "Periode analisis paling sedikit 5 (lima) tahun",
          tambahan: [],
        },
        {
          judul: "Landasan hukum yang terkait dengan Andalalin",
          tambahan: [],
        },
        {
          judul: "Metodologi penyusunan dokumen hasil Andalalin",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 3 - GAMBARAN UMUM MENGENAI LOKASI PEMBANGUNAN",
      muatan: [
        {
          judul: "Penjelasan Rencana Pembangunan Baru/Pengembangan",
          tambahan: [],
        },
        {
          judul: "Kesesuaian dengan rencana tata ruang wilayah",
          tambahan: [],
        },
        {
          judul:
            "Peta lokasi dan gambar tata letak bangunan (Site Plan) dan/atau Detail Engineering Design (DED) bangunan",
          tambahan: [],
        },
        {
          judul:
            "Karakteristik dan intensitas tata guna lahan eksisting maupun kondisi yang akan datang",
          tambahan: [],
        },
        {
          judul: "Bukti kepemilikan atau penguasaan lahan",
          tambahan: [],
        },
        {
          judul: "Foto kondisi lokasi pembangunan baru/pengembangan",
          tambahan: [],
        },
        {
          judul: "Penjelasan rencana pembangunan baru/pengembangan",
          tambahan: [],
        },
        {
          judul:
            "Kodisi fisik sarana dan prasarana lalu lintas dan angkutan jalan di sekitar lokasi rencana pembangunan baru/pengembangan",
          tambahan: [],
        },
        {
          judul:
            "Kondisi sosial ekonomi di sekitar lokasi rencana pembangunan baru/pengembangan",
          tambahan: [],
        },
        {
          judul:
            "Cakupan Wilayah Kajian berdasarkan rencana Pembangunan/Pengembangan",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 4 - ANALISIS KONDISI DAN KINERJA LALU LINTAS",
      muatan: [
        {
          judul:
            "Kondisi prasarana jalan (paling sedikit memuat geometrik jalan, perkerasan jalan, dimensi potongan melintang jalan, fungsi jalan, status jalan, kelas jalan, dan perlengkapan jalan)",
          tambahan: [],
        },
        {
          judul:
            "Kondisi lalu lintas eksisting paling sedikit memuat data historis volume lalu lintas, volume gerakan membelok, tundaan membelok, panjang antrian, kecepatan rata-rata kendaraa, waktu perjalanan, okupansi jalan data penumpang angkutan umum, pejalan kaki dan pesepeda",
          tambahan: [],
        },
        {
          judul:
            "Kondisi angkutan jalan (paling sedikit memuat jaringan trayel, faktor muat, jenis kendaraan dan waktu tunggu)",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 5 - SIMULASI KINERJA LALU LINTAS",
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
      substansi: "BAB 6 - REKOMENDASI PENANGANAN DAMPAK LALU LINTAS",
      muatan: [
        {
          judul: "Peningkatan kapasita ruas dan/atau persimpangan jalan",
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
            "Penyediaan fasilitas parkir berupan gedung parkir/taman parkir",
          tambahan: [],
        },
        {
          judul:
            "Penyediaan akses keluar dan masuk untuk orang, kendaraa pribadi dan kendaraan barang",
          tambahan: [],
        },
        {
          judul: "Penyediaan fasilitas bongkar muat barang",
          tambahan: [],
        },
        {
          judul: "Penataan sirkulasi lalu lintas dalam kawasan",
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
            "Penyediaan fasilitas lain-lain menyesuaikan jenis proyek, kegiatan dan kebutuhan (sebagai penunjangan keamanan, kenyamanan, keselamatan dan keteraturan)",
          tambahan: [],
        },
      ],
    },
    {
      substansi: "BAB 7 - PENUTUP",
      muatan: [
        {
          judul:
            "Rincian tanggungjawab Pemerintah dan Pengembangan/Pembangun dalam penanganan dampak lalu lintas (dalam bentuk Materiks)",
          tambahan: [],
        },
        {
          judul: "Rencana Pemantauan dan Evaluasi",
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
    context.toggleLoading(true);
    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan sedang":
        setItem(penyusun_bangkitan_sedang.length);

        context.setPenyusun({
          penyusun: penyusun_bangkitan_sedang,
        });
        break;
      case "Bangkitan tinggi":
        setItem(penyusun_bangkitan_tinggi.length);

        context.setPenyusun({
          penyusun: penyusun_bangkitan_tinggi,
        });
        break
    }

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

  const back = () => {
    if (context.indexPenyusun == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexPenyusun - 1;
      context.setIndexPenyusun(newIndex);

      navigation.replace("Back Penyusun", {
        index: newIndex,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexPenyusun < item) {
      const newIndex = context.indexPenyusun + 1;
      context.setIndexPenyusun(newIndex);

      navigation.push("PenyusunItem", {
        index: newIndex,
      });
    }
  };

  const penyusun_dokumen = () => {
    context.toggleLoading(true);
    andalalinPembuatanPenyusunDokumen(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      context.penyusun.penyusun,
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
                penyusun_dokumen();
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
            Penyusun dokumen
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor((context.indexPenyusun * 100) / item)}
        />
      </View>
      <View style={styles.content}>
        <PenyusunNavigator index={context.indexPenyusun} />
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
          switch (context.indexPenyusun) {
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
          name={context.indexPenyusun != item ? "arrow-right" : "check"}
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
          context.setIndexPenyusun(1);
          context.clearPenyusun();
          navigation.goBack();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Simpan data penyusun dokumen?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          penyusun_dokumen();
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
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default PembuatanPenyusunDokumenScreen;
