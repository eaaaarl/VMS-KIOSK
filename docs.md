# VMS Kiosk Technical Documentation

## Overview

The VMS (Visitor Management System) Kiosk is a React Native application built with Expo that provides visitor registration, sign-in/sign-out functionality, and rating systems. The application integrates camera functionality for face and ID capture, Bluetooth connectivity for thermal printer support, and various visitor management features.

## Architecture

The application follows a feature-based architecture with the following key components:

- **Camera Module**: Handles face and ID card capture
- **Bluetooth Module**: Manages thermal printer connectivity
- **Visitor Management**: Handles visitor registration and sign-in/out
- **Rating System**: Provides feedback collection
- **Configuration**: Centralized app configuration management

## Camera System

### Camera Types

1. **Face Camera**: Captures visitor's face for identification
2. **ID Camera**: Captures visitor's ID card for verification

### Camera Flow Sequence

```mermaid
sequenceDiagram
    participant User
    participant CameraScreen
    participant useCamera
    participant CameraView
    participant FileSystem
    participant Redux
    participant Router

    User->>CameraScreen: Navigate to camera
    CameraScreen->>useCamera: Initialize camera (face/id mode)
    useCamera->>CameraView: Request camera permissions
    CameraView-->>useCamera: Permission granted/denied
    
    alt Permission Denied
        useCamera->>CameraScreen: Show permission request
        CameraScreen->>User: Display permission dialog
        User->>CameraScreen: Grant permission
        CameraScreen->>useCamera: Retry permission request
    end
    
    useCamera->>CameraView: Initialize camera view
    CameraView-->>useCamera: Camera ready
    useCamera->>CameraScreen: Update camera state
    
    User->>CameraScreen: Start countdown
    CameraScreen->>useCamera: startCountdown()
    useCamera->>CameraScreen: Start 3-second countdown
    
    loop Countdown (3,2,1)
        useCamera->>CameraScreen: Update countdown state
        CameraScreen->>User: Display countdown
    end
    
    useCamera->>CameraView: takePictureAsync()
    CameraView-->>useCamera: Photo captured
    useCamera->>FileSystem: Move photo to cache
    FileSystem-->>useCamera: File saved
    
    useCamera->>Redux: Dispatch image ID (face/card)
    Redux-->>useCamera: State updated
    
    useCamera->>Router: Navigate to SignInScreen
    Router->>User: Display sign-in form
```

### Camera State Management

```mermaid
stateDiagram-v2
    [*] --> PermissionRequest
    PermissionRequest --> CameraReady : Permission Granted
    PermissionRequest --> PermissionDenied : Permission Denied
    PermissionDenied --> PermissionRequest : Retry
    
    CameraReady --> Countdown : User starts capture
    Countdown --> Capturing : Countdown reaches 0
    Countdown --> CameraReady : User cancels
    
    Capturing --> Processing : Photo taken
    Processing --> FileSaved : File moved to cache
    FileSaved --> ReduxUpdate : Image ID dispatched
    ReduxUpdate --> Navigation : Router navigates
    Navigation --> [*]
    
    Capturing --> Error : Capture failed
    Error --> CameraReady : Retry
```

## Bluetooth Thermal Printer System

### Bluetooth Connection Flow

```mermaid
sequenceDiagram
    participant App
    participant useBluetoothPrinter
    participant BluetoothClassic
    participant Permissions
    participant Redux
    participant ThermalPrinter

    App->>useBluetoothPrinter: Initialize bluetooth
    useBluetoothPrinter->>Permissions: Request bluetooth permissions
    Permissions-->>useBluetoothPrinter: Permissions granted
    
    useBluetoothPrinter->>BluetoothClassic: Check if bluetooth enabled
    BluetoothClassic-->>useBluetoothPrinter: Bluetooth status
    
    alt Bluetooth Disabled
        useBluetoothPrinter->>BluetoothClassic: Request enable bluetooth
        BluetoothClassic-->>useBluetoothPrinter: Bluetooth enabled
    end
    
    useBluetoothPrinter->>BluetoothClassic: Get bonded devices
    BluetoothClassic-->>useBluetoothPrinter: List of paired devices
    
    App->>useBluetoothPrinter: Start device discovery
    useBluetoothPrinter->>BluetoothClassic: startDiscovery()
    BluetoothClassic-->>useBluetoothPrinter: Discovered devices
    
    App->>useBluetoothPrinter: Connect to device
    useBluetoothPrinter->>BluetoothClassic: connectToDevice(deviceId)
    BluetoothClassic-->>useBluetoothPrinter: Connection established
    
    useBluetoothPrinter->>Redux: Store connected device
    Redux-->>useBluetoothPrinter: Device persisted
    
    App->>useBluetoothPrinter: Print ticket/QR code
    useBluetoothPrinter->>ThermalPrinter: Send print data
    ThermalPrinter-->>useBluetoothPrinter: Print completed
```

### Thermal Printer Print Flow

