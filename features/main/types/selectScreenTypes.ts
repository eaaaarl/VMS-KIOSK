export interface SelectScreenProps {
  countReturned: number;
  onClose: () => void;
  onSetKioskFunction: () => void;
  onPrinterManagement: () => void;
  onIpPortConfiguration: () => void;
}

export interface SelectScreenHookReturn {
  countReturned: number;
  handleClose: () => void;
  handleSetKioskFunction: () => void;
  handlePrinterManagement: () => void;
  handleIpPortConfiguration: () => void;
}
