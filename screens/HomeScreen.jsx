import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import tw from "twrnc";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
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
      <View onLayout={onLayoutRootView} style={styles.container}>
        <ImageBackground
          style={[tw`w-full h-full`, styles.image]}
          source={require("../assets/images/mmexport1569733363093.jpg")}
        >
          <Text style={[tw`text-yellow-600 text-center pt-2.25`, styles.text]}>
            PoochParks
          </Text>
          <GooglePlacesAutocomplete
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            placeholder="Search..."
            styles={styles.search}
            minLength={2}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              console.log(data);
            }}
            fetchDetails={true}
          />
          <NavOptions />
        </ImageBackground>
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
    fontSize: 42,
  },
  search: {
    flex: 0,
    fontSize: 18,
  },
});
