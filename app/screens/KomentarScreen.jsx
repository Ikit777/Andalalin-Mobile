import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { Feather } from "@expo/vector-icons";
import ADetailView from "../component/utility/ADetailView";

function KomentarScreen({ navigation, route }) {
  const [komentar, setKomentar] = useState(route.params.komentar);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

  useEffect(() => {
    if (komentar.length == 0) {
      setKomentar(null);
    }
    console.log(komentar);
  }, []);

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
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Masukkan
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        {komentar != null ? (
          <FlatList
            data={komentar}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item, index }) => (
              <View key={index}>
                <ADetailView style={{ marginBottom: 20 }} title={item.Nama}>
                  <AText
                    style={{ padding: 16 }}
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    {item.Komentar}
                  </AText>
                </ADetailView>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
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
              Apresiasi / Kritik / Saran
            </AText>
            <AText size={20} color={color.neutral.neutral900} weight="normal">
              Belum ada
            </AText>
          </View>
        )}
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    height: "100%",
  },
});

export default KomentarScreen;
