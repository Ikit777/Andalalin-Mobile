import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  Pressable,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import ADetailView from "../component/utility/ADetailView";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import {
  andalalinGetDetailUsulan,
  andalalinHapusUsulan,
  andalalinTindakan,
} from "../api/andalalin";
import AButton from "../component/utility/AButton";
import ABottomSheet from "../component/utility/ABottomSheet";
import { RadioButton } from "react-native-paper";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";

function DetailUsulanScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [usulanGagal, toggleUsulanGagal] = useStateToggler();
  const id = route.params.id;
  const [usulan, setUsulan] = useState("usulan");
  const [usulanCheck, setUsulanCheck] = useState();
  const [usulanModal, toggleUsulanModal] = useStateToggler();
  const [confirm, toggleComfirm] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();
  const [hapus, toggleHapus] = useStateToggler();
  const [hapusGagal, toggleHapusGagal] = useStateToggler();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.replace("Back Daftar", { kondisi: "Pengawasan" });
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.replace("Back Daftar", { kondisi: "Pengawasan" });
      return true;
    });
  }, []);

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    loadUsulan();
  }, []);

  const loadUsulan = () => {
    andalalinGetDetailUsulan(context.getUser().access_token, id, (response) => {
      switch (response.status) {
        case 201:
          (async () => {
            const result = await response.json();
            setUsulan(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadUsulan();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleUsulanGagal();
          break;
      }
    });
  };

  const hapus_usulan = () => {
    andalalinHapusUsulan(context.getUser().access_token, id, (response) => {
      switch (response.status) {
        case 201:
          (async () => {
            navigation.replace("Back Daftar", {
              kondisi: "Pengawasan",
            });
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              hapus_usulan();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleHapusGagal();
      }
    });
  };

  const tindakan = () => {
    andalalinTindakan(
      context.getUser().access_token,
      id,
      usulanCheck,
      (response) => {
        switch (response.status) {
          case 201:
            navigation.replace("Back Daftar", {
              kondisi: "Pengawasan",
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                tindakan();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleGagal();
        }
      }
    );
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.replace("Back Daftar", { kondisi: "Pengawasan" });
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Detail usulan
          </AText>
        </View>
      </View>
      {usulan != "usulan" ? (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          persistentScrollbar={true}
        >
          <ADetailView title={"Nama pengusul"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {usulan.nama}
            </AText>
          </ADetailView>
          <ADetailView style={{ marginTop: 20 }} title={"Pertimbangan usulan"}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {usulan.pertimbangan}
            </AText>
          </ADetailView>
          {usulan.keterangan != null ? (
            <ADetailView style={{ marginTop: 20 }} title={"Keterangan usulan"}>
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {usulan.keterangan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          <AButton
            style={{ marginTop: 32 }}
            title={"Tetapkan tindakan"}
            mode="contained"
            onPress={() => {
              toggleUsulanModal();
            }}
          />

          <View
            style={{
              flexDirection: "row",
              paddingTop: 32,
              alignSelf: "center",
            }}
          >
            <AText color={color.neutral.neutral500} size={14} weight="normal">
              Usulan tidak tidak diperlukan
            </AText>

            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                toggleHapus();
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Hapus usulan
              </AText>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        ""
      )}

      <ABottomSheet visible={usulanModal}>
        <View style={{ height: 250 }}>
          <AText
            style={{ paddingBottom: 16 }}
            size={18}
            color={color.neutral.neutral700}
            weight="semibold"
          >
            Penetapan tindakan{"\n"}pelaksanaan survei lapangan
          </AText>

          <RadioButton.Group onValueChange={(value) => setUsulanCheck(value)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton
                label="Tunda"
                value="Tunda"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={usulanCheck === "Tunda" ? "checked" : "unchecked"}
              />
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Tunda pelaksanaan
              </AText>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <RadioButton
                label="Batal"
                value="Batal"
                uncheckedColor={color.neutral.neutral300}
                color={color.primary.primary600}
                status={usulanCheck === "Batal" ? "checked" : "unchecked"}
              />
              <AText
                style={{ paddingLeft: 4 }}
                size={14}
                color={color.neutral.neutral700}
              >
                Batalkan pelaksanaan
              </AText>
            </View>
          </RadioButton.Group>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              position: "absolute",
              bottom: 24,
              right: 16,
            }}
          >
            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                setUsulanCheck(null);
                toggleUsulanModal();
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Batal
              </AText>
            </Pressable>
            <Pressable
              style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
              onPress={() => {
                if (usulanCheck != null) {
                  toggleUsulanModal();
                  toggleComfirm();
                }
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Simpan
              </AText>
            </Pressable>
          </View>
        </View>
      </ABottomSheet>

      <ADialog
        title={"Data usulan gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={usulanGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleUsulanGagal();
          navigation.replace("Back Daftar", { kondisi: "Pengawasan" });
        }}
      />

      <AConfirmationDialog
        title={"Apakah Anda yakin?"}
        desc={"Tindakan akan dikirim"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          setUsulanCheck(null);
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.toggleLoading(true);
          tindakan();
        }}
      />

      <ADialog
        title={"Tindakan gagal dikirim"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <AConfirmationDialog
        title={"Apakah Anda yakin?"}
        desc={"Usulan tindakan akan dihapus"}
        visibleModal={hapus}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleHapus();
        }}
        onPressOKButton={() => {
          toggleHapus();
          context.toggleLoading(true);
          hapus_usulan();
        }}
      />

      <ADialog
        title={"Usulan tindakan gagal dihapus"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={hapusGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
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
    padding: 16,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default DetailUsulanScreen;
