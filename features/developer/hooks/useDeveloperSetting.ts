import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface DeveloperConfig {
  ipAddress: string;
  port: string;
}

const STORAGE_KEY = 'developer_config';

export function useDeveloperSetting() {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentConfig: DeveloperConfig = {
    ipAddress,
    port,
  };

  // Load saved configuration on mount
  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const savedConfig = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedConfig) {
        const config: DeveloperConfig = JSON.parse(savedConfig);
        setIpAddress(config.ipAddress || '');
        setPort(config.port || '');
      }
    } catch (error) {
      console.error('Error loading developer config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!ipAddress.trim() || !port.trim()) {
        Alert.alert('Validation Error', 'Please enter both IP address and port number.');
        return;
      }

      // Basic IP address validation
      const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (!ipRegex.test(ipAddress.trim())) {
        Alert.alert('Invalid IP Address', 'Please enter a valid IP address.');
        return;
      }

      // Port validation
      const portNum = parseInt(port, 10);
      if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
        Alert.alert('Invalid Port', 'Please enter a valid port number (1-65535).');
        return;
      }

      const config: DeveloperConfig = {
        ipAddress: ipAddress.trim(),
        port: port.trim(),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      
      Alert.alert(
        'Configuration Saved',
        `API endpoint configured: http://${config.ipAddress}:${config.port}`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error saving developer config:', error);
      Alert.alert('Error', 'Failed to save configuration. Please try again.');
    }
  };

  const resetConfig = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setIpAddress('');
      setPort('');
      Alert.alert('Configuration Reset', 'Developer settings have been reset to default.');
    } catch (error) {
      console.error('Error resetting developer config:', error);
      Alert.alert('Error', 'Failed to reset configuration. Please try again.');
    }
  };

  return {
    currentConfig,
    ipAddress,
    port,
    isLoading,
    setIpAddress,
    setPort,
    handleSave,
    resetConfig,
  };
} 