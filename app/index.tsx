import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { store } from './state';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { loadFavorites } from './state/features/favoritesSlice';
import { selectDarkMode } from './state/features/themeSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from './state/hooks';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

function MainApp() {
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector(selectDarkMode);

  // Charger les favoris au démarrage de l'application
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  return (
    <>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : '#F5F5F5'}
      />
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
            borderTopColor: isDarkMode ? '#2C2C2C' : '#E0E0E0',
            elevation: 0,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: -4 },
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: isDarkMode ? '#4AA5F0' : '#007AFF',
          tabBarInactiveTintColor: isDarkMode ? '#A0A0A0' : '#666666',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          tabBarIcon: ({ color, size }) => {
            const icons: { [key: string]: string } = {
              Recherche: 'search',
              Favoris: 'heart',
            };
            return (
              <Icon 
                name={icons[route.name as keyof typeof icons]} 
                size={size} 
                color={color} 
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Recherche"
          component={SearchScreen}
        />
        <Tab.Screen
          name="Favoris"
          component={FavoritesScreen}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}