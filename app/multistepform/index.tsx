import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapComponent, { MarkerType } from "@/components/Map/MapComponent";
import { useGeocodeAddresses } from "@/hooks/useGeocodeAddresses";
import Step3Schedule from "@/components/Step3Schedule";
import SummaryComponent from "@/components/SummaryComponent";
// Δείγμα δεδομένων για τύπους οχημάτων
const vehicleTypes = [
  { id: 1, label: "Ι.Χ.", image: require("@/assets/formImages/carImg.png") },
  {
    id: 2,
    label: "VAN/ΦΟΡΤΗΓΟ",
    image: require("@/assets/formImages/vanImg.png"),
  },
  {
    id: 3,
    label: "SUV/JEEP",
    image: require("@/assets/formImages/suvImg.jpg"),
  },
  { id: 4, label: "MOTO", image: require("@/assets/formImages/motoImg1.webp") },
];

// Δείγμα δεδομένων για υπηρεσίες
const services = [
  {
    id: 1,
    price: "11.00 €*",
    subPrice: "* Ενδεικτική τιμή",
    title: "Πλύσιμο χέρι - Μέσα - έξω Ι.Χ.",
    description:
      "Πλύσιμο του οχήματος στο χέρι - Μέσα & έξω. Η τιμή ενδέχεται να είναι διαφορετική σύμφωνα με τον τιμοκατάλογο του εκάστοτε πρατηρίου της επιλογής σας.",
  },
  {
    id: 2,
    price: "8.00 €*",
    subPrice: "* Ενδεικτική τιμή",
    title: "Πλύσιμο χέρι - Εσωτερικό Ι.Χ.",
    description:
      "Εσωτερικό πλύσιμο οχήματος στο χέρι. Η τιμή ενδέχεται να είναι διαφορετική σύμφωνα με τον τιμοκατάλογο του εκάστοτε πρατηρίου της επιλογής σας.",
  },
  {
    id: 3,
    price: "8.00 €*",
    subPrice: "* Ενδεικτική τιμή",
    title: "Πλύσιμο χέρι - Εξωτερικό Ι.Χ.",
    description:
      "Εξωτερικό πλύσιμο οχήματος στο χέρι. Η τιμή ενδέχεται να είναι διαφορετική σύμφωνα με τον τιμοκατάλογο του εκάστοτε πρατηρίου της επιλογής σας.",
  },
  {
    id: 4,
    price: "12.00 €*",
    subPrice: "* Ενδεικτική τιμή",
    title: "Πλύσιμο βούρτσα - Μέσα - έξω Ι.Χ.",
    description:
      "Πλύσιμο του οχήματος με βούρτσα - Μέσα & έξω. Η τιμή ενδέχεται να είναι διαφορετική σύμφωνα με τον τιμοκατάλογο του εκάστοτε πρατηρίου της επιλογής σας.",
  },
  {
    id: 5,
    price: "8.00 €*",
    subPrice: "* Ενδεικτική τιμή",
    title: "Πλύσιμο βούρτσα - Εσωτερικό Ι.Χ.",
    description:
      "Πλύσιμο του οχήματος με βούρτσα - Μέσα. Η τιμή ενδέχεται να είναι διαφορετική σύμφωνα με τον τιμοκατάλογο του εκάστοτε πρατηρίου της επιλογής σας.",
  },
  {
    id: 6,
    price: "8.00 €*",
    subPrice: "* Ενδεικτική τιμή",
    title: "Πλύσιμο βούρτσα - Εξωτερικό Ι.Χ.",
    description:
      "Πλύσιμο του οχήματος με βούρτσα - Έξω. Η τιμή ενδέχεται να είναι διαφορετική σύμφωνα με τον τιμοκατάλογο του εκάστοτε πρατηρίου της επιλογής σας.",
  },
];

type ServiceCardProps = {
  service: any;
  onSelect: () => void;
};
type SelectedService = {
  title: string;
  price: string;
};

