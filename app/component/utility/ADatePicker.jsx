import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { poppins } from "../../constants/font";
import CalendarPicker from "react-native-calendar-picker";
import { Feather } from "@expo/vector-icons";

function ADatePicker({
  visibleModal = false,
  onPressOKButton,
  onPressBATALButton,
  pilih,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const [date, setDate] = useState();
  const [selected, setSelected] = useState();

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      setDate(null);
      setSelected(null);
    } else {
      setTimeout(() => setVisible(false), 200);
    }
  };

  const pick = () => {
    if (date != null) {
      pilih(date);
      onPressOKButton();
    }
  };

  const formated = (date) => {
    const date_formated =
      date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);

    return date_formated;
  };

  const onDateChange = (date) => {
    setSelected(date);
    setDate(formated(date.toISOString()));
  };

  const [lastTap, setLastTap] = useState(0);

  const handleDateChange = (date) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      return;
    }

    onDateChange(date);

    setLastTap(now);
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
          <View style={styles.horizontal}>
            <CalendarPicker
              width={340}
              selectedDayStyle={{ backgroundColor: color.primary.primary400 }}
              selectedDayTextStyle={{
                fontFamily: poppins["normal"],
                fontSize: 16,
                color: color.text.white,
              }}
              textStyle={{
                fontFamily: poppins["normal"],
                fontSize: 16,
                color: color.primary.primary700,
              }}
              previousComponent={
                <Feather
                  name="chevron-left"
                  size={30}
                  color={color.primary.primary400}
                />
              }
              nextComponent={
                <Feather
                  name="chevron-right"
                  size={30}
                  color={color.primary.primary400}
                />
              }
              selectYearTitle="Pilih tahun"
              selectMonthTitle="Pilih bulan pada tahun "
              monthTitleStyle={{
                fontFamily: poppins["semibold"],
                fontSize: 20,
                color: color.primary.primary700,
              }}
              yearTitleStyle={{
                fontFamily: poppins["semibold"],
                fontSize: 20,
                color: color.primary.primary700,
              }}
              weekdays={["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]}
              months={[
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
              ]}
              selectedStartDate={selected != null ? selected : undefined}
              enableDateChange={true}
              onDateChange={handleDateChange}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                paddingRight: 16,
              }}
            >
              <TouchableOpacity
                style={{ paddingVertical: 14 }}
                onPress={onPressBATALButton}
              >
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </TouchableOpacity>

              <TouchableOpacity style={{ paddingVertical: 14 }} onPress={pick}>
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  Pilih
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
    paddingTop: 10,
    backgroundColor: color.primary.primary50,
  },
});

export default ADatePicker;
