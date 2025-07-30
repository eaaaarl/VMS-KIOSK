import React from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Visitor {
  id: number;
  firstname: string;
  lastname: string;
  middlename: string;
  name: string;
  contactNo1: number;
  contactNo2: string;
  contactNo3: number;
}

interface SignInVisitorModalProps {
  visible: boolean;
  visitorName: string;
  filteredVisitors: Visitor[];
  onVisitorNameChange: (value: string) => void;
  onSelectVisitor: (visitor: Visitor) => void;
  onClose: () => void;
}

export const SignInVisitorModal: React.FC<SignInVisitorModalProps> = ({
  visible,
  visitorName,
  filteredVisitors,
  onVisitorNameChange,
  onSelectVisitor,
  onClose,
}) => {
  const clearSearch = () => {
    onVisitorNameChange('');
  };

  const validateVisitor = (visitor: Visitor): boolean => {
    return (
      visitor.firstname?.trim().length > 0 &&
      visitor.lastname?.trim().length > 0
    );
  };

  const formatVisitorName = (visitor: Visitor): string => {
    const parts = [
      visitor.firstname?.trim(),
      visitor.middlename?.trim(),
      visitor.lastname?.trim(),
    ].filter(Boolean);
    return parts.join(' ');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '70%',
          }}
        >
          <View style={{ padding: 16 }}>
            {/* Search Input Container */}
            <View style={{ position: 'relative', marginBottom: 8 }}>
              <TextInput
                className="rounded-lg border border-blue-300 bg-white px-4 py-4 pr-12 text-lg"
                placeholder="Type name to search, use comma for LAST, FIRST"
                placeholderTextColor="gray"
                value={visitorName}
                onChangeText={onVisitorNameChange}
                autoFocus
              />
              {visitorName.length > 0 && (
                <TouchableOpacity
                  onPress={clearSearch}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: [{ translateY: -16 }],
                    width: 32,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 16,
                  }}
                >
                  <Text style={{ color: '#666', fontSize: 24, fontWeight: 'bold' }}>×</Text>
                </TouchableOpacity>
              )}
            </View>

            {filteredVisitors.length === 0 && visitorName.length > 0 && (
              <View className="py-3 px-4">
                <Text className="text-gray-500">
                  No visitors found. Try:
                </Text>
                <Text className="text-gray-500">
                  • Typing part of the name
                </Text>
                <Text className="text-gray-500">
                  • Using LAST, FIRST format
                </Text>
              </View>
            )}

            <FlatList
              data={filteredVisitors.slice(0, 20)}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const isValidVisitor = validateVisitor(item);
                const formattedName = formatVisitorName(item);

                return (
                  <TouchableOpacity
                    className={`border-b border-gray-100 px-4 py-3 ${!isValidVisitor ? 'opacity-50' : ''}`}
                    onPress={() => {
                      if (isValidVisitor) {
                        onSelectVisitor(item);
                        onClose();
                      }
                    }}
                    disabled={!isValidVisitor}
                  >
                    <Text className="text-base text-gray-800">{formattedName}</Text>
                    {!isValidVisitor && (
                      <Text className="text-sm text-red-500">
                        Incomplete name information
                      </Text>
                    )}
                    <Text className="text-sm text-gray-500">
                      {item.contactNo1?.toString() ||
                        item.contactNo2?.toString() ||
                        item.contactNo3?.toString()}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 300 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};