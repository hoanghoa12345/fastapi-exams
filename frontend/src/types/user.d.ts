export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  last_name: string;
  first_name: string;
  phone: string;
  birth_date: string;
  address: string;
  is_active: boolean;
  verify_token: string;
  is_verified: boolean;
  created_at: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  confirm_password: string;
}
