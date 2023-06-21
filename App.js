import React from 'react';
import { Ionicons,AntDesign} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MealPlannerScreen from './MealPlannerScreen.js';
import HealthGoalScreen from './HealthGoals.js';
import FoodDatabaseScreen from './FoodDatabaseScreen.js';
import { MealPlanProvider } from './MealPlanContext.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MealPlanProvider>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Health Goals') {
              iconName = 'linechart';
            } else if (route.name === 'FoodDatabase') {
              iconName = 'database';
            } else if (route.name === 'Meal Planner') {
              iconName = 'calendar';
            }


            if (iconName && iconName.startsWith('md-')) {
              return <Ionicons name={iconName} color={color} size={size} />;
            } else if (iconName) {
              return <AntDesign name={iconName} color={color} size={size} />;
            } else {
              return null;
            }
          },
        })}
      >
        <Tab.Screen name="Health Goals" component={HealthGoalScreen} />
        <Tab.Screen name="FoodDatabase" component={FoodDatabaseScreen} />
        <Tab.Screen name="Meal Planner" component={MealPlannerScreen} />
      </Tab.Navigator>
      </MealPlanProvider>
    </NavigationContainer>
  );
}
