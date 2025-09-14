import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import ImageDropper from '../components/ImageDropper';
import { UserContext } from '../context/UserContext';

export default function RegisterScreen({ navigation, route }) {
  const { users, setUsers, setCurrentUser } = useContext(UserContext);
  const editingUser = route.params?.user || null;

  const [name, setName] = useState(editingUser?.name || '');
  const [email, setEmail] = useState(editingUser?.email || '');
  const [phone, setPhone] = useState(editingUser?.phone || '');
  const [bio, setBio] = useState(editingUser?.bio || '');
  const [password, setPassword] = useState(editingUser?.password || '');
  const [image, setImage] = useState(editingUser?.image || null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      Alert.alert('Sucesso', 'Cadastro salvo com sucesso!');
    }
  }, [saved]);

  const handleConfirm = () => {
    if (!name || !email || !phone || !bio || !password || !image) {
      Alert.alert('Erro', 'Preencha todos os campos. A imagem é obrigatória.');
      return;
    }
    if (editingUser) {
      const updated = { ...editingUser, name, email, phone, bio, password, image };
      const updatedUsers = users.map(u => (u.email === editingUser.email ? updated : u));
      setUsers(updatedUsers);
      setCurrentUser(updated);
      setSaved(true);
      navigation.navigate('Profile', { user: updated });
    } else {
      const newUser = { id: Date.now().toString(), name, email, phone, bio, password, image };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setSaved(true);
      navigation.navigate('Profile', { user: newUser });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormInput label="Nome" value={name} onChangeText={setName} />
      <FormInput label="E-mail" value={email} onChangeText={setEmail} />
      <FormInput label="Telefone" value={phone} onChangeText={setPhone} />
      <FormInput label="Sobre mim" value={bio} onChangeText={setBio} />
      <FormInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Text style={{ marginTop: 8 }}>Imagem (obrigatório)</Text>
      <ImageDropper imageUri={image} onImageSelected={setImage} />
      <View style={{ marginTop: 12 }}>
        <Button title="Confirmar" onPress={handleConfirm} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
});