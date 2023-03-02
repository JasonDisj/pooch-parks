import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectTravelTime } from "../slices/navSlice";

const InfoCard = () => {
  const travelTime = useSelector(selectTravelTime);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`items-center`}>
        <Image
          source={require("../assets/images/woof.png")}
          style={styles.image}
        />
      </View>

      <View style={tw`items-center justify-center`}>
        <Text style={tw`text-2xl font-semibold`}>
          Total Distance: {travelTime?.distance.text}
        </Text>
        <Text style={tw`text-2xl font-semibold pt-5`}>
          Travel Time: {travelTime?.duration.text}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  image: {
    width: 183,
    height: 183,
    resizeMode: "contain",
  },
  text: {
    fontFamily: "BungeeShade-Regular",
    fontSize: 33,
  },
});
