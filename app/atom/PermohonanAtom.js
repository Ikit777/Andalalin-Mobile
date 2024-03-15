import { atom } from "recoil";

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

  //Kegiatan
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

const andalalinState = atom({
  key: "andalalin",
  default: andalalinInit,
});

const perlalinInit = {
  perlengkapan: [],
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

const perlalinState = atom({
  key: "perlalin",
  default: perlalinInit,
});

const indexPermohonan = atom({
  key: "index_permohonan",
  default: 1,
});

export default {
  andalalinState,
  perlalinState,
  indexPermohonan,
};
