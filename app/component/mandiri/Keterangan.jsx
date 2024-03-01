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

function Keterangan({ navigation }) {
  const {
    surveiMandiri: { keterangan, foto, lokasi, lat, long },
    setSurveiMandiri,
    clearSurveiMandiri,
    setSurveiMandiriIndex,
  } = useContext(UserContext);
  const context = useContext(UserContext);
  const [keteranganText, setKeteranganText] = useState(keterangan);

  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();

  useEffect(() => {
    setSurveiMandiri({ keterangan: keteranganText });
  }, [keteranganText]);

  const simpan_mandiri = () => {
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
        switch (response.status) {
          case 201:
            (async () => {
              clearSurveiMandiri();
              setSurveiMandiriIndex(1);
              const result = await response.data;
              navigation.push("Detail mandiri", {
                id: result.data.IdPengaduan,
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

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan catatan"}
        title={"Catatan pengaduan"}
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
        desc={`Data pengaduan akan di simpan`}
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
          simpan_mandiri();
        }}
      />
      <ADialog
        title={`Survei gagal disimpan`}
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
