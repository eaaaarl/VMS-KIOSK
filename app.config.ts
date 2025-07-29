export default {
  expo: {
    name: 'VMS Kiosk',
    slug: 'vms-kiosk',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'vmskiosk',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    jsEngine: 'hermes',
    ios: {
      supportsTablet: true,
      icon: {
        dark: './assets/icons/ios-dark.png',
        light: './assets/icons/ios-light.png',
        tinted: './assets/icons/ios-tinted.png',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icons/adaptive-icon-box.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.eaaaarl.vmskiosk',
      permissions: [
        'android.permission.BLUETOOTH',
        'android.permission.BLUETOOTH_ADMIN',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.BLUETOOTH_CONNECT',
        'android.permission.BLUETOOTH_SCAN',
        'android.permission.BLUETOOTH_ADVERTISE',
      ],
      jsEngine: 'hermes',
    },
    plugins: [
      'expo-router',
      [
        'expo-web-browser',
        {
          experimentalLauncherActivity: false,
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/icons/a-splash-icon-dark.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            image: './assets/icons/a-splash-icon-light.png',
            imageWidth: 200,
            resizeMode: 'contain',
            backgroundColor: '#000000',
          },
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
          microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
          recordAudioAndroid: true,
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: 'fead2e95-8b65-4bc2-be42-97f9c66dc08f',
      },
    },
    owner: 'eaaaarl',
  },
};
