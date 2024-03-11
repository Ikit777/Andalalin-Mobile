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
  PengelolaanProdukScreen,
  DaftarProdukScreen,
  MapScreen,
  SurveiKepuasanScreen,
  KameraScreen,
  SurveiKepuasanUserScreen,
  KomentarScreen,
  PilihLokasiScreen,
  EditAkunScreen,
  CekAdministrasiScreen,
  PembuatanSuratPernyataanScreen,
  PembuatanSuratKeputusanScreen,
  CekKelengkapanAkhirScreen,
  UpdateKelengkapanScreen,
  PembuatanPenyusunDokumenScreen,
  CekAdministrasiPerlalinScreen,
  PemeriksaanDokumenScreen,
  TambahPerlengkapanScreen,
  DetailPerlengkapanScreen,
  SurveiMandiriScreen,
  DetailSurveiMandiriScreen,
  PemeriksaanPerlengkapanScreen,
  PdfScreen,
  PemeriksaanKesesuaianSubstansiScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const Navigator = ({
  email,
  isLogged,
  id,
  dokumen,
  permohonan,
  kondisi,
  foto,
  koordinat,
  jenis,
  uri,
  komentar,
  kategori,
  id_perlengkapan,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={isLogged ? "Home" : "Onboarding"}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationTypeForReplace: "pop",
      }}
    >
      {/* Halaman awal */}
      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />

      {/* Home */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Tentang" component={TentangScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />

      {/* Auth Screen */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Back Login"
        component={LoginScreen}
        options={{ animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen
        name="Verifikasi"
        component={VerifikasiScreen}
        initialParams={{ email }}
      />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="Reset"
        component={ResetPasswordScreen}
        initialParams={{ email, kondisi }}
      />

      <Stack.Screen
        name="Andalalin"
        component={PengajuanScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        initialParams={{ id }}
      />
      <Stack.Screen
        name="Detail Survei"
        component={DetailSurveiScreen}
        initialParams={{ id, id_perlengkapan, jenis }}
      />
      <Stack.Screen
        name="Daftar"
        component={DaftarScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen name="Notifikasi" component={NotifikasiScreen} />
      <Stack.Screen
        name="PDF"
        component={PdfViewSreen}
        initialParams={{ id, dokumen }}
      />
      <Stack.Screen
        name="Foto"
        component={FotoViewScreen}
        initialParams={{ foto }}
      />
      <Stack.Screen
        name="Lanjutan"
        component={LanjutanScreen}
        initialParams={{ permohonan, kondisi }}
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
        name="Ketentuan"
        component={KetentuanScreen}
        initialParams={{ kondisi, kategori }}
      />
      <Stack.Screen
        name="Pilih Lokasi"
        component={PilihLokasiScreen}
        initialParams={{ kondisi }}
      />
      <Stack.Screen name="Tambah User" component={TambahUserScreen} />
      <Stack.Screen name="Daftar User" component={DaftarPenggunaScreen} />
      <Stack.Screen name="Edit Akun" component={EditAkunScreen} />
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
        initialParams={{ kondisi }}
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
      <Stack.Screen name="Administrasi" component={CekAdministrasiScreen} />
      <Stack.Screen
        name="Administrasi Perlalin"
        component={CekAdministrasiPerlalinScreen}
      />
      <Stack.Screen
        name="Pernyataan"
        component={PembuatanSuratPernyataanScreen}
      />
      <Stack.Screen
        name="Keputusan"
        component={PembuatanSuratKeputusanScreen}
      />
      <Stack.Screen name="Kelengkapan" component={CekKelengkapanAkhirScreen} />
      <Stack.Screen
        name="Update Kelengkapan"
        component={UpdateKelengkapanScreen}
        initialParams={{ permohonan }}
      />
      <Stack.Screen
        name="Penyusun"
        component={PembuatanPenyusunDokumenScreen}
      />
      <Stack.Screen
        name="Pemeriksaan dokumen"
        component={PemeriksaanDokumenScreen}
      />
      <Stack.Screen
        name="Tambah perlengkapan"
        component={TambahPerlengkapanScreen}
        initialParams={{ id, kondisi }}
      />
      <Stack.Screen
        name="Detail perlengkapan"
        component={DetailPerlengkapanScreen}
        initialParams={{ id }}
      />
      <Stack.Screen name="Survei mandiri" component={SurveiMandiriScreen} />

      <Stack.Screen name="Detail mandiri" component={DetailSurveiMandiriScreen} initialParams={{ id }}/>

      <Stack.Screen name="Pemeriksaan perlengkapan" component={PemeriksaanPerlengkapanScreen} />

      <Stack.Screen name="Pdf view" component={PdfScreen} initialParams={{ dokumen }}/>

      <Stack.Screen
        name="Pemeriksaan substansi"
        component={PemeriksaanKesesuaianSubstansiScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
