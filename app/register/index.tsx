import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Εισάγουμε το hook
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { RelativePathString, useRouter } from "expo-router";

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<any>(); // Δημιουργούμε το navigation object
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nomos, setNomos] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");

   const handleRegister = async () => {
    const payload = {
      email,
      password,
      phone_number: phone,
      last_name: lastName,
      first_name: firstName,
      state: nomos,
      city,
      zip_code: postalCode,
      address,
    };

    try {
      const response = await fetch("http://192.168.9.240:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        let message = data.message;
        let verification_code = data.verification_code;
        // Αν είναι development και έχουμε επιστρέψει verification_code, εμφάνισε το και στον χρήστη
        // if (data.verification_code) {
        //   message += `\nYour verification code is: ${data.verification_code}`;
        //   verification_code = data.verification_code;
        //   console.log("VERIFICATION CODE = ",verification_code);
        // }
        Alert.alert("Επιτυχής Εγγραφή", data.message, [
          {
            text: "OK",
            onPress: () => {
              router.push({ pathname: "VerificationScreen" as RelativePathString, params: { email,verification_code } });
            },
          },
        ]);
      } else {
        Alert.alert("Σφάλμα Εγγραφής", data.message || "Παρουσιάστηκε κάποιο πρόβλημα.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Σφάλμα", "Προέκυψε σφάλμα κατά την εγγραφή.");
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Εγγραφή</Text>
        <TextInput
          style={styles.input}
          placeholder="Email*"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Κωδικός*"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Κινητό τηλέφωνο*"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Επώνυμο"
          placeholderTextColor="#aaa"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Όνομα"
          placeholderTextColor="#aaa"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Νομός"
          placeholderTextColor="#aaa"
          value={nomos}
          onChangeText={setNomos}
        />
        <TextInput
          style={styles.input}
          placeholder="Πόλη"
          placeholderTextColor="#aaa"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="ΤΚ"
          placeholderTextColor="#aaa"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Διεύθυνση"
          placeholderTextColor="#aaa"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Εγγραφή</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#00ADFE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
