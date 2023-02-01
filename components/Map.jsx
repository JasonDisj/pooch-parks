import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectDestination } from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const destination = useSelector(selectDestination);
  const [dogParks, setDogParks] = useState([]);
  // const [loading, setLoading] = useState(false);

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_APIKEY}&location=${destination.location.lat},${destination.location.lng}&radius=1000&type=park`;

  useEffect(() => {
    const fetchDogParks = async () => {
      const res = await fetch(url);
      const { results } = await res.json();
      setDogParks(results);
    };
    fetchDogParks();
  }, []);

  return destination?.location ? (
    <MapView
      style={tw`flex-1`}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: destination.location.lat,
        longitude: destination.location.lng,
        latitudeDelta: 0.032,
        longitudeDelta: 0.032,
      }}
    >
      {dogParks.map(dogPark => (
        <Marker
          key={dogPark.place_id}
          coordinate={{
            latitude: dogPark.geometry.location.lat,
            longitude: dogPark.geometry.location.lng,
          }}
          title={dogPark.name}
          description={dogPark.vicinity}
        />
      ))}
    </MapView>
  ) : null;
};

export default Map;

const styles = StyleSheet.create({});
