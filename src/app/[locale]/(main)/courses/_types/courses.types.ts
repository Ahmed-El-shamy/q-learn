export interface Category {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  slug: string;
  user_id: number | null;
  user: string;
  instructor: Partial<Instructor>;
  category: Category;
  price: {
    egp: string;
    usd: string;
    sar: string;
  };
  is_free?: boolean;
  progress?: string | number;
  mode?: string;
  total_hours?: number;
  lessonsCount?: number;
  lastLessonId?: number;
  status?: string;
  level?: string;
  is_featured?: boolean;
  average_rating?: string;
  total_ratings?: number;
  total_enrollments?: number;
  total_purchases?: number;
  publish_date?: string | null;
  title: string;
  description: string;
  short_description?: string;
  target_audience?: string;
  accrediting_organization?: string;
  thumbnail?: string | null;
  alt?: string;
  preview_video?: string;
  tags?: unknown[];
  added_by?: string | null;
  oldPrice?: number;
  rating?: number;
  students?: number;
  content?: any;
}

export interface Instructor {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    account_type: string;
    type: number;
    auth_method: string;
    preferred_language: string;
    birthdate: string;
    nationality: string;
    residency: string;
    is_active: boolean;
    is_banned: boolean;
  };
  avatar: string;
  avatar_url?: string;
  ratings_count: number;
  reviews_count: number;
  students_count: number;
  courses_count: number;
  social_media?: unknown[];
}

export interface CourseFilters {
  category_id?: number[];
  level?: string[];
  instructor?: string[];
  mode?: string[];
  is_free?: string[];
  rating?: number[];
  price_from?: string;
  price_to?: string;
  search?: string;
}

export type SortBy =
  | "price_lowest"
  | "price_highest"
  | "lowest_rated"
  | "most_rated"
  | "oldest"
  | "latest";

export interface CoursesFilterContext {
  sortBy?: SortBy;
  filters: CourseFilters;
  serverFilters: CourseFilters;
  setSortBy: (sortBy: SortBy) => void;

  handleChangeFilters: <K extends keyof CourseFilters>(
    key: K,
    value: CourseFilters[K],
    debounce?: boolean
  ) => void;

  resetFilters: () => void;
}

// export interface CourseResponse {
//   items: Course[];
//   total?: number;
// }