// Component για κάθε service card
const ServiceCard = ({ service, onSelect }: ServiceCardProps) => {
  
  return (
    <View style={styles.serviceCard}>
      <Text style={styles.servicePrice}>{service.price}</Text>
      <Text style={styles.serviceSubPrice}>{service.subPrice}</Text>
      <Text style={styles.serviceTitle}>{service.title}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>
      <TouchableOpacity style={styles.selectButton} onPress={onSelect}>
        <Text style={styles.selectButtonText}>Επιλογή</Text>
      </TouchableOpacity>
    </View>
  );
};

export type AddressData = {
  id: number;
  title: string; // Η διεύθυνση ως κείμενο
  description: string;
  address: string;
  
};

// Ορίζουμε τη λίστα διευθύνσεων στο parent
const addressList: AddressData[] = [
  {
    id: 1,
    title: "Οδός Αριστοτέλους 10, Αθήνα, Ελλάδα",
    description: "",
    address: "Οδός Αριστοτέλους 10, Αθήνα, Ελλάδα",
   
  },
  {
    id: 2,
    title: "Λεωφόρος Συγγρού 20, Αθήνα, Ελλάδα",
    description: "",
    address: "Λεωφόρος Συγγρού 20, Αθήνα, Ελλάδα",
    
  },
  {
    id: 3,
    title: "Οδός Πανεπιστημίου 5, Αθήνα, Ελλάδα",
    description: "",
    address: "Οδός Πανεπιστημίου 5, Αθήνα, Ελλάδα",
    
  },
  // Προσθέστε όσες διευθύνσεις χρειάζεστε...
];

type AddressCardProps = {
  service: any;
  onSelect: () => void;
};

const AddressCard: React.FC<AddressCardProps> = ({ service, onSelect }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.address}>{service.address}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <TouchableOpacity style={styles.button} onPress={onSelect}>
        <Text style={styles.buttonText}>Επιλογή</Text>
      </TouchableOpacity>
    </View>
  );
};

