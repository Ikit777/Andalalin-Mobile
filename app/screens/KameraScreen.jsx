import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  Platform,
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

function KameraScreen({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  let cameraRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [flashMode, setFlashMode] = useState("off");
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );

  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isRatioSet) {
        await prepareRatio();
      }
    })();
  }, [isReady]);

  const prepareRatio = async () => {
    setCameraType("back");
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await cameraRef.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
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
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
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
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();

      if (cameraType === "front") {
        photo = await manipulateAsync(
          photo.localUri || photo.uri,
          [{ rotate: 180 }, { flip: FlipType.Vertical }],
          { compress: 1, format: SaveFormat.JPEG }
        );
      }

      // Generate a unique file name
      const fileName = `photo_${Date.now()}.jpeg`;

      // Create a directory for saved images (optional)
      const directory = `${FileSystem.documentDirectory}photos/`;
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      // Build the URI for the saved image
      const uri = `${directory}${fileName}`;

      // Move the photo to the specified URI
      await FileSystem.moveAsync({
        from: photo.uri,
        to: uri,
      });

      // Set the captured photo's URI and name
      setCapturedPhoto({ uri, fileName });
      if (flashMode === "torch") {
        setFlashMode("off");
      }
    }
  };

  return (
    <AScreen>
      {capturedPhoto == null ? (
        <View style={{ backgroundColor: "#000", flex: 1 }}>
          <Camera
            style={{ flex: 1, marginVertical: imagePadding }}
            type={cameraType}
            flashMode={flashMode}
            autoFocus="on"
            focusable
            ref={(r) => {
              cameraRef = r;
            }}
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
      {capturedPhoto && (
        <View style={{ flex: 1 }}>
          <ImageViewer
            imageUrls={[{ url: capturedPhoto.uri }]}
            backgroundColor="transparent"
            renderIndicator={() => null}
            maxOverflow={0}
            saveToLocalByLongPress={false}
          />
        </View>
      )}
    </AScreen>
  );
}

const styles = StyleSheet.create({});

export default KameraScreen;
