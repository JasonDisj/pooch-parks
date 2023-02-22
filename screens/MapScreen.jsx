import { StyleSheet, View } from "react-native";
import tw from "twrnc";
import Map from "../components/Map";
import BtnOnFavorites from "../components/BtnOnFavorites";

const MapScreen = () => {
  return (
    <View style={tw`flex-1`}>
      <Map />
      <BtnOnFavorites />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
