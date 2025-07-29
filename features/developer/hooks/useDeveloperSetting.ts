import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setIpAddressConfig, setPortConfig } from '@/lib/redux/state/configSlice';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

interface DeveloperConfig {
  ipAddress: string;
  port: string;
}

export function useDeveloperSetting() {
  const dispatch = useAppDispatch();
  const reduxConfig = useAppSelector(state => state.config);
  const [ipAddress, setIpAddress] = useState(reduxConfig.ipAddress || '');
  const [port, setPort] = useState(reduxConfig.port ? reduxConfig.port.toString() : '');
  const [isLoading, setIsLoading] = useState(false);

  const currentConfig: DeveloperConfig = {
    ipAddress,
    port,
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (!ipAddress.trim() || !port.trim()) {
        Alert.alert('Validation Error', 'Please enter both IP address and port number.');
        return;
      }

      // Basic IP address validation
      const ipRegex =
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (!ipRegex.test(ipAddress.trim())) {
        Alert.alert('Invalid IP Address', 'Please enter a valid IP address.');
        return;
      }

      // Port validation - check for commas and valid number
      if (port.includes(',')) {
        Alert.alert('Invalid Port', 'Port number should not contain commas.');
        return;
      }

      const portNum = parseInt(port, 10);
      if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
        Alert.alert('Invalid Port', 'Please enter a valid port number (1-65535).');
        return;
      }

      const config: DeveloperConfig = {
        ipAddress: ipAddress.trim(),
        port: port.trim(),
      };

      dispatch(setIpAddressConfig({ ipAddress: config.ipAddress }));
      dispatch(setPortConfig({ port: portNum }));

      router.replace('/(main)');
    } catch (error) {
      console.error('Error saving developer config:', error);
      Alert.alert('Error', 'Failed to save configuration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetConfig = () => {
    setIpAddress('');
    setPort('');
    dispatch(setIpAddressConfig({ ipAddress: '' }));
    dispatch(setPortConfig({ port: 0 }));
    Alert.alert('Configuration Reset', 'Developer settings have been reset to default.');
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
