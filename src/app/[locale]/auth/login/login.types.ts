export interface LoginPayload {
  email: string;
  password: string;
  role: "Instructor" | "User";
}
