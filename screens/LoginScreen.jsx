import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      style={tw`flex-1 justify-center items-center`}
      behavior="padding"
    >
      <View style={tw`w-4/5`}>
        <TextInput placeholder="Email" style={styles.input}>
          LoginScreen
        </TextInput>
        <TextInput placeholder="Password" style={styles.input} secureTextEntry>
          LoginScreen
        </TextInput>
      </View>

      <View style={tw`w-3/5 justify-center items-center mt-10`}>
        <TouchableOpacity onPress={() => {}} style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
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
