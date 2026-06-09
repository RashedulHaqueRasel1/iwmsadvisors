export interface RealEstateImage {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url?: string;
  path?: string;
}

export interface KeyCapability {
  title: string;
  subtitles: string[];
}

export interface RealEstate {
  _id: string;
  title: string;
  subTitle?: string;
  overviewTitle?: string;
  image: RealEstateImage;
  subtitles: string[];
  overview: string;
  keyCapabilities: KeyCapability[];
  order?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RealEstateResponse {
  success: boolean;
  message: string;
  data: RealEstate[];
  pagination: Pagination;
}
