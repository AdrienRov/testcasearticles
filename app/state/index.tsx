import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favoritesSlice';
import themeReducer from './features/themeSlice';

// Création du store Redux avec les reducers favoritesReducer et themeReducer
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    theme: themeReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
