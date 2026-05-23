export interface Service {
  _id: string;
  heading: string;
  subtitles: string[]; // ⚠ currently string array (even though looks like JSON string)
  title: string;
  guideline: string;
  description: string;
  image: ServiceImage;
  icon?: ServiceImage; // icon image uploaded from admin
  order?: number;      // display order
  faq: FAQItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ServiceImage {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url?: string;   // optional (because third item has no url)
  path?: string;  // optional (because first two items don’t have path)
}
export interface FAQItem {
  question: string;
  answer: string;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface ServicesResponse {
  success: boolean;
  message: string;
  data: Service[];
  pagination: Pagination;
}

export interface SingleServiceResponse {
  success: boolean;
  message: string;
  data: Service;
}
