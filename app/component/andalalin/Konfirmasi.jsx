import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import { andalalinPengajuan } from "../../api/andalalin";
import ALoading from "../utility/ALoading";
import { authRefreshToken } from "../../api/auth";
import ADialog from "../utility/ADialog";

function Konfirmasi({ navigation }) {
  const [loading, toggleLoading] = useStateToggler();
  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();

  const {
    permohonan: {
      jenis,
      lokasi_pengambilan,
      nik_pemohon,
      nama_pemohon,
      tempat_lahir_pemohon,
      tanggal_lahir_pemohon,
      alamat_pemohon,
      jenis_kelamin_pemohon,
      nomer_pemohon,
      nomer_seluler_pemohon,
      jabatan_pemohon,
      nama_perusahaan,
      alamat_perusahaan,
      nomer_perusahaan,
      email_perusahaan,
      provinsi_perusahaan,
      kabupaten_perusahaan,
      kecamatan_perusahaan,
      kelurahan_perusahaan,
      nama_pimpinan,
      jabatan_pimpinan,
      jenis_kelamin_pimpinan,
      jenis_kegiatan,
      peruntukan,
      luas_lahan,
      alamat_persil,
      kelurahan_persil,
      nomer_skrk,
      tanggal_skrk,
      berkas_ktp,
      berkas_akta,
      berkas_surat,
    },
    user,
    clear,
    setIndex,
  } = useContext(UserContext);
  const context = useContext(UserContext);

  const kirim = () => {
    const file = {
      ktp: berkas_ktp,
      akta: berkas_akta,
      surat: berkas_surat,
    };
    const pengajuan = {
      jenis: jenis,
      lokasi_pengambilan: lokasi_pengambilan,
      nik_pemohon: nik_pemohon,
      nama_pemohon: nama_pemohon,
      tempat_lahir_pemohon: tempat_lahir_pemohon,
      tanggal_lahir_pemohon: tanggal_lahir_pemohon,
      alamat_pemohon: alamat_pemohon,
      jenis_kelamin_pemohon: jenis_kelamin_pemohon,
      nomer_pemohon: nomer_pemohon,
      nomer_seluler_pemohon: nomer_seluler_pemohon,
      jabatan_pemohon: jabatan_pemohon,
      nama_perusahaan: nama_perusahaan,
      alamat_perusahaan: alamat_perusahaan,
      nomer_perusahaan: nomer_perusahaan,
      email_perusahaan: email_perusahaan,
      provinsi_perusahaan: provinsi_perusahaan,
      kabupaten_perusahaan: kabupaten_perusahaan,
      kecamatan_perusahaan: kecamatan_perusahaan,
      kelurahan_perusahaan: kelurahan_perusahaan,
      nama_pimpinan: nama_pimpinan,
      jabatan_pimpinan: jabatan_pimpinan,
      jenis_kelamin_pimpinan: jenis_kelamin_pimpinan,
      jenis_kegiatan: jenis_kegiatan,
      peruntukan: peruntukan,
      luas_lahan: luas_lahan,
      alamat_persil: alamat_persil,
      kelurahan_persil: kelurahan_persil,
      nomer_skrk: nomer_skrk,
      tanggal_skrk: tanggal_skrk,
    };

    andalalinPengajuan(user.access_token, pengajuan, file, (response) => {
      switch (response.status) {
        case 200:
          clear();
          (async () => {
            const result = await response.json();
            clear();
            setIndex(1);
            toggleLoading();

            navigation.replace("Detail", { id: result.data.id_andalalin });
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              kirim();
            } else {
              toggleLoading();
              toggleKirimGagal();
            }
          });
          break;
        default:
          toggleLoading();
          toggleKirimGagal();
      }
    });
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <AText color={color.neutral.neutral900} size={24} weight="semibold">
        Apakah data sudah benar?
      </AText>
      <AText
        style={{ paddingTop: 8 }}
        color={color.neutral.neutral500}
        size={16}
        weight="normal"
      >
        Apakah Anda yakin telah selesai mengisi form pengajuan.{"\n"}
        {"\n"}permohonan data dan persyaratan yang tidak lengkap dapat
        memperlambat proses terbitnya Surat keputusan.{"\n"}
        {"\n"}Anda bisa kembali untuk memeriksa data yang telah dimasukkan
      </AText>

      <AButton
        style={{ marginTop: 32, marginBottom: 50 }}
        title={"Selesai"}
        mode="contained"
        onPress={() => {
          toggleComfirm();
        }}
      />

      <AConfirmationDialog
        title={"Apakah Anda yakin?"}
        desc={"Data yang diisikan akan dikirim"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          toggleLoading();
          kirim();
        }}
      />
      <ADialog
        title={"Pengajuan gagal dikirim"}
        desc={"Pengajuan gagal, silahkan coba lagi"}
        visibleModal={kirimGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleKirimGagal();
        }}
      />
      <ALoading visibleModal={loading} />
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

export default Konfirmasi;
