export interface IOffice {
  id: number;
  name: string;
}

export interface IOfficeResponse {
  results: IOffice[];
}
