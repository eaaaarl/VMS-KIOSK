export interface IFormData {
  visitorName: string;
  visitorId: number;
  mobileNumber: string;
  officeToVisitId: number;
  serviceId: number | null;
  reasonForVisit: string;
  otherReason: string | null | undefined;
}
