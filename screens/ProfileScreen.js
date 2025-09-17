import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

export default function ProfileScreen({ navigation, route }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const user = route.params?.user || currentUser;

  useEffect(() => {
    if (route.params?.user) {
      setCurrentUser(route.params.user);
    }
  }, [route.params?.user]);

  const handleEditProfile = () => {
    navigation.navigate('Register', { user: currentUser });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigation.navigate('Login');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum usuário logado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: user.image }} 
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileBio}>{user.bio}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="email" size={24} color="#00BFA5" />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" size={24} color="#00BFA5" />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.buttonLogoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#424242',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#00BFA5',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 28,
    color: '#E0E0E0',
    fontWeight: 'bold',
  },
  profileBio: {
    fontSize: 16,
    color: '#BDBDBD',
    textAlign: 'center',
    marginTop: 8,
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#424242',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#E0E0E0',
    marginLeft: 15,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: '#00BFA5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  buttonText: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonLogout: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonLogoutText: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});