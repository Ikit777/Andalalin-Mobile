import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADetailView from "../utility/ADetailView";
import { useStateToggler } from "../../hooks/useUtility";
import ALoading from "../utility/ALoading";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";

function DetailNonUser({ permohonan, navigation }) {
  const [loading, toggleLoading] = useStateToggler();
  const context = useContext(UserContext);

  const status = () => {
    switch (permohonan.status_andalalin) {
      case "Persayaratan tidak sesuai":
        return color.error.error50;
      case "Permohonan selesai":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (permohonan.status_andalalin) {
      case "Persayaratan tidak sesuai":
        return color.error.error700;
      case "Permohonan selesai":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
  };

  const tindakan = (onPress) => {
    return (
      <AButton
        title={"Tindakan"}
        mode="contained"
        onPress={() => {
          onPress;
        }}
      />
    );
  };

  const button = () => {
    switch (context.getUser().role) {
      case "Operator":
        switch (permohonan.status_andalalin) {
          case "Cek persyaratan":
            return tindakan();
          case "Persyaratan terpenuhi":
            return tindakan();
          case "Laporan BAP":
            return tindakan();
          case "Pembuatan SK":
            return tindakan();
        }
        break;
      case "Petugas":
        switch (permohonan.status_andalalin) {
            case "Survey lapangan":
              return tindakan();
          }
        break;
      default:
        switch (permohonan.status_andalalin) {
            case "Cek persyaratan":
                return tindakan();
            case "Persyaratan terpenuhi":
                return tindakan();
            case "Survey lapangan":
                return tindakan();
            case "Laporan BAP":
                return tindakan();
            case "Pembuatan SK":
                return tindakan();
          }
        break;
    }
  };

  return (
    <View>
      <ADetailView title={"Jenis permohonan"}>
        <AText
          style={{ padding: 16 }}
          size={12}
          color={color.neutral.neutral900}
          weight="normal"
        >
          {permohonan.jenis_andalalin}
        </AText>
      </ADetailView>

      <ADetailView style={{ marginTop: 20 }} title={"Jenis kegiatan"}>
        <AText
          style={{ padding: 16 }}
          size={12}
          color={color.neutral.neutral900}
          weight="normal"
        >
          {permohonan.jenis_kegiatan}
        </AText>
      </ADetailView>

      <ADetailView style={{ marginTop: 20 }} title={"Peruntukan"}>
        <AText
          style={{ padding: 16 }}
          size={12}
          color={color.neutral.neutral900}
          weight="normal"
        >
          {permohonan.peruntukan}
        </AText>
      </ADetailView>

      <ADetailView style={{ marginTop: 20 }} title={"Informai"}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 14,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Status
          </AText>
          <AText
            style={{
              backgroundColor: status(),
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 15,
            }}
            size={12}
            color={statusText()}
            weight="normal"
          >
            {permohonan.status_andalalin}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Tanggal
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.tanggal_andalalin}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Kode Registrasi
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.kode_andalalin}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Lokasi pengambilan
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.lokasi_pengambilan}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Pemohon
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.nama_pemohon}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Perusahaan
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.nama_perusahaan}
          </AText>
        </View>

        <View style={styles.separator} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Luas lahan
          </AText>
          <AText size={12} color={color.neutral.neutral500} weight="normal">
            {permohonan.luas_lahan}
          </AText>
        </View>
      </ADetailView>

      <ADetailView style={{ marginTop: 20, marginBottom: 20 }} title={"Berkas"}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Tanda terima pendaftaran
          </AText>

          <Pressable style={{ flexDirection: "row", paddingLeft: 4 }} onPress={() => {navigation.push("PDF", {title: "Tanda terima", pdf: permohonan.tanda_terima_pendaftaran})}}>
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
            </AText>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Kartu tanda penduduk
          </AText>

          <Pressable style={{ flexDirection: "row", paddingLeft: 4 }}>
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
            </AText>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Akta pendirian badan
          </AText>

          <Pressable style={{ flexDirection: "row", paddingLeft: 4 }}>
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
            </AText>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <AText size={12} color={color.neutral.neutral900} weight="normal">
            Surat kuasa
          </AText>

          <Pressable style={{ flexDirection: "row", paddingLeft: 4 }}>
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat
            </AText>
          </Pressable>
        </View>
      </ADetailView>
      <View style={{marginBottom: 50}}>
      {button()}
      </View>
      <ALoading visibleModal={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default DetailNonUser;
