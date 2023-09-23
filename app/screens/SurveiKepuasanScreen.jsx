import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  RefreshControl,
  Pressable,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import APolygon from "../component/utility/APolygon";
import ADetailView from "../component/utility/ADetailView";
import { authRefreshToken } from "../api/auth";
import { andalalinHasilSurveiKepuasan } from "../api/andalalin";
import { UserContext } from "../context/UserContext";
import { useStateToggler } from "../hooks/useUtility";
import ADialog from "../component/utility/ADialog";

function SurveiKepuasanScreen({ navigation }) {
  const context = useContext(UserContext);
  const [kepuasan, setKepuasan] = useState("kepuasan");
  const [komentar, setKomentar] = useState();
  const [hasil, setHasil] = useState();
  const [gagal, toggleGagal] = useStateToggler();

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.replace("Back Home");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.replace("Back Home");
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    context.toggleLoading(true);
    loadKepuasan();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      loadKepuasan();
    }, 50);
  }, []);

  const loadKepuasan = () => {
    andalalinHasilSurveiKepuasan(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            setKepuasan(result.data);
            setHasil(result.data.hasil);
            const data = result.data.komentar.filter((item) => {
              return item.Komentar != "";
            });
            setKomentar(data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadKepuasan();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleGagal();
          break;
      }
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
              navigation.replace("Back Home");
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Survei kepuasan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.primary.primary500]}
            progressViewOffset={progressViewOffset}
          />
        }
      >
        {kepuasan != "kepuasan" ? (
          <View>
            <View
              style={{
                height: 175,
                width: 175,
                alignSelf: "center",
              }}
            >
              <APolygon skor={kepuasan.indeks_kepuasan} />
            </View>
            <AText
              style={{ alignSelf: "center" }}
              size={16}
              color={color.neutral.neutral900}
              weight="semibold"
            >
              Indeks Kepuasan Masyakat
            </AText>

            <ADetailView style={{ marginTop: 32 }} title={"Informasi survei"}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Priode survei
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  {kepuasan.periode}
                </AText>
              </View>

              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Jumlah responden
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  {kepuasan.responden}
                </AText>
              </View>

              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Mutu
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  {kepuasan.mutu}
                </AText>
              </View>

              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Kinerja
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  {kepuasan.kinerja}
                </AText>
              </View>

              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Nilai interval
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  {kepuasan.nilai_interval}
                </AText>
              </View>

              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Apresiasi / Kritik / Saran
                </AText>
                <Pressable
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    navigation.push("Komentar", { komentar: komentar });
                  }}
                >
                  <AText
                    size={14}
                    color={color.neutral.neutral700}
                    weight="semibold"
                  >
                    Lihat
                  </AText>
                </Pressable>
              </View>
            </ADetailView>

            <ADetailView
              style={{ marginTop: 20, marginBottom: 32 }}
              title={"Unsur layanan"}
            >
              {hasil != null
                ? hasil.map((item, index) => (
                    <View key={index}>
                      {index != 0 ? <View style={styles.separator} /> : ""}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 14,
                        }}
                      >
                        <AText
                          size={12}
                          color={color.neutral.neutral900}
                          weight="normal"
                        >
                          {item.Jenis}
                        </AText>
                        <AText
                          size={12}
                          color={color.neutral.neutral900}
                          weight="normal"
                        >
                          {item.Hasil}
                        </AText>
                      </View>
                    </View>
                  ))
                : ""}
            </ADetailView>
          </View>
        ) : (
          ""
        )}
      </ScrollView>

      <ADialog
        title={"Survei kepuasa gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.replace("Back Home");
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default SurveiKepuasanScreen;
