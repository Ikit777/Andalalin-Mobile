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
}) => {
  return (
    <Stack.Navigator
      initialRouteName={isLogged ? "Home" : "Onboarding"}
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />

      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
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
      <Stack.Screen name="Andalalin" component={PengajuanScreen} />
      <Stack.Screen
        name="Back Andalalin"
        component={PengajuanScreen}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        initialParams={{ id }}
      />
      <Stack.Screen
        name="Detail Survei"
        component={DetailSurveiScreen}
        initialParams={{ id, kondisi }}
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
        initialParams={{ id }}
      />
      <Stack.Screen name="Ketentuan" component={KetentuanScreen} initialParams={{ kondisi }}/>
      <Stack.Screen name="Tambah User" component={TambahUserScreen} />
      <Stack.Screen name="Daftar User" component={DaftarPenggunaScreen} />
      <Stack.Screen name="Laporan BAP" component={LaporanBAPScreen} initialParams={{ id }}/>
    </Stack.Navigator>
  );
};

export default Navigator;
