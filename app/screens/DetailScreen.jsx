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
import { andalalinCekSurveiKepuasan, andalalinGetById } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import DetailUser from "../component/detail/DetailUser";
import DetailNonUser from "../component/detail/DetailNonUser";
import { useFocusEffect } from "@react-navigation/native";
import ASnackBar from "../component/utility/ASnackBar";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";

function DetailScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [gagal, toggleGagal] = useStateToggler();
  const [data, setData] = useState("permohonan");

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(40);

  const [surveiDialog, toggleSurveiDialog] = useStateToggler();

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
        navigation.replace("Daftar");
        break;
      case "Operator":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
      case "Petugas":
        switch (data.status_andalalin) {
          case "Survei lapangan":
            navigation.replace("Daftar", { kondisi: "Survei" });
            break;
          case "Pemasangan sedang dilakukan":
            navigation.replace("Daftar", { kondisi: "Pemasangan" });
            break;
          default:
            navigation.replace("Daftar", { kondisi: "Survei" });
            break;
        }
        break;
      case "Admin":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
      case "Dinas Perhubungan":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
      case "Super Admin":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
    }
  };

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    loadPermohonan();
  }, []);

  const cek = (id) => {
    andalalinCekSurveiKepuasan(
      context.getUser().access_token,
      id,
      (response) => {
        switch (response.status) {
          case 200:
            context.toggleLoading(false);
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                cek(id);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleSurveiDialog();
            break;
        }
      }
    );
  };

  const loadPermohonan = () => {
    andalalinGetById(
      route.params.id,
      context.getUser().access_token,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              setData(result.data);
              context.setDetailPermohonan(result.data);

              switch (context.getUser().role) {
                case "User":
                  if (
                    result.data.status_andalalin == "Permohonan selesai" ||
                    result.data.status_andalalin == "Pemasangan selesai"
                  ) {
                    cek(route.params.id);
                  } else {
                    context.toggleLoading(false);
                  }

                  break;
                default:
                  context.toggleLoading(false);
                  break;
              }
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
        return (
          <DetailUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Operator":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Petugas":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Admin":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Dinas Perhubungan":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Super Admin":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
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
      loadPermohonan();
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
            size={20}
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
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          back();
        }}
      />

      <AConfirmationDialog
        title={"Survei kepuasan"}
        desc={"Anda harus menyelesaikan survei kepuasan terlebih dahulu"}
        visibleModal={surveiDialog}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleSurveiDialog();
          back();
        }}
        onPressOKButton={() => {
          toggleSurveiDialog();
          context.clearSurveiKepuasan();
          context.setIndexSurvei(1);
          navigation.push("Survei Kepuasan", { id: route.params.id });
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
