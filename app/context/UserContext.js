import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { get } from "../utils/local-storage";

import * as Notifications from "expo-notifications";

export const UserContext = createContext();

function reducer(state, action) {
  return { ...state, ...action };
}

const initialState = {
  jenis: "",
  lokasi_pengambilan: "",
  nik_pemohon: "",
  nama_pemohon: "",
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
};

export function UserProvider({ children }) {
  const [user, setUser] = useState("user");
  const [session, setSession] = useState(false);

  const [index, setIndex] = useState(1);
  const [permohonan, dispatch] = useReducer(reducer, initialState);

  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const [notification, setNotification] = useState(false);

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
        setNotification(true)
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotification(true)
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [lastNotificationResponse]);

  const clear = () => {
    dispatch(initialState);
  };

  const getUser = () => {
    return user;
  };

  const loadUser = async () => {
    try {
      const user = await get("authState");
      if (user !== null) {
        setUser(user);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadUser();
  }, []);

  const getSession = () => {
    return session;
  };

  return (
    <UserContext.Provider
      value={{
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
        clear,
        notification,
        setNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
