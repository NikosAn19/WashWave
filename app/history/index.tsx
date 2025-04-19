import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const BookingHistoryScreen: React.FC = () => {
  // Δοκιμαστικά δεδομένα για κρατήσεις
  const bookings = [
    {
      id: 1,
      dateTime: "2023-09-15 14:30",
      vehicleType: "Ι.Χ.",
      service: "Πλύσιμο χέρι - Μέσα - έξω",
      carWash: "WashWave Center Αθήνας",
    },
    {
      id: 2,
      dateTime: "2023-09-10 10:00",
      vehicleType: "SUV/JEEP",
      service: "Πλύσιμο βούρτσα - Εξωτερικό",
      carWash: "WashWave Center Θεσσαλονίκης",
    },
    {
      id: 3,
      dateTime: "2023-09-05 16:15",
      vehicleType: "VAN/ΦΟΡΤΗΓΟ",
      service: "Πλύσιμο χέρι - Εσωτερικό",
      carWash: "WashWave Center Πειραιά",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Ιστορικό Κρατήσεων</Text>
      {bookings.map((booking) => (
        <View key={booking.id} style={styles.card}>
          <Text style={styles.cardItemTitle}>Ημερομηνία &amp; Ώρα Κράτησης</Text>
          <Text style={styles.cardItemValue}>{booking.dateTime}</Text>
          
          <Text style={styles.cardItemTitle}>Τύπος Οχήματος</Text>
          <Text style={styles.cardItemValue}>{booking.vehicleType}</Text>
          
          <Text style={styles.cardItemTitle}>Επιλεγμένη Υπηρεσία</Text>
          <Text style={styles.cardItemValue}>{booking.service}</Text>
          
          <Text style={styles.cardItemTitle}>Πλυντήριο</Text>
          <Text style={styles.cardItemValue}>{booking.carWash}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginTop: 5,
  },
  cardItemValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});

export default BookingHistoryScreen;
