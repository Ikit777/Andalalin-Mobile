import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  SafeAreaView,
  Dimensions,
  Linking,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import Pdf from "react-native-pdf";
import * as FileSystem from "expo-file-system";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";

function PdfSreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [data, setData] = useState();
  const [gagal, toggleGagal] = useStateToggler();

  const load = async () => {
    const filePath = `${FileSystem.cacheDirectory}temp.pdf`;

    await FileSystem.writeAsStringAsync(filePath, route.params.dokumen, {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then(async () => {
        setData(filePath);
      })
      .catch((error) => {
        console.error("Error writing file:", error);
      });
  };

  useEffect(() => {
    load();
  }, []);

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
          <AText size={24} color={color.neutral.neutral900} weight="normal">
            Berkas
          </AText>
        </View>
      </View>
      <SafeAreaView style={styles.content}>
        {data && (
          <Pdf
            trustAllCerts={false}
            source={{ uri: data, cache: true }}
            style={styles.pdf}
            onLoadComplete={() => {
              context.toggleLoading(false);
            }}
            onError={() => {
              context.toggleLoading(false);
              toggleGagal();
            }}
          />
        )}
      </SafeAreaView>
      <ADialog
        title={"Berkas gagal dimuat!"}
        desc={"Berkas telah gagal muat, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          navigation.goBack();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    backgroundColor: "transparent",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default PdfSreen;
