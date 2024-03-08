import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import { useStateToggler } from "../../hooks/useUtility";
import { MaterialIcons } from "@expo/vector-icons";
import ADialogInputText from "../utility/ADialogInputText";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";

export default function PenyusunItem({ navigation, route }) {
  const { keputusan, setKeputusan } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [item, setItem] = useState(0);

  const [tambah, setTambah] = useState("");
  const [tanggal, setTanggal] = useState("");

  const [dateModal, toggleDateModal] = useStateToggler();

  const alphabetArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );

  const lampiran_keputusan = [
    {
      kewajiban:
        context.detailPermohonan.nama_perusahaan +
        " selaku Pembangun wajib melaksanakan penganganan dampak lalu lintas, yaitu:",
      data_kewajiban: [
        {
          poin: "Tahap Konstruksi",
          data_poin: [
            {
              subpoin: "Melakukan manajemen dan rekayasa lalu lintas meliputi:",
              data_subpoin: [
                "Menyediakan akses masuk dan keluar untuk angkutan barang, dengan memberikan ruang manuver yang cukup dan tidak menimbulkan tundaan perjalanan di jalan umum (memperhatikan lebar dan sudut putar kendaraan/radius tikung) serta mempertimbangkan aspek keselamatan.",
                "Penempatan petugas pengatur lalu lintas dan dilengkapi peralatan keselamatan, untuk mengatur lalu lintas kendaraan proyek pada pintu keluar-masuk dan pada persimpangan dengan jalan utama.",
              ],
            },
            {
              subpoin:
                "Melakukan manajemen kebutuhan lalu lintas pada area pembangunan, meliputi:",
              data_subpoin: [
                "Meningkatkan struktur jalan masuk kawasan pembangunan untuk mendukung mobilitas kendaraan material dan peralatan.",
                "Pengangkutan material bangunan menghindari jam-jam sibuk dan pengangkutan dengan dimensi besar atau volume besar di lakukan di malam hari, agar tidak mengganggu arus lalu lintas pada rute yang dilalui.",
                "Menyiram roda kendaraan proyek pada saat keluar lokasi proyek dengan sistem <i>water trap.</i>",
                "Membersihkan jalan di sekitar lokasi proyek jika terdapat ceceran tanah/material.",
                "Proses pengangkutan diharuskan tidak mengganggu lingkungan, kendaraan wajib dengan penutup yang memadai.",
                "Menggunakan kendaraan angkutan barang (pengangkut material dan peralatan konstruksi) sesuai dengan daya dukung jalan terendah pada jalur pengangkutan.",
                "Memberikan penyuluhan SOP pengangkutan sesuai Peraturan Menteri Perhubungan Nomor PM. 60 Tahun 2019 tentang Penyelenggaraan Angkutan Barang dengan Kendaraan Bermotor di Jalan.",
              ],
            },
            {
              subpoin:
                "Menyediakan fasilitas bongkar/muat barang di dalam lokasi pembangunan, tidak menggunakan badan jalan serta menempatkan/menyimpan material bangunan di dalam lokasi pembangunan.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Menyediakan ruang parkir di dalam lokasi pembangunan yang cukup mengakomodir parkir truk (dan angkutan barang lainnya) dan kendaraan pekerja. Dilarang parkir di badan jalan, agar tidak mengurasi kapasitas jalan yang ada dan tidak mengganggu arus lalu lintas.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Menyediakan/memasangkan fasilitas perlengkapan jalan pada area pembangunan, meliputi:",
              data_subpoin: [
                "Lampi peringatan (<i>warning light</i>) untuk memberi peringatan kepada pengguna jalan adanya kegiatan konstruksi.",
                "Rambu lalu lintas sementara, meliputi: rambu peringatan hati-hati dengan papan tambahan &quot;ada pekerjaan konstruksi&quot; dan &quot;keluar masuk kendaraan material&quot; serta peringatan pekerjaan di jalan.",
                "Lampu penerangan jalan, khusus nya pada waktu melakukan aktivitas pada malam hari.",
                "Informasi layanan pengaduan yang di pasang di depan kawasan pembangunan, untuk segara ditindaklanjuti oleh Pembangun/Kontraktor.",
              ],
            },
            {
              subpoin:
                "Memastikan bahwa kendaraan barang yang digunakan pada masa konstruksi harus sesuai dengan ketentuan yang berlaku (baik jalan, dimensi kendaraan, dan tata cara pemuatan) denga berpedoman pada PM 60 Tanun 2019 tentang Penyelenggaraan Angkutan Barang dengan Kendaraan Bermotor di Jalan.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Memastikan bahwa kendaraan barang pengangkut bahan material tidak <i>Over Dimension Over Load</i> (ODOL)",
              data_subpoin: [],
            },
            {
              subpoin:
                "Melakukan perbaikan apabila terdapat kerusakan fasilitas umum dalam proses pembangunan.",
              data_subpoin: [],
            },
            {
              subpoin:
                "Dalam pelaksanaan pembangunan/konstruksi berkoordinasi dengan instansi terkait.",
              data_subpoin: [],
            },
          ],
        },
        {
          poin: "Tahap Operasional",
          data_poin: [
            "Poin-poin kewajiban pengembang tahap operasional sesuai dengan ketentuan jenis rencana pembangunan dapat dilihat pada <b>Lampiran</b> dibawah ini.",
          ],
        },
      ],
    },
    {
      kewajiban:
        "Memastikan tidak ada kegiatan perdagangan kaki lima (PKL) dan parkir kendaraan pada badan jalan dengan pemasangan rambu larangan parkir dan menugaskan petugas keamanan.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Sosialisasi kepada masyarakat yang terkena dampak pembangunan, sehingga tidak terdapat komplain dari masyarakat yang terdampak pada gangguan lalu lintas di jalan.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Memenuhi peraturan perundang-undangan yang berlaku dalam melaksanakan rekomendasi penanganan dampak.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Membantu dalam koordinasi pelaksanaan, pemantauan dan evaluasi Pembangunan/Pengembangan.",
      data_kewajiban: [],
    },
    {
      kewajiban:
        "Bersedia melakukan Analisis Dampak Lalu Lintas kembali, pada saat akan melakukan pengembangan.",
      data_kewajiban: [],
    },
  ];

  useEffect(() => {
    setItem(lampiran_keputusan.length + 1);
  }, []);

  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < item; i++) {
      if (i == 0) {
        const keputusanRef = React.createRef();
        const lampiranRef = React.createRef();
        const kesanggupanRef = React.createRef();
        const namaRef = React.createRef();
        const nipRef = React.createRef();

        elements.push(
          <ScrollView
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
            style={{
              flex: 1,
              backgroundColor: color.primary.primary25,
            }}
          >
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan nomor"}
              title={"Nomor keputusan pemberi persetujuan"}
              rtype={"next"}
              multi={false}
              blur={false}
              value={keputusan.nomor_keputusan}
              ref={keputusanRef}
              onChangeText={(value) => {
                setKeputusan({
                  nomor_keputusan: value,
                });
              }}
              submit={() => {
                keputusan.nomor_keputusan != ""
                  ? lampiranRef.current.focus()
                  : "";
              }}
            />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan nomor"}
              title={"Nomor lampiran keputusan pemberi persetujuan"}
              rtype={"next"}
              multi={false}
              padding={20}
              blur={false}
              value={keputusan.nomor_lampiran}
              ref={lampiranRef}
              onChangeText={(value) => {
                setKeputusan({
                  nomor_lampiran: value,
                });
              }}
              submit={() => {
                keputusan.nomor_lampiran != ""
                  ? kesanggupanRef.current.focus()
                  : "";
              }}
            />

            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={"Masukkan nomor"}
              title={"Nomor surat pernyataan kesanggupan"}
              rtype={"done"}
              multi={false}
              padding={20}
              blur={true}
              value={keputusan.nomor_kesanggupan}
              ref={kesanggupanRef}
              onChangeText={(value) => {
                setKeputusan({
                  nomor_kesanggupan: value,
                });
              }}
            />

            <ATextInputIcon
              bdColor={color.neutral.neutral300}
              hint={"Masukkan tanggal"}
              title={"Tanggal surat pernyataan kesanggupan"}
              padding={20}
              icon={"calendar"}
              value={keputusan.tanggal_kesanggupan}
              onPress={() => {
                toggleDateModal();
              }}
            />

            <ATextInput
              bdColor={
                namaError ? color.error.error500 : color.neutral.neutral300
              }
              ktype={"default"}
              hint={"Masukkan nama"}
              title={"Nama kepala dinas perhubungan"}
              rtype={"next"}
              multi={false}
              padding={20}
              blur={false}
              value={keputusan.nama_kadis}
              ref={namaRef}
              onChangeText={(value) => {
                setKeputusan({
                  nama_kadis: value,
                });
              }}
              submit={() => {
                keputusan.nama_kadis != "" ? nipRef.current.focus() : "";
              }}
            />

            <ATextInput
              bdColor={
                nipError ? color.error.error500 : color.neutral.neutral300
              }
              ktype={"number-pad"}
              hint={"Masukkan nip"}
              title={"NIP kepala dinas perhubungan"}
              rtype={"done"}
              multi={false}
              padding={20}
              blur={true}
              value={keputusan.nip_kadis}
              ref={nipRef}
              onChangeText={(value) => {
                setKeputusan({
                  nip_kadis: value,
                });
              }}
            />

            <View style={{ paddingBottom: 32 }} />
          </ScrollView>
        );
      } else {
        elements.push(
          <ScrollView
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
            style={{
              flex: 1,
              backgroundColor: color.primary.primary25,
            }}
          ></ScrollView>
        );
      }
    }
    return elements;
  };

  return (
    <View style={styles.container}>
      {generateElements()[index - 1]}
      <ADatePicker
        visibleModal={dateModal}
        onPressOKButton={() => {
          toggleDateModal();
          setKeputusan({
            nomor_lampiran: tanggal,
          });
        }}
        onPressBATALButton={() => {
          toggleDateModal();
        }}
        pilih={setTanggal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
