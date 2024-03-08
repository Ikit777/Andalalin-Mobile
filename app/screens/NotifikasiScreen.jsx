import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ANotificationCard from "../component/utility/ANotificationCard";
import { Feather } from "@expo/vector-icons";
import { clearnotifikasiByIdUser, notifikasiByIdUser } from "../api/user";
import { UserContext } from "../context/UserContext";
import { authRefreshToken } from "../api/auth";
import { useStateToggler } from "../hooks/useUtility";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";

function NotifikasiScreen({ navigation }) {
  const [notification, setNotification] = useState("notifikasi");
  const context = useContext(UserContext);
  const [gagal, toggleGagal] = useStateToggler();
  const [dataOn, setDataOn] = useState(false);
  const [confirmasi, toggleComfirmasi] = useStateToggler();
  const [hapusGagal, toggleHapusGagal] = useStateToggler();

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-1000);
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-1000);
      navigation.goBack();
      return true;
    });
  }, []);

  const loadNotif = async () => {
    notifikasiByIdUser(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            if (result.results == 0) {
              setDataOn(true);
              context.toggleLoading(false);
            } else {
              setNotification(result.data);
              setDataOn(false);
              context.toggleLoading(false);
            }
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadNotif();
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleGagal();
          break;
      }
    });
  };

  useEffect(() => {
    context.toggleLoading(true);
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
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleHapusGagal();
          break;
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      loadNotif();
    }, 50);
  }, []);

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
              setProgressViewOffset(-1000);
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 4}}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Notifikasi
          </AText>
          {notification != "notifikasi" ? (
          <TouchableOpacity
            style={{ marginRight: 8, padding: 8, position: "absolute", right: 0 }}
            onPress={() => {
              toggleComfirmasi();
            }}
          >
            <Feather name="x" size={28} color={color.neutral.neutral900} />
          </TouchableOpacity>
        ) : (
          ""
        )} 
        </View>
       
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[color.primary.primary500]}
                progressViewOffset={progressViewOffset}
              />
            }
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
        desc={"Notifikasi gagal dimuat, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.goBack();
        }}
      />
      <ADialog
        title={"Hapus notifikasi gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
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
        toggleVisibleModal={toggleComfirmasi}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirmasi();
        }}
        onPressOKButton={() => {
          context.toggleLoading(true);
          clear();
          toggleComfirmasi();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default NotifikasiScreen;
