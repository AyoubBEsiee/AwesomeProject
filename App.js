import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MealPlannerScreen from './MealPlannerScreen.js';
import HealthGoalScreen from './HealthGoals.js';
import FoodDatabaseScreen from './FoodDatabaseScreen.js';
import { MealPlanProvider } from './MealPlanContext.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MealPlanProvider>
        <Tab.Navigator>
          <Tab.Screen name="Health Goals" component={HealthGoalScreen} />
          <Tab.Screen name="FoodDatabase" component={FoodDatabaseScreen} />
          <Tab.Screen name="Meal Planner" component={MealPlannerScreen} />
        </Tab.Navigator>
      </MealPlanProvider>
    </NavigationContainer>
  );
}
