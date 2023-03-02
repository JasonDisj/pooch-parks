import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Icon } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const BtnOnDirection = () => {
  const [icon_logout] = useState(new Animated.Value(12));
  const [icon_home] = useState(new Animated.Value(12));
  const [icon_back] = useState(new Animated.Value(12));

  const [pop, setPop] = useState(false);

  const navigation = useNavigation();

  const popActivated = () => {
    setPop(true);
    Animated.timing(icon_logout, {
      toValue: 284,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_home, {
      toValue: 194,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_back, {
      toValue: 104,
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

  const handleGoBack = () => {
    navigation.navigate("FavListScreen");
  };

  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={handleGoBack}>
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
          <Icon raised name="menu" type="UIImage" size={25} color="#DAA520" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default BtnOnDirection;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 54,
    right: 20,
    zIndex: 50,
  },
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
