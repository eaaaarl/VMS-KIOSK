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
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <View style={{ backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '70%' }}>
          <View style={{ padding: 16 }}>
            <TextInput
              className="bg-white border border-blue-300 rounded-lg px-4 py-4 text-lg mb-2"
              placeholder="Search visitor"
              placeholderTextColor="gray"
              value={visitorName}
              onChangeText={onVisitorNameChange}
              autoFocus
            />
            <FlatList
              data={filteredVisitors.slice(0, 20)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-3 border-b border-gray-100"
                  onPress={() => {
                    onSelectVisitor(item);
                    onClose();
                  }}
                >
                  <Text className="text-gray-800 text-base">{item.name}</Text>
                  <Text className="text-gray-500 text-sm">
                    {item.contactNo1?.toString() || item.contactNo2?.toString() || item.contactNo3?.toString()}
                  </Text>
                </TouchableOpacity>
              )}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 300 }}
            />
            <TouchableOpacity onPress={onClose} style={{ marginTop: 12, alignItems: 'center' }}>
              <Text className="text-blue-500 font-semibold text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 