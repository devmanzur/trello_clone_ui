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

export enum DragItemType {
  Column,
}

export interface ColumnDragItem {
  id: string;
  text: string;
  type: DragItemType.Column;
}

export interface TaskState {
  lists: TaskList[];
  draggedItem: ColumnDragItem | null;
}

export interface TaskStateContextProps {
  draggedItem: ColumnDragItem | null;
  lists: TaskList[];
  getTasksByListId(listId: string): Task[];
  dispatch: Dispatch<TaskActions>;
}
