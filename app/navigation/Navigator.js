import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  ResetPasswordScreen,
  SettingScreen,
  LoginScreen,
  RegisterScreen,
  OnBoardingScreen,
  VerifikasiScreen,
  ForgotPasswordScreen,
  TentangScreen,
  NotifikasiScreen,
  PdfViewSreen,
  LanjutanScreen,
  UpdatePersyaratanScreen,
  PilihPetugasScreen,
  SurveiScreen,
  FotoViewScreen,
  TambahUserScreen,
  DaftarScreen,
  DetailScreen,
  PengajuanScreen,
  KetentuanScreen,
  DaftarPenggunaScreen,
  DetailSurveiScreen,
  LaporanBAPScreen,
  UsulanPengelolaanScreen,
  DetailUsulanScreen,
  PengelolaanProdukScreen,
  DaftarProdukScreen,
  MapScreen,
  SurveiKepuasanScreen,
  KameraScreen,
  SurveiKepuasanUserScreen,
  KomentarScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const Navigator = ({
  email,
  isLogged,
  id,
  title,
  pdf,
  permohonan,
  kondisi,
  foto,
  koordinat,
  jenis,
  uri,
  komentar,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={isLogged ? "Home" : "Onboarding"}
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Back Home"
        component={HomeScreen}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen name="Setting" component={SettingScreen} />

      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Back Login"
        component={LoginScreen}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Verifikasi"
        component={VerifikasiScreen}
        initialParams={{ email }}
      />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="Reset"
        component={ResetPasswordScreen}
        initialParams={{ email }}
      />
      <Stack.Screen name="Tentang" component={TentangScreen} />
      <Stack.Screen
        name="Andalalin"
        component={PengajuanScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen
        name="Back Andalalin"
        component={PengajuanScreen}
        options={{ animation: "slide_from_left" }}
        initialParams={{ kondisi }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        initialParams={{ id }}
      />
      <Stack.Screen
        name="Back Detail"
        component={DetailScreen}
        options={{ animation: "slide_from_left" }}
        initialParams={{ id }}
      />
      <Stack.Screen
        name="Reload Detail"
        component={DetailScreen}
        options={{ animation: "none" }}
        initialParams={{ id }}
      />
      <Stack.Screen
        name="Detail Survei"
        component={DetailSurveiScreen}
        initialParams={{ id, kondisi, jenis }}
      />
      <Stack.Screen
        name="Reload Survei"
        component={DetailSurveiScreen}
        options={{ animation: "none" }}
        initialParams={{ id, kondisi, jenis }}
      />
      <Stack.Screen
        name="Daftar"
        component={DaftarScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen
        name="Back Daftar"
        component={DaftarScreen}
        options={{ animation: "slide_from_left" }}
        initialParams={{
          kondisi,
        }}
      />
      <Stack.Screen name="Notifikasi" component={NotifikasiScreen} />
      <Stack.Screen
        name="PDF"
        component={PdfViewSreen}
        initialParams={{ title, pdf }}
      />
      <Stack.Screen
        name="Foto"
        component={FotoViewScreen}
        initialParams={{ foto }}
      />
      <Stack.Screen
        name="Lanjutan"
        component={LanjutanScreen}
        initialParams={{ permohonan }}
      />
      <Stack.Screen
        name="Update"
        component={UpdatePersyaratanScreen}
        initialParams={{ permohonan }}
      />
      <Stack.Screen
        name="Pilih Petugas"
        component={PilihPetugasScreen}
        initialParams={{ kondisi, permohonan }}
      />
      <Stack.Screen
        name="Survei"
        component={SurveiScreen}
        initialParams={{ id, kondisi }}
      />
      <Stack.Screen
        name="Back Survei"
        component={SurveiScreen}
        options={{ animation: "slide_from_left" }}
        initialParams={{ id, kondisi }}
      />
      <Stack.Screen
        name="Ketentuan"
        component={KetentuanScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen name="Tambah User" component={TambahUserScreen} />
      <Stack.Screen name="Daftar User" component={DaftarPenggunaScreen} />
      <Stack.Screen
        name="Berita acara pemeriksaan"
        component={LaporanBAPScreen}
        initialParams={{ id, kondisi }}
      />
      <Stack.Screen
        name="Usulan"
        component={UsulanPengelolaanScreen}
        initialParams={{ id }}
      />
      <Stack.Screen
        name="Detail Usulan"
        component={DetailUsulanScreen}
        initialParams={{ id }}
      />
      <Stack.Screen name="Pengelolaan" component={PengelolaanProdukScreen} />
      <Stack.Screen
        name="Produk"
        component={DaftarProdukScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        initialParams={{ koordinat }}
      />
      <Stack.Screen name="Kepuasan" component={SurveiKepuasanScreen} />
      <Stack.Screen
        name="Kamera"
        component={KameraScreen}
        initialParams={{ kondisi, jenis, id }}
      />
      <Stack.Screen
        name="Survei Kepuasan"
        component={SurveiKepuasanUserScreen}
        initialParams={{ id, uri }}
      />
      <Stack.Screen
        name="Komentar"
        component={KomentarScreen}
        initialParams={{ komentar }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
