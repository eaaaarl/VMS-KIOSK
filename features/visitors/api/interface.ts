export interface IVisitorLog {
  id: number;
  strId: string;
  logIn: string;
  logOut: string | null;
  sysLogOut: string | null;
  visitorId: number;
  officeId: number;
  serviceId: number;
  specService: string;
  returned: {
    type: string;
    data: number[];
  };
  rating: number | null;
  comment: string | null;
  userLogInId: number | null;
  userLogOutId: number | null;
  iId: number;
  strLogIn: string;
  strLogIn2: string;
  firstname: string;
  name: string;
  contactNo1: string;
  officeName: string;
  timeIn: string;
  timeOut: string | null;
  service: string;
  serviceName: string;
}

export interface IVisitorLogResponse {
  results: IVisitorLog[];
}

export interface IAvailableVisitor {
  id: number;
  firstname: string;
  lastname: string;
  middlename: string;
  contactNo1: number;
  contactNo2: string;
  contactNo3: number;
  name: string;
}

export interface IAvailableVisitorResponse {
  results: IAvailableVisitor[];
}

export interface ICreateVisitorPayload {
  firstname: string;
  lastname: string;
  middlename: string;
  contactNo1: string;
}

export interface ICreateVisitorResponse {
  ghError: number;
  ghMessage: string;
  visitorId: number;
}

export interface ICreateVisitorLogPayload {
  log: {
    id: number;
    strId: string;
    logIn: string;
    logInDate: string;
    visitorId: number;
    officeId: number;
    serviceId: number;
    specService: string;
    returned: boolean;
  };
}

export interface IUploadVisitorImagesPayload {
  photo: Blob;
}
