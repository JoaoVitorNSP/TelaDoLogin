import React, { useContext, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import { UserContext } from '../context/UserContext';

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
      <Text style={styles.title}>Bem-vindo</Text>
      <FormInput label="E-mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" placeholderTextColor="white"/>
      <FormInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="********" />
      <View style={{ marginTop: 12 }}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Criar cadastro" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 12, textAlign: 'center' },
});