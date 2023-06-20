import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MealPlannerScreen = ({ mealPlan }) => {
  if (!mealPlan) {
    return <Text>No meal plan available</Text>;
  }

  return (
    <View style={styles.container}>
      {Object.entries(mealPlan).map(([day, meals]) => (
        <View style={styles.dayContainer} key={day}>
          <Text style={styles.dayLabel}>{day}</Text>
          {Object.entries(meals).map(([meal, foodItems]) => (
            <View style={styles.mealSection} key={meal}>
              <Text style={styles.mealLabel}>{meal}</Text>
              {Array.isArray(foodItems) ? (
                foodItems.map((food, index) => (
                  <Text key={index}>{food}</Text>
                ))
              ) : (
                <Text>{foodItems}</Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dayContainer: {
    marginBottom: 16,
  },
  dayLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealSection: {
    marginBottom: 8,
  },
  mealLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default MealPlannerScreen;
