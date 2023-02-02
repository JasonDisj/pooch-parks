import { StyleSheet, Text, View, Image } from "react-native";
import tw from "twrnc";
import { useFonts } from "expo-font";

const Header = () => {
  const [fontsLoaded] = useFonts({
    "BungeeShade-Regular": require("../assets/fonts/BungeeShade-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={tw`flex-row items-center mr-5`}>
      <Image
        source={require("../assets/images/dog-logo2.png")}
        style={{ width: 100, height: 100, resizeMode: "contain" }}
      />

      <Text style={[tw`text-yellow-600 text-center mt-2`, styles.text]}>
        PoochParks
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {
    fontFamily: "BungeeShade-Regular",
    fontSize: 33,
  },
});
