import React, { useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../../context/UserContext";

function AJalan({
  visibleModal = false,
  onPressBATALButton,
  btnBATAL,
  master,
  selected,
  selectedName,
  pilihan,
  id,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const list = useRef(null);

  const [tahap, setTahap] = React.useState();

  const [data, setData] = React.useState();
  const context = useContext(UserContext);

  

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      context.toggleLoading(true);
      setTimeout(() => {
        context.toggleLoading(false);
      }, 1500);
      setVisible(true);
      
    } else {
      setTimeout(() => setVisible(false), 200);
      
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setTahap("Kelurahan");

      let kel = master.kelurahan.filter((item) => {
        return item.IdKecamatan == id;
      });

      setData(kel);
    }, 500);
  }, [visibleModal]);

  const reset = () => {
    list.current.scrollToOffset({ animated: false, offset: 0 });
  };

  const press = (kelurahan) => {
    switch (tahap) {
      case "Kelurahan":
        reset();
        setTahap("Jalan");
        let jalan = master.jalan.filter((item) => {
          return item.Kelurahan.toLowerCase() == kelurahan.toLowerCase();
        });

        if (jalan != null) {
          let jalan_item = jalan.map((item) => {
            return { Id: item.KodeJalan, Name: item.Nama };
          });
          setData(jalan_item);
        }
        break;
    }
  };

  const batalPress = () => {
    setData(null);
    onPressBATALButton();
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
      onRequestClose={() => {
        onPressBATALButton();
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => {
          onPressBATALButton();
        }}
      >
        <TouchableWithoutFeedback>
          <View style={[styles.horizontal, { height: "60%" }]}>
            <AText color={color.neutral.neutral900} size={18} weight="semibold">
              Jalan
            </AText>

            <View style={styles.separator} />

            <AText
              style={{ paddingTop: 8 }}
              color={color.neutral.neutral900}
              size={14}
              weight="normal"
            >
              {tahap}
            </AText>

            <FlatList
              ref={list}
              overScrollMode="never"
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              vertical
              data={data}
              style={{ maxHeight: "65%", paddingVertical: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 5,
                  }}
                  onPress={() => {
                    if (tahap == "Kelurahan") {
                      press(item.Name);
                    }
                  }}
                >
                  <AText
                    style={{ paddingVertical: 6, maxWidth: "70%" }}
                    size={14}
                    color={color.neutral.neutral900}
                  >
                    {item.Name}
                  </AText>

                  {tahap == "Jalan" ? (
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() => {
                        pilihan();
                        selected(item.Id);
                        selectedName(item.Name)
                      }}
                    >
                      <Feather
                        name="more-vertical"
                        size={20}
                        color={color.neutral.neutral900}
                      />
                    </TouchableOpacity>
                  ) : (
                    ""
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.Id.toString()}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                position: "absolute",
                bottom: 24,
                right: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  batalPress();
                }}
              >
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  {btnBATAL}
                </AText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 31,
  },
  horizontal: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: color.primary.primary50,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral100,
    alignSelf: "center",
    marginVertical: 3,
  },
});

export default AJalan;
