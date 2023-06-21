import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MealPlanContext from './MealPlanContext';

export default function MealPlannerScreen() {
  const { mealPlan } = useContext(MealPlanContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>
      {Object.entries(mealPlan).map(([day, meals]) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.day}>{day}</Text>
          {Object.entries(meals).map(([meal, items]) => (
            <View key={meal} style={styles.mealContainer}>
              <Text style={styles.meal}>{meal}</Text>
              {items.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                  <Text>{item.food}</Text>
                  <Text>Calories: {item.calories}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayContainer: {
    marginBottom: 20,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealContainer: {
    marginLeft: 10,
  },
  meal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    marginLeft: 20,
  },
});
