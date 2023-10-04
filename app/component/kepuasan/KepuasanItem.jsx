import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AText from "../utility/AText";
import ATextInput from "../utility/ATextInput";
import AButton from "../utility/AButton";
import AConfirmationDialog from "../utility/AConfirmationDialog";
import ADialog from "../utility/ADialog";
import SaranKritik from "./SaranKritik";

export default function KepuasanItem({ navigation, route }) {
  const { kepuasan, setKepuasan } = useContext(UserContext);
  const context = useContext(UserContext);
  const index = route.params.index;
  const id = route.params.id;

  const nilai = (jenis) => {
    item = kepuasan.find((item) => item.Jenis == jenis);

    return item.Nilai;
  };

  const update_nilai = (jenis, nilai) => {
    itemIndeks = kepuasan.findIndex((item) => item.Jenis == jenis);
    const updatedItem = { ...kepuasan[itemIndeks], Nilai: nilai };

    const updatedItems = [...kepuasan];
    updatedItems[itemIndeks] = updatedItem;

    setKepuasan(updatedItems);
  };

  function Pertanyaan1() {
    const jenis = "Persyaratan pelayanan";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana kejelasan persyaratan pada aplikasi Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan2() {
    const jenis = "Prosedur pelayanan";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana prosedur pelayanan pada aplikasi Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan3() {
    const jenis = "Waktu pelayanan";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana waktu pelayanan pada aplikasi Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan4() {
    const jenis = "Biaya / tarif pelayanan";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana biaya atau tarif pelayanan pada aplikasi Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan5() {
    const jenis = "Produk pelayanan";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana produk pelayanan yang terdapat pada aplikasi Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan6() {
    const jenis = "Kompetensi pelaksana";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana kompetensi dari pelaksanaan layanan pada aplikasi Andalalin
          ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan7() {
    const jenis = "Perilaku / sikap petugas";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana perilaku atau sikap petugas terhadap layanan pada aplikasi
          Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan8() {
    const jenis = "Maklumat pelayanan";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana maklumat pelayanan pada aplikasi Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  function Pertanyaan9() {
    const jenis = "Ketersediaan sarana pengaduan";
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.primary.primary25,
        }}
      >
        <AText
          style={{ paddingTop: 16 }}
          size={16}
          color={color.neutral.neutral900}
          weight="normal"
        >
          Bagaimana ketersediaan sarana pengaduan pada aplikasi Andalalin ini?
        </AText>

        <View style={{ paddingTop: 32, flexDirection: "column" }}>
          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Sangat baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            underlayColor={color.neutral.neutral50}
            onPress={() => {
              update_nilai(jenis, "Sangat baik");
            }}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Sangat baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Sangat baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Kurang baik" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Kurang baik");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Kurang baik"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Kurang baik
            </AText>
          </TouchableHighlight>

          <TouchableHighlight
            style={{
              backgroundColor: color.primary.primary50,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: nilai(jenis) == "Buruk" ? 2 : 0,
              borderColor: color.primary.primary600,
              marginBottom: 16,
            }}
            onPress={() => {
              update_nilai(jenis, "Buruk");
            }}
            underlayColor={color.neutral.neutral50}
          >
            <AText
              style={{
                paddingLeft: 4,
              }}
              size={14}
              color={
                nilai(jenis) == "Buruk"
                  ? color.primary.primary600
                  : color.neutral.neutral700
              }
              weight="semibold"
            >
              Buruk
            </AText>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  const renderItem = () => {
    switch (index) {
      case 1:
        return <Pertanyaan1 />;
      case 2:
        return <Pertanyaan2 />;
      case 3:
        return <Pertanyaan3 />;
      case 4:
        return <Pertanyaan4 />;
      case 5:
        return <Pertanyaan5 />;
      case 6:
        return <Pertanyaan6 />;
      case 7:
        return <Pertanyaan7 />;
      case 8:
        return <Pertanyaan8 />;
      case 9:
        return <Pertanyaan9 />;
      case 10:
        return <SaranKritik id={id} navigation={navigation} />;
    }
  };

  return <View style={styles.container}>{renderItem()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary.primary25,
  },
});
