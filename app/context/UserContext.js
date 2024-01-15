import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";

import * as Notifications from "expo-notifications";
import * as FileSystem from "expo-file-system";

export const UserContext = createContext();

function reducer(state, action) {
  return { ...state, ...action };
}

const andalalinInit = {
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
  nomer_serifikat: "",
  klasifikasi_pemohon: "",
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
  kategori_utama: "",
  kategori: "",
  perlengkapan: "",
  rambu: "",
  lokasi_pengambilan: "",
  wilayah_administratif_pemasangan: "",
  provinsi_pemasangan: "",
  kabupaten_pemasangan: "",
  kecamatan_ppemasangan: "",
  kelurahan_pemasangan: "",
  nama_jalan: "",
  kode: "",
  alamat_pemasangan: "",
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
  alasan: "",
  peruntukan: "",
  titik_pemasangan: "",
  lat_pemasangan: "",
  long_pemasangan: "",
  catatan: "",
  persyaratan: [],
};

const surveiInit = {
  foto1: "Kosong",
  namaFoto1: "",
  foto2: "Kosong",
  namaFoto2: "",
  foto3: "Kosong",
  namaFoto3: "",
  lat: "",
  long: "",
  lokasi: "",
  jalan: "",
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

export function UserProvider({ children }) {
  const [loading, toggleLoading] = useState(true);

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

  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const [notification, setNotification] = useState(false);

  const [dataMaster, setDataMaster] = useState("master");

  const [check, setCheck] = useState();

  const [uri, setUri] = useState();

  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [message, setMessage] = useState();

  const [server, setServer] = useState(false);

  const [indexAdministrasi, setIndexAdministrasi] = useState(1);
  const [administrasi, setAdministrasi] = useReducer(reducer, administrasiInit);

  const [indexKelengkapan, setIndexKelengkapan] = useState(1);
  const [kelengkapan, setKelengkapan] = useReducer(reducer, kelengkapanInit);

  const [indexPenyusun, setIndexPenyusun] = useState(1);
  const [penyusun, setPenyusun] = useReducer(reducer, penyusunInit);

  const [dataDokumen, setDataDokumen] = useState();
  const [uraian, setUraian] = useState("");
  const [pilihModal, togglePilihModal] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(true);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotification(true);
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

  const getUser = () => {
    return user;
  };

  const getServer = () => {
    return server;
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
    setDataMaster(loadedData);
    return dataMaster;
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        toggleLoading,
        getLoading,
        check,
        setCheck,
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
        server,
        setServer,
        getServer,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useMyContext() {
  return useContext(UserContext);
}
