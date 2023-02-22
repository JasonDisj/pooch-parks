import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const BtnOnMap = () => {
  // const [icon_fav] = useState(new Animated.Value(49));
  const [icon_home] = useState(new Animated.Value(49));

  const [pop, setPop] = useState(false);

  const navigation = useNavigation();

  const popActivated = () => {
    setPop(true);
    // Animated.timing(icon_fav, {
    //   toValue: 228,
    //   duration: 500,
    //   useNativeDriver: false,
    // }).start();
    Animated.timing(icon_home, {
      toValue: 138,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popDeactivated = () => {
    setPop(false);
    // Animated.timing(icon_fav, {
    //   toValue: 49,
    //   duration: 500,
    //   useNativeDriver: false,
    // }).start();
    Animated.timing(icon_home, {
      toValue: 49,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* <Animated.View style={[styles.expandableBtn, { bottom: icon_fav }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FavListScreen");
          }}
        >
          <Icon
            raised
            name="favorite"
            type="UIImage"
            size={25}
            color="#DAA520"
          />
        </TouchableOpacity>
      </Animated.View> */}

      <Animated.View style={[styles.expandableBtn, { bottom: icon_home }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <Icon raised name="home" type="UIImage" size={25} color="#DAA520" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.expandableBtn}
        onPress={() => {
          pop === false ? popActivated() : popDeactivated();
        }}
      >
        <Animated.View>
          <Icon
            raised
            name="expand-less"
            type="UIImage"
            size={25}
            color="#DAA520"
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default BtnOnMap;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 17,
    right: 17,
    zIndex: 50,
  },
  expandableBtn: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#DAA520",
    bottom: 49,
    right: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
