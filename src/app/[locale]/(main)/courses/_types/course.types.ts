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
  instructor: Instructor;
};

export type InstructorUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  account_type: string;
  type: number;
  auth_method: string;
  preferred_language: string;
  birthdate: string | null;
  nationality: string;
  residency: string;
  is_active: boolean;
  is_banned: boolean;
};

export type Instructor = {
  user: InstructorUser;
  avatar: string;
  description?: string;
  ratings_count: number;
  reviews_count: number;
  students_count: number;
  courses_count: number;
};

export type ReviewUser = {
  id: number;
  name: string;
};

export type Review = {
  id: number;
  rating: number;
  review: string;
  is_approved: boolean;
  is_active: number;
  user: ReviewUser;
  status: string;
};

export type CourseReference = {
  id: number;
  name: string;
};

export type Lesson = {
  id: number;
  course: CourseReference;
  title: string;
  description: string;
  content_text: string;
  type: string;
  is_free_preview: boolean;
  image: string | null;
  video: string | null;
  quiz: unknown | null;
};

export type Chapter = {
  id: number;
  course: CourseReference;
  title: string;
  description: string;
  content_text: string;
  type: string;
  is_free_preview: boolean;
  is_active: boolean;
  sort_order: number;
  lessons: Lesson[];
  quizzes: unknown[];
  lessons_count: number;
  quizzes_count: number;
};

export type CourseContent = {
  chapters: Chapter[];
  total_chapters: number;
  lectures: number;
  quizzes: number;
  total_length_minutes: number;
};

export type CourseDetails = Course & {
  content: CourseContent;
};

