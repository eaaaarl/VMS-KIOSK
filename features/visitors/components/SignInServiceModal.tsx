import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface Service {
  id: number;
  name: string;
}

interface SignInServiceModalProps {
  visible: boolean;
  availableServices: Service[];
  onSelectService: (serviceId: number, serviceName: string) => void;
  onClose: () => void;
}

export const SignInServiceModal: React.FC<SignInServiceModalProps> = ({
  visible,
  availableServices,
  onSelectService,
  onClose,
}) => {
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
            <FlatList
              data={availableServices}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="border-b border-gray-100 px-4 py-3"
                  onPress={() => {
                    onSelectService(item.id, item.name);
                    onClose();
                  }}
                >
                  <Text className="text-base text-gray-800">{item.name}</Text>
                </TouchableOpacity>
              )}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 300 }}
            />
            <TouchableOpacity onPress={onClose} style={{ marginTop: 12, alignItems: 'center' }}>
              <Text className="text-lg font-semibold text-blue-500">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
