export type CourseCategory = {
  id: number;
  name: string;
};

export type CoursePrice = {
  egp: string;
  usd: string;
  sar: string;
};

export type Course = {
  id: number;
  slug: string;
  user_id: number | null;
  user: string | null;
  category: CourseCategory;
  price: CoursePrice;
  is_free: boolean;
  mode: string;
  total_hours: number;
  status: string;
  level: string;
  is_featured: boolean;
  average_rating: string;
  total_ratings: number;
  total_enrollments: number;
  total_purchases: number;
  publish_date: string | null;
  title: string;
  description: string;
  short_description: string;
  target_audience: string;
  accrediting_organization: string;
  thumbnail: string | null;
  preview_video: string;
  tags: unknown[];
  added_by: string | null;
};

