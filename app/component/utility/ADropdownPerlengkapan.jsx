import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import AText from "./AText";
import color from "../../constants/color";
import { Feather } from "@expo/vector-icons";
import { useStateToggler } from "../../hooks/useUtility";
import { poppins } from "../../constants/font";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ADropDownPerlengkapan({
  judul,
  hint,
  data,
  saved,
  selected,
  padding,
  bdColor,
  notFound,
  kategori,
  setData,
  dataDefault,
  rambuSelect,
  rambulalin,
  imageRambu,
  wajib,
}) {
  const [open, setOpen] = useStateToggler();
  const [value, setValue] = useState();
  const [rambu, setRambu] = useState();
  const [load, toggleLoad] = useState(false);
  const [pencarian, setPencarian] = useState();
  const [viewHeight, setViewHeight] = useState();

  const toggleView = () => {
    const linearConfig = LayoutAnimation.create(
      300, // Duration in milliseconds
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity
    );

    LayoutAnimation.configureNext(linearConfig);
    setOpen();
  };

  useEffect(() => {
    if (rambulalin == "") {
      setRambu();
    } else {
      setRambu(rambulalin);
    }

    setValue(saved);
    selected(saved);
  }, [saved]);

  useEffect(() => {
    toggleLoad(false);
  }, [kategori]);

  const handleAllItemsRendered = () => {
    setTimeout(() => {
      toggleLoad(true);
    }, 1500);
  };

  const search = (perlengkapan) => {
    if (perlengkapan) {
      const newData = dataDefault.filter(function (item) {
        return item.value.toLowerCase().indexOf(perlengkapan.toLowerCase()) > -1;
      });
      setData(newData);
      setPencarian(perlengkapan);
    } else {
      setData(dataDefault);
      setPencarian(perlengkapan);
    }
  };

  const onViewLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    setViewHeight(height);
  };

  const getMax = () => {
    return (
      <View
        onLayout={onViewLayout}
        style={{
          paddingTop: 10,
          paddingBottom: 6,
          position: "absolute",
          backgroundColor: color.text.trans,
        }}
      >
        {data.map(
          (item, index) =>
            index < 6 && (
              <TouchableOpacity
                style={{ backgroundColor: color.text.trans }}
                key={index}
                disabled
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 6,
                  }}
                >
                  <View
                    style={{
                      height: 40,
                    }}
                  />
                  <AText
                    style={{ paddingLeft: 8, width: "90%" }}
                    size={16}
                    color={color.text.trans}
                  >
                    {item.value}
                  </AText>
                </View>
              </TouchableOpacity>
            )
        )}
      </View>
    );
  };

  return (
    <View style={{ paddingTop: padding }}>
      {judul != null ? (
        <AText
          style={{ paddingBottom: 6 }}
          color={color.neutral.neutral700}
          size={14}
        >
          {judul}{" "}
          <AText color={color.error.error500} size={14}>
            {wajib}
          </AText>
        </AText>
      ) : (
        ""
      )}

      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: bdColor,
          backgroundColor: color.text.white,
        }}
      >
        {open ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name="search"
                size={20}
                color={color.neutral.neutral900}
              />
              <TextInput
                style={{
                  paddingLeft: 8,
                  fontFamily: poppins.normal,
                  fontSize: 16,
                  width: "85%",
                }}
                placeholderTextColor={color.neutral.neutral500}
                onChangeText={(value) => {
                  if (dataDefault != "") {
                    search(value);
                  }
                }}
                allowFontScaling={false}
                value={pencarian}
                autoCapitalize="none"
                placeholder="Pencarian"
                keyboardType="default"
                selectionColor={color.neutral.neutral400}
                autoComplete="off"
                textAlignVertical="top"
                returnKeyType="search"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                setPencarian();
                setData(dataDefault);
                toggleView();
              }}
            >
              <Feather name="x" size={20} color={color.neutral.neutral900} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => {
              toggleView();
              toggleLoad(false);
            }}
          >
            {rambu != null ? (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                }}
                source={{
                  uri: `data:image/png;base64,${rambu}`,
                }}
              />
            ) : (
              ""
            )}

            <AText
              style={{ width: "75%" }}
              size={16}
              color={
                value == ""
                  ? color.neutral.neutral500
                  : color.neutral.neutral900
              }
            >
              {value == "" ? hint : value}
            </AText>

            <Feather
              name="chevron-down"
              size={20}
              color={color.neutral.neutral900}
            />
          </TouchableOpacity>
        )}
      </View>

      {open && (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 10,
            borderColor: color.neutral.neutral300,
          }}
        >
          {data.length != 0 ? getMax() : ""}
          <ScrollView
            style={{
              borderRadius: 8,
              backgroundColor: color.text.white,
              maxHeight: viewHeight,
            }}
            onContentSizeChange={handleAllItemsRendered}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 14,
              overflow: "hidden",
            }}
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
            nestedScrollEnabled={true}
          >
            {!load ? (
              <View>
                <ActivityIndicator
                  size="large"
                  color={color.primary.primary500}
                  style={{
                    padding: 12,
                    borderRadius: 12,
                  }}
                />
              </View>
            ) : data.length != 0 ? (
              data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    toggleView();
                    setPencarian();
                    setData(dataDefault);
                    setValue(item.value);
                    setRambu(item.rambu);
                    rambuSelect(item.rambu);
                    selected(item.value);
                  }}
                  onLongPress={() => {
                    imageRambu(`data:image/png;base64,${item.rambu}`);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 6,
                    }}
                  >
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: "contain",
                      }}
                      source={{
                        uri: `data:image/png;base64,${item.rambu}`,
                      }}
                    />
                    <AText
                      style={{ paddingLeft: 8, width: "90%" }}
                      size={16}
                      color={color.neutral.neutral900}
                    >
                      {item.value}
                    </AText>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View>
                <AText
                  style={{ paddingVertical: 7 }}
                  size={16}
                  color={color.neutral.neutral900}
                >
                  {kategori == "" ? notFound : "Perlengkapan tidak ditemukan"}
                </AText>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default ADropDownPerlengkapan;
