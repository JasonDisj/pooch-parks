import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import tw from "twrnc";
import DirectionMap from "../components/DirectionMap";
import BtnOnDirection from "../components/BtnOnDirection";
import { useSelector } from "react-redux";
import { selectTravelTime } from "../slices/navSlice";

const DirectionScreen = () => {
  const travelTime = useSelector(selectTravelTime);

  return (
    <View style={tw`flex-1 bg-[#DAA520]`}>
      <BtnOnDirection />

      <SafeAreaView style={tw`z-50`}>
        <View style={tw`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
          <View style={tw`flex-row justify-between`}>
            <View>
              <Text style={tw`text-lg text-gray-400`}>Total Distance</Text>
              <Text style={tw`text-2xl font-bold`}>
                {travelTime?.distance.text}
              </Text>
              <Text style={tw`text-lg text-gray-400`}>Travel Time</Text>
              <Text style={tw`text-2xl font-bold`}>
                {travelTime?.duration.text}
              </Text>
            </View>

            <Image
              source={require("../assets/images/woof.png")}
              style={tw`h-33 w-33`}
            />
          </View>
        </View>
      </SafeAreaView>

      <DirectionMap />
    </View>
  );
};

export default DirectionScreen;

const styles = StyleSheet.create({});
