import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import KelengkapanNavigator from "../component/kelengkapan/KelengkapanNavigator";
import AProgressBar from "../component/utility/AProgressBar";
import { Feather } from "@expo/vector-icons";
import ATidakPilihan from "../component/utility/ATidakPilihan";
import { andalalinChecklistKelengkapanAkhir } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";

function CekKelengkapanAkhirScreen({ navigation }) {
  const context = useContext(UserContext);

  const [confirm, toggleComfirm] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [item, setItem] = useState(0);

  kelengkapan_bangkitan_rendah = [
    {
      Uraian: "Scan Surat Permohonan",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan Lampiran Legal Administrasi (Surat/sertifikat kepemilikan lahan, Sertifikat guna lahan, foto lokasi, foto kegiatan, dll)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Surat Pernyataan Kesanggupan (pdf yang telah di tanda tangani dan File Ms. Word final, yang telah diperbaiki)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Softfile Billing PNBP dan Bukti Pembayaran PNBP yang telah terbayar",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan SK Persetujuan Andalalin yang telah terbit",
      Role: "Dishub",
      Dokumen: [],
    },
  ];

  kelengkapan_bangkitan_sedang = [
    {
      Uraian: "Scan Surat Permohonan",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan Lampiran Legal Administrasi (Surat/sertifikat kepemilikan lahan, Sertifikat guna lahan, foto lokasi, foto kegiatan, dll)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan dan File Ms. Word Dokumen Andalalin Final (telah direvisi dan disesuaikan dengan perbaikan (BAB 1 s.d. Bab terakhir, beserta gambaran lampiran teknis, Lampiran kelengkapan administrasi / surat tanah, legalitas, dll))",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan Lembar Asistensi / buktu perbaikan (hasil asistensi dari perbaikan dokumen oleh Tim Teknis)",
      Role: "Dishub",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Surat Pernyataan Kesanggupan (pdf yang telah di tanda tangani dan File Ms. Word final, yang telah diperbaiki)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Softfile Billing PNBP dan Bukti Pembayaran PNBP yang telah terbayar",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "File Resume Dokumen (file word dan PDF)",
      Role: "Dishub",
      Dokumen: [],
    },
    {
      Uraian: "Scan Sertifikat Konsultan yang masih aktif dan Sertifikat Klasifikasi (bagi yang sudah terklasifikasi)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan SK Persetujuan Andalalin yang telah terbit",
      Role: "Dishub",
      Dokumen: [],
    },
  ];

  kelengkapan_bangkitan_tinggi = [
    {
      Uraian: "Scan Surat Permohonan",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan Surat Kuasa, untuk Perwakilan Pihak Pemohon yang berhalangan hadir langsung saat pembahasan dokumen Bersama tim penilai (apabila ada Rapat pembahasan oleh Tim Penilai)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan Lampiran Legal Administrasi (Surat/sertifikat kepemilikan lahan, Sertifikat guna lahan, foto lokasi, foto kegiatan, dll)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan dan File Ms. Word Dokumen Andalalin Final (telah direvisi dan disesuaikan dengan perbaikan (BAB 1 s.d. Bab terakhir, beserta gambaran lampiran teknis, Lampiran kelengkapan administrasi / surat tanah, legalitas, dll))",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan Surat Undangan Rapat Penilaian Dokumen Andalalin (apabila ada)",
      Role: "Dishub",
      Dokumen: [],
    },
    {
      Uraian: "Foto dan Dokumentasi Kegiatan (pembahasan, Peninjauan lapangan kalau ada, dll)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan Lembar Asistensi / buktu perbaikan (hasil asistensi dari perbaikan dokumen oleh Tim Teknis)",
      Role: "Dishub",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Surat Pernyataan Kesanggupan (pdf yang telah di tanda tangani dan File Ms. Word final, yang telah diperbaiki)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian:
        "Scan/Foto Softfile Billing PNBP dan Bukti Pembayaran PNBP yang telah terbayar",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "File Resume Dokumen (file word dan PDF)",
      Role: "Dishub",
      Dokumen: [],
    },
    {
      Uraian: "Scan Sertifikat Konsultan yang masih aktif dan Sertifikat Klasifikasi (bagi yang sudah terklasifikasi)",
      Role: "User",
      Dokumen: [],
    },
    {
      Uraian: "Scan SK Persetujuan Andalalin yang telah terbit",
      Role: "Dishub",
      Dokumen: [],
    },
  ];

  useEffect(() => {
    context.toggleLoading(true);
    const kelengkapan = [];

    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan rendah":
        kelengkapan.push(...kelengkapan_bangkitan_rendah);
        break;
      case "Bangkitan sedang":
        kelengkapan.push(...kelengkapan_bangkitan_sedang);
        break;
      case "Bangkitan tinggi":
        kelengkapan.push(...kelengkapan_bangkitan_tinggi);
        break;
    }

    setItem(kelengkapan.length);

    let uraian = kelengkapan.map((item) => {
      return item.Uraian;
    });
    let role = kelengkapan.map((item) => {
      return item.Role;
    });
    let dokumen = kelengkapan.map((item) => {
      return item.Dokumen;
    });
    const data = [];

    for (let i = 0; i < uraian.length; i++) {
      data.push({
        uraian: uraian[i],
        role: role[i],
        dokumen: dokumen[i],
        ada: "",
        tidak: "",
        keterangan: "",
      });
    }

    context.setKelengkapan({
      kelengkapan: data,
    });

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

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
    }, [context.indexKelengkapan])
  );

  const back = () => {
    if (context.indexKelengkapan == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexKelengkapan - 1;
      context.setIndexKelengkapan(newIndex);

      navigation.replace("Back Kelengkapan", {
        index: newIndex,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexKelengkapan < item) {
      const newIndex = context.indexKelengkapan + 1;
      context.setIndexKelengkapan(newIndex);

      navigation.push("KelengkapanItem", {
        index: newIndex,
      });
    }
  };

  const check_kelengkapan_akhir = () => {
    context.toggleLoading(true);
    andalalinChecklistKelengkapanAkhir(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      context.kelengkapan.kelengkapan,
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
                check_kelengkapan_akhir();
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
              back();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Cek kelengkapan akhir
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor((context.indexKelengkapan * 100) / item)}
        />
      </View>
      <View style={styles.content}>
        <KelengkapanNavigator index={context.indexKelengkapan} />
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
          switch (context.indexKelengkapan) {
            case item:
              if (
                context.kelengkapan.kelengkapan[context.indexKelengkapan - 1]
                  .ada != "" ||
                context.kelengkapan.kelengkapan[context.indexKelengkapan - 1]
                  .tidak != ""
              ) {
                toggleKonfirmasi();
              }
              break;
            default:
              if (
                context.kelengkapan.kelengkapan[context.indexKelengkapan - 1]
                  .ada != "" ||
                context.kelengkapan.kelengkapan[context.indexKelengkapan - 1]
                  .tidak != ""
              ) {
                onGoToNext();
              }
              break;
          }
        }}
      >
        <Feather
          name={context.indexKelengkapan != item ? "arrow-right" : "check"}
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
          context.setIndexKelengkapan(1);
          context.clearKelengkapan();
          navigation.goBack();
        }}
      />

      <AConfirmationDialog
        title={"Kirim"}
        desc={"Kirim data cek kelengkapan akhir?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          check_kelengkapan_akhir();
        }}
      />

      <ADialog
        title={"Kirim gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        toggleModal={toggleGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <ATidakPilihan
        visibleModal={context.pilihModal}
        onPressOKButton={() => {
          context.togglePilihModal(false);
        }}
        data={context.dataDokumen}
        uraian={context.uraian}
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

export default CekKelengkapanAkhirScreen;
