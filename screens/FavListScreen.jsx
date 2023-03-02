import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { db, auth } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import FavoriteCard from "../components/FavoriteCard";
import BtnOnFavorites from "../components/BtnOnFavorites";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setOrigin } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const FavListScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const favoritesCollection = collection(db, "favorites");
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const getFavorites = async () => {
    try {
      const queryFavorites = query(
        favoritesCollection,
        where("user", "==", auth.currentUser.email),
        orderBy("createdAt", "desc")
      );
      onSnapshot(queryFavorites, snapshot => {
        let favParks = [];
        snapshot.forEach(doc => {
          favParks.push({ ...doc.data(), id: doc.id });
        });
        setFavorites(favParks);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const deletePark = async id => {
    const parkDoc = doc(db, "favorites", id);
    await deleteDoc(parkDoc);
    getFavorites();
  };

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[#DAA520]`}>
      <BtnOnFavorites />
      <Text
        style={tw`text-2xl font-bold text-center text-white px-4 pt-3 mb-3`}
      >
        My Favorites
      </Text>
      <ScrollView style={tw`flex-1`}>
        {favorites.map(favorite => (
          <FavoriteCard
            key={favorite.id}
            id={favorite.id}
            name={favorite.name}
            address={favorite.address}
            rating={favorite.rating}
            location={favorite.location}
            deletePark={deletePark}
            toggleModalVisibility={toggleModalVisibility}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <GooglePlacesAutocomplete
              styles={{
                container: {
                  flex: 0,
                  width: width * 0.7,
                  borderRadius: 10,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  borderWidth: 1,
                  marginBottom: 16,
                },
                textInput: {
                  height: 38,
                  color: "#5d5d5d",
                  fontSize: 16,
                },
              }}
              placeholder="Your Location?"
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
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
                  setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
              }}
              fetchDetails={true}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setModalVisible(!isModalVisible);
                navigation.navigate("DirectionScreen");
              }}
              disabled={!origin}
            >
              <Text style={styles.btnText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FavListScreen;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
    paddingTop: 36,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#DAA520",
    width: width * 0.3,
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
  },
  btnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
