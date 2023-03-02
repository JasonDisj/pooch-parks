import { StyleSheet } from "react-native";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTime,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useEffect, useRef } from "react";

const DirectionMap = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();

  const originLocation = {
    latitude: origin.location.lat,
    longitude: origin.location.lng,
  };
  const destinationLocation = {
    latitude: destination.location.lat,
    longitude: destination.location.lng,
  };

  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTime(data.rows[0].elements[0]));
        })
        .catch(error => console.error(error));
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1 -mt-10 z-0`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.032,
        longitudeDelta: 0.032,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={originLocation}
          destination={destinationLocation}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#DAA520"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Starting Point"
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          identifier="destination"
          pinColor="#DAA520"
        />
      )}
    </MapView>
  );
};

export default DirectionMap;

const styles = StyleSheet.create({});
