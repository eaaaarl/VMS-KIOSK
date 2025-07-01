export interface AuthResponse {
  ghError: number;
  userId: number;
  userName: string;
  userType: number;
  userStatus: {
    type: string;
    data: number[];
  };
  accountType: number;
  message: string;
  token: string;
  refreshToken: string;
}
