import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type SummaryProps = {
  vehicle: { label: string } | null;                      // Από το Step 1
  service: { title: string; price: string } | null;         // Από το Step 2 (ή Address selection)
  address: string | null;                                   // Από το Step 2 (ή Address selection)
  schedule: { date: string; time: string } | null;          // Από το Step 3
  onLogin?: () => void;                                     // Callback για Login
  onRegister?: () => void;                                  // Callback για Register
};

const SummaryComponent: React.FC<SummaryProps> = ({
  vehicle,
  service,
  address,
  schedule,
  onLogin,
  onRegister,
}) => {

    const router = useRouter();
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.header}>Σύνοψη</Text>

      <View style={styles.summaryItem}>
        <Text style={styles.itemTitle}>Τύπος Οχήματος</Text>
        <Text style={styles.itemValue}>{vehicle ? vehicle.label : "-"}</Text>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.itemTitle}>Υπηρεσία</Text>
        <View style={styles.serviceRow}>
          <Text style={styles.itemValue}>
            {service ? service.title : "-"}
          </Text>
          
        </View>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.itemTitle}>Συνολικό Κόστος</Text>
        <View style={styles.serviceRow}>
          
          <Text style={styles.itemCost}>
            {service ? service.price : "-"}
          </Text>
        </View>
      </View>

      <View style={styles.summaryItem}>
        <Text style={styles.itemTitle}>Διεύθυνση & Ημερομηνία/Ώρα</Text>
        <Text style={styles.itemValue}>
          {address ? address : "-"}{"\n"}
          {schedule ? `${schedule.date} - ${schedule.time}` : "-"}
        </Text>
      </View>

      
    </View>
    <View style={styles.promptContainer}>
    <Text style={styles.promptText}>
      Για να προχωρήσετε στη κράτηση{" "}
      <Text style={styles.link} onPress={() => router.push("/login" as RelativePathString)}>
        Συνδεθείτε
      </Text>{" "}
      ή{" "}
      <Text style={styles.link} onPress={() => router.push("/register" as RelativePathString)}>
        Φτιάξτε Λογαριασμό
      </Text>
    </Text>
  </View>
  </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    margin: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  summaryItem: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
  },
  itemValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 5,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  itemCost: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00ADFE",
  },
  promptContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  promptText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  link: {
    fontWeight: "bold",
    color: "#00ADFE",
  },
});

export default SummaryComponent;
