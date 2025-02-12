import React, { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, selectFavorites } from '../state/features/favoritesSlice';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/Feather';
import { toggleDarkMode, selectDarkMode } from '../state/features/themeSlice';
import SearchScreenStyles from '../styles/SearchScreenStyles';

// Nombre d'éléments par page
const ITEMS_PER_PAGE = 10;

const SearchScreen = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isDarkMode = useSelector(selectDarkMode);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const styles = SearchScreenStyles(isDarkMode);

  // Calculer la pertinence d'un post par rapport à une recherche
  const calculateRelevance = (post: Post, query: string): number => {
    const title = post.title.toLowerCase();
    const index = title.indexOf(query.toLowerCase());
    if (index === 0) return 3;
    if (index > 0) return 2;
    return 1;
  };

  // Trier les posts par pertinence
  const sortPostsByRelevance = (posts: Post[], query: string): Post[] => {
    return [...posts].sort((a, b) => calculateRelevance(b, query) - calculateRelevance(a, query));
  };

  // Récupérer tous les posts
  const fetchAllPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error(`Erreur ${response.status}: Impossible de récupérer les données.`);
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des données.");
    }
  };

  // Récupérer les posts paginés
  const fetchPaginatedPosts = async (pageNumber: number): Promise<void> => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${ITEMS_PER_PAGE}`
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: Impossible de récupérer les données.`);
      }

      const newPosts: Post[] = await response.json();
      if (newPosts.length < ITEMS_PER_PAGE) setHasMore(false);
      setPosts(prevPosts => (pageNumber === 1 ? newPosts : [...prevPosts, ...newPosts]));
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de la récupération des données.");
    }
  };

  // Initialisation
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchAllPosts();
      await fetchPaginatedPosts(1);
      setLoading(false);
    };
    initialFetch();
  }, []);

  // Mettre à jour les posts en fonction de la recherche
  useEffect(() => {
    if (search.trim() === '') {
      setPage(1);
      setHasMore(true);
      fetchPaginatedPosts(1);
    } else {
      const filtered = allPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) || 
        post.body.toLowerCase().includes(search.toLowerCase())
      );
      setPosts(sortPostsByRelevance(filtered, search));
      setHasMore(false);
    }
  }, [search]);

  // Charger plus de posts
  const handleLoadMore = async () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      await fetchPaginatedPosts(page + 1);
      setPage(prev => prev + 1);
      setLoadingMore(false);
    }
  };

  // Afficher le bouton "Voir plus"
  const renderFooter = () => {
    if (!posts.length || !hasMore) return null;
    return (
      <TouchableOpacity 
        style={styles.loadMoreButton} 
        onPress={handleLoadMore} 
        disabled={loadingMore}
      >
        {loadingMore ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.loadMoreText}>Voir plus</Text>
        )}
      </TouchableOpacity>
    );
  };

  // Mettre la première lettre d'une chaîne en majuscule
  const capitalizeTitle = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar 
            searchText={search} 
            onSearchChange={setSearch} 
          />
        </View>
        <TouchableOpacity 
          onPress={() => dispatch(toggleDarkMode())} 
          style={styles.darkModeButton}
          accessibilityLabel={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
        >
          <Icon 
            name={isDarkMode ? "sun" : "moon"} 
            size={22} 
            color={isDarkMode ? "#FDB813" : "#555"} 
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator 
          size="large" 
          color={isDarkMode ? "#4AA5F0" : "#007AFF"} 
          style={styles.centered} 
        />
      ) : errorMessage ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              title={capitalizeTitle(item.title)} 
              body={item.body}
              isFavorite={favorites.some((fav) => fav.id === item.id)}
              onToggleFavorite={() => dispatch(toggleFavorite(item))}
              isDarkMode={isDarkMode}
            />
          )}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>
                Aucun résultat trouvé
              </Text>
            </View>
          }
          ListFooterComponent={renderFooter}
          ListFooterComponentStyle={styles.footerContainer}
        />
      )}
    </View>
  );
};

export default SearchScreen;
