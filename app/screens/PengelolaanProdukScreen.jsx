import React, { useEffect, useContext } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import APengelolaanItem from "../component/utility/APengelolaanItem";
import { UserContext } from "../context/UserContext";

function PengelolaanProdukScreen({ navigation }) {
  const context = useContext(UserContext);

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <ABackButton
            onPress={() => {
              navigation.replace("Back Home");
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Pengelolaan produk
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
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
            const items = context.dataMaster.jenis_rencana.filter(
              (item) => item !== "Lainnya"
            );
            if (items != null) {
              navigation.push("Produk", { kondisi: "Jenis" });
            }
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Kategori perlengkapan lalu lintas"}
          desc={
            "Penggolongan jenis perlengkapan lalu lintas dalam satu kategori"
          }
          onPress={() => {
            navigation.push("Produk", { kondisi: "Kategori perlalin" });
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Jenis perlengkapan lalu lintas"}
          desc={
            "Jenis perlengkapan lalu lintas yang dapat dilakukan oleh pemohon berdasarkan kategori perlengkapan lalu lintas"
          }
          onPress={() => {
            const items = context.dataMaster.kategori_perlengkapan.filter(
              (item) => item !== "Lainnya"
            );
            if (items != null) {
              navigation.push("Produk", { kondisi: "Jenis perlalin" });
            }
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 20 }}
          title={"Persyaratan tambahan andalalin"}
          desc={"Persyaratan tambahan untuk dokumen permohonan andalalin"}
          onPress={() => {
            navigation.push("Produk", { kondisi: "Andalalin" });
          }}
        />
        <APengelolaanItem
          style={{ marginBottom: 32 }}
          title={"Persyaratan tambahan perlalin"}
          desc={"Persyaratan tambahan untuk dokumen permohonan perlalin"}
          onPress={() => {
            navigation.push("Produk", { kondisi: "Perlalin" });
          }}
        />
      </ScrollView>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
  },
});

export default PengelolaanProdukScreen;
