export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  account_type: string;
  type: number;
  auth_method: string;
  preferred_language: string;
  birthdate: string | null;
  nationality: string | null;
  residency: string | null;
  is_active: boolean;
  is_banned: boolean;
  email_verified_at: string | null;
  last_login_at: string;
  created_at: string;
  updated_at: string;
  token: string;
}

