export interface CaseStudy {
  _id: string;
  title: string;
  description: string;

  subtitle?: string;

  challenge?: string;
  solution?: string;

  benefit?: string;
  customer?: string;

  image: CaseStudyImage;

  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CaseStudiesResponse {
  success: boolean;
  message: string;
  data: CaseStudy[];
  pagination: Pagination;
}
export interface CaseStudyImage {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url?: string;   // Cloudinary image
  path?: string;  // Local uploaded image
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface SingleCaseStudyResponse {
  success: boolean;
  message: string;
  data: CaseStudy;
}
