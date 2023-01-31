import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "twrnc";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "BungeeShade-Regular": require("../assets/fonts/BungeeShade-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View onLayout={onLayoutRootView} style={[tw`p-5`, styles.container]}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={require("../assets/images/dog-logo.jpg")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />

          <Text style={[tw`text-yellow-600 text-center mt-2`, styles.text]}>
            PoochParks
          </Text>
        </View>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Search..."
          styles={{
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 18,
            },
            container: { flex: 0 },
          }}
          minLength={2}
          enablePoweredByContainer={false}
          returnKeyType={"search"}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    fontFamily: "BungeeShade-Regular",
    fontSize: 31,
  },
  // search: {
  //   flex: 0,
  //   fontSize: 18,
  //   width: 50,
  // },
});
