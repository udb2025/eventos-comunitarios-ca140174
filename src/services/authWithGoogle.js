import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "1088351713286-h9nsfam7qfcpp59cfbg9eovf6qd9b0q7.apps.googleusercontent.com",    
    webClientId: "1088351713286-h9nsfam7qfcpp59cfbg9eovf6qd9b0q7.apps.googleusercontent.com",
    iosClientId: "1088351713286-h9nsfam7qfcpp59cfbg9eovf6qd9b0q7.apps.googleusercontent.com",
    androidClientId: "1088351713286-h9nsfam7qfcpp59cfbg9eovf6qd9b0q7.apps.googleusercontent.com",
    useProxy: true,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return {
    signInWithGoogle: () => promptAsync(),
    loading: !request,
  };
}
