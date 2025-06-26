export interface Task {
  title: string;
  content: string;
  completed: boolean;
  importance: string;
  dateCreation?: string | null;
  dueDate: string ;
}
