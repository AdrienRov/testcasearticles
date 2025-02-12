import { StyleSheet } from 'react-native';

const PostCardStyles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
    shadowOpacity: 0.2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginRight: 16,
  },
  titleDark: {
    color: '#E0E0E0',
  },
  body: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 24,
  },
  bodyDark: {
    color: '#B0B0B0',
  },
  heartButton: {
    padding: 4,
  },
});

export default PostCardStyles;
