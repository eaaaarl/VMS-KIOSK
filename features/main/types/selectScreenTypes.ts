export interface SelectScreenProps {
  countReturned: number;
  onClose: () => void;
  onSetKioskFunction: () => void;
  onPrinterManagement: () => void;
}

export interface SelectScreenHookReturn {
  countReturned: number;
  handleClose: () => void;
  handleSetKioskFunction: () => void;
  handlePrinterManagement: () => void;
} 