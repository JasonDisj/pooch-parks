import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectDestination } from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Icon } from "@rneui/themed";

const Map = () => {
  const destination = useSelector(selectDestination);
  const [dogParks, setDogParks] = useState([]);

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
        >
          <Callout tooltip>
            <View>
              <View style={styles.container}>
                <View style={styles.pinBox}>
                  <Text style={styles.text}>{dogPark.name}</Text>
                  <Text style={styles.text}>{dogPark.vicinity}</Text>
                  {dogPark.rating ? (
                    <View style={tw`flex-row items-center`}>
                      <Icon
                        name="star"
                        type="UIImage"
                        size={22}
                        color="#DAA520"
                        style={tw`mb-1.5`}
                      />
                      <Text style={styles.text}>{dogPark.rating}</Text>
                    </View>
                  ) : null}
                </View>

                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText} onPress={() => {}}>
                    Add to Favorites
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  ) : null;
};

export default Map;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#CCC",
    borderWidth: 0.5,
    padding: 15,
  },
  pinBox: {
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#FFF",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007A87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  btn: {
    backgroundColor: "#DAA520",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
