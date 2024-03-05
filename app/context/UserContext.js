import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useRef,
} from "react";

import * as Notifications from "expo-notifications";
import * as FileSystem from "expo-file-system";
import { get, store } from "../utils/local-storage";

export const UserContext = createContext();

function reducer(state, action) {
  return { ...state, ...action };
}

const andalalinInit = {
  //Proyek
  nama_proyek: "",
  jenis_proyek: "",
  wilayah_administratif_proyek: "",
  provinsi_proyek: "",
  kabupaten_proyek: "",
  kecamatan_proyek: "",
  kelurahan_proyek: "",
  nama_jalan: "",
  kode: "",
  alamat_proyek: "",

  //Pemohon
  bangkitan: "",
  pemohon: "",
  jenis: "",
  rencana_pembangunan: "",
  lokasi_pengambilan: "",
  nik_pemohon: "",
  tempat_lahir_pemohon: "",
  tanggal_lahir_pemohon: "",
  wilayah_administratif_pemohon: "",
  provinsi_pemohon: "",
  kabupaten_pemohon: "",
  kecamatan_pemohon: "",
  kelurahan_pemohon: "",
  alamat_pemohon: "",
  jenis_kelamin_pemohon: "",
  nomer_pemohon: "",
  jabatan_pemohon: "",

  //Konsultan
  nama_konsultan: "",
  wilayah_administratif_konsultan: "",
  provinsi_konsultan: "",
  kabupaten_konsultan: "",
  kecamatan_konsultan: "",
  kelurahan_konsultan: "",
  alamat_konsultan: "",
  nomer_konsultan: "",
  email_konsultan: "",
  nama_penyusun: "",
  jenis_kelamin_penyusun: "",
  wilayah_administratif_penyusun: "",
  provinsi_penyusun: "",
  kabupaten_penyusun: "",
  kecamatan_penyusun: "",
  kelurahan_penyusun: "",
  alamat_penyusun: "",
  nomer_serifikat_penyusun: "",
  klasifikasi_penyusun: "",

  //Pengembang
  nama_pengembang: "",
  wilayah_administratif_pengembang: "",
  provinsi_pengembang: "",
  kabupaten_pengembang: "",
  kecamatan_pengembang: "",
  kelurahan_pengembang: "",
  alamat_pengembang: "",
  nomer_pengembang: "",
  email_pengembang: "",
  nama_pimpinan_pengembang: "",
  wilayah_administratif_pimpinan_pengembang: "",
  provinsi_pimpinan_pengembang: "",
  kabupaten_pimpinan_pengembang: "",
  kecamatan_pimpinan_pengembang: "",
  kelurahan_pimpinan_pengembang: "",
  alamat_pimpinan_pengembang: "",
  jabatan_pimpinan_pengembang: "",
  jenis_kelamin_pimpinan_pengembang: "",

  //perusahaan
  nama_perusahaan: "",
  alamat_perusahaan: "",
  wilayah_administratif_perusahaan: "",
  provinsi_perusahaan: "",
  kabupaten_perusahaan: "",
  kecamatan_perusahaan: "",
  kelurahan_perusahaan: "",
  nomer_perusahaan: "",
  email_perusahaan: "",
  nama_pimpinan: "",
  wilayah_administratif_pimpinan: "",
  provinsi_pimpinan_perusahaan: "",
  kabupaten_pimpinan_perusahaan: "",
  kecamatan_pimpinan_perusahaan: "",
  kelurahan_pimpinan_perusahaan: "",
  alamat_pimpinan: "",
  jabatan_pimpinan: "",
  jenis_kelamin_pimpinan: "",
  aktivitas: "",
  peruntukan: "",
  total_luas_lahan: "",
  kriteria_khusus: "",
  nilai_kriteria: "",
  lokasi_bangunan: "",
  lat_bangunan: "",
  long_bangunan: "",
  nomer_skrk: "",
  tanggal_skrk: "",
  catatan: "",
  persyaratan: [],
};

