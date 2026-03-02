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
  instructor: Instructor;
  category: CourseCategory;
  price: CoursePrice;
  /** When set, the course has a discount; show this as original (strikethrough) and price as current. */
  original_price?: Partial<CoursePrice>;
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
  image: string | null;
  video: string;
  tags: unknown[];
  is_enrolled?: boolean;
  content?: CourseContent;
};

export type InstructorUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  avatar_url: string;
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
  ratings_count: number;
  reviews_count: number;
  students_count: number;
  courses_count: number;
  social_media: unknown[];
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

export type QuizOption = {
  en: string;
  ar: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  type: string;
  points: string;
  options: QuizOption[];
  sort_order: number;
};

export type Quiz = {
  id: number;
  max_attempts: number;
  passing_score: string;
  title: string;
  description: string;
  time_limit_minutes: number;
  user_attempts: number;
  show_results_immediately: boolean;
  randomize_questions: boolean;
  questions?: QuizQuestion[];
};

export type QuizAttemptSubmittedAnswer = {
  id: number;
  quiz_question_id: number;
  answer: string;
  is_correct: boolean;
  points_earned: number;
  feedback: string | null;
};

export type QuizAttemptSubmitResponse = {
  id: number;
  quiz_id: number;
  user_id: number;
  attempt_number: number;
  score: number;
  max_score: number;
  is_passed: boolean;
  started_at: string;
  submitted_at: string;
  time_taken_seconds: number;
  quiz: Quiz;
  answers: QuizAttemptSubmittedAnswer[];
};

export type Lesson = {
  id: number;
  course: CourseReference;
  title: string;
  description: string;
  content_text: string;
  type: "video" | "quiz";
  is_free_preview: boolean;
  image: string | null;
  video: string | null;
  quiz: Quiz | null;
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
  quizzes: Quiz[];
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

