import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MealPlanContext from './MealPlanContext';

export default function MealPlannerScreen() {
  const { mealPlan } = useContext(MealPlanContext);
  const [selectedDay, setSelectedDay] = useState(null);

  const renderMealItem = ({ item }) => (
    <View style={styles.mealItem}>
      <Text style={styles.foodLabel}>{item.food}</Text>
      <Text style={styles.calories}>{item.calories} Calories</Text>
    </View>
  );

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const renderDayItem = ({ item }) => {
    const meals = item.meals;

    if (item.day !== selectedDay) {
      return null;
    }

    return (
      <View style={styles.dayItem}>
        <Text style={styles.day}>{item.day}</Text>
        {meals.Breakfast && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Breakfast</Text>
            <FlatList
              data={meals.Breakfast}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {meals.Lunch && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
            <FlatList
              data={meals.Lunch}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {meals.Dinner && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
            <FlatList
              data={meals.Dinner}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {meals.Snack && (
          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Snack</Text>
            <FlatList
              data={meals.Snack}
              renderItem={renderMealItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  };

  const mealPlanData = Object.entries(mealPlan).map(([day, meals]) => ({
    day,
    meals,
  }));

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedDay}
        onValueChange={handleDayChange}
        style={styles.picker}
      >
        <Picker.Item label="Select a day" value={null} />
        {mealPlanData.map((item) => (
          <Picker.Item key={item.day} label={item.day} value={item.day} />
        ))}
      </Picker>
      <FlatList
        data={mealPlanData}
        renderItem={renderDayItem}
        keyExtractor={(item) => item.day}
      />
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
});
