import { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";
import { db } from "../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import FavoriteCard from "../components/FavoriteCard";
import BtnOnFavorites from "../components/BtnOnFavorites";

const FavListScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const favoritesCollection = collection(db, "favorites");

  const getFavorites = async () => {
    try {
      const data = await getDocs(favoritesCollection);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFavorites(filteredData);
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
            deletePark={deletePark}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavListScreen;

const styles = StyleSheet.create({});
