import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, FlatList, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ACardPermohonan from "../component/utility/ACardPermohonan";
import {
  andalalinGetByIdUser,
  andalalinGetByTiketLevel1,
} from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import ALoading from "../component/utility/ALoading";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import { Feather } from "@expo/vector-icons";

function DaftarPermohonanScreen({ navigation }) {
  const [loading, toggleLoading] = useState(true);
  const [gagal, toggleGagal] = useStateToggler();
  const [permohonan, setPermohonan] = useState("permohonan");
  const context = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.navigate("Home");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.navigate("Home");
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    switch (context.getUser().role) {
      case "User":
        loadDaftarPermohonan();
        break;
      case "Operator":
        loadDaftarByTiketLevel1();
        break;
      default:
        loadDaftarPermohonan();
        break;
    }
  }, []);

  const loadDaftarPermohonan = () => {
    andalalinGetByIdUser(context.getUser().access_token, (response) => {
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
              loadDaftarPermohonan();
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
    });
  };

  const loadDaftarByTiketLevel1 = () => {
    andalalinGetByTiketLevel1(context.getUser().access_token, (response) => {
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
              loadDaftarByTiketLevel1();
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
    });
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Daftar permohonan
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        {permohonan != "permohonan" ? (
          <FlatList
            data={permohonan}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item }) => (
              <ACardPermohonan
                style={{ marginBottom: 16 }}
                status={item.status_andalalin}
                tanggal={item.tanggal_andalalin}
                jenis={item.jenis_andalalin}
                kode={item.kode_andalalin}
                pemohon={item.nama_pemohon}
                alamat={item.alamat_pemohon}
                title={"Detail"}
                onPress={() => {
                  navigation.push("Detail", { id: item.id_andalalin });
                }}
              />
            )}
          />
        ) : (
          ""
        )}
        {permohonan == null ? (
          <View
            style={{
              alignItems: "center",
              height: "50%",
              justifyContent: "center",
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
              Daftar permohonan
            </AText>
            <AText size={20} color={color.neutral.neutral900} weight="normal">
              Belum ada
            </AText>
          </View>
        ) : (
          ""
        )}
      </View>
      <ADialog
        title={"Memuat permohoman gagal"}
        desc={"Permohonan gagal diload, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.navigate("Home");
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

export default DaftarPermohonanScreen;
