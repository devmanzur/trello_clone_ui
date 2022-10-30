import { Dispatch } from "react";
import { TaskActions } from "../actions/TaskActions";

export interface Task {
  taskId: string;
  text: string;
}

export interface TaskList {
  listId: string;
  text: string;
  tasks: Task[];
}

export interface TaskState {
  lists: TaskList[];
}

export interface TaskStateContextProps {
  lists: TaskList[];
  getTasksByListId(listId: string): Task[];
  dispatch: Dispatch<TaskActions>;
}
