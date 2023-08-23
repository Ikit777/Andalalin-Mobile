import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ALoading from "../component/utility/ALoading";
import { useStateToggler } from "../hooks/useUtility";
import ADialog from "../component/utility/ADialog";
import { andalalinGetById } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import DetailUser from "../component/detail/DetailUser";
import DetailNonUser from "../component/detail/DetailNonUser";

function DetailPengajuanScreen({ navigation, route }) {
  const [loading, toggleLoading] = useState(true);
  const [gagal, toggleGagal] = useStateToggler();
  const [permohonan, setPermohonan] = useState("permohonan");
  const context = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.navigate("Daftar");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.navigate("Daftar");
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadPermohonan();
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
              setPermohonan(result.data);
              toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadPermohonan();
              } else {
                toggleLoading(false);
              }
            });
            break;
          default:
            toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  const detail = () => {
    if (context.getUser().role === "User"){
      return <DetailUser permohonan={permohonan} />
    }else{
      return <DetailNonUser permohonan={permohonan} navigation={navigation}/>
    }
  }

  return (
    <AScreen>
      <View style={styles.header}>
        <View
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <ABackButton
            onPress={() => {
              navigation.navigate("Daftar");
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Detail permohonan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        {detail()}
      </ScrollView>
      <ADialog
        title={"Memuat permohoman gagal"}
        desc={"Permohonan gagal diload, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.navigate("Daftar");
        }}
      />
      <ALoading visibleModal={loading} />
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

export default DetailPengajuanScreen;