const MultiStepFormScreen: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);

  const [schedule, setSchedule] = useState<{ date: string | null; time: string | null }>({
    date: null,
    time: null,
  });
  const handleScheduleChange = (date: string | null, time: string | null) => {
    setSchedule({ date, time });
  };

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSelect = (address: AddressData) => {
    setSelectedAddress(address.address);
    setCurrentStep((prev) => prev + 1);
  };

  

   // Ορίζουμε τη λίστα διευθύνσεων στο parent
   const addressList: AddressData[] = [
    {
      id: 1,
      title: "Οδός Αριστοτέλους 10, Αθήνα, Ελλάδα",
      description: "",
      address: "Οδός Αριστοτέλους 10, Αθήνα, Ελλάδα",
      
    },
    {
      id: 2,
      title: "Λεωφόρος Συγγρού 20, Αθήνα, Ελλάδα",
      description: "",
      address: "Λεωφόρος Συγγρού 20, Αθήνα, Ελλάδα",
      
    },
    {
      id: 3,
      title: "Οδός Πανεπιστημίου 5, Αθήνα, Ελλάδα",
      description: "",
      address: "Οδός Πανεπιστημίου 5, Αθήνα, Ελλάδα",
      
    },
    // Προσθέστε όσες διευθύνσεις χρειάζεστε...
  ];

  // Παίρνουμε τα markers μέσω του custom hook (η λίστα διευθύνσεων είναι lifted εδώ)
  const markers: MarkerType[] = useGeocodeAddresses(addressList);

  // Όταν επιλέγεται μία κάρτα τύπου οχήματος
  const handleVehicleSelect = (id: number) => {
    setSelectedVehicle(id);
    // Μετά από μικρή καθυστέρηση, μετακινούμε το scroll στον container των υπηρεσιών.
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 300, // Εδώ μπορείς να ρυθμίσεις την τιμή ώστε να φτάνει ακριβώς στην αρχή του container των υπηρεσιών.
        animated: true,
      });
    }, 300);
  };

  const handleOnSelect = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleServiceSelect = (service: { title: string; price: string }) => {
    setSelectedService({
      title: service.title,
      price: service.price,
    });
    setCurrentStep(prev => prev + 1);
  };

  

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {Array.from({ length: 4 }, (_, index) => {
            const step = index + 1;
            const isActive = step === currentStep;
            return (
              <View key={step} style={styles.progressItem}>
                <View style={[styles.circle, isActive && styles.activeCircle]}>
                  <Text
                    style={[
                      styles.stepNumber,
                      isActive && styles.activeStepNumber,
                    ]}
                  >
                    {step.toString().padStart(2, "0")}
                  </Text>
                </View>
                <Text
                  style={[styles.stepText, isActive && styles.activeStepText]}
                >
                  Βήμα {step}
                </Text>
                {step < 4 && (
                  <View
                    style={[
                      styles.divider,
                      step < currentStep && styles.activeDivider,
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
      {currentStep === 1 && (
        <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
          {/* Ενότητα για επιλογή τύπου οχήματος */}
          <Text style={styles.sectionHeader}>Επιλογή τύπου οχήματος</Text>
          <View style={styles.vehicleCardsContainer}>
            {vehicleTypes.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={styles.vehicleCard}
                onPress={() => handleVehicleSelect(vehicle.id)}
              >
                <Image
                  source={vehicle.image}
                  style={styles.vehicleImage}
                  resizeMode="cover"
                />
                <Text style={styles.vehicleLabel}>{vehicle.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Εμφάνιση container υπηρεσιών όταν έχει επιλεγεί κατηγορία */}
          {selectedVehicle && (
            <View style={styles.servicesContainer}>
              <Text style={styles.servicesHeader}>Δείτε τις Υπηρεσίες</Text>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelect={() => handleServiceSelect({ title: service.title, price: service.price })}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
      {/* Περιεχόμενο για το βήμα 2: Χάρτης */}
      {currentStep === 2 && (
        <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        <View style={styles.mapContainer}>
          <Text style={styles.sectionHeader}>Επιλέξτε διεύθυνση</Text>
          <MapComponent markers={markers} />
          <View style={styles.addressCardsContainer}>
          {addressList.map((addr) => (
                <AddressCard
                  key={addr.id}
                  service={addr}
                  onSelect={() => handleAddressSelect(addr)}
                />
              ))}
            </View>
        </View>
        </ScrollView>
      )}
      {currentStep === 3 && (
        <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        <Step3Schedule onNextStep={handleOnSelect} onScheduleChange={handleScheduleChange}/>
        </ScrollView>
      )}
      {currentStep === 4 && (
        <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
         <SummaryComponent 
          vehicle={vehicleTypes.find(v => v.id === selectedVehicle) || null}
          service={selectedService} // selectedService είναι ένα state που θα έχεις αποθηκεύσει στο step 2
          schedule={schedule} // selectedSchedule είναι ένα state με { date, time } από το step 3
          address={selectedAddress}/>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  addressCardsContainer: {
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: "#00ADFE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    borderColor: "#00ADFE",
    backgroundColor: "#00ADFE",
  },
  stepNumber: {
    color: "#ccc",
    fontWeight: "bold",
  },
  activeStepNumber: {
    color: "#fff",
  },
  stepText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#ccc",
  },
  activeStepText: {
    color: "#00ADFE",
  },
  divider: {
    width: 20,
    height: 2,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDivider: {
    backgroundColor: "#00ADFE",
  },
  vehicleCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  vehicleCard: {
    width: "48%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    padding: 10,
  },
  vehicleImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  vehicleLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  servicesContainer: {
    marginTop: 30,
  },
  servicesHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  serviceCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  servicePrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  serviceSubPrice: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: "#00ADFE",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
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

export default MultiStepFormScreen;
