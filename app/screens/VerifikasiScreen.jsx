import React, { useState, Fragment, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, BackHandler } from "react-native";
import AScreen from "../component/utility/AScreen";
import AText from "../component/utility/AText";
import AButton from "../component/utility/AButton";
import color from "../constants/color";
import { poppins } from "../constants/font";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import { authVerification, authResendVerication } from "../api/auth";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

function VerifikasiScreen({ navigation, route }) {
  const [value, setValue] = useState("000000");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT, setIsFull });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isFull, setIsFull] = useState(false);
  const [berhasil, toggleBerhasil] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();
  const [code, toggleCode] = useStateToggler();
  const [resendBerhasil, toggleResendBerhasil] = useStateToggler();
  const [resendGagal, toggleResendGagal] = useStateToggler();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      navigation.removeListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    };
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  const handleFulfill = (code) => {
    if (code.length === CELL_COUNT) {
      setIsFull(true);
    }
  };

  const verification = (code) => {
    context.toggleLoading(true);

    authVerification(code, (response) => {
      if (response.status === 200) {
        context.toggleLoading(false);
        toggleBerhasil();
      } else {
        context.toggleLoading(false);
        toggleGagal();
      }
    });
  };

  const resend = (email) => {
    context.toggleLoading(true);
    authResendVerication(email, (response) => {
      if (response.status === 201) {
        context.toggleLoading(false);
        toggleResendBerhasil();
      } else {
        context.toggleLoading(false);
        toggleResendGagal();
      }
    });
  };

  return (
    <AScreen>
      <View style={styles.content}>
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Kode verifikasi
        </AText>
        <AText
          style={{ paddingBottom: 32 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Kami sudah mengirim kode verifikasi anda ke{" "}
          {route.params.email.toLowerCase()}
        </AText>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={(code) => {
            setValue(code);
            handleFulfill(code);
          }}
          selectionColor={color.neutral.neutral400}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Fragment key={index}>
              <Text
                key={`value-${index}`}
                style={[
                  styles.cell,
                  isFocused && styles.focusCell,
                  isFull && styles.full,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
              {index === 2 ? (
                <View key={`separator-${index}`} style={styles.separator} />
              ) : null}
            </Fragment>
          )}
        />

        <AButton
          style={styles.verif}
          mode="contained"
          title="Verifikasi akun"
          onPress={() => {
            if (value != "000000") {
              verification(value);
            } else {
              toggleCode();
            }
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
            Tidak menerima kode?
          </AText>

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              resend(route.params.email.toLowerCase());
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Kirim ulang
            </AText>
          </Pressable>
        </View>
      </View>
      <ADialog
        title={"Verifikasi berhasil"}
        desc={"Akun Anda berhasil kami verifikasi, silahkan login"}
        visibleModal={berhasil}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleBerhasil();
          navigation.navigate("Login");
        }}
      />
      <ADialog
        title={"Verifikasi gagal"}
        desc={
          "Kode verifikasi yang Anda masukkan salah, silahkan masukkan kode yang benar"
        }
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />
      <ADialog
        title={"Peringatan!"}
        desc={"Kode verifikasi Anda kosong"}
        visibleModal={code}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleCode();
        }}
      />
      <ADialog
        title={"Kirim ulang berhasil"}
        desc={"Kode verifikasi berhasil dirim ulang ke email Anda"}
        visibleModal={resendBerhasil}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResendBerhasil();
        }}
      />
      <ADialog
        title={"Kirim ulang gagal"}
        desc={"Akun Anda tidak terdaftar"}
        visibleModal={resendGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResendGagal();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 80,
  },
  codeFieldRoot: {},
  cell: {
    width: 44,
    height: 44,
    lineHeight: 38,
    padding: 8,
    fontSize: 30,
    borderWidth: 1,
    fontFamily: poppins.normal,
    borderRadius: 8,
    borderColor: color.neutral.neutral300,
    backgroundColor: color.text.white,
    textAlign: "center",
    color: color.neutral.neutral300,
  },
  separator: {
    height: 4,
    width: 15,
    backgroundColor: color.neutral.neutral300,
    alignSelf: "center",
  },
  focusCell: {
    borderColor: color.neutral.neutral600,
  },
  full: {
    borderColor: color.neutral.neutral600,
    color: color.neutral.neutral700,
  },
  verif: {
    marginTop: 32,
  },
});

export default VerifikasiScreen;
