import React, { useContext, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';

const FormInput = ({ label, value, onChangeText, secureTextEntry, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor="#AAAAAA"
    />
  </View>
);

export default function LoginScreen({ navigation }) {
  const { users, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setCurrentUser(found);
      navigation.navigate('Profile', { user: found });
    } else {
      Alert.alert('Erro', 'Usuário não encontrado ou senha incorreta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá! 👋</Text>
      <Text style={styles.subtitle}>Faça seu login para continuar.</Text>

      <FormInput 
        label="E-mail" 
        value={email} 
        onChangeText={setEmail} 
        placeholder="seu@email.com" 
      />
      <FormInput 
        label="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        placeholder="********" 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonSecondaryText}>Criar cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#333333', 
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
    color: '#A8D0E6', 
    fontWeight: '700', 
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#9E9E9E', 
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#F2F2F2', 
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#444444', 
    color: '#F2F2F2',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555555', 
  },
  button: {
    backgroundColor: '#A8D0E6', 
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2, 
  },
  buttonText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    marginTop: 15,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#A8D0E6',
    fontSize: 16,
    fontWeight: 'bold',
  },
});