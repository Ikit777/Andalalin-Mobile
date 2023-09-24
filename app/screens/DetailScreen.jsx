import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  RefreshControl,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useStateToggler } from "../hooks/useUtility";
import ADialog from "../component/utility/ADialog";
import { andalalinGetById } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import DetailUser from "../component/detail/DetailUser";
import DetailNonUser from "../component/detail/DetailNonUser";
import { useFocusEffect } from "@react-navigation/native";
import ASnackBar from "../component/utility/ASnackBar";

function DetailScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [gagal, toggleGagal] = useStateToggler();
  const [data, setData] = useState("permohonan");

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(40);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-5000);
        back();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-5000);
        back();
        return true;
      });
    }, [data])
  );

  const back = () => {
    switch (context.getUser().role) {
      case "User":
        navigation.replace("Back Daftar");
        break;
      case "Operator":
        if (
          data.status_andalalin == "Permohonan selesai" ||
          data.status_andalalin == "Pemasangan selesai"
        ) {
          navigation.replace("Back Daftar", { kondisi: "Selesai" });
        } else {
          navigation.replace("Back Daftar", { kondisi: "Diajukan" });
        }
        break;
      case "Petugas":
        switch (data.status_andalalin) {
          case "Survei lapangan":
            navigation.replace("Back Daftar", { kondisi: "Survei" });
            break;
          case "Pemasangan sedang dilakukan":
            navigation.replace("Back Daftar", { kondisi: "Pemasangan" });
            break;
          default:
            navigation.replace("Back Daftar", { kondisi: "Survei" });
            break;
        }
        break;
      case "Admin":
        switch (data.status_andalalin) {
          case "Permohonan selesai":
            navigation.replace("Back Daftar", { kondisi: "Selesai" });
            break;
          case "Pemasangan selesai":
            navigation.replace("Back Daftar", { kondisi: "Selesai" });
            break;
          default:
            if (data.jenis_andalalin == "Dokumen analisa dampak lalu lintas") {
              navigation.replace("Back Daftar", { kondisi: "Persetujuan" });
            } else {
              navigation.replace("Back Daftar", { kondisi: "Keputusan" });
            }

            break;
        }
        break;
      case "Dinas Perhubungan":
        if (
          data.status_andalalin == "Permohonan selesai" ||
          data.status_andalalin == "Pemasangan selesai"
        ) {
          navigation.replace("Back Daftar", { kondisi: "Selesai" });
        } else {
          navigation.replace("Back Daftar", { kondisi: "Berlangsung" });
        }
        break;
      case "Super Admin":
        if (
          data.status_andalalin == "Permohonan selesai" ||
          data.status_andalalin == "Pemasangan selesai"
        ) {
          navigation.replace("Back Daftar", { kondisi: "Selesai" });
        } else {
          navigation.replace("Back Daftar", { kondisi: "Diajukan" });
        }
        break;
    }
  };

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    switch (context.getUser().role) {
      case "User":
        loadPermohonan();
        break;
      case "Operator":
        loadPermohonan();
        break;
      case "Petugas":
        loadPermohonan();
        break;
      case "Admin":
        loadPermohonan();
        break;
      case "Dinas Perhubungan":
        loadPermohonan();
        break;
      case "Super Admin":
        loadPermohonan();
        break;
    }
  }, []);

  const loadPermohonan = () => {
    andalalinGetById(
      route.params.id,
      context.getUser().access_token,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.json();
              setData(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadPermohonan();
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
      }
    );
  };

  const detail = () => {
    switch (context.getUser().role) {
      case "User":
        return <DetailUser permohonan={data} navigation={navigation} />;
      case "Operator":
        return <DetailNonUser permohonan={data} navigation={navigation} />;
      case "Petugas":
        return <DetailNonUser permohonan={data} navigation={navigation} />;
      case "Admin":
        return <DetailNonUser permohonan={data} navigation={navigation} />;
      case "Dinas Perhubungan":
        return <DetailNonUser permohonan={data} navigation={navigation} />;
      case "Super Admin":
        return <DetailNonUser permohonan={data} navigation={navigation} />;
    }
  };

  const judul = () => {
    switch (context.getUser().role) {
      case "User":
        return "Detail permohonan";
      case "Operator":
        return "Detail permohonan";
      case "Petugas":
        return "Detail permohonan";
      case "Admin":
        return "Detail permohonan";
      case "Dinas Perhubungan":
        return "Detail permohonan";
      case "Super Admin":
        return "Detail permohonan";
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      switch (context.getUser().role) {
        case "User":
          loadPermohonan();
          break;
        case "Operator":
          loadPermohonan();
          break;
        case "Petugas":
          loadPermohonan();
          break;
        case "Admin":
          loadPermohonan();
          break;
        case "Dinas Perhubungan":
          loadPermohonan();
          break;
        case "Super Admin":
          loadPermohonan();
          break;
      }
    }, 50);
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
              setProgressViewOffset(-5000);
              back();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
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
        {data != "permohonan" ? detail() : ""}
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        {context.isSnackbarVisible ? (
          <ASnackBar
            visible={context.isSnackbarVisible}
            message={context.message}
          />
        ) : (
          ""
        )}
      </View>

      <ADialog
        title={"Permohoman gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.navigate("Daftar");
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default DetailScreen;
