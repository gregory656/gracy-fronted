export interface User {
  id: string;
  email: string;
  studentId?: string | null;
  name?: string | null;
  username?: string | null;
  role: "student" | "guest" | "alumni";
  verified: boolean;
  coins: number;
  createdAt: string;
}

export interface UsernameCheckResponse {
  available: boolean;
  suggestions: string[];
}
