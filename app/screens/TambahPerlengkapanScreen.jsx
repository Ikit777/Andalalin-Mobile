import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  BackHandler,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import AButton from "../component/utility/AButton";
import { useStateToggler } from "../hooks/useUtility";
import ADropDownCostume from "../component/utility/ADropdownCostume";
import ADropDownPerlengkapan from "../component/utility/ADropdownPerlengkapan";
import { useFocusEffect } from "@react-navigation/native";
import ATextInput from "../component/utility/ATextInput";
import Modal from "react-native-modal";
import ATextInputIcon from "../component/utility/ATextInputIcon";
import { v4 as uuidv4 } from "uuid";
import { MaterialIcons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import PermohonanAtom from "../atom/PermohonanAtom";

function TambahPerlengkapanScreen({ navigation, route }) {
  const { dataMaster, lokasi, foto, setFoto, toggleLoading } =
    useContext(UserContext);

  const { perlalinState } = PermohonanAtom;

  const [perlalin, setPerlalin] = useRecoilState(perlalinState);

  const id = route.params.id;
  const kondisi = route.params.kondisi;

  const kegiatanInput = React.createRef();
  const detailInput = React.createRef();

  const [KategoriUtama, setKategoriUtama] = useState("");
  const [kategoriPerlalin, setKategoriPerlalin] = useState("");
  const [jenisPerlengkapan, setJenisPerlengkapan] = useState("");
  const [rambulalin, setRambulalin] = useState("");
  const [titik, setTitik] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [detil, setDetail] = useState("");
  const [kegiatan, setKegiatan] = useState("");

  const [formError, toggleFormError] = useStateToggler();

  const [kategoriUtamaError, toggleKategoriUtamaError] = useStateToggler();
  const [kategoriError, toggleKategoriError] = useStateToggler();
  const [jenisError, toggleJenisError] = useStateToggler();
  const [titikError, toggletitikError] = useStateToggler();
  const [kegiatanError, toggleKegiatanError] = useStateToggler();

  const [kategoriUtamaData, setKategoriUtamaData] = useState("");
  const [kategoriData, setKategoriData] = useState("");
  const [jenisData, setJenisData] = useState("");
  const [jenisDataDefault, setJenisDataDefault] = useState("");

  const [image, toggleImage] = useStateToggler();
  const [imageUri, setImageUri] = useState();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Andalalin", { kondisi: "Perlalin" });
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.navigate("Andalalin", { kondisi: "Perlalin" });
      return true;
    });
  }, []);

  useEffect(() => {
    if (kondisi == "Edit") {
      toggleLoading(true);

      setTimeout(() => {
        toggleLoading(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (kondisi == "Edit") {
      const data = perlalin.perlengkapan.find(
        (item) => item.id_perlengkapan == id
      );
      setKategoriUtama(data.kategori_utama);
      setKategoriPerlalin(data.kategori);
      setJenisPerlengkapan(data.perlengkapan);
      setRambulalin(data.gambar);
      setTitik(data.pemasangan);
      setLat(data.latitude);
      setLong(data.longtitude);
      setDetail(data.detail);
      setKegiatan(data.alasan);
      setFoto({ foto: data.foto });
    }
  }, []);

  useEffect(() => {
    let kategori = dataMaster.kategori_utama.filter((item) => {
      return item != null;
    });

    let kategoriperlengkapan = kategori.map((item) => {
      return { value: item };
    });

    setKategoriUtamaData(kategoriperlengkapan);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (KategoriUtama != "") {
        clear_error();
        let kategori = dataMaster.kategori_perlengkapan.find((item) => {
          return item.KategoriUtama == KategoriUtama;
        });

        if (kategori != null) {
          let kategoriperlengkapan = kategori.Kategori.map((item) => {
            return { value: item };
          });

          setKategoriData(kategoriperlengkapan);
        }
      }
    }, 300);
  }, [KategoriUtama]);

  const perlengkapanData = () => {
    let perlengkapan = dataMaster.perlengkapan.find((item) => {
      return item.Kategori == kategoriPerlalin;
    });

    if (perlengkapan != null) {
      let jenisPerlengkapan = perlengkapan.Perlengkapan.map((item) => {
        return {
          value: item.JenisPerlengkapan,
          rambu: item.GambarPerlengkapan,
        };
      });

      setJenisData(jenisPerlengkapan);
      setJenisDataDefault(jenisPerlengkapan);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (kategoriPerlalin != "") {
        clear_error();
        perlengkapanData();
      }
    }, 300);
  }, [kategoriPerlalin]);

  useEffect(() => {
    if (jenisPerlengkapan != "") {
      clear_error();
    }
  }, [jenisPerlengkapan]);

  const press_titik = () => {
    navigation.push("Pilih Lokasi", { kondisi: "Pengajuan perlalin" });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (lokasi != null) {
        setTitik(lokasi.titik_pemasangan);
        setLat(lokasi.lat_pemasangan);
        setLong(lokasi.long_pemasangan);
        clear_error();
      }
    }, [lokasi])
  );

  useEffect(() => {
    if (titik != "") {
      clear_error();
    }
  }, [titik]);

  useFocusEffect(
    React.useCallback(() => {
      if (foto.length != 0) {
        clear_error();
        if (foto.foto.length == 0) {
          setFoto([]);
        }
      }
    }, [foto])
  );

  const remove_Foto = (file) => {
    const updated = foto.foto;

    const index = updated.findIndex((value) => {
      return value.name == file;
    });
    if (index > -1) {
      updated.splice(index, 1);
    }

    setFoto({
      foto: updated,
    });
  };

  useEffect(() => {
    if (imageUri != "" && imageUri != null) {
      setTimeout(() => {
        toggleImage();
      }, 300);
    }
  }, [imageUri]);

  const press = () => {
    if (
      KategoriUtama != "" &&
      kategoriPerlalin != "" &&
      jenisPerlengkapan != "" &&
      titik != "" &&
      kegiatan != ""
    ) {
      if (kondisi == "Tambah") {
        tambah();
      } else {
        edit();
      }

      navigation.navigate("Andalalin", { kondisi: "Perlalin" });
    } else {
      KategoriUtama == ""
        ? kategoriUtamaError
          ? ""
          : toggleKategoriUtamaError()
        : "";
      kategoriPerlalin == ""
        ? kategoriError
          ? ""
          : toggleKategoriError()
        : "";
      jenisPerlengkapan == "" ? (jenisError ? "" : toggleJenisError()) : "";
      titik == "" ? (titikError ? "" : toggletitikError()) : "";
      kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  const clear_error = () => {
    KategoriUtama != ""
      ? kategoriUtamaError
        ? toggleKategoriUtamaError()
        : ""
      : "";
    kategoriPerlalin != "" ? (kategoriError ? toggleKategoriError() : "") : "";
    jenisPerlengkapan != "" ? (jenisError ? toggleJenisError() : "") : "";
    titik != "" ? (titikError ? toggletitikError() : "") : "";
    kegiatan != "" ? (kegiatanError ? toggleKegiatanError() : "") : "";

    KategoriUtama != "" &&
    kategoriPerlalin != "" &&
    jenisPerlengkapan != "" &&
    titik != "" &&
    kegiatan != ""
      ? formError
        ? toggleFormError()
        : ""
      : "";
  };

  const tambah = () => {
    const data = {
      id_perlengkapan: uuidv4(),
      kategori_utama: KategoriUtama,
      kategori: kategoriPerlalin,
      perlengkapan: jenisPerlengkapan,
      gambar: rambulalin,
      pemasangan: titik,
      latitude: lat,
      longtitude: long,
      detail: detil,
      alasan: kegiatan,
      foto: foto.foto,
    };

    setPerlalin({
      ...perlalin,
      perlengkapan: [...perlalin.perlengkapan, data],
    });
  };

  const edit = () => {
    const updated = perlalin.perlengkapan;

    const index = updated.findIndex((value) => {
      return value.id_perlengkapan == id;
    });

    const updatedItem = {
      ...perlalin.perlengkapan[index],
      kategori_utama: KategoriUtama,
      kategori: kategoriPerlalin,
      perlengkapan: jenisPerlengkapan,
      gambar: rambulalin,
      pemasangan: titik,
      latitude: lat,
      longtitude: long,
      detail: detil,
      alasan: kegiatan,
      foto: foto.foto,
    };

    const updatedItems = [...perlalin.perlengkapan];
    updatedItems[index] = updatedItem;

    setPerlalin({
      ...perlalin,
      perlengkapan: updatedItems,
    });
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <ABackButton
            onPress={() => {
              navigation.navigate("Andalalin", { kondisi: "Perlalin" });
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Perlengkapan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        nestedScrollEnabled={true}
      >
        <ADropDownCostume
          judul={"Kategori utama perlengkapan"}
          hint={"Pilih kategori"}
          data={kategoriUtamaData}
          wajib={"*"}
          selected={setKategoriUtama}
          max={250}
          saved={KategoriUtama}
          bdColor={
            kategoriUtamaError ? color.error.error500 : color.neutral.neutral300
          }
        />

        <ADropDownCostume
          judul={"Kategori perlengkapan"}
          hint={"Pilih kategori"}
          wajib={"*"}
          data={kategoriData}
          selected={setKategoriPerlalin}
          max={250}
          padding={20}
          saved={kategoriPerlalin}
          bdColor={
            kategoriError ? color.error.error500 : color.neutral.neutral300
          }
        />

        <ADropDownPerlengkapan
          bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
          judul={"Jenis perlengkapan"}
          hint={"Pilih perlengkapan"}
          wajib={"*"}
          data={jenisData}
          setData={setJenisData}
          dataDefault={jenisDataDefault}
          max={400}
          padding={20}
          kategori={kategoriPerlalin}
          selected={setJenisPerlengkapan}
          rambulalin={rambulalin}
          rambuSelect={setRambulalin}
          saved={jenisPerlengkapan}
          imageRambu={setImageUri}
          notFound={"Kategori belum dipilih"}
        />

        <AText
          style={{ paddingTop: 8 }}
          color={color.neutral.neutral300}
          size={14}
          weight="normal"
        >
          Keterangan: tahan lama perlengkapan untuk menampilkannya
        </AText>

        <ATextInputIcon
          bdColor={titikError ? color.error.error500 : color.neutral.neutral300}
          hint={"Pilih lokasi pemasangan"}
          title={"Lokasi pemasangan"}
          padding={20}
          mult={true}
          wajib={"*"}
          width={true}
          icon={"map-pin"}
          value={titik}
          onPress={press_titik}
        />

        <AText
          style={{ paddingTop: 8 }}
          color={color.neutral.neutral300}
          size={14}
          weight="normal"
        >
          Keterangan: Pemohon harus berada di titik pemasangan yang sebenarnya
        </AText>

        <ATextInput
          bdColor={
            kegiatanError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan alasan"}
          title={"Alasan"}
          multi={true}
          wajib={"*"}
          padding={20}
          value={kegiatan}
          ref={kegiatanInput}
          onChangeText={(value) => {
            setKegiatan(value);
            clear_error();
          }}
        />

        <ATextInput
          bdColor={color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan detail"}
          title={"Detail lainnya"}
          rtype={"done"}
          multi={true}
          value={detil}
          padding={20}
          ref={detailInput}
          onChangeText={(value) => {
            setDetail(value);
          }}
        />

        {foto.length != 0 ? <View style={{ paddingTop: 20 }} /> : ""}

        {foto.length != 0
          ? foto.foto.map((item, index) => (
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

        <View style={{ paddingTop: 20 }} />

        <TouchableOpacity
          onPress={() => {
            setTimeout(() => {
              navigation.push("Kamera", { kondisi: "Perlengkapan" });
            }, 500);
          }}
        >
          <AText size={16} color={color.primary.main} weight="semibold">
            + Tambah foto lokasi
          </AText>
        </TouchableOpacity>

        {foto.length == 0 ? <View style={{ paddingTop: 20 }} /> : ""}

        {formError ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Lengkapi formulir atau kolom yang tersedia dengan benar
          </AText>
        ) : (
          ""
        )}

        {foto.length != 0 ? (
          <AButton
            style={{ marginTop: 32, marginBottom: 50 }}
            title={kondisi == "Tambah" ? "Tambah" : "Perbarui"}
            mode="contained"
            onPress={() => {
              press();
            }}
          />
        ) : (
          ""
        )}
      </ScrollView>

      {imageUri != null && imageUri != "" ? (
        <Modal
          isVisible={image}
          backdropOpacity={0.5}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={300}
          statusBarTranslucent
          coverScreen={true}
          deviceHeight={Dimensions.get("screen").height}
          backdropTransitionOutTiming={0}
          onBackButtonPress={() => {
            setImageUri();
            toggleImage();
          }}
          onBackdropPress={() => {
            setImageUri();
            toggleImage();
          }}
        >
          <View
            style={{
              overflow: "hidden",
              width: 250,
              height: 250,
              borderRadius: 8,
              alignSelf: "center",
              backgroundColor: color.text.white,
            }}
          >
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
              source={{
                uri: imageUri,
              }}
            />
          </View>
        </Modal>
      ) : (
        ""
      )}
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default TambahPerlengkapanScreen;
