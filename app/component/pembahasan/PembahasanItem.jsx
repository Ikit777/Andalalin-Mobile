import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import { useStateToggler } from "../../hooks/useUtility";
import { MaterialIcons } from "@expo/vector-icons";
import ADialogInputText from "../utility/ADialogInputText";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import ADropDownCostume from "../utility/ADropdownCostume";
import AButton from "../utility/AButton";
import { Feather } from "@expo/vector-icons";
import { authRefreshToken } from "../../api/auth";
import { andalalinPembuatanBeritaAcaraPembahasan } from "../../api/andalalin";
import ADialog from "../utility/ADialog";
import AConfirmationDialog from "../utility/AConfirmationDialog";

export default function PembahasanItem({ navigation, route }) {
  const { pembahasan, setPembahasan } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;

  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [item, setItem] = useState(0);

  const alphabetArray = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );

  useEffect(() => {
    setItem(7);
  }, []);

  const onGoToNext = () => {
    if (context.indexPembahasan < item) {
      const newIndex = context.indexPembahasan + 1;
      context.setIndexPembahasan(newIndex);

      navigation.push("PembahasanItem", {
        index: newIndex,
      });
    }
  };

  const beritaacaraRef = React.createRef();
  const perwakilanRef = React.createRef();
  const jabatanRef = React.createRef();
  const kuasaRef = React.createRef();

  const [berita, setBerita] = useState(pembahasan.nomor_berita_acara);
  const [perwakilan, setPerwakilan] = useState(pembahasan.nama_perwakilan);
  const [jabatan, setJabatan] = useState(pembahasan.jabatan_perwakilan);
  const [kuasa, setKuasa] = useState(pembahasan.nomor_surat_kuasa);
  const [jenis, setJenis] = useState(pembahasan.jenis_perwakilan);

  const [formError1, toggleFormError1] = useStateToggler();
  const [beritaError, toggleBeritaError] = useStateToggler();
  const [perwakilanError, togglePerwakilanError] = useStateToggler();
  const [jabatanError, toggleJabatanError] = useStateToggler();
  const [jenisError, toggleJenisError] = useStateToggler();

  const jenis_kelamin = [{ value: "Bapak" }, { value: "Ibu" }];

  useEffect(() => {
    if (jenis != "") {
      clear_error_berita();
    }
  }, [jenis]);

  const press_berita = () => {
    if (berita != "" && perwakilan != "" && jabatan != "" && jenis != "") {
      formError1 ? toggleFormError1() : "";
      beritaError ? toggleBeritaError() : "";
      perwakilanError ? togglePerwakilanError() : "";
      jabatanError ? toggleJabatanError() : "";
      jenisError ? toggleJenisError() : "";

      setPembahasan({
        nomor_berita_acara: berita,
        nama_perwakilan: perwakilan,
        jabatan_perwakilan: jabatan,
        nomor_surat_kuasa: kuasa,
        jenis_perwakilan: jenis,
      });

      onGoToNext();
    } else {
      berita == "" ? (beritaError ? "" : toggleBeritaError()) : "";
      perwakilan == "" ? (perwakilanError ? "" : togglePerwakilanError()) : "";
      jabatan == "" ? (jabatanError ? "" : toggleJabatanError()) : "";
      jenis == "" ? (jenisError ? "" : toggleJenisError()) : "";

      formError1 ? "" : toggleFormError1();
    }
  };

  const clear_error_berita = () => {
    berita != "" ? (beritaError ? toggleBeritaError() : "") : "";
    perwakilan != "" ? (perwakilanError ? togglePerwakilanError() : "") : "";
    jabatan != "" ? (jabatanError ? toggleJabatanError() : "") : "";
    jenis != "" ? (jenisError ? toggleJenisError() : "") : "";

    berita != "" && perwakilan != "" && jabatan != "" && jenis != ""
      ? formError1
        ? toggleFormError1()
        : ""
      : "";
  };

  const ketuaRef = React.createRef();
  const nipketuaRef = React.createRef();
  const sekertarisRef = React.createRef();
  const nipsekertarisRef = React.createRef();
  const anggotaRef = React.createRef();
  const nipanggotaRef = React.createRef();

  const [ketua, setKetua] = useState(pembahasan.nama_ketua);
  const [nipKetua, setNipKetua] = useState(pembahasan.nip_ketua);
  const [sekertaris, setSekertaris] = useState(pembahasan.nama_sekertaris);
  const [nipSekertaris, setNipSekertaris] = useState(pembahasan.nip_sekertaris);
  const [anggota, setAnggota] = useState(pembahasan.nama_anggota);
  const [nipAnggota, setNipAnggota] = useState(pembahasan.nip_anggota);

  const [formError2, toggleFormError2] = useStateToggler();
  const [ketuaError, toggleKetuaError] = useStateToggler();
  const [nipKetuaError, toggleNipKetuaError] = useStateToggler();
  const [sekertarisError, toggleSekertarisError] = useStateToggler();
  const [nipSekertarisError, toggleNipSekertarisError] = useStateToggler();
  const [anggotaError, toggleAnggotaError] = useStateToggler();
  const [nipAnggotaError, toggleNipAnggotaError] = useStateToggler();

  const press_tim = () => {
    if (
      ketua != "" &&
      nipKetua != "" &&
      sekertaris != "" &&
      nipSekertaris != "" &&
      anggota != "" &&
      nipAnggota != ""
    ) {
      formError2 ? toggleFormError2() : "";
      ketuaError ? toggleKetuaError() : "";
      nipKetuaError ? toggleNipKetuaError() : "";
      sekertarisError ? toggleSekertarisError() : "";
      nipSekertarisError ? toggleNipSekertarisError() : "";
      anggotaError ? toggleAnggotaError() : "";
      nipAnggotaError ? toggleNipAnggotaError() : "";

      setPembahasan({
        nama_ketua: ketua,
        nip_ketua: nipKetua,
        nama_sekertaris: sekertaris,
        nip_sekertaris: nipSekertaris,
        nama_anggota: anggota,
        nip_anggota: nipAnggota,
      });

      onGoToNext();
    } else {
      ketua == "" ? (ketuaError ? "" : toggleKetuaError()) : "";
      nipKetua == "" ? (nipKetuaError ? "" : toggleNipKetuaError()) : "";
      sekertaris == "" ? (sekertarisError ? "" : toggleSekertarisError()) : "";
      nipSekertaris == ""
        ? nipSekertarisError
          ? ""
          : toggleNipSekertarisError()
        : "";
      anggota == "" ? (anggotaError ? "" : toggleAnggotaError()) : "";
      nipAnggota == "" ? (nipAnggotaError ? "" : toggleNipAnggotaError()) : "";

      formError2 ? "" : toggleFormError2();
    }
  };

  const clear_eeror_tim = () => {
    ketua != "" ? (ketuaError ? toggleKetuaError() : "") : "";
    nipKetua != "" ? (nipKetuaError ? toggleNipKetuaError() : "") : "";
    sekertaris != "" ? (sekertarisError ? toggleSekertarisError() : "") : "";
    nipSekertaris != ""
      ? nipSekertarisError
        ? toggleNipSekertarisError()
        : ""
      : "";
    anggota != "" ? (anggotaError ? toggleAnggotaError() : "") : "";
    nipAnggota != "" ? (nipAnggotaError ? toggleNipAnggotaError() : "") : "";

    ketua != "" &&
    nipKetua != "" &&
    sekertaris != "" &&
    nipSekertaris != "" &&
    anggota != "" &&
    nipAnggota != ""
      ? formError2
        ? toggleFormError2()
        : ""
      : "";
  };

  const hapus_instansi = (instansi) => {
    const updated = pembahasan.instansi;

    const index = updated.findIndex((value) => {
      return (
        value == instansi
      );
    });
    if (index > -1) {
      updated.splice(index, 1);
    }

    setPembahasan({
        instansi: updated,
    });
  };

  const hapus_stackholder = (stackholder, nama, identitas) => {
    const updated = pembahasan.stackholder;

    const index = updated.findIndex((value) => {
      return (
        value.stackholder == stackholder &&
        value.nama == nama &&
        value.identitas == identitas
      );
    });
    if (index > -1) {
      updated.splice(index, 1);
    }

    setPembahasan({
      stackholder: updated,
    });
  };

  const [tambah, setTambah] = useState("");
  const [poin, setPoin] = useState("");
  const [subpoin, setSubpoin] = useState("");

  const [tambahSubPoin, toggelTambahSubPoin] = useStateToggler();
  const [tambahPoin, toggleTambahPoin] = useStateToggler();

  useEffect(() => {
    if (poin != "" && tambah == "Poin") {
      const data = { poin: poin, subpoin: [] };
      pembahasan.pembahasan.push(data);

      setTambah("");
      setPoin("");
    }
  }, [poin]);

  useEffect(() => {
    if (subpoin != "" && tambah == "Subpoin") {
      pembahasan.pembahasan.map((value) => {
        if (value.poin == poin) {
          value.subpoin.push(subpoin);
        }
      });

      setTambah("");
      setPoin("");
      setSubpoin("");
    }
  }, [subpoin]);

  const hapus_poin = (poin) => {
    const updated = pembahasan.pembahasan;

    const index = updated.findIndex((value) => {
      return value.poin == poin;
    });
    if (index > -1) {
      updated.splice(index, 1);
    }

    setPembahasan({
      pembahasan: updated,
    });
  };

  const hapus_subpoin = (poin, subpoin) => {
    const updated = pembahasan.pembahasan.map((value) => {
      if (value.poin == poin) {
        const index = value.subpoin.findIndex((sub) => {
          return sub == subpoin;
        });
        if (index > -1) {
          value.subpoin.splice(index, 1);
        }
        return { ...value, subpoin: value.subpoin };
      }
      return value;
    });

    setPembahasan({
      pembahasan: updated,
    });
  };

  const remove_Foto = (file) => {
    const updated = pembahasan.foto;

    const index = updated.findIndex((value) => {
      return value.name == file;
    });
    if (index > -1) {
      updated.splice(index, 1);
    }

    setPembahasan({
      foto: updated,
    });
  };

  const simpan = () => {
    context.toggleLoading(true);

    const data = {
      nomor_berita_acara: berita,
      nama_perwakilan: perwakilan,
      jenis_perwakilan: jenis,
      jabatan_perwakilan: jabatan,
      nomor_surat_kuasa: kuasa,
      nama_ketua: ketua,
      nip_ketua: nipKetua,
      nama_sekertaris: sekertaris,
      nip_sekertaris: nipSekertaris,
      nama_anggota: anggota,
      nip_anggota: nipAnggota,
      instansi: pembahasan.instansi,
      stack: pembahasan.stackholder,
      pembahasan: pembahasan.pembahasan,
    };

    andalalinPembuatanBeritaAcaraPembahasan(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      pembahasan.foto,
      data,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Detail", {
              id: context.detailPermohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const generateElements = () => {
    const elements = [];
    for (let i = 0; i < item; i++) {
      switch (i) {
        case 0:
          elements.push(
            <View
              style={{
                flex: 1,
                backgroundColor: color.primary.primary25,
                paddingVertical: 16,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                <ATextInput
                  bdColor={
                    beritaError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"default"}
                  hint={"Masukkan nomor"}
                  title={"Nomor berita acara pembahasan"}
                  rtype={"next"}
                  wajib={"*"}
                  multi={false}
                  blur={false}
                  value={berita}
                  ref={beritaacaraRef}
                  onChangeText={(value) => {
                    setBerita(value);
                    clear_error_berita();
                  }}
                  submit={() => {
                    clear_error_berita();
                    perwakilanRef.current.focus();
                  }}
                />

                <ATextInput
                  bdColor={
                    perwakilanError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"default"}
                  hint={"Masukkan nama"}
                  title={"Nama perwakilan pengembang"}
                  rtype={"done"}
                  multi={false}
                  wajib={"*"}
                  padding={20}
                  blur={true}
                  value={perwakilan}
                  ref={perwakilanRef}
                  onChangeText={(value) => {
                    clear_error_berita();
                    setPerwakilan(value);
                  }}
                />

                <ADropDownCostume
                  bdColor={
                    jenisError ? color.error.error500 : color.neutral.neutral300
                  }
                  judul={"Jenis kelamin perwakilan"}
                  hint={"Pilih jenis kelamin"}
                  data={jenis_kelamin}
                  wajib={"*"}
                  padding={20}
                  selected={setJenis}
                  saved={jenis}
                />

                <ATextInput
                  bdColor={
                    jabatanError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"default"}
                  hint={"Masukkan jabatan"}
                  title={"Jabatan perwakilan"}
                  rtype={"next"}
                  multi={false}
                  wajib={"*"}
                  blur={false}
                  padding={20}
                  value={jabatan}
                  ref={jabatanRef}
                  onChangeText={(value) => {
                    clear_error_berita();
                    setJabatan(value);
                  }}
                  submit={() => {
                    clear_error_berita();
                    kuasaRef.current.focus();
                  }}
                />

                <ATextInput
                  bdColor={color.neutral.neutral300}
                  ktype={"default"}
                  hint={"Masukkan nomor"}
                  title={"Nomor surat kuasa (apabila tersedia)"}
                  rtype={"done"}
                  multi={false}
                  padding={20}
                  blur={true}
                  value={kuasa}
                  ref={kuasaRef}
                  onChangeText={(value) => {
                    clear_error_berita();
                    setKuasa(value);
                  }}
                />

                {formError1 ? (
                  <AText
                    style={{ paddingTop: 8 }}
                    color={color.error.error500}
                    size={14}
                    weight="normal"
                  >
                    Lengkapi formulir atau kolom yang tersedia dengan benar{" "}
                  </AText>
                ) : (
                  ""
                )}

                <AButton
                  style={{ marginTop: 32 }}
                  title={"Lanjut"}
                  mode="contained"
                  onPress={() => {
                    press_berita();
                  }}
                />

                <View style={{ paddingBottom: 32 }} />
              </ScrollView>
            </View>
          );
        case 1:
          elements.push(
            <View
              style={{
                flex: 1,
                backgroundColor: color.primary.primary25,
                paddingVertical: 16,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                <ATextInput
                  bdColor={
                    ketuaError ? color.error.error500 : color.neutral.neutral300
                  }
                  ktype={"default"}
                  hint={"Masukkan nama"}
                  title={"Nama ketua tim evaluasi"}
                  rtype={"next"}
                  wajib={"*"}
                  multi={false}
                  blur={false}
                  value={ketua}
                  ref={ketuaRef}
                  onChangeText={(value) => {
                    setKetua(value);
                    clear_eeror_tim();
                  }}
                  submit={() => {
                    clear_eeror_tim();
                    nipketuaRef.current.focus();
                  }}
                />

                <ATextInput
                  bdColor={
                    nipKetuaError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"number-pad"}
                  hint={"Masukkan nip"}
                  title={"NIP Ketua tim evaluasi"}
                  rtype={"next"}
                  multi={false}
                  wajib={"*"}
                  padding={20}
                  blur={false}
                  value={nipKetua}
                  ref={nipketuaRef}
                  onChangeText={(value) => {
                    setNipKetua(value);
                    clear_eeror_tim();
                  }}
                  submit={() => {
                    clear_eeror_tim();
                    sekertarisRef.current.focus();
                  }}
                />

                <ATextInput
                  bdColor={
                    sekertarisError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"default"}
                  hint={"Masukkan nama"}
                  title={"Nama sekertaris tim evaluasi"}
                  rtype={"next"}
                  wajib={"*"}
                  multi={false}
                  padding={20}
                  blur={false}
                  value={sekertaris}
                  ref={sekertarisRef}
                  onChangeText={(value) => {
                    setSekertaris(value);
                    clear_eeror_tim();
                  }}
                  submit={() => {
                    clear_eeror_tim();
                    nipsekertarisRef.current.focus();
                  }}
                />

                <ATextInput
                  bdColor={
                    nipSekertarisError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"number-pad"}
                  hint={"Masukkan nip"}
                  title={"NIP Sekertaris tim evaluasi"}
                  rtype={"next"}
                  multi={false}
                  padding={20}
                  wajib={"*"}
                  blur={false}
                  value={nipSekertaris}
                  ref={nipsekertarisRef}
                  onChangeText={(value) => {
                    setNipSekertaris(value);
                    clear_eeror_tim();
                  }}
                  submit={() => {
                    clear_eeror_tim();
                    anggotaRef.current.focus();
                  }}
                />

                <ATextInput
                  bdColor={
                    anggotaError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"default"}
                  hint={"Masukkan nama"}
                  title={"Nama anggota tim evaluasi"}
                  rtype={"next"}
                  multi={false}
                  wajib={"*"}
                  padding={20}
                  blur={false}
                  value={anggota}
                  ref={anggotaRef}
                  onChangeText={(value) => {
                    setAnggota(value);
                    clear_eeror_tim();
                  }}
                  submit={() => {
                    clear_eeror_tim();
                    nipanggotaRef.current.focus();
                  }}
                />

                <ATextInput
                  bdColor={
                    nipAnggotaError
                      ? color.error.error500
                      : color.neutral.neutral300
                  }
                  ktype={"number-pad"}
                  hint={"Masukkan nip"}
                  title={"NIP Anggota tim evaluasi"}
                  rtype={"done"}
                  multi={false}
                  wajib={"*"}
                  padding={20}
                  blur={true}
                  value={nipAnggota}
                  ref={nipanggotaRef}
                  onChangeText={(value) => {
                    setNipAnggota(value);
                    clear_eeror_tim();
                  }}
                />

                {formError2 ? (
                  <AText
                    style={{ paddingTop: 8 }}
                    color={color.error.error500}
                    size={14}
                    weight="normal"
                  >
                    Lengkapi formulir atau kolom yang tersedia dengan benar{" "}
                  </AText>
                ) : (
                  ""
                )}

                <AButton
                  style={{ marginTop: 32 }}
                  title={"Lanjut"}
                  mode="contained"
                  onPress={() => {
                    press_tim();
                  }}
                />

                <View style={{ paddingBottom: 32 }} />
              </ScrollView>
            </View>
          );
        case 2:
          elements.push(
            <View
              style={{
                flex: 1,
                backgroundColor: color.primary.primary25,
                paddingVertical: 16,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                {pembahasan.instansi.length != 0 ? (
                  <AText
                    size={16}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    Daftar instansi terkait, yaitu:
                  </AText>
                ) : (
                  ""
                )}

                {pembahasan.instansi.length != 0
                  ? pembahasan.instansi.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingTop: 14,
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <AText
                              style={{ paddingRight: 4 }}
                              size={16}
                              color={color.neutral.neutral700}
                            >
                              {index + 1}.
                            </AText>
                            <AText size={16} color={color.neutral.neutral700}>
                              {item}
                            </AText>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              hapus_instansi(item);
                            }}
                          >
                            <MaterialIcons
                              name="delete-outline"
                              size={24}
                              color={color.neutral.neutral900}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  : ""}

                {pembahasan.instansi.length == 0 ? (
                  <View
                    style={{
                      alignItems: "center",
                      paddingTop: "70%",
                      paddingBottom: 16,
                    }}
                  >
                    <View
                      style={{
                        borderColor: color.primary.primary50,
                        borderWidth: 8,
                        borderRadius: 40,
                        backgroundColor: color.primary.primary100,
                      }}
                    >
                      <Feather
                        style={{ padding: 14 }}
                        name="frown"
                        size={28}
                        color={color.primary.main}
                      />
                    </View>
                    <AText
                      style={{ paddingTop: 16 }}
                      size={20}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      Instansi Terkait
                    </AText>
                    <AText
                      size={20}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      Belum ada
                    </AText>
                  </View>
                ) : (
                  ""
                )}

                {pembahasan.instansi.length != 0 ? (
                  <View>
                    <AButton
                      style={{ marginTop: 16 }}
                      title={"Lanjut"}
                      mode="contained"
                      onPress={() => {
                        onGoToNext();
                      }}
                    />

                    <View style={{ paddingBottom: 32 }} />
                  </View>
                ) : (
                  ""
                )}
              </ScrollView>
            </View>
          );
        case 3:
          elements.push(
            <View
              style={{
                flex: 1,
                backgroundColor: color.primary.primary25,
                paddingVertical: 16,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                {pembahasan.stackholder.length != 0
                  ? pembahasan.stackholder.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          backgroundColor: color.text.white,
                          paddingHorizontal: 16,
                          paddingTop: 8,
                          paddingBottom: 8,
                          marginBottom: 16,
                        }}
                      >
                        <View style={{ paddingLeft: 16 }}>
                          <AText
                            size={14}
                            color={color.neutral.neutral800}
                            weight="semibold"
                          >
                            {item.stackholder}
                          </AText>
                          <AText
                            size={12}
                            color={color.neutral.neutral400}
                            weight="normal"
                          >
                            {item.nama}
                          </AText>
                          <AText
                            size={12}
                            color={color.neutral.neutral400}
                            weight="normal"
                          >
                            {item.identitas}
                          </AText>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            alignSelf: "flex-end",
                            paddingTop: 8,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-end",
                              alignItems: "center",
                              paddingTop: 8,
                              paddingHorizontal: 14,
                              paddingVertical: 8,
                            }}
                            onPress={() => {
                              hapus_stackholder(
                                item.stackholder,
                                item.nama,
                                item.identitas
                              );
                            }}
                          >
                            <AText
                              size={14}
                              color={color.neutral.neutral700}
                              weight="semibold"
                            >
                              Hapus
                            </AText>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  : ""}

                {pembahasan.stackholder.length == 0 ? (
                  <View
                    style={{
                      alignItems: "center",
                      paddingTop: "70%",
                      paddingBottom: 16,
                    }}
                  >
                    <View
                      style={{
                        borderColor: color.primary.primary50,
                        borderWidth: 8,
                        borderRadius: 40,
                        backgroundColor: color.primary.primary100,
                      }}
                    >
                      <Feather
                        style={{ padding: 14 }}
                        name="frown"
                        size={28}
                        color={color.primary.main}
                      />
                    </View>
                    <AText
                      style={{ paddingTop: 16 }}
                      size={20}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      Stackholder
                    </AText>
                    <AText
                      size={20}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      Belum ada
                    </AText>
                  </View>
                ) : (
                  ""
                )}

                {pembahasan.stackholder.length != 0 ? (
                  <View>
                    <AButton
                      style={{ marginTop: 16 }}
                      title={"Lanjut"}
                      mode="contained"
                      onPress={() => {
                        onGoToNext();
                      }}
                    />

                    <View style={{ paddingBottom: 32 }} />
                  </View>
                ) : (
                  ""
                )}
              </ScrollView>
            </View>
          );
        case 4:
          elements.push(
            <View
              style={{
                flex: 1,
                backgroundColor: color.primary.primary25,
                paddingVertical: 16,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                <AText
                  size={16}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Masukkan yang diperoleh dari pembahasan dokumen hasil analisis
                  dampak lalu lintas, yaitu:
                </AText>

                {pembahasan.pembahasan.length != 0
                  ? pembahasan.pembahasan.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingTop: 14,
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ flexDirection: "row", width: "80%" }}>
                            <AText
                              style={{ paddingRight: 4 }}
                              size={16}
                              color={color.neutral.neutral700}
                            >
                              {index + 1}&#x29;
                            </AText>
                            <AText size={16} color={color.neutral.neutral700}>
                              {item.poin}
                            </AText>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              hapus_poin(item.poin);
                            }}
                          >
                            <MaterialIcons
                              name="delete-outline"
                              size={24}
                              color={color.neutral.neutral900}
                            />
                          </TouchableOpacity>
                        </View>

                        {item.subpoin.length != 0
                          ? item.subpoin.map((sub, index) => (
                              <View key={index}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    paddingTop: 14,
                                    justifyContent: "space-between",
                                    paddingLeft: 14,
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      width: "80%",
                                    }}
                                  >
                                    <AText
                                      style={{ paddingRight: 4 }}
                                      size={16}
                                      color={color.neutral.neutral700}
                                    >
                                      {alphabetArray[index]}&#x29;
                                    </AText>
                                    <AText
                                      size={16}
                                      color={color.neutral.neutral700}
                                    >
                                      {sub}
                                    </AText>
                                  </View>

                                  <TouchableOpacity
                                    onPress={() => {
                                      hapus_subpoin(item.poin, sub);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="delete-outline"
                                      size={24}
                                      color={color.neutral.neutral900}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ))
                          : ""}

                        <View style={{ paddingTop: 8 }} />
                        <TouchableOpacity
                          style={{ marginLeft: 15 }}
                          onPress={() => {
                            setTambah("Subpoin");
                            setPoin(item.poin);
                            toggelTambahSubPoin();
                          }}
                        >
                          <AText
                            size={16}
                            color={color.primary.main}
                            weight="semibold"
                          >
                            + Tambah sub poin
                          </AText>
                        </TouchableOpacity>
                      </View>
                    ))
                  : ""}

                <View style={{ paddingTop: 8 }} />

                <TouchableOpacity
                  onPress={() => {
                    setTambah("Poin");
                    toggleTambahPoin();
                  }}
                >
                  <AText size={16} color={color.primary.main} weight="semibold">
                    + Tambah poin
                  </AText>
                </TouchableOpacity>

                {pembahasan.pembahasan.length != 0 ? (
                  <View>
                    <AButton
                      style={{ marginTop: 32 }}
                      title={"Lanjut"}
                      mode="contained"
                      onPress={() => {
                        onGoToNext();
                      }}
                    />

                    <View style={{ paddingBottom: 32 }} />
                  </View>
                ) : (
                  ""
                )}
              </ScrollView>
            </View>
          );
        case 5:
          elements.push(
            <View
              style={{
                flex: 1,
                backgroundColor: color.primary.primary25,
                paddingVertical: 16,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                {pembahasan.foto.length != 0
                  ? pembahasan.foto.map((item, index) => (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingTop: 14,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              width: "80%",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              source={{ uri: item.uri }}
                              style={{ width: 50, height: 50, borderRadius: 8 }}
                            />
                            <AText
                              style={{ paddingLeft: 16 }}
                              size={16}
                              color={color.neutral.neutral700}
                            >
                              {item.name}
                            </AText>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              remove_Foto(item.name);
                            }}
                          >
                            <MaterialIcons
                              name="delete-outline"
                              size={24}
                              color={color.neutral.neutral900}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  : ""}

                {pembahasan.foto.length == 0 ? (
                  <View
                    style={{
                      alignItems: "center",
                      paddingTop: "70%",
                      paddingBottom: 16,
                    }}
                  >
                    <View
                      style={{
                        borderColor: color.primary.primary50,
                        borderWidth: 8,
                        borderRadius: 40,
                        backgroundColor: color.primary.primary100,
                      }}
                    >
                      <Feather
                        style={{ padding: 14 }}
                        name="frown"
                        size={28}
                        color={color.primary.main}
                      />
                    </View>
                    <AText
                      style={{ paddingTop: 16 }}
                      size={20}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      Foto
                    </AText>
                    <AText
                      size={20}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      Belum ada
                    </AText>
                  </View>
                ) : (
                  ""
                )}

                {pembahasan.foto.length != 0 ? (
                  <AButton
                    style={{ marginTop: 24, marginBottom: 50 }}
                    title={"Lanjut"}
                    mode="contained"
                    onPress={() => {
                      onGoToNext();
                    }}
                  />
                ) : (
                  ""
                )}
              </ScrollView>
            </View>
          );
        case 6:
          elements.push(
            <View
              style={{
                flex: 1,
                backgroundColor: color.primary.primary25,
                paddingVertical: 16,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                persistentScrollbar={true}
              >
                <AText
                  color={color.neutral.neutral900}
                  size={24}
                  weight="semibold"
                >
                  Apakah data sudah benar?
                </AText>

                <AText
                  style={{ paddingTop: 8 }}
                  color={color.neutral.neutral500}
                  size={16}
                  weight="normal"
                >
                  Pastikan data telah benar. Anda dapat kembali untuk memeriksa
                  data yang telah dimasukkan agar tidak terjadi kesalahan
                </AText>

                <AButton
                  style={{ marginTop: 32, marginBottom: 50 }}
                  title={"Selesai"}
                  mode="contained"
                  onPress={() => {
                    toggleKonfirmasi();
                  }}
                />
              </ScrollView>
            </View>
          );
      }
    }
    return elements;
  };

  return (
    <View style={styles.container}>
      {generateElements()[index - 1]}
      <ADialogInputText
        title={"Tambah poin"}
        hint={"Masukan poin"}
        visibleModal={tambahPoin}
        setText={setPoin}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleTambahPoin();
        }}
        onPressOKButton={() => {
          toggleTambahPoin();
        }}
      />

      <ADialogInputText
        title={"Tambah sub poin"}
        hint={"Masukan sub poin"}
        visibleModal={tambahSubPoin}
        setText={setSubpoin}
        btnOK={"Tambah"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggelTambahSubPoin();
          setPoin("");
        }}
        onPressOKButton={() => {
          toggelTambahSubPoin();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Simpan data berita acara pembahasan?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          simpan();
        }}
      />

      <ADialog
        title={"Simpan gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
