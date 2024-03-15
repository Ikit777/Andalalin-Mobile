import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { Feather } from "@expo/vector-icons";

function AWilayahProyek({
  visibleModal = false,
  onPressOKButton,
  onPressBATALButton,
  btnOK,
  btnBATAL,
  master,
  setWilayah,
  setProvinsi,
  setKabupaten,
  setKecamatan,
  setKelurahan,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const [alamat, setAlamat] = React.useState("");
  const list = useRef(null);

  const [tahap, setTahap] = React.useState();

  const [data, setData] = React.useState();

  

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      
    } else {
      setTimeout(() => setVisible(false), 200);
      
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setTahap("Kecamatan");
      setAlamat("Kalimantan Selatan, Kota Banjarmasin, ");
      setProvinsi("Kalimantan Selatan");
      setKabupaten("Kota Banjarmasin")
      let prov = master.provinsi.filter((item) => {
        return item.Name == "Kalimantan Selatan";
      });

      let kab = master.kabupaten.filter((item) => {
        return item.IdProvinsi == prov[0].Id;
      });

      let kec = master.kecamatan.filter((item) => {
        return (
          item.IdKabupaten ==
          kab.find((data) => data.Name == "Kota Banjarmasin").Id
        );
      });

      setData(kec);
    }, 500);
  }, [visibleModal]);

  const reset = () => {
    list.current.scrollToOffset({ animated: false, offset: 0 });
  };

  const press = (id) => {
    switch (tahap) {
      case "Kecamatan":
        reset();
        setTahap("Kelurahan");
        let kel = master.kelurahan.filter((item) => {
          return item.IdKecamatan == id;
        });

        setData(kel);
        break;
      case "Kelurahan":
        reset();
        setTahap("Selesai");
        setData(null);
        break;
    }
  };

  const batalPress = () => {
    onPressBATALButton();
    setTimeout(() => {
      setAlamat("");
    }, 500);
  };

  const okPress = () => {
    if (tahap == "Selesai") {
      onPressOKButton();
      setWilayah(alamat);
    }
  };

  const resetAlamat = () => {
    setTimeout(() => {
      setTahap("Kecamatan");
      setAlamat("Kalimantan Selatan, Kota Banjarmasin, ");
      let prov = master.provinsi.filter((item) => {
        return item.Name == "Kalimantan Selatan";
      });

      let kab = master.kabupaten.filter((item) => {
        return item.IdProvinsi == prov[0].Id;
      });

      let kec = master.kecamatan.filter((item) => {
        return (
          item.IdKabupaten ==
          kab.find((data) => data.Name == "Kota Banjarmasin").Id
        );
      });

      setData(kec);
    }, 500);
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
      onRequestClose={() => {
        onPressBATALButton();
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => {
          onPressBATALButton();
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.horizontal,
              { height: tahap == "Selesai" ? "30%" : "55%" },
            ]}
          >
            <AText color={color.neutral.neutral900} size={18} weight="semibold">
              Pilih wilayah administratif
            </AText>

            <View style={{ paddingTop: 8 }}>
              <AText color={color.neutral.neutral900} size={14} weight="normal">
                Wilayah administratif dipilih
              </AText>

              <View style={{ flexDirection: "row" }}>
                <AText
                  style={{ paddingTop: 6, width: "90%" }}
                  color={color.neutral.neutral900}
                  size={14}
                  weight="normal"
                >
                  {alamat}
                </AText>

                <TouchableOpacity
                  onPress={() => {
                    resetAlamat();
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    alignSelf: "center",
                  }}
                >
                  <Feather
                    name={"refresh-cw"}
                    size={24}
                    color={color.neutral.neutral900}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.separator} />

            <AText
              style={{ paddingTop: 8 }}
              color={color.neutral.neutral900}
              size={14}
              weight="normal"
            >
              {tahap}
            </AText>

            <FlatList
              ref={list}
              overScrollMode="never"
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              vertical
              data={data}
              style={{ maxHeight: "55%", paddingVertical: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                  }}
                  onPress={() => {
                    press(item.Id);
                    setAlamat(
                      alamat + item.Name + (tahap == "Kelurahan" ? "" : ", ")
                    );

                    if (tahap == "Kecamatan") {
                      setKecamatan(item.Name);
                    }

                    if (tahap == "Kelurahan") {
                      setKelurahan(item.Name);
                    }
                  }}
                >
                  <AText
                    style={{ paddingVertical: 6 }}
                    size={14}
                    color={color.neutral.neutral900}
                  >
                    {item.Name}
                  </AText>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.Id.toString()}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                position: "absolute",
                bottom: 24,
                right: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  batalPress();
                }}
              >
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  {btnBATAL}
                </AText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  okPress();
                }}
              >
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  {btnOK}
                </AText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 31,
  },
  horizontal: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: color.primary.primary50,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral100,
    alignSelf: "center",
    marginVertical: 3,
  },
});

export default AWilayahProyek;
