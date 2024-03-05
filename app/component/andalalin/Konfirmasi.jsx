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
  const [jalan, setJalan] = useState("");

  const {
    permohonan: {
      nama_proyek,
      jenis_proyek,
      provinsi_proyek,
      kabupaten_proyek,
      kecamatan_proyek,
      kelurahan_proyek,
      nama_jalan,
      kode,
      alamat_proyek,
      bangkitan,
      pemohon,
      jenis,
      rencana_pembangunan,
      lokasi_pengambilan,
      nik_pemohon,
      tempat_lahir_pemohon,
      tanggal_lahir_pemohon,
      provinsi_pemohon,
      kabupaten_pemohon,
      kecamatan_pemohon,
      kelurahan_pemohon,
      alamat_pemohon,
      jenis_kelamin_pemohon,
      nomer_pemohon,
      jabatan_pemohon,
      nama_perusahaan,
      provinsi_perusahaan,
      kabupaten_perusahaan,
      kecamatan_perusahaan,
      kelurahan_perusahaan,
      alamat_perusahaan,
      nomer_perusahaan,
      email_perusahaan,
      nama_pimpinan,
      jabatan_pimpinan,
      jenis_kelamin_pimpinan,
      provinsi_pimpinan_perusahaan,
      kabupaten_pimpinan_perusahaan,
      kecamatan_pimpinan_perusahaan,
      kelurahan_pimpinan_perusahaan,
      alamat_pimpinan,
      nama_pengembang,
      provinsi_pengembang,
      kabupaten_pengembang,
      kecamatan_pengembang,
      kelurahan_pengembang,
      alamat_pengembang,
      nomer_pengembang,
      email_pengembang,
      nama_pimpinan_pengembang,
      provinsi_pimpinan_pengembang,
      kabupaten_pimpinan_pengembang,
      kecamatan_pimpinan_pengembang,
      kelurahan_pimpinan_pengembang,
      alamat_pimpinan_pengembang,
      jabatan_pimpinan_pengembang,
      jenis_kelamin_pimpinan_pengembang,
      aktivitas,
      peruntukan,
      total_luas_lahan,
      kriteria_khusus,
      nilai_kriteria,
      lokasi_bangunan,
      lat_bangunan,
      long_bangunan,
      nomer_skrk,
      tanggal_skrk,
      catatan,
      persyaratan,
      klasifikasi_pemohon,
      nomer_serifikat,
    },
    perlalin,
    user,
    dataMaster,
  } = useContext(UserContext);

  const context = useContext(UserContext);

  const dataSet = () => {
    let findData = dataMaster.jenis_rencana.find((item) => {
      return item.Kategori == jenis;
    });

    if (findData != null) {
      let rencana = findData.JenisRencana.find((item) => {
        return item.Jenis == rencana_pembangunan;
      });

      setData(rencana);
    }
  };

  const jalanSet = () => {
    let jalan_item = context.dataMaster.jalan.find((item) => {
      return item.KodeJalan == kode && item.Nama == nama_jalan;
    });

    setJalan(jalan_item);
  };

  useEffect(() => {
    context.toggleLoading(true);
    dataSet();
    if (kondisi == "Andalalin") {
      jalanSet();
    }

    setTimeout(() => {
      context.toggleLoading(false);
    }, 3000);
  }, []);

  const kirim = () => {
    const pengajuan = {
      kategori_bangkitan: bangkitan,
      kategori_pemohon: pemohon,
      kategori: jenis,
      jenis_rencana_pembangunan: rencana_pembangunan,
      lokasi_pengambilan: lokasi_pengambilan,

      nama_proyek: nama_proyek,
      jenis_proyek: jenis_proyek,
      provinsi_proyek: provinsi_proyek,
      kabupaten_proyek: kabupaten_proyek,
      kecamatan_proyek: kecamatan_proyek,
      kelurahan_proyek: kelurahan_proyek,
      alamat_proyek: alamat_proyek,
      kode_jalan: jalan.KodeJalan,
      kode_jalan_merge:
        jalan.KodeProvinsi +
        "/" +
        jalan.KodeKabupaten +
        "/" +
        jalan.KodeKecamatan +
        "/" +
        jalan.KodeKelurahan +
        "/" +
        jalan.KodeJalan,
      nama_jalan: jalan.Nama,
      kelurahan: jalan.Kelurahan,
      kecamatan: jalan.Kecamatan,
      pangkal_jalan: jalan.Pangkal,
      ujung_jalan: jalan.Ujung,
      panjang_jalan: jalan.Panjang,
      lebar_jalan: jalan.Lebar,
      permukaan_jalan: jalan.Permukaan,
      fungsi_jalan: jalan.Fungsi,
      status_jalan: jalan.Status,

      nik_pemohon: nik_pemohon,
      tempat_lahir_pemohon: tempat_lahir_pemohon,
      tanggal_lahir_pemohon: tanggal_lahir_pemohon,
      provinsi_pemohon: provinsi_pemohon,
      kabupaten_pemohon: kabupaten_pemohon,
      kecamatan_pemohon: kecamatan_pemohon,
      kelurahan_pemohon: kelurahan_pemohon,
      alamat_pemohon: alamat_pemohon,
      jenis_kelamin_pemohon: jenis_kelamin_pemohon,
      nomer_pemohon: nomer_pemohon,
      jabatan_pemohon: jabatan_pemohon,
      nomer_sertifikat_pemohon: nomer_serifikat,
      klasifikasi_pemohon: klasifikasi_pemohon,

      nama_perusahaan: nama_perusahaan,
      provinsi_perusahaan: provinsi_perusahaan,
      kabupaten_perusahaan: kabupaten_perusahaan,
      kecamatan_perusahaan: kecamatan_perusahaan,
      kelurahan_perusahaan: kelurahan_perusahaan,
      alamat_perusahaan: alamat_perusahaan,
      nomer_perusahaan: nomer_perusahaan,
      email_perusahaan: email_perusahaan,
      nama_pimpinan: nama_pimpinan,
      jabatan_pimpinan: jabatan_pimpinan,
      jenis_kelamin_pimpinan: jenis_kelamin_pimpinan,
      provinsi_pimpinan_perusahaan: provinsi_pimpinan_perusahaan,
      kabupaten_pimpinan_perusahaan: kabupaten_pimpinan_perusahaan,
      kecamatan_pimpinan_perusahaan: kecamatan_pimpinan_perusahaan,
      kelurahan_pimpinan_perusahaan: kelurahan_pimpinan_perusahaan,
      alamat_pimpinan_perusahaan: alamat_pimpinan,

      nama_pengembang: nama_pengembang,
      provinsi_pengembang: provinsi_pengembang,
      kabupaten_pengembang: kabupaten_pengembang,
      kecamatan_pengembang: kecamatan_pengembang,
      kelurahan_pengembang: kelurahan_pengembang,
      alamat_pengembang: alamat_pengembang,
      nomer_pengembang: nomer_pengembang,
      email_pengembang: email_pengembang,
      nama_pimpinan_pengembang: nama_pimpinan_pengembang,
      jabatan_pimpinan_pengembang: jabatan_pimpinan_pengembang,
      jenis_kelamin_pimpinan_pengembang: jenis_kelamin_pimpinan_pengembang,
      provinsi_pimpinan_pengembang: provinsi_pimpinan_pengembang,
      kabupaten_pimpinan_pengembang: kabupaten_pimpinan_pengembang,
      kecamatan_pimpinan_pengembang: kecamatan_pimpinan_pengembang,
      kelurahan_pimpinan_pengembang: kelurahan_pimpinan_pengembang,
      alamat_pimpinan_pengembang: alamat_pimpinan_pengembang,

      aktivitas: aktivitas,
      peruntukan: peruntukan,
      total_luas: total_luas_lahan,
      kriteria_khusus: kriteria_khusus,
      nilai_kriteria: nilai_kriteria + " " + data.Satuan.toLowerCase(),
      terbilang: data.Terbilang.toLowerCase(),
      latitude: lat_bangunan,
      longtitude: long_bangunan,
      lokasi_bangunan: lokasi_bangunan,
      nomer_skrk: nomer_skrk,
      tanggal_skrk: tanggal_skrk,
      catatan: catatan,
    };

    andalalinPengajuan(
      user.access_token,
      pengajuan,
      persyaratan,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              navigation.push("Detail", { id: result.data.id_andalalin });
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
    const data_perlengkapan = [];

    perlalin.perlengkapan.forEach((item) => {
      const data = {
        id_perlengkapan: item.id_perlengkapan,
        kategori_utama: item.kategori_utama,
        kategori: item.kategori,
        perlengkapan: item.perlengkapan,
        gambar: item.gambar,
        pemasangan: item.pemasangan,
        latitude: item.latitude,
        longtitude: item.longtitude,
        detail: item.detail,
        alasan: item.alasan,
      };
      data_perlengkapan.push(data);
    });

    const pengajuan = {
      perlengkapan: data_perlengkapan,
      nik_pemohon: perlalin.nik_pemohon,
      tempat_lahir_pemohon: perlalin.tempat_lahir_pemohon,
      tanggal_lahir_pemohon: perlalin.tanggal_lahir_pemohon,
      wilayah_administratif_pemohon: perlalin.wilayah_administratif_pemohon,
      provinsi_pemohon: perlalin.provinsi_pemohon,
      kabupaten_pemohon: perlalin.kabupaten_pemohon,
      kecamatan_pemohon: perlalin.kecamatan_pemohon,
      kelurahan_pemohon: perlalin.kelurahan_pemohon,
      alamat_pemohon: perlalin.alamat_pemohon,
      jenis_kelamin_pemohon: perlalin.jenis_kelamin_pemohon,
      nomer_pemohon: perlalin.nomer_pemohon,
      catatan: perlalin.catatan,
    };

    andalalinPengajuanPerlalin(
      user.access_token,
      pengajuan,
      perlalin.persyaratan,
      perlalin.perlengkapan,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              navigation.push("Detail", { id: result.data.id_andalalin });
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
        Apakah data anda sudah benar?
      </AText>
      <AText
        style={{ paddingTop: 8 }}
        color={color.neutral.neutral500}
        size={16}
        weight="normal"
      >
        Apakah Anda yakin telah selesai mengisi form pengajuan.{"\n"}
        {"\n"}Data permohonan dan persyaratan yang tidak lengkap dapat
        memperlambat proses pengajuan permohonan.{"\n"}
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
        title={"Ajukan permohonan?"}
        desc={"Data permohonan yang diisikan akan dikirim"}
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
          if (kondisi == "Andalalin") {
            kirim();
          } else {
            kirimPerlalin();
          }
        }}
      />
      <ADialog
        title={"Permohonan gagal dikirim"}
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

export default Konfirmasi;
