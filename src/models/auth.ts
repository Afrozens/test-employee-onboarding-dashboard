export interface SignIn {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface SignInResponse {
  accessToken: string;
  expiresIn: number;
  email: string;
}