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
import { andalalinGetDokumen } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { WebView } from "react-native-webview";
import * as IntentLauncher from 'expo-intent-launcher';

function PdfViewSreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [data, setData] = useState();
  const [gagal, toggleGagal] = useStateToggler();

  const load = async () => {
    context.toggleLoading(true);
    andalalinGetDokumen(
      route.params.id,
      context.getUser().access_token,
      route.params.dokumen,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;

              switch (result.tipe) {
                case "Pdf":
                  const filePath = `${FileSystem.cacheDirectory}temp.pdf`;

                  await FileSystem.writeAsStringAsync(filePath, result.data, {
                    encoding: FileSystem.EncodingType.Base64,
                  })
                    .then(async () => {
                      setData(filePath);
                    })
                    .catch((error) => {
                      console.error("Error writing file:", error);
                    });
                  break;
                case "Word":
                  const docxPath = `${FileSystem.cacheDirectory}temp.docx`;

                  await FileSystem.writeAsStringAsync(docxPath, result.data, {
                    encoding: FileSystem.EncodingType.Base64,
                  })
                    .then(() => {
                      context.toggleLoading(false);
                      navigation.goBack();
                      setTimeout(() => {
                        FileSystem.getContentUriAsync(docxPath).then(cUri => {
                          IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                            data: cUri,
                            flags: 1,
                          });
                        });
                      }, 300);
                    })
                    .catch((error) => {
                      console.error("Error writing file:", error);
                    });
                  break;
              }
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                getDokumen();
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

export default PdfViewSreen;
