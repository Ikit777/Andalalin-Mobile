import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ImageViewer from "react-native-image-zoom-viewer";

function FotoViewScreen({ navigation, route }) {
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

  const images = [
    {
      url: `data:image/png;base64,${route.params.foto}`,
    },
  ];

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
          <AText
            style={{ paddingLeft: 4}}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Foto
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        <ImageViewer
          imageUrls={images}
          backgroundColor="transparent"
          renderIndicator={() => null}
          maxOverflow={0}
          saveToLocalByLongPress={false}
        />
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    backgroundColor: "transparent",
    flex: 1,
  },
});

export default FotoViewScreen;