const perlalinInit = {
  perlengkapan: null,
  nik_pemohon: "",
  tempat_lahir_pemohon: "",
  tanggal_lahir_pemohon: "",
  wilayah_administratif_pemohon: "",
  provinsi_pemohon: "",
  kabupaten_pemohon: "",
  kecamatan_pemohon: "",
  kelurahan_pemohon: "",
  alamat_pemohon: "",
  jenis_kelamin_pemohon: "",
  nomer_pemohon: "",
  catatan: "",
  persyaratan: [],
};

const surveiInit = {
  id_perlengkapan: "",
  foto: [],
  lat: "",
  long: "",
  lokasi: "",
  keterangan: "",
};

const surveiMandiriInit = {
  foto: [],
  lat: "",
  long: "",
  lokasi: "",
  keterangan: "",
};

const kepuasanInit = [
  { Jenis: "Persyaratan pelayanan", Nilai: "" },
  { Jenis: "Prosedur pelayanan", Nilai: "" },
  { Jenis: "Waktu pelayanan", Nilai: "" },
  { Jenis: "Biaya / tarif pelayanan", Nilai: "" },
  { Jenis: "Produk pelayanan", Nilai: "" },
  { Jenis: "Kompetensi pelaksana", Nilai: "" },
  { Jenis: "Perilaku / sikap petugas", Nilai: "" },
  { Jenis: "Maklumat pelayanan", Nilai: "" },
  { Jenis: "Ketersediaan sarana pengaduan", Nilai: "" },
];

const saran = {
  kritik: "",
};

const administrasiInit = {
  nomor_surat: "",
  tanggal_surat: "",
  administrasi: [],
};

const kelengkapanInit = {
  dokumen: [],
};

const penyusunInit = {
  penyusun: [],
};

const pemeriksaanInit = {
  status: "",
  pemeriksaan: [],
};

const pemeriksaanPerlengkapanInit = {
  pemeriksaan: [],
};

