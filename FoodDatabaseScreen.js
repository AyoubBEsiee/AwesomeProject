import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MealPlannerScreen from './MealPlannerScreen';

export default function FoodDatabaseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodLabel, setFoodLabel] = useState('');
  const [calories, setCalories] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [mealPlan, setMealPlan] = useState({});

  const handleSearch = () => {
    // Code pour effectuer la recherche
    console.log('Recherche de:', searchQuery);

    // Make the API request
    fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=6cf7c9b8&app_key=626cb5eeb43ffd8ae36273bf2557a45c&ingr=${searchQuery}&nutrition-type=cooking`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        console.log('API Response:', data);

        // Extract relevant information from the response
        if (data.parsed.length > 0) {
          const { label, nutrients } = data.parsed[0].food;
          const { ENERC_KCAL } = nutrients;

          // Update the state variables with the extracted values
          setFoodLabel(label);
          setCalories(ENERC_KCAL);
          setSuggestions([]);
        } else {
          console.log('No results found for the search query.');
          setFoodLabel('');
          setCalories(0);
          setSuggestions([]);
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };

  const handleSuggestionPress = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch();
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);

    if (text.length >= 2) {
      // Effectuer la recherche des suggestions
      fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=6cf7c9b8&app_key=626cb5eeb43ffd8ae36273bf2557a45c&ingr=${text}&nutrition-type=cooking&autocomplete=true`)
        .then((response) => response.json())
        .then((data) => {
          // Gérer les données de la réponse de l'API
          if (data.hints.length > 0) {
            console.log('Suggestions:', data.hints);
            const foodSuggestions = data.hints.map((hint) => hint.food.label);
            setSuggestions(foodSuggestions);
          } else {
            setSuggestions([]);
          }
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleConfirmation = () => {
    if (searchQuery !== '' && selectedDay !== '' && selectedMeal !== '' && foodLabel !== '' && calories > 0) {
      const selectedMealItem = { food: foodLabel, calories };

      const updatedMealPlan = { ...mealPlan };

      if (selectedDay in updatedMealPlan) {
        const selectedDayMeals = updatedMealPlan[selectedDay];
        if (selectedMeal in selectedDayMeals) {
          selectedDayMeals[selectedMeal].push(selectedMealItem);
        } else {
          selectedDayMeals[selectedMeal] = [selectedMealItem];
        }
      } else {
        updatedMealPlan[selectedDay] = { [selectedMeal]: [selectedMealItem] };
      }

      setMealPlan(updatedMealPlan);
      setSearchQuery('');
      setSelectedDay('');
      setSelectedMeal('');
      setFoodLabel('');
      setCalories(0);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={handleInputChange}
        placeholder="Enter a food item"
      />
      {suggestions.length > 0 && (
        <View style={styles.suggestionContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Food Label: {foodLabel}</Text>
      <Text style={styles.label}>Calories: {calories}</Text>

      <Picker
        selectedValue={selectedDay}
        onValueChange={(itemValue) => setSelectedDay(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a day" value="" />
        <Picker.Item label="Monday" value="Monday" />
        <Picker.Item label="Tuesday" value="Tuesday" />
        <Picker.Item label="Wednesday" value="Wednesday" />
        <Picker.Item label="Thursday" value="Thursday" />
        <Picker.Item label="Friday" value="Friday" />
        <Picker.Item label="Saturday" value="Saturday" />
        <Picker.Item label="Sunday" value="Sunday" />
      </Picker>

      <Picker
        selectedValue={selectedMeal}
        onValueChange={(itemValue) => setSelectedMeal(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a meal" value="" />
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Snack" value="Snack" />
      </Picker>

      <Button title="Add to Meal Plan" onPress={handleConfirmation} />

      <MealPlannerScreen mealPlan={mealPlan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  suggestionContainer: {
    width: '80%',
    marginTop: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  picker: {
    width: '80%',
    marginBottom: 10,
  },
  label: {
    marginVertical: 10,
  },
});
