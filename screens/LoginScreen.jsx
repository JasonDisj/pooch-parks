import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import tw from "twrnc";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.navigate("HomeScreen");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error =>
        Alert.alert(
          "Please enter a valid email address.\nPasswords must be six or more characters."
        )
      );
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error =>
        Alert.alert(
          "The email or password you entered did not match our records. Please try again."
        )
      );
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 justify-center items-center`}
      behavior="padding"
    >
      <Header />
      <View style={tw`w-4/5`}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        ></TextInput>
      </View>

      <View style={tw`w-3/5 justify-center items-center mt-10`}>
        <TouchableOpacity onPress={handleLogin} style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.btn, tw`bg-white mt-1.5 border-[#DAA520] border-2`]}
        >
          <Text style={[styles.btnText, tw`text-[#DAA520]`]}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#DAA520",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
