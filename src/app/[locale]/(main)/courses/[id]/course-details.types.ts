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

