import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function ProfileScreen({ navigation, route }) {
  const { currentUser } = useContext(UserContext);
  const user = route.params?.user || currentUser;

  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Nenhum usuário logado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.image }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Telefone</Text>
        <Text style={styles.infoValue}>{user.phone}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Bio</Text>
        <Text style={styles.infoValue}>{user.bio}</Text>
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Editar" onPress={() => navigation.navigate('Register', { user })} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  avatar: { width: 160, height: 160, borderRadius: 80, marginBottom: 12 },
  name: { fontSize: 26, color: '#2a6f97', textAlign: 'center', fontWeight: '700' },
  email: { fontSize: 14, color: '#333', marginBottom: 8 },
  infoBox: { width: '100%', padding: 12, borderRadius: 8, backgroundColor: '#f5f5f5', marginTop: 8 },
  infoLabel: { fontWeight: '700' },
  infoValue: { marginTop: 4 },
});