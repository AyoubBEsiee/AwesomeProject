import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [bmr, setBMR] = useState(0);

  const calculateBMR = () => {
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Height:', height);
    console.log('Weight:', weight);
    console.log('Activity Level:', activityLevel);

    // Vérifier que les valeurs ne sont pas vides
    if (age === '' || gender === '' || height === '' || weight === '' || activityLevel === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }
  
    let bmr = 0;
  
    // Convertir les valeurs en nombres à virgule flottante
    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);
  
    // Vérifier que les valeurs sont valides
    if (isNaN(ageValue) || isNaN(heightValue) || isNaN(weightValue)) {
      alert('Veuillez saisir des valeurs numériques valides');
      return;
    }
  
    // Calculer le BMR en fonction du genre
    if (gender === 'male') {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
    } else if (gender === 'female') {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }
  
    // Appliquer le facteur d'activité
    if (activityLevel === 'sedentary') {
      bmr *= 1.2;
    } else if (activityLevel === 'light_exercise') {
      bmr *= 1.375;
    } else if (activityLevel === 'moderate_exercise') {
      bmr *= 1.55;
    } else if (activityLevel === 'heavy_exercise') {
      bmr *= 1.725;
    } else if (activityLevel === 'extra_active') {
      bmr *= 1.9;
    }
  
    // Mettre à jour la valeur de bmr
    setBMR(bmr.toFixed(2));
  };
  
  
  const handleCalculatePress = () => {
    calculateBMR();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text style={styles.label}>Height (cm):</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Activity Level:</Text>
      <Picker
        selectedValue={activityLevel}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
      >
        <Picker.Item label="Sedentary" value="sedentary" />
        <Picker.Item label="Light Exercise" value="light_exercise" />
        <Picker.Item label="Moderate Exercise" value="moderate_exercise" />
        <Picker.Item label="Heavy Exercise" value="heavy_exercise" />
        <Picker.Item label="Extra Active" value="extra_active" />
      </Picker>

      <Text style={styles.label}>Health Goal:</Text>
      <Picker
        selectedValue={healthGoal}
        onValueChange={(itemValue) => setHealthGoal(itemValue)}
      >
        <Picker.Item label="Weight Loss" value="weight_loss" />
        <Picker.Item label="Weight Maintenance" value="weight_maintenance" />
        <Picker.Item label="Weight Gain" value="weight_gain" />
      </Picker>

      <Button title="Calculate" onPress={handleCalculatePress} />

      <Text style={styles.result}>Basal Metabolic Rate (BMR): {bmr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
  },
});
