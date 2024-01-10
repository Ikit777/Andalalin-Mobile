import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useStateToggler } from "../../hooks/useUtility";
import ATextInput from "../utility/ATextInput";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import {
  andalalinPemasangan,
  andalalinSurveiLapangan,
  andalalinSurveiMandiri,
} from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import ADialog from "../utility/ADialog";

function Keterangan({ navigation, id, kondisi }) {
  const {
    survei: { keterangan, foto1, foto2, foto3, lokasi, lat, long },
    setSurvei,
    clearSurvei,
    setIndexSurvei,
  } = useContext(UserContext);
  const context = useContext(UserContext);
  const [keteranganText, setKeteranganText] = useState(keterangan);

  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();

  useEffect(() => {
    setSurvei({ keterangan: keteranganText });
  }, [keteranganText]);

  const simpan = () => {
    const foto = {
      fotoSurvei1: foto1,
      fotoSurvei2: foto2,
      fotoSurvei3: foto3,
    };

    const lokasi_survei = {
      latitude: parseFloat(lat),
      longtitude: parseFloat(long),
      lokasi: lokasi,
      catatan: keterangan,
    };

    andalalinSurveiLapangan(
      context.getUser().access_token,
      id,
      foto,
      lokasi_survei,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              clearSurvei();
              setIndexSurvei(1);

              navigation.replace("Detail Survei", {
                id: id,
                kondisi: "Petugas",
                jenis: "Permohonan",
              });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan();
              } else {
                context.toggleLoading(false);
                toggleKirimGagal();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleKirimGagal();
        }
      }
    );
  };

  const simpan_mandiri = () => {
    const foto = {
      fotoSurvei1: foto1,
      fotoSurvei2: foto2,
      fotoSurvei3: foto3,
    };

    const lokasi_survei = {
      latitude: parseFloat(lat),
      longtitude: parseFloat(long),
      lokasi: lokasi,
      catatan: keterangan,
    };

    andalalinSurveiMandiri(
      context.getUser().access_token,
      foto,
      lokasi_survei,
      (response) => {
        console.log(response)
        switch (response.status) {
          case 201:
            (async () => {
              clearSurvei();
              setIndexSurvei(1);
              const result = await response.data;
              navigation.replace("Detail Survei", {
                id: result.data.IdSurvey,
                kondisi: "Petugas",
                jenis: "Mandiri",
              });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_mandiri();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleKirimGagal();
        }
      }
    );
  };

  const simpan_pemasangan = () => {
    const foto = {
      fotoSurvei1: foto1,
      fotoSurvei2: foto2,
      fotoSurvei3: foto3,
    };

    const lokasi_survei = {
      latitude: parseFloat(lat),
      longtitude: parseFloat(long),
      lokasi: lokasi,
      catatan: keterangan,
    };

    andalalinPemasangan(
      context.getUser().access_token,
      id,
      foto,
      lokasi_survei,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              clearSurvei();
              setIndexSurvei(1);
              
              navigation.replace("Detail Survei", {
                id: id,
                kondisi: "Petugas",
                jenis: "Pemasangan",
              });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_pemasangan();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleKirimGagal();
        }
      }
    );
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={color.neutral.neutral300}
        ktype={"default"}
        hint={`Masukkan catatan terkait keadaan ataupun situasi ${
          kondisi == "Pemasangan" ? "pemasangan perlalin" : "survei lapangan"
        }`}
        title={`Catatan ${
          kondisi == "Pemasangan" ? "pemasangan perlalin" : "survei lapangan"
        }`}
        rtype={"done"}
        multi={true}
        max={4}
        value={keteranganText}
        onChangeText={(value) => {
          setKeteranganText(value);
        }}
      />

      <AButton
        style={{ marginTop: 32, marginBottom: 50 }}
        title={"Simpan"}
        mode="contained"
        onPress={() => {
          toggleComfirm();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={`Data ${
          kondisi == "Pemasangan"
            ? "pemasangan perlengkapan lalu lintas"
            : "survei lapangan"
        } kan di simpan`}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.toggleLoading(true);
          switch (kondisi) {
            case "Permohonan":
              simpan();
              break;
            case "Mandiri":
              simpan_mandiri();
              break;
            case "Pemasangan":
              simpan_pemasangan();
              break;
          }
        }}
      />
      <ADialog
        title={`${
          kondisi == "Pemasangan" ? "Pemasangan perlalin" : "Survei lapangan"
        } gagal disimpan`}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={kirimGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleKirimGagal();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
  },
});

export default Keterangan;
