import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  Pressable,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ANotificationCard from "../component/utility/ANotificationCard";
import { Feather } from "@expo/vector-icons";
import { clearnotifikasiByIdUser, notifikasiByIdUser } from "../api/user";
import { UserContext } from "../context/UserContext";
import ALoading from "../component/utility/ALoading";
import { authRefreshToken } from "../api/auth";
import { useStateToggler } from "../hooks/useUtility";
import ADialog from "../component/utility/ADialog";
import { MaterialIcons } from "@expo/vector-icons";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";

function NotifikasiScreen({ navigation }) {
  const [notification, setNotification] = useState("notifikasi");
  const [loading, toggleLoading] = useState(true);
  const context = useContext(UserContext);
  const [gagal, toggleGagal] = useStateToggler();
  const [dataOn, setDataOn] = useState(false);
  const [confirmasi, toggleComfirmasi] = useStateToggler();
  const [hapusGagal, toggleHapusGagal] = useStateToggler();

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

  const loadNotif = async () => {
    notifikasiByIdUser(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            if (result.results == 0) {
              setDataOn(true);
              toggleLoading(false);
            } else {
              setNotification(result.data);
              setDataOn(false);
              toggleLoading(false);
            }
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadNotif();
            } else {
              toggleLoading(false);
            }
          });
          break;
        default:
          toggleLoading(false);
          toggleGagal();
          break;
      }
    });
  };

  useEffect(() => {
    loadNotif();
  }, []);

  const clear = () => {
    clearnotifikasiByIdUser(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 201:
          setNotification("notifikasi");
          loadNotif();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              clear();
            } else {
              toggleLoading(false);
            }
          });
          break;
        default:
          toggleLoading(false);
          toggleHapusGagal();
          break;
      }
    });
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Notifikasi
          </AText>
        </View>
        { notification != "notifikasi" ? (<Pressable
          style={{ marginRight: 8, padding: 8 }}
          onPress={() => {
            toggleComfirmasi();
          }}
        >
          <MaterialIcons
            name="clear"
            size={28}
            color={color.neutral.neutral900}
          />
        </Pressable>) : ("")}
      </View>
      <View style={styles.content}>
        {notification != "notifikasi" ? (
          <FlatList
            data={notification}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            renderItem={({ item }) => (
              <ANotificationCard
                style={{ marginBottom: 16 }}
                title={item.Title}
                desc={item.Body}
              />
            )}
          />
        ) : (
          ""
        )}

        {dataOn ? (
          <View
            style={{
              alignItems: "center",
              height: "80%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderColor: color.primary.primary50,
                borderWidth: 8,
                borderRadius: 40,
                backgroundColor: color.primary.primary100,
              }}
            >
              <Feather
                style={{ padding: 14 }}
                name="frown"
                size={28}
                color={color.primary.main}
              />
            </View>
            <AText
              style={{ paddingTop: 16 }}
              size={20}
              color={color.neutral.neutral900}
              weight="normal"
            >
              Notifikasi
            </AText>
            <AText size={20} color={color.neutral.neutral900} weight="normal">
              Belum ada
            </AText>
          </View>
        ) : (
          ""
        )}
      </View>
      <ADialog
        title={"Memuat notifikasi gagal"}
        desc={"Notifikasi gagal diload, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.navigate("Home");
        }}
      />
      <ADialog
        title={"Hapus notifikasi gagal"}
        desc={"Notifikasi gagal dihapus, silahkan coba lagi"}
        visibleModal={hapusGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleHapusGagal();
        }}
      />
      <AConfirmationDialog
        title={"Hapus notifikasi?"}
        desc={"Apakah Anda yakin menghapus notifikasi?"}
        visibleModal={confirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirmasi();
        }}
        onPressOKButton={() => {
          toggleLoading(true);
          clear();
          toggleComfirmasi();
        }}
      />
      <ALoading visibleModal={loading} />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    padding: 16,
    marginBottom: 50,
  },
});

export default NotifikasiScreen;
