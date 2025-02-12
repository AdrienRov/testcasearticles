import { StyleSheet } from 'react-native';

const FavoritesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  lightMode: {
    backgroundColor: '#F5F5F5',
  },
  darkMode: {
    backgroundColor: '#121212',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyTitleDark: {
    color: '#E0E0E0',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyTextDark: {
    color: '#A0A0A0',
  },
});

export default FavoritesScreenStyles;
