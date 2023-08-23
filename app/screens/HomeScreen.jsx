import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  BackHandler,
  ScrollView,
} from "react-native";
import AScreen from "../component/utility/AScreen";
import AMenuCard from "../component/utility/AMenuCard";
import color from "../constants/color";
import AText from "../component/utility/AText";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { UserContext } from "../context/UserContext";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";

function HomeScreen({ navigation }) {
  const context = useContext(UserContext);
  const [confirm, toggleComfirm] = useStateToggler();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      navigation.removeListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    };
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  const home = () => {
    switch (context.getUser().role) {
      case "User":
        return (
          <View>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Andalalin"}
              desc={"Ajukan permohonan untuk pelaksanaan andalalin"}
              onPress={() => {
                navigation.push("Andalalin");
                context.clear();
                context.setIndex(1);
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"alert-triangle"}
              title={"Rambu lalu lintas"}
              desc={
                "Ajukan permohonan untuk pelaksanaan pengadaan rambu lalu lintas"
              }
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                navigation.push("Daftar");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 50 }}
              icon={"file-text"}
              title={"Survey kepuasa"}
              desc={"Survey kepuasan masyaratan terhadap layanan kami"}
            />
          </View>
        );
      case "Operator":
        return (
          <View>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                navigation.push("Daftar");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"file-text"}
              title={"Daftar survei"}
              desc={"Daftar survei yang dilakukan petugas"}
            />
          </View>
        );
      case "Petugas":
        return (
          <View>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Survei lapangan"}
              desc={"Pengisian data survei lapangan permohonan"}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"file-text"}
              title={"Daftar survei"}
              desc={"Daftar survei yang dilakukan"}
            />
          </View>
        );
      default:
        return (
          <View>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Andalalin"}
              desc={"Ajukan permohonan untuk pelaksanaan andalalin"}
              onPress={() => {
                navigation.push("Andalalin");
                context.clear();
                context.setIndex(1);
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"alert-triangle"}
              title={"Rambu lalu lintas"}
              desc={
                "Ajukan permohonan untuk pelaksanaan pengadaan rambu lalu lintas"
              }
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                navigation.push("Daftar");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 50 }}
              icon={"file-text"}
              title={"Survey kepuasa"}
              desc={"Survey kepuasan masyaratan terhadap layanan kami"}
            />
          </View>
        );
    }
  };

  return (
    <AScreen full statusbar={"light"}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            height: 64,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AText size={16} color={color.text.white} weight="semibold">
            Andalalin
          </AText>
          <View style={{ flexDirection: "row" }}>
            {context.getUser().role == "User" ? (
              <Pressable
                style={{ padding: 8, flexDirection: "row" }}
                onPress={() => {
                  navigation.push("Notifikasi");
                  context.setNotification(false);
                }}
              >
                <Feather name="bell" size={18} color="white" />

                {context.notification ? (
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 15,
                      backgroundColor: color.error.error500,
                    }}
                  />
                ) : (
                  ""
                )}
              </Pressable>
            ) : (
              ""
            )}

            <Pressable
              style={{ alignItems: "center", padding: 8 }}
              onPress={() => {
                navigation.push("Setting");
              }}
            >
              <Feather name="settings" size={18} color="white" />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 36,
            padding: 16,
            backgroundColor: color.text.white,
            marginHorizontal: 16,
            borderRadius: 8,
            marginBottom: 32,
            flexDirection: "row",
            shadowColor: "#101828",
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Image
            style={{
              width: 46,
              height: 46,
              borderRadius: 150 / 2,
              overflow: "hidden",
            }} // Set your desired dimensions
            source={{ uri: `data:image/png;base64,${context.getUser().photo}` }}
          />
          <View style={{ marginLeft: 16 }}>
            <AText size={16} color={color.neutral.neutral900} weight="normal">
              {context.getUser().nama}
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {context.getUser().email}
            </AText>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        {home()}
      </ScrollView>
      <AConfirmationDialog
        title={"Peringatan!"}
        desc={"Apakah Anda yakin ingin keluar"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          BackHandler.exitApp();
          toggleComfirm();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: color.primary.primary500,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#101828",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    paddingTop: 29,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
