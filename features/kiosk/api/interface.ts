export interface SettingKioskOption {
  id: number;
  name: string;
  deviceType: number;
  transactionType: number;
  strDeviceType: string;
  strTransactionType: string;
}

export interface SettingKioskResponse {
  results: SettingKioskOption[];
}
