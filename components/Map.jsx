import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectDestination } from "../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Icon } from "@rneui/themed";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Map = () => {
  const destination = useSelector(selectDestination);

  const [dogParks, setDogParks] = useState([]);
  const [addedIndex, setAddedIndex] = useState([]);

  const favoritesCollection = collection(db, "favorites");

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_APIKEY}&location=${destination.location.lat},${destination.location.lng}&radius=1500&type=park`;

  useEffect(() => {
    const fetchDogParks = async () => {
      const res = await fetch(url);
      const { results } = await res.json();
      setDogParks(results);
    };
    fetchDogParks();
  }, []);

  const toggleAdded = index => {
    setAddedIndex([...addedIndex, index]);
  };

  return destination?.location ? (
    <MapView
      style={tw`flex-1`}
      initialRegion={{
        latitude: destination.location.lat,
        longitude: destination.location.lng,
        latitudeDelta: 0.032,
        longitudeDelta: 0.032,
      }}
    >
      {dogParks.map(dogPark =>
        dogPark.name.toLowerCase().split(" ").includes("dog") ||
        dogPark.name.toLowerCase().split(" ").includes("off-leash") ||
        dogPark.name.toLowerCase().split(" ").includes("offleash") ? (
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
              <>
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

                  <View>
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                          await addDoc(favoritesCollection, {
                            name: dogPark.name,
                            address: dogPark.vicinity,
                            rating: Number(dogPark.rating),
                          });
                          toggleAdded(dogPark.place_id);
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      style={[
                        styles.btn,
                        addedIndex.includes(dogPark.place_id) &&
                          tw`bg-white border-[#DAA520] border-2`,
                      ]}
                      disabled={addedIndex.includes(dogPark.place_id)}
                    >
                      <Text
                        style={[
                          styles.btnText,
                          addedIndex.includes(dogPark.place_id) &&
                            tw`text-[#DAA520]`,
                        ]}
                      >
                        {addedIndex.includes(dogPark.place_id)
                          ? "Already Added"
                          : "Add to Favorites"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </>
            </Callout>
          </Marker>
        ) : null
      )}
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
