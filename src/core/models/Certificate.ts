export default interface Certificate {
  name: string;
  description: string;
  prereqs: {
    courses?: string[];
    pages?: string[];
    quizzes?: string[];
    challenges?: string[];
  };
}
