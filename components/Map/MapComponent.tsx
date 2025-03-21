import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export type MarkerType = {
  id: number;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

type MapComponentProps = {
  markers: MarkerType[];
};

const MapComponent: React.FC<MapComponentProps> = ({ markers }) => {
  // Αν υπάρχουν markers, ορίζουμε ως αρχική περιοχή τα coordinates του πρώτου marker, αλλιώς χρησιμοποιούμε default τιμές.
  const initialRegion = {
    latitude: markers.length > 0 ? markers[0].coordinate.latitude : 37.9838,
    longitude: markers.length > 0 ? markers[0].coordinate.longitude : 23.7275,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <MapView style={styles.map} initialRegion={initialRegion}>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width - 40, // Λαμβάνει υπόψη το padding (π.χ. 20+20)
    height: 300,
    borderRadius: 8,
  },
});

export default MapComponent;
