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
import AProgressBar from "../component/utility/AProgressBar";
import { Feather } from "@expo/vector-icons";
import { authRefreshToken } from "../api/auth";
import SubstansiNavigator from "../component/substansi/SubstansiNavigator";
import { andalalinCekKesesuaianSubstansiTeknis } from "../api/andalalin";

function PemeriksaanKesesuaianSubstansiScreen({ navigation }) {
  const context = useContext(UserContext);

  const [confirm, toggleComfirm] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [item, setItem] = useState(0);

  const substansi_bangkitan_sedang = [
    {
      uraian: "Analisis Kondisi Lalu Lintas dan Angkutan Jalan Saat Ini",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi Prasaran Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Lalu Lintas Eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Angkutan Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian:
        "Analisis Bangkitan / Tarikan Lalu Lintas dan Angkutan Jalan akibat Pembangunan / Pengembangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Distribusi Perjalanan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pemilihan Moda",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pembebanan Perjalanan ",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Simulasi Kinerja Lalu Lintas",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi pada masa eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi pada masa konstruksi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan tanpa adanya rekomendasi (Operasional - Do Nothing) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan dengan diterapkannya rekomendasi (Operasional - Do Something) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Rekomendasi dan Rencana Implementasi Penganganan Dampak",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Tanggung Jawab Pemerintah dan Pengembang / Pembangun (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Pemantauan Evaluasi Pemerintah dan Pembangun / Pengembang (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Gambaran umum",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kesesuaian terhadap RT/RW",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Peta lokasi memuat jenis bangunan, rencana pembangunan baru/pengembangan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi fisik sarana dan prasarana",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi sosial ekonomi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi lalu lintas dan pelayanan angkutan jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Keterangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
  ];

  const substansi_bangkitan_tinggi = [
    {
      uraian:
        "Perencanaan Metodologi Analisis Dampak Lalu Lintas",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Kondisi Lalu Lintas dan Angkutan Jalan Saat Ini",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi Prasaran Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Lalu Lintas Eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi Angkutan Jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian:
        "Analisis Bangkitan / Tarikan Lalu Lintas dan Angkutan Jalan akibat Pembangunan / Pengembangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Distribusi Perjalanan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pemilihan Moda",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Analisis Pembebanan Perjalanan ",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Simulasi Kinerja Lalu Lintas",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kondisi pada masa eksisting",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi pada masa konstruksi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan tanpa adanya rekomendasi (Operasional - Do Nothing) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Kondisi pada masa pembangunan dengan diterapkannya rekomendasi (Operasional - Do Something) dan diramalkan minimal 5 tahun / 10 tahun / sesuai konsesi (infrastruktur)",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Rekomendasi dan Rencana Implementasi Penganganan Dampak",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Tanggung Jawab Pemerintah dan Pengembang / Pembangun (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian:
        "Rincian Pemantauan Evaluasi Pemerintah dan Pembangun / Pengembang (terhadap rekomendasi dan kinerja lalu lintas)",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
    {
      uraian: "Gambaran umum",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [
        {
          uraian: "Kesesuaian terhadap RT/RW",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian:
            "Peta lokasi memuat jenis bangunan, rencana pembangunan baru/pengembangan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi fisik sarana dan prasarana",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi sosial ekonomi",
          ada: "",
          tidak: "",
          keterangan: "",
        },
        {
          uraian: "Kondisi lalu lintas dan pelayanan angkutan jalan",
          ada: "",
          tidak: "",
          keterangan: "",
        },
      ],
    },
    {
      uraian: "Keterangan",
      ada: "",
      tidak: "",
      keterangan: "",
      child: [],
    },
  ];

  useEffect(() => {
    context.toggleLoading(true);
    const administrasi = [];
    const master = context.dataMaster.persyaratan.PersyaratanAndalalin.filter(
      (item) => {
        return item.bangkitan == context.detailPermohonan.kategori_bangkitan;
      }
    );

    master.map((item) => {
      administrasi.push(item.persyaratan);
    });

    switch (context.detailPermohonan.kategori_bangkitan) {
      case "Bangkitan sedang":
        setItem(substansi_bangkitan_sedang.length);

        context.setSubstansi({
          administrasi: administrasi,
          substansi: substansi_bangkitan_sedang,
        });
        break;
      case "Bangkitan tinggi":
        setItem(substansi_bangkitan_tinggi.length);

        context.setSubstansi({
          administrasi: administrasi,
          substansi: substansi_bangkitan_tinggi,
        });
        break;
    }

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
    }, [context.indexSubstansi])
  );

  const back = () => {
    if (context.indexSubstansi == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexSubstansi - 1;
      context.setIndexSubstansi(newIndex);

      navigation.replace("Back Substansi", {
        index: newIndex,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexSubstansi < item) {
      const newIndex = context.indexSubstansi + 1;
      context.setIndexSubstansi(newIndex);

      navigation.push("SubstansiItem", {
        index: newIndex,
      });
    }
  };

  const periksa_substansi = () => {
    context.toggleLoading(true);
    andalalinCekKesesuaianSubstansiTeknis(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      context.substansi.administrasi,
      context.substansi.substansi,
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
                periksa_substansi();
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
            Cek Kesesuaian Substansi
          </AText>
        </View>
        <AProgressBar
          progress={Math.floor((context.indexSubstansi * 100) / item)}
        />
      </View>
      <View style={styles.content}>
        <SubstansiNavigator index={context.indexSubstansi} />
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
          switch (context.indexSubstansi) {
            case item:
              if (
                context.substansi.substansi[context.indexSubstansi - 1].ada !=
                  "" ||
                context.substansi.substansi[context.indexSubstansi - 1].tidak !=
                  ""
              ) {
                let not_empty = context.substansi.substansi[
                  context.indexSubstansi - 1
                ].child.filter((item) => {
                  return item.ada == "" && item.tidak == "";
                });

                if (not_empty.length == 0) {
                  toggleKonfirmasi();
                }
              }
              break;
            default:
              if (
                context.substansi.substansi[context.indexSubstansi - 1].ada !=
                  "" ||
                context.substansi.substansi[context.indexSubstansi - 1].tidak !=
                  ""
              ) {
                let not_empty = context.substansi.substansi[
                  context.indexSubstansi - 1
                ].child.filter((item) => {
                  return item.ada == "" && item.tidak == "";
                });

                if (not_empty.length == 0) {
                  onGoToNext();
                }
              }
              break;
          }
        }}
      >
        <Feather
          name={context.indexSubstansi != item ? "arrow-right" : "check"}
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
          context.setIndexSubstansi(1);
          context.clearSubstansi();
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
          periksa_substansi();
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

export default PemeriksaanKesesuaianSubstansiScreen;
