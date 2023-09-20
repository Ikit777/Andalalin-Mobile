import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, BackHandler, TouchableOpacity } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";

function KameraScreen({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

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

  if (permission.granted === false) {
    return <Text>No access to camera</Text>;
  }

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      // Generate a unique file name
      const fileName = `photo_${Date.now()}.jpg`;

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
    }
  };

  return (
    <AScreen>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={capturePhoto}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              Take Picture
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {capturedPhoto && (
        <View>
          <Text>URI: {capturedPhoto.uri}</Text>
          <Text>File Name: {capturedPhoto.fileName}</Text>
        </View>
      )}
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default KameraScreen;
