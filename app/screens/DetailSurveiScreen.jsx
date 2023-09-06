import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  Pressable,
  ScrollView,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { andalalinGetSurvei } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import ADetailView from "../component/utility/ADetailView";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";

function DetailSurveiScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [surveiGagal, toggleSurveiGagal] = useStateToggler();
  const kondisi = route.params.kondisi;
  const [survei, setSurvei] = useState("survei");

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      back();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      back();
      return true;
    });
  }, []);

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    loadSurvei();
  }, []);

  const back = () => {
    if (context.getUser().role == "Petugas") {
      navigation.replace("Back Daftar", { kondisi: "Detail" });
    } else {
      navigation.goBack();
    }
  };

  const loadSurvei = () => {
    andalalinGetSurvei(
      context.getUser().access_token,
      route.params.id,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              const result = await response.json();
              setSurvei(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadSurvei();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleSurveiGagal();
            break;
        }
      }
    );
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              back();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Detail survei
          </AText>
        </View>
      </View>
      {survei != "survei" ? (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
        >
          {kondisi != "Petugas" ? (
            <ADetailView
              title={"Informasi petugas"}
              style={{ marginBottom: 20 }}
            >
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
                  Nama
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {survei.Petugas}
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
                  Nama
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {survei.EmailPetugas}
                </AText>
              </View>
            </ADetailView>
          ) : (
            ""
          )}
          <ADetailView title={"Foto survei"}>
            {survei.Foto1 != null ? (
              <View>
                <View style={styles.separator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    Foto 1
                  </AText>

                  <Pressable
                    style={{ flexDirection: "row", paddingLeft: 4 }}
                    onPress={() => {
                      navigation.push("Foto", { foto: survei.Foto1 });
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
              </View>
            ) : (
              ""
            )}
            {survei.Foto2 != null ? (
              <View>
                <View style={styles.separator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    Foto 2
                  </AText>

                  <Pressable
                    style={{ flexDirection: "row", paddingLeft: 4 }}
                    onPress={() => {
                      navigation.push("Foto", { foto: survei.Foto2 });
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
              </View>
            ) : (
              ""
            )}
            {survei.Foto3 != null ? (
              <View>
                <View style={styles.separator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    Foto 3
                  </AText>

                  <Pressable
                    style={{ flexDirection: "row", paddingLeft: 4 }}
                    onPress={() => {
                      navigation.push("Foto", { foto: survei.Foto3 });
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
              </View>
            ) : (
              ""
            )}
          </ADetailView>

          <ADetailView style={{ marginTop: 20 }} title={"Lokasi survei"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {survei.Lokasi}
            </AText>
          </ADetailView>

          {survei.Keterangan != "" ? (
            <ADetailView style={{ marginTop: 20 }} title={"Keterangan survei"}>
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {survei.Keterangan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}
        </ScrollView>
      ) : (
        ""
      )}

      <ADialog
        title={"Data survei gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={surveiGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSurveiGagal();
          back();
        }}
      />
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
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default DetailSurveiScreen;
