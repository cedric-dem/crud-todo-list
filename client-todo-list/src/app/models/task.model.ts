export interface Task {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  importance: string;
  dateCreation?: string | null;
  dueDate: string;
}
