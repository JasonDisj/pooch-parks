import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/themed";

const FavoriteCard = ({ id, name, address, rating, deletePark }) => {
  return (
    <View style={styles.container}>
      <View style={styles.favBox}>
        <Text style={tw`text-lg mb-1`}>{name}</Text>
        <Text style={tw`text-lg mb-1`}>{address}</Text>
        <View style={[tw`flex-row items-center`, styles.deleteRow]}>
          <View style={tw`flex-row items-center`}>
            {rating ? (
              <>
                <Icon
                  name="star"
                  type="UIImage"
                  size={22}
                  color="#DAA520"
                  style={tw`mb-1`}
                />
                <Text style={tw`text-lg mb-1`}>{rating}</Text>
              </>
            ) : null}
          </View>

          <View>
            <TouchableOpacity onPress={() => deletePark(id)}>
              <Icon
                name="delete"
                type="UIImage"
                size={22}
                color="#DAA520"
                style={tw`pr-4`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  favBox: {
    width: "90%",
    height: 120,
    backgroundColor: "#FFF",
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 20,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
  },
  deleteRow: {
    justifyContent: "space-between",
  },
});
