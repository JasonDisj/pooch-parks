import { StyleSheet, View, SafeAreaView } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import Header from "../components/Header";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import ExpandableBtn from "../components/ExpandableBtn";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`flex-1 p-5`}>
        <View style={tw`items-center`}>
          <Header />
        </View>

        <GooglePlacesAutocomplete
          placeholder="Search Neighbourhood..."
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={{
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 18,
            },
            container: {
              flex: 0,
              borderRadius: 10,
              alignItems: "center",
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderWidth: 1,
            },
          }}
          GooglePlacesSearchQuery={{
            rankby: "distance",
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
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setOrigin(null));
          }}
          fetchDetails={true}
        />

        <NavOptions />

        <ExpandableBtn />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
