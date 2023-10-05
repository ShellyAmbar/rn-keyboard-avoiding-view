import {StyleSheet} from "react-native";

const createStyle = ({keyboardHeight}: {keyboardHeight: number}) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    content: {
      paddingBottom: keyboardHeight,
      width: "100%",
    },
  });
export default createStyle;
