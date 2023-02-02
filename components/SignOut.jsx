import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const SignOut = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={tw`justify-center items-center pt-20`}>
      {/* <Text>{auth.currentUser?.email}</Text> */}
      <TouchableOpacity onPress={handleSignOut} style={styles.btn}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignOut;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#DAA520",
    width: "30%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
