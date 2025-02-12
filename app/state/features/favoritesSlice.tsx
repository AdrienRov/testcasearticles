import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState } from '../index';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface FavoritesState {
  favorites: Post[];
}

const initialState: FavoritesState = {
  favorites: [],
};

// Création d'un slice pour gérer les favoris
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Post[]>) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<Post>) => {
      const post = action.payload;
      const isFavorite = state.favorites.some((fav) => fav.id === post.id);

      if (isFavorite) {
        state.favorites = state.favorites.filter((fav) => fav.id !== post.id);
      } else {
        state.favorites.push(post);
      }

      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { setFavorites, toggleFavorite } = favoritesSlice.actions;

// Charger les favoris depuis AsyncStorage
export const loadFavorites = () => async (dispatch: AppDispatch) => {
  const data = await AsyncStorage.getItem('favorites');
  if (data) {
    dispatch(setFavorites(JSON.parse(data)));
  }
};

export const selectFavorites = (state: RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
