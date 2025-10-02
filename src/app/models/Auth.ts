
export interface AuthPayload {
  email: string;
  password: string;
  username?: string; 
}


export interface AuthResponse {
  token: string;
}
