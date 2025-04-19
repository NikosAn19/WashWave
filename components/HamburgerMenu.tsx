import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const HamburgerMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (route: RelativePathString) => {
    setMenuOpen(false);
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.hamburgerButton}>
        <FontAwesome name="bars" size={24} color="#333" />
      </TouchableOpacity>
      {menuOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/multistepform' as RelativePathString)}>
            <Text style={styles.menuText}>Κλείσε Ραντεβού</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/services' as RelativePathString)}>
            <Text style={styles.menuText}>Δες τις υπηρεσίες</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/history' as RelativePathString)}>
            <Text style={styles.menuText}>Ιστορικό κρατήσεων</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/AccountDetails' as RelativePathString)}>
            <Text style={styles.menuText}>Στοιχεία Λογαριασμού</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40, // προσαρμόστε σύμφωνα με το safe area
    left: 20,
    zIndex: 1000,
  },
  hamburgerButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default HamburgerMenu;
