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
import { useRecoilState } from "recoil";
import PermohonanAtom from "../../atom/PermohonanAtom";

function Konfirmasi({ navigation, kondisi }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();
  const [data, setData] = useState("");
  const [jalan, setJalan] = useState("");

  const { andalalinState, perlalinState } = PermohonanAtom;

  const [andalalin, setAndalalin] = useRecoilState(andalalinState);
  const [perlalin, setPerlalin] = useRecoilState(perlalinState);

  const { user, dataMaster } = useContext(UserContext);

  const context = useContext(UserContext);

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

  const jalanSet = () => {
    let jalan_item = context.dataMaster.jalan.find((item) => {
      return (
        item.KodeJalan == andalalin.kode && item.Nama == andalalin.nama_jalan
      );
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
      //Data Permohonan
      kategori_bangkitan: andalalin.bangkitan,
      kategori_pemohon: andalalin.pemohon,
      kategori: andalalin.jenis,
      jenis_rencana_pembangunan: andalalin.rencana_pembangunan,
      lokasi_pengambilan: andalalin.lokasi_pengambilan,

      //Data Proyek
      nama_proyek: andalalin.nama_proyek,
      jenis_proyek: andalalin.jenis_proyek,
      provinsi_proyek: andalalin.provinsi_proyek,
      kabupaten_proyek: andalalin.kabupaten_proyek,
      kecamatan_proyek: andalalin.kecamatan_proyek,
      kelurahan_proyek: andalalin.kelurahan_proyek,
      alamat_proyek: andalalin.alamat_proyek,
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
      pangkal_jalan: jalan.Pangkal,
      ujung_jalan: jalan.Ujung,
      panjang_jalan: jalan.Panjang,
      lebar_jalan: jalan.Lebar,
      permukaan_jalan: jalan.Permukaan,
      fungsi_jalan: jalan.Fungsi,
      status_jalan: jalan.Status,

      //Data Pemohon
      nik_pemohon: andalalin.nik_pemohon,
      tempat_lahir_pemohon: andalalin.tempat_lahir_pemohon,
      tanggal_lahir_pemohon: andalalin.tanggal_lahir_pemohon,
      provinsi_pemohon: andalalin.provinsi_pemohon,
      kabupaten_pemohon: andalalin.kabupaten_pemohon,
      kecamatan_pemohon: andalalin.kecamatan_pemohon,
      kelurahan_pemohon: andalalin.kelurahan_pemohon,
      alamat_pemohon: andalalin.alamat_pemohon,
      jenis_kelamin_pemohon: andalalin.jenis_kelamin_pemohon,
      nomer_pemohon: andalalin.nomer_pemohon,
      jabatan_pemohon: andalalin.jabatan_pemohon,

      //Data Perusahaan
      nama_perusahaan: andalalin.nama_perusahaan,
      provinsi_perusahaan: andalalin.provinsi_perusahaan,
      kabupaten_perusahaan: andalalin.kabupaten_perusahaan,
      kecamatan_perusahaan: andalalin.kecamatan_perusahaan,
      kelurahan_perusahaan: andalalin.kelurahan_perusahaan,
      alamat_perusahaan: andalalin.alamat_perusahaan,
      nomer_perusahaan: andalalin.nomer_perusahaan,
      email_perusahaan: andalalin.email_perusahaan,
      nama_pimpinan: andalalin.nama_pimpinan,
      jabatan_pimpinan: andalalin.jabatan_pimpinan,
      jenis_kelamin_pimpinan: andalalin.jenis_kelamin_pimpinan,
      provinsi_pimpinan_perusahaan: andalalin.provinsi_pimpinan_perusahaan,
      kabupaten_pimpinan_perusahaan: andalalin.kabupaten_pimpinan_perusahaan,
      kecamatan_pimpinan_perusahaan: andalalin.kecamatan_pimpinan_perusahaan,
      kelurahan_pimpinan_perusahaan: andalalin.kelurahan_pimpinan_perusahaan,
      alamat_pimpinan_perusahaan: andalalin.alamat_pimpinan,

      //Data Konsultan
      nama_konsultan: andalalin.nama_konsultan,
      provinsi_konsultan: andalalin.provinsi_konsultan,
      kabupaten_konsultan: andalalin.kabupaten_konsultan,
      kecamatan_konsultan: andalalin.kecamatan_konsultan,
      kelurahan_konsultan: andalalin.kelurahan_konsultan,
      alamat_konsultan: andalalin.alamat_konsultan,
      nomer_konsultan: andalalin.nomer_konsultan,
      email_konsultan: andalalin.email_konsultan,
      nama_penyusun_dokumen: andalalin.nama_penyusun,
      jenis_kelamin_penyusun_dokumen: andalalin.jenis_kelamin_penyusun,
      provinsi_penyusun_dokumen: andalalin.provinsi_penyusun,
      kabupaten_penyusun_dokumen: andalalin.kabupaten_penyusun,
      kecamatan_penyusun_dokumen: andalalin.kecamatan_penyusun,
      kelurahan_penyusun_dokumen: andalalin.kelurahan_penyusun,
      alamat_penyusun_dokumen: andalalin.alamat_penyusun,
      nomer_sertifikat_penyusun_dokumen: andalalin.nomer_serifikat_penyusun,
      klasifikasi_penyusun_dokumen: andalalin.klasifikasi_penyusun,

      //Data Lain nya
      aktivitas: andalalin.aktivitas,
      peruntukan: andalalin.peruntukan,
      total_luas: andalalin.total_luas_lahan,
      kriteria_khusus: andalalin.kriteria_khusus,
      nilai_kriteria:
        andalalin.nilai_kriteria + " " + data.Satuan.toLowerCase(),
      terbilang: data.Terbilang.toLowerCase(),
      latitude: andalalin.lat_bangunan,
      longtitude: andalalin.long_bangunan,
      lokasi_bangunan: andalalin.lokasi_bangunan,
      nomer_skrk: andalalin.nomer_skrk,
      tanggal_skrk: andalalin.tanggal_skrk,
      catatan: andalalin.catatan,
    };

    andalalinPengajuan(
      user.access_token,
      pengajuan,
      andalalin.persyaratan,
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
                kirimPerlalin();
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
        {"\n"}Anda dapat kembali untuk memeriksa data yang telah dimasukkan
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
