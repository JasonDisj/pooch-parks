import { StyleSheet, SafeAreaView } from "react-native";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("MapScreen");
    }, 2500);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#DAA520] justify-center items-center`}>
      <Animatable.Image
        source={require("../assets/images/loading.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={tw`h-64 w-64`}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={tw`text-lg my-10 text-white font-bold text-center`}
      >
        Loading...
      </Animatable.Text>
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
