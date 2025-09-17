import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ImageDropper from '../components/ImageDropper';
import { UserContext } from '../context/UserContext';

const FormInput = ({ label, value, onChangeText, secureTextEntry }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholder={label}
      placeholderTextColor="#757575"
    />
  </View>
);

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
      <Text style={styles.title}>{editingUser ? 'Editar Perfil' : 'Criar Conta'}</Text>
      
      <FormInput label="Nome" value={name} onChangeText={setName} />
      <FormInput label="E-mail" value={email} onChangeText={setEmail} />
      <FormInput label="Telefone" value={phone} onChangeText={setPhone} />
      <FormInput label="Sobre mim" value={bio} onChangeText={setBio} />
      <FormInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      
      <Text style={styles.labelImage}>Imagem de Perfil</Text>
      <ImageDropper imageUri={image} onImageSelected={setImage} />
      
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#212121',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    color: '#E0E0E0',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 8,
    fontWeight: '600',
  },
  labelImage: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 10,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#424242',
    color: '#E0E0E0',
    borderColor: '#616161',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00BFA5', 
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#212121',
    fontSize: 18,
    fontWeight: 'bold',
  },
});