export interface InsightData {
  _id: string;
  title: string;
  subTitle: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface InsightResponse {
  status: boolean;
  message: string;
  data: InsightData[];
}
