import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const BtnOnFavorites = () => {
  const [icon_logout] = useState(new Animated.Value(12));
  const [icon_home] = useState(new Animated.Value(12));
  const [icon_back] = useState(new Animated.Value(12));

  const [pop, setPop] = useState(false);

  const navigation = useNavigation();

  const popActivated = () => {
    setPop(true);
    Animated.timing(icon_logout, {
      toValue: 282,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_home, {
      toValue: 192,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_back, {
      toValue: 102,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popDeactivated = () => {
    setPop(false);
    Animated.timing(icon_logout, {
      toValue: 12,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_home, {
      toValue: 12,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_back, {
      toValue: 12,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch(error => alert(error.message));
  };

  const handleHome = () => {
    navigation.navigate("HomeScreen");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1`}>
      <Animated.View style={[styles.expandableBtn, { bottom: icon_logout }]}>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon raised name="logout" type="UIImage" size={25} color="#DAA520" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.expandableBtn, { bottom: icon_home }]}>
        <TouchableOpacity onPress={handleHome}>
          <Icon raised name="home" type="UIImage" size={25} color="#DAA520" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.expandableBtn, { bottom: icon_back }]}>
        <TouchableOpacity onPress={handleBack}>
          <Icon
            raised
            name="arrow-back"
            type="UIImage"
            size={25}
            color="#DAA520"
          />
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

export default BtnOnFavorites;

const styles = StyleSheet.create({
  expandableBtn: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#DAA520",
    bottom: 12,
    right: 12,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
