import React, { useContext } from "react";
import { View } from "react-native";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import AButton from "../utility/AButton";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import { useStateToggler } from "../../hooks/useUtility";
import { andalalinSurveiKepuasan } from "../../api/andalalin";
import ADialog from "../utility/ADialog";
import { authRefreshToken } from "../../api/auth";
import { UserContext } from "../../context/UserContext";

export default function SaranKritik({ id, navigation }) {
  const context = useContext(UserContext);
  const {
    kepuasan,
    kritik: { kritik },
    setKritik,
    setIndexSurvei,
    clearSurveiKepuasan,
  } = useContext(UserContext);
  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();

  const simpan = () => {
    andalalinSurveiKepuasan(
      context.getUser().access_token,
      id,
      kritik,
      kepuasan,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              clearSurveiKepuasan();
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

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color.primary.primary25,
      }}
    >
      <ATextInput
        bdColor={color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan pemikirian Anda terhadap aplikasi Andalalin"}
        title={"Apresiasi / Kritik / Saran "}
        rtype={"done"}
        multi={true}
        max={7}
        maxHeight={150}
        padding={16}
        value={kritik}
        onChangeText={(value) => {
          setKritik({ kritik: value });
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
        desc={"Data survei akan di simpan"}
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
          simpan();
        }}
      />

      <ADialog
        title={"Survei gagal disimpan"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={kirimGagal}
        toggleModal={toggleKirimGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleKirimGagal();
        }}
      />
    </View>
  );
}
