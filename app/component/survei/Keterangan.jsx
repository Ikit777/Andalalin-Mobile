import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useStateToggler } from "../../hooks/useUtility";
import ATextInput from "../utility/ATextInput";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import { andalalinSurveiLapangan } from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import ADialog from "../utility/ADialog";

function Keterangan({ navigation, id }) {
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
      keterangan: keterangan,
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

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan keterangan"}
        title={"Keterangan survey"}
        rtype={"done"}
        multi={true}
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
        title={"Apakah Anda yakin?"}
        desc={"Data survei akan di simpan"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.toggleLoading(true);
          simpan();
        }}
      />
      <ADialog
        title={"Survei gagal disimpan"}
        desc={"Simpan gagal, silahkan coba lagi"}
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
