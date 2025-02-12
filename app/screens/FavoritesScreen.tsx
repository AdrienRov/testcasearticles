import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { toggleFavorite, selectFavorites } from '../state/features/favoritesSlice';
import { selectDarkMode } from '../state/features/themeSlice';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FavoritesScreenStyles from '../styles/FavoritesScreenStyles'; 

// Afficher un message lorsque la liste de favoris est vide
const EmptyFavorites = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <View style={FavoritesScreenStyles.emptyContainer}>
    <Icon 
      name="heart-outline" 
      size={64} 
      color={isDarkMode ? '#4AA5F0' : '#007AFF'} 
      style={FavoritesScreenStyles.emptyIcon}
    />
    <Text style={[
      FavoritesScreenStyles.emptyTitle,
      isDarkMode && FavoritesScreenStyles.emptyTitleDark
    ]}>
      Aucun favori
    </Text>
    <Text style={[
      FavoritesScreenStyles.emptyText,
      isDarkMode && FavoritesScreenStyles.emptyTextDark
    ]}>
      Les articles que vous ajoutez en favoris apparaîtront ici
    </Text>
  </View>
);

const FavoritesScreen = () => {
  const favorites = useSelector(selectFavorites);
  const isDarkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  return (
    <View style={[
      FavoritesScreenStyles.container, 
      isDarkMode ? FavoritesScreenStyles.darkMode : FavoritesScreenStyles.lightMode
    ]}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            body={item.body}
            isFavorite={true}
            onToggleFavorite={() => dispatch(toggleFavorite(item))}
            isDarkMode={isDarkMode}
          />
        )}
        contentContainerStyle={[
          FavoritesScreenStyles.listContent,
          favorites.length === 0 && FavoritesScreenStyles.emptyList
        ]}
        ListEmptyComponent={<EmptyFavorites isDarkMode={isDarkMode} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoritesScreen;
