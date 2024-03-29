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

const keputusanInit = {
  nomor_keputusan: "",
  nomor_lampiran: "",
  nomor_kesanggupan: "",
  tanggal_kesanggupan: "",
  nama_kadis: "",
  nip_kadis: "",
  keputusan: [],
};

const substansiInit = {
  administrasi: [],
  substansi: [],
};

const pembahasanInit = {
  nomor_berita_acara: "",
  nama_perwakilan: "",
  jenis_perwakilan: "",
  jabatan_perwakilan: "",
  nomor_surat_kuasa: "",
  nama_ketua: "",
  nip_ketua: "",
  nama_sekertaris: "",
  nip_sekertaris: "",
  nama_anggota: "",
  nip_anggota: "",
  instansi: [],
  foto: [],
  stackholder: [],
  pembahasan: [],
};

export function UserProvider({ children }) {
  const [loading, toggleLoading] = useState(false);

  const [user, setUser] = useState("user");
  const [session, setSession] = useState(false);
  const [detailPermohonan, setDetailPermohonan] = useState("permohonan");

  const [dataKriteria, setDataKriteria] = useState("");

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

  const [indexSubstansi, setIndexSubstansi] = useState(1);
  const [substansi, setSubstansi] = useReducer(reducer, substansiInit);

  const [indexKeputusan, setIndexKeputusan] = useState(1);
  const [keputusan, setKeputusan] = useReducer(reducer, keputusanInit);

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

  const [indexPembahasan, setIndexPembahasan] = useState(1);
  const [pembahasan, setPembahasan] = useReducer(reducer, pembahasanInit);

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

  const clearSubstansi = () => {
    setIndexSubstansi(1);
    setSubstansi(substansiInit);
  };

  const clearPemeriksaanPerlengkapan = () => {
    setIndexPemeriksaanPerlengkapan(1);
    setPemeriksaanPerlengkapan(pemeriksaanPerlengkapanInit);
  };

  const clearKeputusan = () => {
    setIndexKeputusan(1);
    setKepuasan(keputusanInit);
  };

  const clearPembahasan = () => {
    setIndexPembahasan(1);
    setPembahasan(pembahasanInit);
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
        keputusan,
        setKeputusan,
        indexKeputusan,
        setIndexKeputusan,
        clearKeputusan,
        substansi,
        setSubstansi,
        indexSubstansi,
        setIndexSubstansi,
        clearSubstansi,
        indexPembahasan,
        setIndexPembahasan,
        pembahasan,
        setPembahasan,
        clearPembahasan,
        dataKriteria,
        setDataKriteria,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
