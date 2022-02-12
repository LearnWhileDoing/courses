import Certificate from "~/core/models/Certificate";

export default interface Course {
  isProject: boolean;
  name: string;
  authors: Record<string, string>;
  color: string;
  subtitle: string;
  tags: string[];
  projectFilesURL: string;
  getHelpURL: string;
  certificates: Record<string, Certificate>;
}
