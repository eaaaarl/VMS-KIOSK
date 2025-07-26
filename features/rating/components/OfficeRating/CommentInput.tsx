import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface CommentInputProps {
  value: string;
  onChangeText: (text: string) => void;
  enabledRequireComment: boolean;
  hasError: boolean;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  value,
  onChangeText,
  enabledRequireComment,
  hasError,
}) => {
  return (
    <View className="mb-8 flex-1">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={enabledRequireComment ? 'Comment (Required)' : 'Optional Comment'}
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        className={`flex-1 rounded-2xl border bg-white p-6 text-lg text-gray-700 ${hasError ? 'border-red-400' : 'border-gray-200'} shadow-sm`}
        style={{
          minHeight: 100,
          maxHeight: 150,
        }}
      />
      {hasError && (
        <Text className="ml-2 mt-2 text-red-500">
          Please provide a comment before proceeding
        </Text>
      )}
    </View>
  );
}; 