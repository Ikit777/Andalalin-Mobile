import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  SafeAreaView,
  Dimensions,
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

function PdfViewSreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [data, setData] = useState();
  const [gagal, toggleGagal] = useStateToggler();

  const load = async () => {
    const pdfFilePath = `${FileSystem.cacheDirectory}temp.pdf`;

    await FileSystem.writeAsStringAsync(pdfFilePath, route.params.pdf, {
      encoding: FileSystem.EncodingType.Base64,
    });

    setData(pdfFilePath);
  };

  useEffect(() => {
    context.toggleLoading(true);
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {route.params.title}
          </AText>
        </View>
      </View>
      <SafeAreaView style={styles.content}>
        {data != null ? (
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
        ) : (
          ""
        )}
      </SafeAreaView>
      <ADialog
        title={"Berkas gagal dimuat!"}
        desc={"Berkas telah gagal muat, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {navigation.goBack();}}
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
  },
  pdf: {
    flex: 1,
    backgroundColor: "transparent",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default PdfViewSreen;
