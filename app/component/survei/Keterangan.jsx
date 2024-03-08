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
} from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import ADialog from "../utility/ADialog";

function Keterangan({ navigation, id, kondisi }) {
  const {
    survei: { keterangan, foto, lokasi, lat, long, id_perlengkapan },
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
    const lokasi_survei = {
      latitude: parseFloat(lat),
      longtitude: parseFloat(long),
      lokasi: lokasi,
      catatan: keterangan,
    };

    andalalinSurveiLapangan(
      context.getUser().access_token,
      id,
      id_perlengkapan,
      foto,
      lokasi_survei,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              clearSurvei();
              setIndexSurvei(1);
              navigation.replace("Detail", { id: id });
            })();
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
            toggleKirimGagal();
        }
      }
    );
  };

  const simpan_pemasangan = () => {
    const lokasi_survei = {
      latitude: parseFloat(lat),
      longtitude: parseFloat(long),
      lokasi: lokasi,
      catatan: keterangan,
    };

    andalalinPemasangan(
      context.getUser().access_token,
      id,
      id_perlengkapan,
      foto,
      lokasi_survei,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              clearSurvei();
              setIndexSurvei(1);
              navigation.replace("Detail", { id: id });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan_pemasangan();
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
        hint={`Masukkan catatan`}
        title={`Catatan ${kondisi == "Pemasangan" ? "pemasangan" : "survei"}`}
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
          kondisi == "Pemasangan" ? "pemasangan" : "survei"
        } akan di simpan`}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
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
            case "Pemasangan":
              simpan_pemasangan();
              break;
          }
        }}
      />
      <ADialog
        title={`${
          kondisi == "Pemasangan" ? "Pemasangan" : "Survei"
        } gagal disimpan`}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={kirimGagal}
        toggleModal={toggleKirimGagal}
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
