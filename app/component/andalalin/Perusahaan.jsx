import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import ADropDownCostume from "../utility/ADropdownCostume";

function Perusahaan({ onPress }) {
  const {
    permohonan: {
      nama_perusahaan,
      alamat_perusahaan,
      nomer_perusahaan,
      email_perusahaan,
      nama_pimpinan,
      jabatan_pimpinan,
      jenis_kelamin_pimpinan,
    },
    dispatch,
  } = useContext(UserContext);

  const namaInput = React.createRef();
  const alamatInput = React.createRef();
  const nomerInput = React.createRef();
  const emailInput = React.createRef();
  const pimpinanInput = React.createRef();
  const jabatanInput = React.createRef();

  const [nama, setNama] = useState(nama_perusahaan);
  const [alamat, setAlamat] = useState(alamat_perusahaan);
  const [nomer, setNomer] = useState(nomer_perusahaan);
  const [email, setEmail] = useState(email_perusahaan);
  const [pimpinan, setPimpinan] = useState(nama_pimpinan);
  const [jabatan, setJabatan] = useState(jabatan_pimpinan);
  const [jenis, setJenis] = useState(jenis_kelamin_pimpinan);

  const [namaError, toggleNamaError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [nomerError, toggleNomerError] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [pimpinanError, togglePimpinanError] = useStateToggler();
  const [jabatanError, toggleJabatanError] = useStateToggler();
  const [jenisError, toggleJenisError] = useStateToggler();

  const jenis_kelamin = [{ value: "Laki-laki" }, { value: "Perempuan" }];

  const press = () => {
    if (
      nama != "" &&
      alamat != "" &&
      nomer != "" &&
      email != "" &&
      pimpinan != "" &&
      jabatan != "" &&
      jenis != ""
    ) {
      {
        namaError ? toggleNamaError() : "";
      }
      {
        alamatError ? toggleAlamatError() : "";
      }
      {
        nomerError ? toggleNomerError() : "";
      }
      {
        emailError ? toggleEmailError() : "";
      }
      {
        pimpinanError ? togglePimpinanError() : "";
      }
      {
        jabatanError ? toggleJabatanError() : "";
      }
      dispatch({
        nama_perusahaan: nama,
        alamat_perusahaan: alamat,
        nomer_perusahaan: nomer,
        email_perusahaan: email,
        nama_pimpinan: pimpinan,
        jabatan_pimpinan: jabatan,
        jenis_kelamin_pimpinan: jenis,
      });
      onPress();
    } else {
      {
        nama == "" ? (namaError ? "" : toggleNamaError()) : "";
      }
      {
        alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
      }
      {
        nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
      }
      {
        email == "" ? (emailError ? "" : toggleEmailError()) : "";
      }
      {
        pimpinan == "" ? (pimpinanError ? "" : togglePimpinanError()) : "";
      }
      {
        jabatan == "" ? (jabatanError ? "" : toggleJabatanError()) : "";
      }
      {
        jenis == "" ? (jenisError ? "" : toggleJenisError()) : "";
      }
    }
  };

  useEffect(() => {
    {
      {
        jenisError ? toggleJenisError() : "";
      }
    }
  }, [jenis]);

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={namaError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan nama"}
        title={"Nama perusahaan"}
        rtype={"next"}
        blur={false}
        multi={false}
        value={nama}
        ref={namaInput}
        onChangeText={(value) => {
          setNama(value);
        }}
        submit={() => {
          {
            namaError ? toggleNamaError() : "";
          }
          alamatInput.current.focus();
        }}
      />

      {namaError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nama kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={alamatError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat perusahaan"}
        multi={true}
        padding={20}
        value={alamat}
        ref={alamatInput}
        onChangeText={(value) => {
          setAlamat(value);
        }}
      />

      {alamatError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Alamat kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={nomerError ? color.error.error300 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nomor telepon"}
        title={"Nomor telepon perusahaan"}
        rtype={"next"}
        blur={false}
        multi={false}
        value={nomer}
        padding={20}
        ref={nomerInput}
        onChangeText={(value) => {
          setNomer(value);
        }}
        submit={() => {
          {
            nomerError ? toggleNomerError() : "";
          }
          emailInput.current.focus();
        }}
      />

      <AText
        style={{ paddingTop: 6 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Contoh: 08••••••••••••
      </AText>

      {nomerError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nomer telepon kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={emailError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan email"}
        title={"Email perusahaan"}
        rtype={"next"}
        blur={false}
        padding={20}
        multi={false}
        value={email}
        ref={emailInput}
        onChangeText={(value) => {
          setEmail(value);
        }}
        submit={() => {
          {
            emailError ? toggleEmailError() : "";
          }
          pimpinanInput.current.focus();
        }}
      />

      {emailError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Email kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={
          pimpinanError ? color.error.error300 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan nama pimpinan"}
        title={"Nama pimpinan"}
        rtype={"next"}
        blur={false}
        multi={false}
        value={pimpinan}
        padding={20}
        ref={pimpinanInput}
        onChangeText={(value) => {
          setPimpinan(value);
        }}
        submit={() => {
          {
            pimpinanError ? togglePimpinanError() : "";
          }
          jabatanInput.current.focus();
        }}
      />

      {pimpinanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nama pimpinan kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={jabatanError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan jabatan pimpinan"}
        title={"Jabatan pimpinan"}
        rtype={"done"}
        multi={false}
        padding={20}
        value={jabatan}
        ref={jabatanInput}
        onChangeText={(value) => {
          setJabatan(value);
        }}
        submit={() => {
          {
            jabatanError ? toggleJabatanError() : "";
          }
        }}
      />

      {jabatanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jabatan pimpinan kosong
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        bdColor={jenisError ? color.error.error300 : color.neutral.neutral300}
        judul={"Jenis kelamin pimpinan"}
        hint={"Pilih jenis kelamin"}
        data={jenis_kelamin}
        padding={20}
        selected={setJenis}
        saved={jenis}
      />
      {jenisError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jenis kelamin belum dipilih
        </AText>
      ) : (
        ""
      )}

      <AButton
        style={{ marginTop: 32, marginBottom: 50 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          press();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
});

export default Perusahaan;
