import { StyleSheet } from 'react-native';

const SearchScreenStyles = (isDarkMode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#F5F5F5',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#2C2C2C' : '#E0E0E0',
    },
    searchContainer: {
      flex: 1,
      marginRight: 12,
    },
    darkModeButton: {
      padding: 10,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#2C2C2C' : '#F0F0F0',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: isDarkMode ? '#FF6B6B' : '#DC3545',
      textAlign: 'center',
      margin: 20,
      fontSize: 16,
    },
    emptyText: {
      color: isDarkMode ? '#A0A0A0' : '#666666',
      fontSize: 16,
      textAlign: 'center',
    },
    footerContainer: {
      padding: 16,
    },
    loadMoreButton: {
      backgroundColor: isDarkMode ? '#4AA5F0' : '#007AFF',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    loadMoreText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });
};

export default SearchScreenStyles;
