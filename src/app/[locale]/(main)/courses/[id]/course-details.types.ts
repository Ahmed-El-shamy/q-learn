import { Chapter } from "../../_types/course.types";

export type CourseChapter = Chapter & {
  expanded: boolean;
};

export type CourseQAReply = {
  text: string;
  picture: string;
  username: string;
  date: string;
};

export interface CourseQA extends CourseQAReply {
  replies: CourseQAReply[];
};

