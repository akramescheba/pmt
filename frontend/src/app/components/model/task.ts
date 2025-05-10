
export interface Task {
    id: number;
    title: string;
    description: string;
    assignments: TaskAssignment[];
  }
  
  export interface TaskAssignment {
    userId: number;
  }
  