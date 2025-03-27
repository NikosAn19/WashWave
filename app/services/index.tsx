import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

type ServiceCardProps = {
    title: string;
    description: string;
    imageSource: any; // Μπορείς να χρησιμοποιήσεις require() ή URL
    onPress: () => void;
  };
  
  const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSource, onPress }) => {
    return (
      <View style={styles.card}>
        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Κλείσε ραντεβού</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const ServicesScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Υπηρεσίες</Text>
      <ServiceCard
        title="Πλύσιμο Μέσα-Έξω"
        description="Στην AVIN χρησιμοποιούμε τις τελευταίες τεχνολογίες πλυσίματος με γνώμονα την φροντίδα του οχήματος, τον άριστο καθαρισμό και την προστασία του περιβάλλοντος.
Με μία ποικιλία επιλογών υπηρεσίας από αυτόματη βούρτσα, πλύσιμο στο χέρι και πλύσιμο με τεχνολογία ατμού, επιτυγχάνουμε εις βάθος καθαρισμό με προσοχή και εξασφάλιση ποιότητας αποτελέσματος."
        imageSource={require("@/assets/services/redcarwash.jpg")}
        onPress={() => console.log("Κλείσε ραντεβού για Υπηρεσία 1")}
      />
      <ServiceCard
        title="Υπηρεσία 2"
        description="Περιγραφή υπηρεσίας 2"
        imageSource={require("@/assets/services/redcarwash.jpg")}
        
        onPress={() => console.log("Κλείσε ραντεβού για Υπηρεσία 2")}
      />
      <ServiceCard
        title="Υπηρεσία 3"
        description="Περιγραφή υπηρεσίας 3"
        imageSource={require("@/assets/services/redcarwash.jpg")}
        onPress={() => console.log("Κλείσε ραντεβού για Υπηρεσία 3")}
      />
      <ServiceCard
        title="Υπηρεσία 4"
        description="Περιγραφή υπηρεσίας 4"
        imageSource={require("@/assets/services/redcarwash.jpg")}
        
        onPress={() => console.log("Κλείσε ραντεβού για Υπηρεσία 4")}
      />
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
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  textContainer: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#00ADFE",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServicesScreen;
