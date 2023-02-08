import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectDestination } from "../slices/navSlice";

const NavOptions = () => {
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  return (
    <View style={tw`items-center`}>
      <View>
        <Image
          source={require("../assets/images/home-image.png")}
          style={styles.image}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("LoadingScreen")}
          disabled={!destination}
        >
          <Icon
            raised
            name="paw"
            type="font-awesome"
            size={36}
            color="#DAA520"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  image: {
    width: 370,
    height: 370,
    resizeMode: "contain",
  },
  btn: {
    width: 84,
    height: 84,
    backgroundColor: "#DAA520",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 33,
  },
});
