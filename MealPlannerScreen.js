import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MealPlanContext from './MealPlanContext';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlannerScreen() {
  const { mealPlan } = useContext(MealPlanContext);
  const [selectedDay, setSelectedDay] = useState('');

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const calculateTotalCalories = (meals) => {
    let totalCalories = 0;

    Object.values(meals).forEach((meal) => {
      meal.forEach((item) => {
        totalCalories += item.calories;
      });
    });

    return totalCalories;
  };

  const renderMealItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Text style={styles.foodLabel}>{item.food}</Text>
      <Text style={styles.calories}>{item.calories} Calories</Text>
    </View>
  );

  const renderDayItem = ({ item }) => {
    const meals = mealPlan[item] || {};
    const totalCalories = calculateTotalCalories(meals);

    return (
      <View style={styles.dayItem}>
        <Text style={styles.day}>{item}</Text>
        {meals && meals.Breakfast && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
            <FlatList
              data={meals.Breakfast}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {meals && meals.Lunch && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
            <FlatList
              data={meals.Lunch}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {meals && meals.Dinner && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
            <FlatList
              data={meals.Dinner}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {meals && meals.Snack && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
            <FlatList
              data={meals.Snack}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        <Text style={styles.totalCalories}>Total Calories: {totalCalories}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedDay}
        onValueChange={handleDayChange}
        style={styles.picker}
      >
        <Picker.Item label="Select a day" value="" />
        {daysOfWeek.map((day) => (
          <Picker.Item key={day} label={day} value={day} />
        ))}
      </Picker>
      {selectedDay !== '' ? (
        <FlatList
          data={[selectedDay]}
          renderItem={renderDayItem}
          keyExtractor={(item) => item}
        />
      ) : (
        <Text>Please select a day</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  picker: {
    marginBottom: 16,
  },
  dayItem: {
    marginBottom: 16,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealContainer: {
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  foodLabel: {
    flex: 1,
  },
  calories: {
    marginLeft: 8,
  },
  totalCalories: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});
