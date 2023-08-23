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
  PengajuanAndalalinScreen,
  DetailPengajuanScreen,
  DaftarPermohonanScreen,
  NotifikasiScreen,
  PdfViewSreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const Navigator = ({ email, isLogged, id, title, pdf }) => {

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
      <Stack.Screen name="Andalalin" component={PengajuanAndalalinScreen} />
      <Stack.Screen name="Detail" component={DetailPengajuanScreen} initialParams={{ id }}/>
      <Stack.Screen name="Daftar" component={DaftarPermohonanScreen} />
      <Stack.Screen name="Notifikasi" component={NotifikasiScreen} />
      <Stack.Screen name="PDF" component={PdfViewSreen} initialParams={{ title, pdf }}/>
    </Stack.Navigator>
  );
};

export default Navigator;
