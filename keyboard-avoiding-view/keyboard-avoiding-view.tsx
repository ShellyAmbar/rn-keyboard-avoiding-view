import {View, Keyboard, ViewProps} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import createStyle from "./keyboard-avoiding-view.styles";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";

const KeyboardAvoidingView = ({children, style, ...props}: ViewProps) => {
  const height = useRef(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const positionY = useRef(0);
  const styles = createStyle({keyboardHeight: keyboardHeight});

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        const diff = height.current - positionY.current;
        const keyboardHeight1 = e.endCoordinates.height;

        setKeyboardHeight(
          diff - keyboardHeight1 > 0 ? 0 : keyboardHeight1 - diff
        );
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const onSingleTapEvent = (event) => {
    positionY.current = event.nativeEvent.y;
    console.log(event.nativeEvent.y);
  };
  return (
    <GestureHandlerRootView
      onLayout={(e) => {
        if (height.current === 0) {
          height.current = e.nativeEvent.layout.height;
        }
      }}
      style={styles.container}
    >
      <TapGestureHandler onHandlerStateChange={onSingleTapEvent}>
        <View style={styles.content} {...props}>
          {children}
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

export default KeyboardAvoidingView;
