export interface Career {
  _id: string;
  title: string;
  role?: string;
  department: string;
  location: string;
  type: string[];
  description?: string;
  requirements?: string;
  responsibilities?: string;
  isMultipleRoles?: boolean;
  isActive?: boolean;
  multiplePosition?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CareerResponse {
  success: boolean;
  message: string;
  data: Career[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CareerApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  linkedinProfile?: string;
  coverLetter?: string;
  careerPosition: string;
  yearsOfExperience: string;
  additionalInfo?: string;
}

export interface CareerApplication {
  _id: string;
  careerId: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  linkedinProfile?: string;
  coverLetter?: string;
  yearsOfExperience: string;
  additionalInfo?: string;
  status: "pending" | "reviewed" | "rejected" | "accepted";
  createdAt: string;
  updatedAt: string;
}
