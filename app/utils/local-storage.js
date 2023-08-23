import AsyncStorage from "@react-native-async-storage/async-storage";

export const store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const get = async (key) => {
  const valueStr = await AsyncStorage.getItem(key);
  const value = JSON.parse(valueStr);

  return value;
};

export const add = async (key, data) => {
  const valueStr = await AsyncStorage.getItem(key);
  let value = JSON.parse(valueStr);
  value.push(data);

  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const merge = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

export const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error(err);
  }
};
