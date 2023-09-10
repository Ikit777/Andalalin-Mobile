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
        if (data.status_andalalin == "Permohonan selesai") {
          navigation.replace("Back Daftar", { kondisi: "Selesai" });
        } else {
          navigation.replace("Back Daftar", { kondisi: "Diajukan" });
        }
        break;
      case "Petugas":
        navigation.replace("Back Daftar", { kondisi: "Survei" });
        break;
      case "Admin":
        if (data.status_andalalin == "Permohonan selesai") {
          navigation.replace("Back Daftar", { kondisi: "Selesai" });
        } else {
          navigation.replace("Back Daftar", { kondisi: "Persetujuan" });
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
      }
    }, 50);
  }, []);

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              setProgressViewOffset(-5000);
              back();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
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
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default DetailScreen;
