import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const NavOptions = () => {
  const navigation = useNavigation();

  return (
    // <TouchableOpacity style={tw`pb-10 mb-30`}>
    <View style={tw`pb-10 mb-30`}>
      <Image
        source={require("../assets/images/lets-go.jpeg")}
        style={styles.image}
      />
      <Text style={tw`text-2xl text-center font-semibold`}>Let's Go</Text>
      <TouchableOpacity
        style={tw`items-center`}
        onPress={() => navigation.navigate("MapScreen")}
      >
        <Icon raised name="paw" type="font-awesome" color="#DAA520" />
      </TouchableOpacity>
    </View>
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
});
