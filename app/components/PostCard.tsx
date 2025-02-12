import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import PostCardStyles from '../styles/PostCardStyles'; 

interface PostCardProps {
  title: string;
  body: string;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  isDarkMode: boolean; 
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  body,
  onToggleFavorite,
  isFavorite,
  isDarkMode
}) => {
  const scale = useSharedValue(1);

  // Animer le bouton de favoris
  useEffect(() => {
    scale.value = withSpring(isFavorite ? 1.3 : 1, { damping: 4, stiffness: 150 });
  }, [isFavorite]);

  // Style animé du bouton de favoris
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[
      PostCardStyles.card,
      isDarkMode && PostCardStyles.cardDark,
      { shadowColor: isDarkMode ? '#000' : '#2C2C2C' }
    ]}>
      <View style={PostCardStyles.header}>
        <Text 
          style={[
            PostCardStyles.title,
            isDarkMode && PostCardStyles.titleDark
          ]} 
          numberOfLines={2}
        >
          {title}
        </Text>
        <Pressable
          style={PostCardStyles.heartButton}
          onPress={onToggleFavorite}
          hitSlop={10}
        >
          <Animated.View style={animatedStyle}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF4B4B' : isDarkMode ? '#A0A0A0' : '#666'}
            />
          </Animated.View>
        </Pressable>
      </View>
      <Text 
        style={[
          PostCardStyles.body,
          isDarkMode && PostCardStyles.bodyDark
        ]} 
        numberOfLines={3}
      >
        {body}
      </Text>
    </View>
  );
};

export default PostCard;
