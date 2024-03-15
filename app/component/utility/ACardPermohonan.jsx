import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import color from "../../constants/color";
import AText from "./AText";
import { Feather } from "@expo/vector-icons";
function ACardPermohonan({
  status,
  tanggal,
  jenis,
  kode,
  pemohon,
  email,
  alamat,
  style,
  onPress,
  title,
}) {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const statusBg = () => {
    switch (status) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error50;
      case "Kelengkapan tidak terpenuhi":
        return color.error.error50;
      case "Dokumen tidak terpenuhi":
        return color.error.error50;
      case "Permohonan dibatalkan":
        return color.error.error50;
      case "Permohonan ditolak":
        return color.error.error50;
      case "Permohonan ditunda":
        return color.error.error50;
        case "Pemasangan ditunda":
          return color.error.error50;
      case "Permohonan selesai":
        return color.success.success50;
      case "Pemasangan selesai":
        return color.success.success50;
      case "Pengaduan diterima":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (status) {
      case "Persyaratan tidak terpenuhi":
        return color.error.error700;
      case "Kelengkapan tidak terpenuhi":
        return color.error.error700;
      case "Permohonan dibatalkan":
        return color.error.error700;
      case "Dokumen tidak terpenuhi":
        return color.error.error700;
      case "Permohonan ditolak":
        return color.error.error700;
      case "Permohonan ditunda":
        return color.error.error700;
        case "Pemasangan ditunda":
          return color.error.error700;
      case "Permohonan selesai":
        return color.success.success700;
      case "Pemasangan selesai":
        return color.success.success700;
      case "Pengaduan diterima":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
  };

  const tanggalRef = () => {
    for (let i = 0; i <= bulan.length; i++) {
      if (tanggal.includes(bulan[i])) {
        switch (bulan[i]) {
          case "Januari":
            return tanggal.replace(new RegExp(bulan[i]), "Jan");
          case "Februari":
            return tanggal.replace(new RegExp(bulan[i]), "Feb");
          case "Maret":
            return tanggal.replace(new RegExp(bulan[i]), "Mar");
          case "April":
            return tanggal.replace(new RegExp(bulan[i]), "Apr");
          case "Mei":
            return tanggal.replace(new RegExp(bulan[i]), "Mei");
          case "Juni":
            return tanggal.replace(new RegExp(bulan[i]), "Jun");
          case "Juli":
            return tanggal.replace(new RegExp(bulan[i]), "Jul");
          case "Agustus":
            return tanggal.replace(new RegExp(bulan[i]), "Agu");
          case "September":
            return tanggal.replace(new RegExp(bulan[i]), "Sep");
          case "Oktober":
            return tanggal.replace(new RegExp(bulan[i]), "Okt");
          case "November":
            return tanggal.replace(new RegExp(bulan[i]), "Nov");
          case "Desember":
            return tanggal.replace(new RegExp(bulan[i]), "Des");
        }
        break;
      }
    }
  };

  return (
    <View style={[styles.daftar, style]}>
      <View style={styles.child}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AText size={14} color={color.neutral.neutral400} weight="normal">
            {tanggalRef()}
          </AText>
          {status != null ? (
            <AText
              style={{
                backgroundColor: statusBg(),
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 15,
              }}
              size={12}
              color={statusText()}
              weight="normal"
            >
              {status}
            </AText>
          ) : (
            ""
          )}
        </View>
        <View style={styles.separator} />
        <AText
          style={{ paddingTop: 16 }}
          size={14}
          color={color.neutral.neutral800}
          weight="normal"
        >
          {jenis}
        </AText>
        <AText
          style={{ paddingTop: 8 }}
          size={12}
          color={color.neutral.neutral400}
          weight="normal"
        >
          {kode}
        </AText>
        <AText size={12} color={color.neutral.neutral400} weight="normal">
          {pemohon}
        </AText>
        {alamat != null ? (
          <AText size={12} color={color.neutral.neutral400} weight="normal">
            {alamat}
          </AText>
        ) : (
          ""
        )}
        {email != null ? (
          <AText size={12} color={color.neutral.neutral400} weight="normal">
            {email}
          </AText>
        ) : (
          ""
        )}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
            paddingTop: 8,
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
          onPress={onPress}
        >
          <AText size={14} color={color.neutral.neutral700} weight="semibold">
            {title}
          </AText>
          <Feather
            style={{ paddingLeft: 8 }}
            name="arrow-right"
            size={20}
            color={color.primary.primary700}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  daftar: {
    borderRadius: 20,
    shadowColor: "rgba(16, 24, 40, 0.10)",
    elevation: 8,
    paddingVertical: 4,
  },
  child: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: color.text.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
    marginTop: 14,
  },
});

export default ACardPermohonan;
