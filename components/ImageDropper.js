import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageDropper({ imageUri, onImageSelected }) {
  const [localUri, setLocalUri] = useState(imageUri || null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permissão necessária para acessar a galeria!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri || result.uri;
      setLocalUri(uri);
      onImageSelected(uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text>Escolher imagem</Text>
      </TouchableOpacity>
      {localUri ? <Image source={{ uri: localUri }} style={styles.preview} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  preview: { width: 150, height: 150, marginTop: 8, borderRadius: 8 },
  button: { marginTop: 8, padding: 8, borderWidth: 1, borderRadius: 6 },
});