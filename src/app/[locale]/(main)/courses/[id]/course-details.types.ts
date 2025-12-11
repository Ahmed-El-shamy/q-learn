export type CourseLesson = {
  name: string;
  description: string;
  duration: string;
  isLocked: boolean;
};

export type CourseChapter = {
  title: string;
  duration: string;
  lessons: CourseLesson[];
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

