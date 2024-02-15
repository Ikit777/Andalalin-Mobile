import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import ATextInput from "../component/utility/ATextInput";
import ATextInputIcon from "../component/utility/ATextInputIcon";
import AButton from "../component/utility/AButton";
import { authRefreshToken } from "../api/auth";
import { andalalinPembuatanSuratKeputusan } from "../api/andalalin";
import ADatePicker from "../component/utility/ADatePicker";

function PembuatanSuratKeputusanScreen({ navigation }) {
  const context = useContext(UserContext);

  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const keputusanRef = React.createRef();
  const lampiranRef = React.createRef();
  const kesanggupanRef = React.createRef();
  const namaRef = React.createRef();
  const nipRef = React.createRef();

  const [keputusan, setKeputusan] = useState("");
  const [lampiran, setLampiran] = useState("");
  const [kesanggupan, setKesanggupan] = useState("");
  const [tanggalKesanggupan, setTanggalKesanggupan] = useState("");
  const [namaKadis, setNamaKadis] = useState("");
  const [nipKadis, setNipKadis] = useState("");

  const [tanggalError, toggleTanggalError] = useStateToggler();
  const [keputusanError, toggleKeputusanError] = useStateToggler();
  const [lampiranError, toggleLampiranError] = useStateToggler();
  const [kesanggupanError, toggleKesanggupanError] = useStateToggler();
  const [namaError, toggleNamaError] = useStateToggler();
  const [nipError, toggleNipError] = useStateToggler();

  const [dateModal, toggleDateModal] = useStateToggler();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

  const press = () => {
    if (
      keputusan != "" &&
      lampiran != "" &&
      kesanggupan != "" &&
      tanggalKesanggupan != "" &&
      namaKadis != "" &&
      nipKadis != ""
    ) {
      {
        keputusanError ? toggleKeputusanError() : "";
      }
      {
        lampiranError ? toggleLampiranError() : "";
      }
      {
        kesanggupanError ? toggleKesanggupanError() : "";
      }
      {
        tanggalError ? toggleTanggalError() : "";
      }
      {
        namaError ? toggleNamaError() : "";
      }
      {
        nipError ? toggleNipError() : "";
      }
      toggleKonfirmasi();
    } else {
      {
        keputusan == "" ? (keputusanError ? "" : toggleKeputusanError()) : "";
      }
      {
        lampiran == "" ? (lampiranError ? "" : toggleLampiranError()) : "";
      }
      {
        kesanggupan == ""
          ? kesanggupanError
            ? ""
            : toggleKesanggupanError()
          : "";
      }
      {
        tanggalKesanggupan == ""
          ? tanggalError
            ? ""
            : toggleTanggalError()
          : "";
      }
      {
        namaKadis == "" ? (namaError ? "" : toggleNamaError()) : "";
      }
      {
        nipKadis == "" ? (nipError ? "" : toggleNipError()) : "";
      }
    }
  };

  const pembuatan = () => {
    context.toggleLoading(true);
    const data = {
      keputusan: keputusan,
      lampiran: lampiran,
      kesanggupan: kesanggupan,
      tanggal: tanggalKesanggupan,
      nama: namaKadis,
      nip: nipKadis,
    };
    andalalinPembuatanSuratKeputusan(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      data,
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
                pembuatan();
              } else {
                context.toggleLoading(false);
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
              navigation.goBack();
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
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <ATextInput
          bdColor={
            keputusanError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan nomor"}
          title={"Nomor keputusan pemberi persetujuan"}
          rtype={"next"}
          multi={false}
          blur={false}
          value={keputusan}
          ref={keputusanRef}
          onChangeText={(value) => {
            setKeputusan(value);
          }}
          submit={() => {
            {
              keputusanError ? toggleKeputusanError() : "";
            }
            {
              keputusan != "" ? lampiranRef.current.focus() : "";
            }
          }}
        />

        {keputusanError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nomor keputusan wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={
            lampiranError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan nomor"}
          title={"Nomor lampiran keputusan pemberi persetujuan"}
          rtype={"next"}
          multi={false}
          padding={20}
          blur={false}
          value={lampiran}
          ref={lampiranRef}
          onChangeText={(value) => {
            setLampiran(value);
          }}
          submit={() => {
            {
              lampiranError ? toggleLampiranError() : "";
            }
            {
              lampiran != "" ? kesanggupanRef.current.focus() : "";
            }
          }}
        />

        {lampiranError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nomor lampiran keputusan wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={
            kesanggupanError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan nomor"}
          title={"Nomor surat pernyataan kesanggupan"}
          rtype={"done"}
          multi={false}
          padding={20}
          blur={true}
          value={kesanggupan}
          ref={kesanggupanRef}
          onChangeText={(value) => {
            setKesanggupan(value);
          }}
          submit={() => {
            {
              kesanggupanError ? toggleKesanggupanError() : "";
            }
          }}
        />

        {kesanggupanError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nomor surat pernyataan kesanggupan wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInputIcon
          bdColor={
            tanggalError ? color.error.error500 : color.neutral.neutral300
          }
          hint={"Masukkan tanggal"}
          title={"Tanggal surat pernyataan kesanggupan"}
          padding={20}
          icon={"calendar"}
          value={tanggalKesanggupan}
          onPress={() => {
            toggleDateModal();
          }}
        />

        {tanggalError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Tanggal surat pernyataan kesanggupan wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={namaError ? color.error.error500 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama"}
          title={"Nama kepala dinas perhubungan"}
          rtype={"next"}
          multi={false}
          padding={20}
          blur={false}
          value={namaKadis}
          ref={namaRef}
          onChangeText={(value) => {
            setNamaKadis(value);
          }}
          submit={() => {
            {
              namaError ? toggleNamaError() : "";
            }
            {
              namaKadis != "" ? nipRef.current.focus() : "";
            }
          }}
        />

        {namaError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nama kepala dinas perhubungan wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={nipError ? color.error.error500 : color.neutral.neutral300}
          ktype={"number-pad"}
          hint={"Masukkan nip"}
          title={"NIP kepala dinas perhubungan"}
          rtype={"done"}
          multi={false}
          padding={20}
          blur={true}
          value={nipKadis}
          ref={nipRef}
          onChangeText={(value) => {
            setNipKadis(value);
          }}
          submit={() => {
            {
              nipError ? toggleNipError() : "";
            }
          }}
        />

        {nipError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nip kepala dinas perhubungan wajib
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={{ marginBottom: 32, marginTop: 32 }}
          title={"Simpan"}
          mode="contained"
          onPress={() => {
            press();
          }}
        />
      </ScrollView>

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Simpan data surat keputusan?"}
        visibleModal={konfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          pembuatan();
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

      <ADatePicker
        visibleModal={dateModal}
        onPressOKButton={() => {
          toggleDateModal();
          {
            tanggalError ? toggleTanggalError() : "";
          }
        }}
        onPressBATALButton={() => {
          toggleDateModal();
        }}
        pilih={setTanggalKesanggupan}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default PembuatanSuratKeputusanScreen;
