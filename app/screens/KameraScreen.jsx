import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  Platform,
  TouchableHighlight,
  Pressable,
  PermissionsAndroid,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";

function KameraScreen({ navigation, route }) {
  const kondisi = route.params.kondisi;
  const jenis = route.params.jenis;
  const id = route.params.id;
  let cameraRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [flashMode, setFlashMode] = useState("off");
  const [permission, setPermission] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  const [isReady, setIsReady] = useState(false);

  const { setSurvei } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.goBack();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.goBack();
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      (async () => {
        const hasPermission = await hasPermissionCamera();
        setPermission(hasPermission);
      })();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    (async () => {
      if (!isRatioSet) {
        await prepareRatio();
      }
    })();
  }, [isReady]);

  const prepareRatio = async () => {
    setCameraType("back");
    let desiredRatio = "4:3";
    if (Platform.OS === "android" && cameraRef.current) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      desiredRatio = minDistance;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      setImagePadding(remainder);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  const handleFlashMode = () => {
    if (cameraType === "back") {
      if (flashMode === "torch") {
        setFlashMode("off");
      } else if (flashMode === "off") {
        setFlashMode("torch");
      } else {
        setFlashMode("auto");
      }
    }
  };

  const switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();

      if (cameraType === "front") {
        photo = await manipulateAsync(
          photo.localUri || photo.uri,
          [{ rotate: 180 }, { flip: FlipType.Vertical }],
          { compress: 1, format: SaveFormat.JPEG }
        );
      }

      const fileName = `${Date.now()}.jpeg`;

      const directory = `${FileSystem.documentDirectory}photos/`;
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      const uri = `${directory}${fileName}`;

      await FileSystem.moveAsync({
        from: photo.uri,
        to: uri,
      });

      setCapturedPhoto({ uri, fileName });
      if (flashMode === "torch") {
        setFlashMode("off");
      }
    }
  };

  const pilih = () => {
    switch (kondisi) {
      case "foto1":
        setSurvei({
          foto1: capturedPhoto.uri,
          namaFoto1: capturedPhoto.fileName,
        });
        navigation.goBack();
        break;
      case "foto2":
        setSurvei({
          foto2: capturedPhoto.uri,
          namaFoto2: capturedPhoto.fileName,
        });
        navigation.goBack();
        break;
      case "foto3":
        setSurvei({
          foto3: capturedPhoto.uri,
          namaFoto3: capturedPhoto.fileName,
        });
        navigation.goBack();
        break;
    }
  };

  const hasPermissionCamera = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  return (
    <AScreen>
      {capturedPhoto == null &&
      permission != undefined &&
      permission != false ? (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
          <Camera
            style={{ flex: 1, marginVertical: imagePadding }}
            type={cameraType}
            flashMode={flashMode}
            autoFocus="on"
            focusable
            ref={cameraRef}
            onCameraReady={() => {
              setIsReady(true);
            }}
            ratio={ratio}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              padding: 30,
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleFlashMode}
                style={{
                  width: 50,
                  height: 50,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={
                    flashMode == "torch"
                      ? "md-flash-outline"
                      : "md-flash-off-outline"
                  }
                  size={24}
                  color={color.neutral.neutral900}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={capturePhoto}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>

            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={switchCamera}
                style={{
                  width: 50,
                  height: 50,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather
                  name={"refresh-cw"}
                  size={24}
                  color={color.neutral.neutral900}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        ""
      )}
      {capturedPhoto != null &&
      permission != undefined &&
      permission != false ? (
        <View style={{ flex: 1 }}>
          <ImageViewer
            imageUrls={[{ url: capturedPhoto.uri }]}
            backgroundColor="transparent"
            renderIndicator={() => null}
            maxOverflow={0}
            saveToLocalByLongPress={false}
          />
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              alignItems: "center",
              position: "absolute",
              bottom: 30,
              left: 20,
              padding: 16,
              borderRadius: 50,
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCapturedPhoto();
              }}
            >
              <Feather name={"x"} size={24} color={color.neutral.neutral900} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              alignItems: "center",
              position: "absolute",
              bottom: 30,
              right: 20,
              borderRadius: 50,
              padding: 16,
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                pilih();
              }}
            >
              <Feather
                name={"check"}
                size={24}
                color={color.neutral.neutral900}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ""
      )}

      {permission != null ? (
        <ADialog
          title={"Izin kamera"}
          desc={"Izin kamera pada perangkat Anda belum di aktifkan"}
          visibleModal={!permission}
          btnOK={"OK"}
          onPressOKButton={() => {
            setPermission(false);
            navigation.goBack();
          }}
        />
      ) : (
        ""
      )}
    </AScreen>
  );
}

const styles = StyleSheet.create({});

export default KameraScreen;
