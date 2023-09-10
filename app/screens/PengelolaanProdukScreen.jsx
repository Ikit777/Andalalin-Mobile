import React, { useEffect } from "react";
import { StyleSheet, View, Image, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import APengelolaanItem from "../component/utility/APengelolaanItem";

function PengelolaanProdukScreen({ navigation }) {

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.replace("Back Home");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.replace("Back Home");
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.replace("Back Home");
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Pengelolaan produk
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Lokasi pengambilan"}
          desc={"Tempat atau lokasi pengambilan permohonan"}
          onPress={() => {
            navigation.push("Produk", { kondisi: "Lokasi" });
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Kategori rencana pembangunan"}
          desc={"Penggolongan jenis rencana pembangunan dalam satu kategori"}
          onPress={() => {
            navigation.push("Produk", { kondisi: "Kategori" });
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Jenis rencana pembangunan"}
          desc={
            "Jenis pembangunan yang direncanakan untuk dibangun oleh pemohon berdasarkan kategori pembangunan"
          }
          onPress={() => {
            navigation.push("Produk", { kondisi: "Jenis" });
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Persyaratan tambahan andalalin"}
          desc={"Persyaratan dokumen permohonan andalalin baru"}
          onPress={() => {
            navigation.push("Produk", { kondisi: "Andalalin" });
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Persyaratan tambahan rambulalin"}
          desc={"Persyaratan dokumen permohonan rambulalin baru"}
          onPress={() => {
            navigation.push("Produk", { kondisi: "Rambulalin" });
          }}
        />
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    padding: 16,
  },
});

export default PengelolaanProdukScreen;
