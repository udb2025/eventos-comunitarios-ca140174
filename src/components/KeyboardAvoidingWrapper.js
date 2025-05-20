import React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export default function KeyboardAvoidingWrapper({ children, style }) {
  const isWeb = Platform.OS === "web";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={!isWeb ? Keyboard.dismiss : undefined}>
        <View style={[{ flex: 1 }, style]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
