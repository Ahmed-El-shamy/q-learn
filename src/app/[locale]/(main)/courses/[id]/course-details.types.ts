import type { Chapter } from "../_types/course.types";
export type CourseChapter = Chapter & {
  expanded: boolean;
};

export type CourseQAUser = {
  id: number;
  name: string;
  avatar: string;
};

export type CourseQAAnswer = {
  id: number;
  course_id: number;
  user: CourseQAUser;
  parent_id: number;
  body: string;
  is_pinned: boolean;
  status: string;
  created_at: string;
};

export interface CourseQA {
  id: number;
  course_id: number;
  user: CourseQAUser;
  parent_id: number | null;
  body: string;
  is_pinned: boolean;
  status: string;
  answers: CourseQAAnswer[];
  created_at: string;
};

