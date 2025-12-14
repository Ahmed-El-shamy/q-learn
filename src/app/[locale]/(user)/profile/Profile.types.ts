export interface ChangeUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ChangeUserPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