export function UserProvider({ children }) {
  const [loading, toggleLoading] = useState(false);

  const [user, setUser] = useState("user");
  const [session, setSession] = useState(false);
  const [detailPermohonan, setDetailPermohonan] = useState("permohonan");

  const [index, setIndex] = useState(1);
  const [permohonan, dispatch] = useReducer(reducer, andalalinInit);
  const [perlalin, setPerlalin] = useReducer(reducer, perlalinInit);

  const [indexSurvei, setIndexSurvei] = useState(1);
  const [survei, setSurvei] = useReducer(reducer, surveiInit);
  const [kepuasan, setKepuasan] = useState(kepuasanInit);
  const [kritik, setKritik] = useReducer(reducer, saran);

  const [surveiMandiri, setSurveiMandiri] = useReducer(
    reducer,
    surveiMandiriInit
  );
  const [surveiMandiriIndex, setSurveiMandiriIndex] = useState(1);

  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse =
    Notifications.getLastNotificationResponseAsync();
  const [notification, setNotification] = useState();

  const [dataMaster, setDataMaster] = useState("master");

  const [uri, setUri] = useState();

  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState();

  const [indexAdministrasi, setIndexAdministrasi] = useState(1);
  const [administrasi, setAdministrasi] = useReducer(reducer, administrasiInit);

  const [indexKelengkapan, setIndexKelengkapan] = useState(1);
  const [kelengkapan, setKelengkapan] = useReducer(reducer, kelengkapanInit);

  const [indexPenyusun, setIndexPenyusun] = useState(1);
  const [penyusun, setPenyusun] = useReducer(reducer, penyusunInit);

  const [indexPemeriksaan, setIndexPemeriksaan] = useState(1);
  const [pemeriksaan, setPemeriksaan] = useReducer(reducer, pemeriksaanInit);

  const [dataDokumen, setDataDokumen] = useState();
  const [uraian, setUraian] = useState("");
  const [pilihModal, togglePilihModal] = useState(false);

  const [lokasi, setLokasi] = useState();
  const [foto, setFoto] = useState([]);

  const [indexPemeriksaanPerlengkapan, setIndexPemeriksaanPerlengkapan] =
    useState(1);
  const [pemeriksaanPerlengkapan, setPemeriksaanPerlengkapan] = useReducer(
    reducer,
    pemeriksaanPerlengkapanInit
  );

  const checkUser = async () => {
    const value = await get("authState");
    if (value) {
      setUser(value);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener(() => {
        (async () => {
          const value = await get("authState");

          store(value.id, "New Notification");
        })();
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {
        (async () => {
          const value = await get("authState");

          store(value.id, "New Notification");
        })();
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [lastNotificationResponse]);

  const clear = () => {
    setIndex(1);
    dispatch(andalalinInit);
    setPerlalin(perlalinInit);
  };

  const clearSurvei = () => {
    setIndexSurvei(1);
    setSurvei(surveiInit);
  };

  const clearSurveiMandiri = () => {
    setSurveiMandiriIndex(1);
    setSurveiMandiri(surveiMandiriInit);
  };

  const clearSurveiKepuasan = () => {
    setIndexSurvei(1);
    setKepuasan(kepuasanInit);
    setKritik(saran);
  };

  const clearAdministrasi = () => {
    setIndexAdministrasi(1);
    setAdministrasi(administrasiInit);
  };

  const clearKelengkapan = () => {
    setIndexKelengkapan(1);
    setKelengkapan(kelengkapanInit);
  };

  const clearPenyusun = () => {
    setIndexPenyusun(1);
    setPenyusun(penyusunInit);
  };

  const clearPemeriksaan = () => {
    setIndexPemeriksaan(1);
    setPemeriksaan(pemeriksaanInit);
  };

  const clearPemeriksaanPerlengkapan = () => {
    setIndexPemeriksaanPerlengkapan(1);
    setPemeriksaanPerlengkapan(pemeriksaanPerlengkapanInit);
  };

  const getUser = () => {
    return user;
  };

  const getSession = () => {
    return session;
  };

  const getLoading = () => {
    return loading;
  };

  const getDataMaster = async () => {
    const filePath = `${FileSystem.documentDirectory}data.json`;

    const fileContents = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const loadedData = await JSON.parse(fileContents);
    store("updated", loadedData.update);
    setDataMaster(loadedData);
    return dataMaster;
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        toggleLoading,
        getLoading,
        user,
        setUser,
        getUser,
        session,
        setSession,
        getSession,
        index,
        setIndex,
        permohonan,
        dispatch,
        perlalin,
        setPerlalin,
        clear,
        notification,
        setNotification,
        dataMaster,
        setDataMaster,
        getDataMaster,
        indexSurvei,
        setIndexSurvei,
        survei,
        setSurvei,
        clearSurvei,
        kepuasan,
        setKepuasan,
        clearSurveiKepuasan,
        kritik,
        setKritik,
        uri,
        setUri,
        isSnackbarVisible,
        setSnackbarVisible,
        message,
        setMessage,
        indexAdministrasi,
        setIndexAdministrasi,
        clearAdministrasi,
        administrasi,
        setAdministrasi,
        detailPermohonan,
        setDetailPermohonan,
        indexKelengkapan,
        setIndexKelengkapan,
        kelengkapan,
        setKelengkapan,
        clearKelengkapan,
        dataDokumen,
        setDataDokumen,
        uraian,
        setUraian,
        pilihModal,
        togglePilihModal,
        indexPenyusun,
        setIndexPenyusun,
        penyusun,
        setPenyusun,
        clearPenyusun,
        indexPemeriksaan,
        setIndexPemeriksaan,
        pemeriksaan,
        setPemeriksaan,
        clearPemeriksaan,
        lokasi,
        setLokasi,
        foto,
        setFoto,
        surveiMandiri,
        setSurveiMandiri,
        surveiMandiriIndex,
        setSurveiMandiriIndex,
        clearSurveiMandiri,
        indexPemeriksaanPerlengkapan,
        setIndexPemeriksaanPerlengkapan,
        pemeriksaanPerlengkapan,
        setPemeriksaanPerlengkapan,
        clearPemeriksaanPerlengkapan,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
