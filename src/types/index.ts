// User types
export interface User {
  id: string;
  name: string;
  registerNumber: string;
  department: string;
  email: string;
  password: string; // In a real app, never store plain text passwords
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Subject grade types
export interface SubjectGrade {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

// Semester types
export interface Semester {
  id: string;
  number: number;
  subjects: SubjectGrade[];
  gpa: number;
}

// Student record types
export interface StudentRecord {
  userId: string;
  semesters: Semester[];
  cgpa: number;
}