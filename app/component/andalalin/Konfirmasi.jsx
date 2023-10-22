import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import {
  andalalinPengajuan,
  andalalinPengajuanPerlalin,
} from "../../api/andalalin";
import { authRefreshToken } from "../../api/auth";
import ADialog from "../utility/ADialog";

function Konfirmasi({ navigation, kondisi }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();
  const [data, setData] = useState("");

  const {
    permohonan: {
      bangkitan,
      pemohon,
      jenis,
      rencana_pembangunan,
      lokasi_pengambilan,
      nik_pemohon,
      tempat_lahir_pemohon,
      tanggal_lahir_pemohon,
      wilayah_administratif_pemohon,
      alamat_pemohon,
      jenis_kelamin_pemohon,
      nomer_pemohon,
      jabatan_pemohon,
      nama_perusahaan,
      wilayah_administratif_perusahaan,
      alamat_perusahaan,
      nomer_perusahaan,
      email_perusahaan,
      nama_pimpinan,
      jabatan_pimpinan,
      jenis_kelamin_pimpinan,
      aktivitas,
      peruntukan,
      kriteria_khusus,
      nilai_kriteria,
      lokasi_bangunan,
      lat_bangunan,
      long_bangunan,
      nomer_skrk,
      tanggal_skrk,
      berkas_ktp,
      berkas_akta,
      berkas_surat,
      persyaratan_tambahan,
    },
    perlalin,
    user,
    clear,
    setIndex,
    dataMaster,
  } = useContext(UserContext);

  const context = useContext(UserContext);

  const dataSet = () => {
    let findData = dataMaster.rencana_pembangunan.find((item) => {
      return item.Kategori == jenis;
    });

    if (findData != null) {
      let rencana = findData.JenisRencana.find((item) => {
        return item.Jenis == rencana_pembangunan;
      });

      setData(rencana);
    }
  };

  useEffect(() => {
    dataSet();
  }, []);

  const kirim = () => {
    const file = {
      ktp: berkas_ktp,
      akta: berkas_akta,
      surat: berkas_surat,
    };
    const pengajuan = {
      kategori_bangkitan: bangkitan,
      kategori_pemohon: pemohon,
      kategori: jenis,
      jenis_rencana_pembangunan: rencana_pembangunan,
      lokasi_pengambilan: lokasi_pengambilan,
      nik_pemohon: nik_pemohon,
      tempat_lahir_pemohon: tempat_lahir_pemohon,
      tanggal_lahir_pemohon: tanggal_lahir_pemohon,
      wilayah_administratif_pemohon: wilayah_administratif_pemohon,
      alamat_pemohon: alamat_pemohon,
      jenis_kelamin_pemohon: jenis_kelamin_pemohon,
      nomer_pemohon: nomer_pemohon,
      jabatan_pemohon: jabatan_pemohon,
      nama_perusahaan: nama_perusahaan,
      wilayah_administratif_perusahaan: wilayah_administratif_perusahaan,
      alamat_perusahaan: alamat_perusahaan,
      nomer_perusahaan: nomer_perusahaan,
      email_perusahaan: email_perusahaan,
      nama_pimpinan: nama_pimpinan,
      jabatan_pimpinan: jabatan_pimpinan,
      jenis_kelamin_pimpinan: jenis_kelamin_pimpinan,
      aktivitas: aktivitas,
      peruntukan: peruntukan,
      kriteria_khusus: kriteria_khusus,
      nilai_kriteria: nilai_kriteria+ " " + data.Satuan.toLowerCase(),
      latitude: lat_bangunan,
      longtitude: long_bangunan,
      lokasi_bangunan: lokasi_bangunan,
      nomer_skrk: nomer_skrk,
      tanggal_skrk: tanggal_skrk,
    };

    andalalinPengajuan(
      user.access_token,
      pengajuan,
      file,
      persyaratan_tambahan,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.json();
              clear();
              setIndex(1);

              navigation.replace("Detail", { id: result.data.id_andalalin });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                kirim();
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

  const kirimPerlalin = () => {
    const file = {
      ktp: perlalin.berkas_ktp,
      surat: perlalin.berkas_surat,
    };

    const pengajuan = {
      kategori: perlalin.kategori,
      jenis_perlengkapan: perlalin.perlengkapan,
      lokasi_pengambilan: perlalin.lokasi_pengambilan,
      nik_pemohon: perlalin.nik_pemohon,
      tempat_lahir_pemohon: perlalin.tempat_lahir_pemohon,
      tanggal_lahir_pemohon: perlalin.tanggal_lahir_pemohon,
      alamat_pemohon: perlalin.alamat_pemohon,
      jenis_kelamin_pemohon: perlalin.jenis_kelamin_pemohon,
      nomer_pemohon: perlalin.nomer_pemohon,
      nomer_seluler_pemohon: perlalin.nomer_seluler_pemohon,
      jenis_kegiatan: perlalin.jenis_kegiatan,
      peruntukan: perlalin.peruntukan,
      luas_lahan: perlalin.luas_lahan,
      alamat_persil: perlalin.alamat_persil,
      kelurahan_persil: perlalin.kelurahan_persil,
    };

    andalalinPengajuanPerlalin(
      user.access_token,
      pengajuan,
      file,
      perlalin.persyaratan_tambahan,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.json();
              clear();
              setIndex(1);

              navigation.replace("Detail", { id: result.data.id_andalalin, jenis: result.data.jenis_andalalin});
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                kirim();
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
          context.toggleLoading(true);
          if (kondisi == "Andalalin") {
            kirim();
          } else {
            kirimPerlalin();
          }
        }}
      />
      <ADialog
        title={"Permohonan gagal dikirim"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
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

export default Konfirmasi;
