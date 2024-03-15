import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import ADatePicker from "../utility/ADatePicker";
import { andalalinPembuatanSuratPermohonan } from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import { StorageAccessFramework } from "expo-file-system";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import * as FileSystem from "expo-file-system";
import ASnackBar from "../utility/ASnackBar";
import PermohonanAtom from "../../atom/PermohonanAtom";
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilState } from "recoil";

function Kegiatan({ onPress }) {
  const { dataMaster } = useContext(UserContext);

  const context = useContext(UserContext);

  const { andalalinState } = PermohonanAtom;
  const [andalalin, setAndalalin] = useRecoilState(andalalinState);

  const kegiatanInput = React.createRef();
  const peruntukanInput = React.createRef();
  const totalInput = React.createRef();
  const luasInput = React.createRef();
  const nomerInput = React.createRef();

  const [kegiatan, setKegiatan] = useState(andalalin.aktivitas);
  const [untuk, setPeruntukan] = useState(andalalin.peruntukan);
  const [total, setTotal] = useState(andalalin.total_luas_lahan);
  const [luas, setLuas] = useState(andalalin.nilai_kriteria);

  const [nomer, setNomer] = useState(andalalin.nomer_skrk);
  const [tanggal, setTanggal] = useState(andalalin.tanggal_skrk);

  const [catatanTambahan, setCatatanTambahan] = useState(andalalin.catatan);

  const [kegiatanError, toggleKegiatanError] = useStateToggler();
  const [peruntukanError, togglePeruntukanError] = useStateToggler();
  const [luasError, toggleLuasError] = useStateToggler();

  const [nomerError, toggleNomerError] = useStateToggler();
  const [tanggalError, toggleTanggalError] = useStateToggler();
  const [totalError, toggleTotalError] = useStateToggler();

  const [data, setData] = useState("");

  const [dateModal, toggleDateModal] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();

  const [downloadConfirm, toggleDownloadConfirm] = useStateToggler();
  const [uri, setUri] = useState();

  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();

  const save = useRef();

  useFocusEffect(
    React.useCallback(() => {
      save.current = {
        ...andalalin,
      };

      return () => {
        setAndalalin(save.current);
      };
    }, [])
  );

  const data_set = () => {
    save.current = {
      ...andalalin,
      aktivitas: kegiatan,
      peruntukan: untuk,
      kriteria_khusus: data.Kriteria,
      total_luas_lahan: total,
      nilai_kriteria: luas,
      nomer_skrk: nomer,
      tanggal_skrk: tanggal,
      catatan: catatanTambahan,
    };
  };

  const showSnackbar = () => {
    setSnackbarVisible();
    setTimeout(() => {
      setSnackbarVisible();
    }, 3000);
  };

  const download = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    setUri(permissions.directoryUri);
    toggleDownloadConfirm();
  };

  const surat = () => {
    context.toggleLoading(true);

    let jalan = context.dataMaster.jalan.find((item) => {
      return (
        item.KodeJalan == andalalin.kode && item.Nama == andalalin.nama_jalan
      );
    });

    const data = {
      bangkitan: andalalin.bangkitan,
      pemohon: andalalin.pemohon,
      nama: context.getUser().nama,
      jabatan: andalalin.jabatan_pemohon,
      jenis: andalalin.jenis_proyek,
      proyek: andalalin.nama_proyek,
      jalan: andalalin.nama_jalan,
      kelurahan: andalalin.kelurahan_proyek,
      kecamatan: andalalin.kecamatan_proyek,
      kabupaten: andalalin.kabupaten_proyek,
      provinsi: andalalin.provinsi_proyek,
      status: jalan.Status,
      pengembang: andalalin.nama_perusahaan,
      konsultan: andalalin.nama_konsultan,
    };

    andalalinPembuatanSuratPermohonan(
      context.getUser().access_token,
      data,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;

              await StorageAccessFramework.createFileAsync(
                uri,
                "Format surat permohonan.docx",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              )
                .then(async (uri) => {
                  context.toggleLoading(true);
                  await FileSystem.writeAsStringAsync(uri, result.data, {
                    encoding: FileSystem.EncodingType.Base64,
                  });
                })
                .catch(() => {
                  context.toggleLoading(false);
                  setMessage("Surat permohonan gagal di download");
                  showSnackbar();
                })
                .finally(() => {
                  context.toggleLoading(false);
                  setMessage("Surat permohonan berhasil di download");
                  showSnackbar();
                });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                surat();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            setMessage("Surat permohonan gagal di download");
            showSnackbar();
            break;
        }
      }
    );
  };

  const press = () => {
    if (data.Kriteria == "" && data.Kriteria == null) {
      if (
        kegiatan != "" &&
        untuk != "" &&
        nomer != "" &&
        tanggal != "" &&
        total != ""
      ) {
        clear_error();
        onPress();
      } else {
        kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
        untuk == "" ? (peruntukanError ? "" : togglePeruntukanError()) : "";
        nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
        tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
        total == "" ? (totalError ? "" : toggleTotalError()) : "";
        formError ? "" : toggleFormError();
      }
    } else {
      if (
        kegiatan != "" &&
        untuk != "" &&
        luas != "" &&
        nomer != "" &&
        tanggal != "" &&
        total != ""
      ) {
        clear_error();
        onPress();
      } else {
        kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
        untuk == "" ? (peruntukanError ? "" : togglePeruntukanError()) : "";
        luas == "" ? (luasError ? "" : toggleLuasError()) : "";
        nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
        tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
        total == "" ? (totalError ? "" : toggleTotalError()) : "";
        formError ? "" : toggleFormError();
      }
    }
  };

  const dataSet = () => {
    let findData = dataMaster.jenis_rencana.find((item) => {
      return item.Kategori == andalalin.jenis;
    });

    if (findData != null) {
      let rencana = findData.JenisRencana.find((item) => {
        return item.Jenis == andalalin.rencana_pembangunan;
      });

      setData(rencana);
    }
  };

  useEffect(() => {
    dataSet();
  }, []);

  useEffect(() => {
    if (tanggal != "") {
      clear_error();
      data_set();
    }
  }, [tanggal]);

  const clear_error = () => {
    if (data.Kriteria == "" && data.Kriteria == null) {
      kegiatan != "" ? (kegiatanError ? toggleKegiatanError() : "") : "";
      untuk != "" ? (peruntukanError ? togglePeruntukanError() : "") : "";
      total != "" ? (totalError ? toggleTotalError() : "") : "";
      nomer != "" ? (nomerError ? toggleNomerError() : "") : "";
      tanggal != "" ? (tanggalError ? toggleTanggalError() : "") : "";
      kegiatan != "" &&
      untuk != "" &&
      nomer != "" &&
      tanggal != "" &&
      total != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
    } else {
      kegiatan != "" ? (kegiatanError ? toggleKegiatanError() : "") : "";
      untuk != "" ? (peruntukanError ? togglePeruntukanError() : "") : "";
      total != "" ? (totalError ? toggleTotalError() : "") : "";
      nomer != "" ? (nomerError ? toggleNomerError() : "") : "";
      tanggal != "" ? (tanggalError ? toggleTanggalError() : "") : "";
      luas != "" ? (luasError ? toggleLuasError() : "") : "";
      kegiatan != "" &&
      untuk != "" &&
      luas != "" &&
      nomer != "" &&
      tanggal != "" &&
      total != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
    }
  };

  return (
    <View style={styles.content}>
      <ScrollView
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <ATextInput
          bdColor={
            kegiatanError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan aktivitas"}
          title={"Aktivitas"}
          multi={true}
          wajib={"*"}
          value={kegiatan}
          ref={kegiatanInput}
          onChangeText={(value) => {
            clear_error();
            setKegiatan(value);
            save.current = {
              ...andalalin,
              aktivitas: value,
              peruntukan: untuk,
              kriteria_khusus: data.Kriteria,
              total_luas_lahan: total,
              nilai_kriteria: luas,
              nomer_skrk: nomer,
              tanggal_skrk: tanggal,
              catatan: catatanTambahan,
            };
          }}
        />

        <ATextInput
          bdColor={
            peruntukanError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan peruntukan"}
          title={"Peruntukan"}
          multi={true}
          padding={20}
          wajib={"*"}
          value={untuk}
          ref={peruntukanInput}
          onChangeText={(value) => {
            clear_error();
            setPeruntukan(value);
            save.current = {
              ...andalalin,
              aktivitas: kegiatan,
              peruntukan: value,
              kriteria_khusus: data.Kriteria,
              total_luas_lahan: total,
              nilai_kriteria: luas,
              nomer_skrk: nomer,
              tanggal_skrk: tanggal,
              catatan: catatanTambahan,
            };
          }}
        />

        <ATextInput
          bdColor={totalError ? color.error.error500 : color.neutral.neutral300}
          ktype={"number-pad"}
          hint={"Masukkan total"}
          title={"Total luas lahan (m²)"}
          multi={false}
          wajib={"*"}
          padding={20}
          rtype={"next"}
          blur={data.Kriteria != "" && data.Kriteria != null ? false : true}
          value={total}
          ref={totalInput}
          onChangeText={(value) => {
            clear_error();
            setTotal(value);
            save.current = {
              ...andalalin,
              aktivitas: kegiatan,
              peruntukan: untuk,
              kriteria_khusus: data.Kriteria,
              total_luas_lahan: value,
              nilai_kriteria: luas,
              nomer_skrk: nomer,
              tanggal_skrk: tanggal,
              catatan: catatanTambahan,
            };
          }}
          submit={() => {
            clear_error();
            data_set();
            if (data.Kriteria != "" && data.Kriteria != null) {
              total != "" ? luasInput.current.focus() : "";
            } else {
              total != "" ? nomerInput.current.focus() : "";
            }
          }}
        />

        {data.Kriteria != "" && data.Kriteria != null ? (
          <View>
            <ATextInput
              bdColor={
                luasError ? color.error.error500 : color.neutral.neutral300
              }
              ktype={"number-pad"}
              hint={"Masukkan " + data.Kriteria.toLowerCase()}
              title={
                data.Kriteria + " " + "(" + data.Satuan.toLowerCase() + ")"
              }
              rtype={"next"}
              blur={false}
              wajib={"*"}
              multi={false}
              padding={20}
              value={luas}
              ref={luasInput}
              onChangeText={(value) => {
                clear_error();
                setLuas(value);
                save.current = {
                  ...andalalin,
                  aktivitas: kegiatan,
                  peruntukan: untuk,
                  kriteria_khusus: data.Kriteria,
                  total_luas_lahan: total,
                  nilai_kriteria: value,
                  nomer_skrk: nomer,
                  tanggal_skrk: tanggal,
                  catatan: catatanTambahan,
                };
              }}
              submit={() => {
                clear_error();
                data_set();
                luas != "" ? nomerInput.current.focus() : "";
              }}
            />
          </View>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={nomerError ? color.error.error500 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nomor SKRK"}
          title={"Nomor SKRK"}
          rtype={"done"}
          multi={false}
          wajib={"*"}
          value={nomer}
          padding={20}
          ref={nomerInput}
          onChangeText={(value) => {
            clear_error();
            setNomer(value);
            save.current = {
              ...andalalin,
              aktivitas: kegiatan,
              peruntukan: untuk,
              kriteria_khusus: data.Kriteria,
              total_luas_lahan: total,
              nilai_kriteria: luas,
              nomer_skrk: value,
              tanggal_skrk: tanggal,
              catatan: catatanTambahan,
            };
          }}
          submit={() => {
            clear_error();
            data_set();
          }}
        />

        <ATextInputIcon
          bdColor={
            tanggalError ? color.error.error500 : color.neutral.neutral300
          }
          hint={"Masukkan tanggal SKRK"}
          title={"Tanggal SKRK"}
          padding={20}
          wajib={"*"}
          icon={"calendar"}
          value={tanggal}
          onPress={() => {
            toggleDateModal();
          }}
        />

        <ATextInput
          bdColor={color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan catatan"}
          title={"Catatan"}
          multi={true}
          padding={20}
          value={catatanTambahan}
          onChangeText={(value) => {
            setCatatanTambahan(value);
            clear_error();
            save.current = {
              ...andalalin,
              aktivitas: kegiatan,
              peruntukan: untuk,
              kriteria_khusus: data.Kriteria,
              total_luas_lahan: total,
              nilai_kriteria: luas,
              nomer_skrk: nomer,
              tanggal_skrk: tanggal,
              catatan: value,
            };
          }}
        />

        <View
          style={{
            borderColor: color.neutral.neutral300,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            marginTop: 25,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: color.text.white,
            alignItems: "center",
          }}
        >
          <AText
            style={{ width: "65%" }}
            size={16}
            color={color.neutral.neutral900}
          >
            Format surat permohonan andalalin
          </AText>

          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              download();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Download
            </AText>
          </TouchableOpacity>
        </View>

        {formError ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Lengkapi formulir atau kolom yang tersedia dengan benar{" "}
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={{ marginTop: 32, marginBottom: 16 }}
          title={"Lanjut"}
          mode="contained"
          onPress={() => {
            press();
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
          pilih={setTanggal}
        />
      </ScrollView>

      <AConfirmationDialog
        title={"Download"}
        desc={"Surat permohonan akan tersimpan pada folder yang Anda pilih"}
        visibleModal={downloadConfirm}
        toggleVisibleModal={toggleDownloadConfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleDownloadConfirm();
        }}
        onPressOKButton={() => {
          toggleDownloadConfirm();
          surat();
        }}
      />

      {isSnackbarVisible ? (
        <ASnackBar visible={isSnackbarVisible} message={message} />
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
  },
});

export default Kegiatan;
