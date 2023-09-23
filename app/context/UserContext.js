import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";

import * as Notifications from "expo-notifications";
import { masterAndalalin } from "../api/master";

export const UserContext = createContext();

function reducer(state, action) {
  return { ...state, ...action };
}

const initialState = {
  jenis: "",
  rencana_pembangunan: "",
  lokasi_pengambilan: "",
  nik_pemohon: "",
  tempat_lahir_pemohon: "",
  tanggal_lahir_pemohon: "",
  alamat_pemohon: "",
  jenis_kelamin_pemohon: "",
  nomer_pemohon: "",
  nomer_seluler_pemohon: "",
  jabatan_pemohon: "",
  nama_perusahaan: "",
  alamat_perusahaan: "",
  nomer_perusahaan: "",
  email_perusahaan: "",
  provinsi_perusahaan: "",
  kabupaten_perusahaan: "",
  kecamatan_perusahaan: "",
  kelurahan_perusahaan: "",
  nama_pimpinan: "",
  jabatan_pimpinan: "",
  jenis_kelamin_pimpinan: "",
  jenis_kegiatan: "",
  peruntukan: "",
  luas_lahan: "",
  alamat_persil: "",
  kelurahan_persil: "",
  nomer_skrk: "",
  tanggal_skrk: "",
  berkas_ktp: "",
  nama_ktp: "",
  berkas_akta: "",
  nama_akta: "",
  berkas_surat: "",
  nama_surat: "",
  persyaratan_tambahan: [],
};

const perlalinInit = {
  kategori: "",
  perlengkapan: "",
  rambu: "",
  lokasi_pengambilan: "",
  nik_pemohon: "",
  tempat_lahir_pemohon: "",
  tanggal_lahir_pemohon: "",
  alamat_pemohon: "",
  jenis_kelamin_pemohon: "",
  nomer_pemohon: "",
  nomer_seluler_pemohon: "",
  jenis_kegiatan: "",
  peruntukan: "",
  luas_lahan: "",
  alamat_persil: "",
  kelurahan_persil: "",
  berkas_ktp: "",
  nama_ktp: "",
  berkas_surat: "",
  nama_surat: "",
  persyaratan_tambahan: [],
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

export function UserProvider({ children }) {
  const [loading, toggleLoading] = useState(true);

  const [user, setUser] = useState("user");
  const [session, setSession] = useState(false);

  const [index, setIndex] = useState(1);
  const [permohonan, dispatch] = useReducer(reducer, initialState);
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
    dispatch(initialState);
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

  const getUser = () => {
    return user;
  };

  const getSession = () => {
    return session;
  };

  const getLoading = () => {
    return loading;
  };

  const masterData = () => {
    masterAndalalin((response) => {
      if (response.status === 200) {
        (async () => {
          const result = await response.json();
          setDataMaster(result.data);
        })();
      }
    });
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
        masterData,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useMyContext() {
  return useContext(UserContext);
}
