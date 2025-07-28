import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface CommentSectionProps {
  comment: string;
  enabledRequireComment: boolean;
  onCommentChange: (comment: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comment,
  enabledRequireComment,
  onCommentChange,
}) => {
  return (
    <View className="mb-8 flex-1">
      <TextInput
        value={comment}
        onChangeText={onCommentChange}
        placeholder={enabledRequireComment ? 'Comment Required' : 'Optional Comment'}
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        className={`flex-1 rounded-2xl border bg-white p-6 text-lg text-gray-700 ${enabledRequireComment && !comment.trim() ? 'border-red-400' : 'border-gray-200'} shadow-sm`}
        style={{
          minHeight: 100,
          maxHeight: 150,
        }}
      />
      {enabledRequireComment && !comment.trim() && (
        <Text className="ml-2 mt-2 text-red-500">Please provide a comment</Text>
      )}
    </View>
  );
};
