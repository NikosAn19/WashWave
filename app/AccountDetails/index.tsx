// app/AccountDetails/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { RelativePathString, useRouter } from "expo-router";

const AccountDetailsScreen: React.FC = () => {
  const router = useRouter();
  
  // Το email του χρήστη – σε πραγματική εφαρμογή, πιθανώς αυτό θα προέρχεται από το authentication context
  const userEmail = "nikosandreadis19a@gmail.com";

  // States για τα προσωπικά στοιχεία του χρήστη
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  // Αποκτάμε τα προσωπικά δεδομένα του χρήστη από το API
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://192.168.9.240:5000/api/user/profile?email=${encodeURIComponent(userEmail)}`
      );
      const data = await response.json();
      if (response.ok) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setAddress(data.address);
        setCity(data.city);
        setStateName(data.state);
        setZipCode(data.zip_code);
      } else {
        Alert.alert("Σφάλμα", data.message || "Δεν ήταν δυνατή η φόρτωση των στοιχείων του λογαριασμού.");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      Alert.alert("Σφάλμα", "Παρουσιάστηκε σφάλμα κατά τη φόρτωση των στοιχείων.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Ενημέρωση των δεδομένων του χρήστη μέσω PUT request
  const handleSaveChanges = async () => {
    const payload = {
      email, // Χρησιμοποιούμε το email ως μοναδικό αναγνωριστικό
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address,
      city,
      state: stateName,
      zip_code: zipCode,
    };

    try {
      const response = await fetch("http://192.168.9.240:5000/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Αποθήκευση", "Οι αλλαγές αποθηκεύτηκαν επιτυχώς!", [
          { text: "OK", onPress: () => router.push("/menu" as RelativePathString) },
        ]);
      } else {
        Alert.alert("Σφάλμα", data.message || "Η αποθήκευση απέτυχε.");
      }
    } catch (error) {
      console.error("Update error:", error);
      Alert.alert("Σφάλμα", "Παρουσιάστηκε σφάλμα κατά την ενημέρωση των στοιχείων.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      {/* Σταθερός τίτλος */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Στοιχεία Λογαριασμού</Text>
      </View>

      {/* Scrollable περιεχόμενο */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Όνομα</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Όνομα"
        />

        <Text style={styles.label}>Επώνυμο</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Επώνυμο"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={email}
          editable={false}
          placeholder="Email"
        />

        <Text style={styles.label}>Κινητό Τηλέφωνο</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Κινητό Τηλέφωνο"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Διεύθυνση</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Διεύθυνση"
        />

        <Text style={styles.label}>Πόλη</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Πόλη"
        />

        <Text style={styles.label}>Νομός</Text>
        <TextInput
          style={styles.input}
          value={stateName}
          onChangeText={setStateName}
          placeholder="Νομός"
        />

        <Text style={styles.label}>ΤΚ</Text>
        <TextInput
          style={styles.input}
          value={zipCode}
          onChangeText={setZipCode}
          placeholder="ΤΚ"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Αποθήκευση Αλλαγών</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  disabledInput: {
    backgroundColor: "#eee",
    color: "#888",
  },
  button: {
    backgroundColor: "#00ADFE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AccountDetailsScreen;