```mermaid
sequenceDiagram
    participant SignInSuccess
    participant useSignInSuccess
    participant EscPosEncoder
    participant RNBluetoothClassic
    participant ThermalPrinter
    participant Redux

    SignInSuccess->>useSignInSuccess: Visitor signed in
    useSignInSuccess->>useSignInSuccess: Check print ticket config
    
    alt Print Ticket Enabled
        useSignInSuccess->>useSignInSuccess: Generate ticket data
        useSignInSuccess->>EscPosEncoder: Create print command
        EscPosEncoder->>EscPosEncoder: Initialize printer
        EscPosEncoder->>EscPosEncoder: Set alignment center
        EscPosEncoder->>EscPosEncoder: Generate QR code
        EscPosEncoder->>EscPosEncoder: Add ticket number
        EscPosEncoder->>EscPosEncoder: Add thank you message
        EscPosEncoder->>EscPosEncoder: Encode to bytes
        
        useSignInSuccess->>RNBluetoothClassic: Get connected devices
        RNBluetoothClassic-->>useSignInSuccess: Connected device list
        
        alt Device Connected
            useSignInSuccess->>RNBluetoothClassic: Convert to base64
            useSignInSuccess->>RNBluetoothClassic: writeToDevice(data)
            RNBluetoothClassic->>ThermalPrinter: Send print data
            ThermalPrinter-->>RNBluetoothClassic: Print completed
            RNBluetoothClassic-->>useSignInSuccess: Print success
            useSignInSuccess->>SignInSuccess: Update print status
        else No Device Connected
            useSignInSuccess->>SignInSuccess: Skip printing
        end
    else Print Ticket Disabled
        useSignInSuccess->>SignInSuccess: Skip printing
    end
    
    SignInSuccess->>Redux: Update UI state
```

### Bluetooth State Management

```mermaid
stateDiagram-v2
    [*] --> Initializing
    Initializing --> PermissionCheck : App starts
    PermissionCheck --> BluetoothCheck : Permissions granted
    PermissionCheck --> PermissionDenied : Permissions denied
    
    BluetoothCheck --> Discovery : Bluetooth enabled
    BluetoothCheck --> EnableBluetooth : Bluetooth disabled
    EnableBluetooth --> Discovery : Bluetooth enabled
    
    Discovery --> DeviceSelection : Devices found
    DeviceSelection --> Connecting : User selects device
    Connecting --> Connected : Connection successful
    Connecting --> ConnectionFailed : Connection failed
    
    Connected --> Printing : Print request
    Printing --> PrintSuccess : Print completed
    Printing --> PrintError : Print failed
    
    PrintSuccess --> Connected : Ready for next print
    PrintError --> Connected : Retry available
    
    Connected --> Disconnected : User disconnects
    Disconnected --> Discovery : Start over
```

## Visitor Management Flow

### Sign-In Process

```mermaid
sequenceDiagram
    participant Visitor
    participant Kiosk
    participant Camera
    participant API
    participant Printer
    participant Database

    Visitor->>Kiosk: Start sign-in process
    Kiosk->>Camera: Navigate to face camera
    Camera->>Camera: Capture face photo
    Camera->>Kiosk: Return to sign-in form
    
    Kiosk->>Camera: Navigate to ID camera
    Camera->>Camera: Capture ID photo
    Camera->>Kiosk: Return to sign-in form
    
    Visitor->>Kiosk: Fill visitor information
    Kiosk->>API: Submit visitor data
    API->>Database: Store visitor record
    Database-->>API: Record created
    API-->>Kiosk: Ticket number generated
    
    Kiosk->>Printer: Print visitor ticket
    Printer-->>Kiosk: Ticket printed
    Kiosk->>Visitor: Show success screen
```

### Sign-Out Process

```mermaid
sequenceDiagram
    participant Visitor
    participant Kiosk
    participant Camera
    participant API
    participant Database

    Visitor->>Kiosk: Start sign-out process
    Kiosk->>Camera: Activate barcode scanner
    Camera->>Camera: Scan ticket barcode
    Camera->>Kiosk: Ticket number captured
    
    Kiosk->>API: Get visitor information
    API->>Database: Query visitor record
    Database-->>API: Visitor data
    API-->>Kiosk: Visitor details
    
    Kiosk->>API: Submit sign-out
    API->>Database: Update visitor record
    Database-->>API: Record updated
    API-->>Kiosk: Sign-out confirmed
    
    Kiosk->>Visitor: Show thank you message
```

## Key Components

### Camera Components

- **useCamera Hook**: Core camera functionality
- **useFaceCameraScreen**: Face capture specific logic
- **useIDCameraScreen**: ID capture specific logic
- **CameraView**: Expo camera component wrapper
- **Camera Controls**: UI controls for camera interaction

### Bluetooth Components

- **useBluetoothPrinter**: Core bluetooth functionality
- **BluetoothClassic**: React Native bluetooth library
- **EscPosEncoder**: Thermal printer command encoder
- **Device Management**: Connection and device handling

### Visitor Management Components

- **useSignInSuccess**: Sign-in completion and printing
- **useSignOutVisitor**: Sign-out with barcode scanning
- **useVisitorRegistrationForm**: Visitor registration
- **API Integration**: Backend communication

## Configuration

The application uses a centralized configuration system:

- **Camera Settings**: Resolution, quality, countdown timing
- **Bluetooth Settings**: Device persistence, connection retry
- **Print Settings**: Ticket format, QR code size, alignment
- **Feature Flags**: Enable/disable specific features

## Error Handling

### Camera Errors
- Permission denied: Show permission request dialog
- Camera initialization failed: Retry with fallback
- Capture failed: Show error message and retry option

### Bluetooth Errors
- Connection failed: Show device selection
- Print failed: Show error and retry option
- Device not found: Guide user to pair device

### Network Errors
- API timeout: Show offline mode
- Data sync failed: Queue for retry
- Configuration load failed: Use defaults

## Performance Considerations

- **Camera**: Optimized image capture and processing
- **Bluetooth**: Connection pooling and device caching
- **Printing**: Async print operations with status feedback
- **Memory**: Image compression and cache management

## Security

- **Permissions**: Granular permission management
- **Data**: Secure storage of visitor information
- **Network**: Encrypted API communication
- **Bluetooth**: Secure device pairing and data transmission

## Testing

### Unit Tests
- Camera functionality
- Bluetooth connectivity
- Print operations
- API integration

### Integration Tests
- End-to-end visitor flow
- Camera to print workflow
- Error handling scenarios

### Manual Testing
- Device compatibility
- Print quality verification
- User experience validation 